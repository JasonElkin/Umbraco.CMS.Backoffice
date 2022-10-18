import './css/custom-properties.css';
import 'router-slot';

// TODO: remove these imports when they are part of UUI
import '@umbraco-ui/uui-modal';
import '@umbraco-ui/uui-modal-sidebar';
import '@umbraco-ui/uui-modal-container';
import '@umbraco-ui/uui-modal-dialog';

import { UUIIconRegistryEssential } from '@umbraco-ui/uui';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { Guard, IRoute } from 'router-slot/model';
import { getManifests, getServerStatus } from './core/api/fetcher';
import { UmbContextProviderMixin } from './core/context';
import { UmbExtensionRegistry } from './core/extension';
import authFlowInstance, { AuthFlow } from './core/services/flow';
import { internalManifests } from './temp-internal-manifests';

import type { ServerStatus } from './core/models';

@customElement('umb-app')
export class UmbApp extends UmbContextProviderMixin(LitElement) {
	static styles = css`
		:host {
			overflow: hidden;
		}

		:host,
		#router-slot {
			display: block;
			width: 100%;
			height: 100vh;
		}
	`;

	@state()
	private _routes: IRoute[] = [
		{
			path: 'login',
			component: () => import('./auth/login/login.element'),
		},
		{
			path: 'install',
			component: () => import('./installer/installer.element'),
		},
		{
			path: 'upgrade',
			component: () => import('./upgrader/upgrader.element'),
			guards: [this._isAuthorizedGuard('/upgrade')],
		},
		{
			path: '**',
			component: () => import('./backoffice/backoffice.element'),
			guards: [this._isAuthorizedGuard()],
		},
	];

	private _extensionRegistry = new UmbExtensionRegistry();
	private _iconRegistry = new UUIIconRegistryEssential();
	private _serverStatus: ServerStatus = 'running';

	private authFlow: AuthFlow;

	constructor() {
		super();
		// TODO: Perhaps it's better to avoid singleton pattern and instead pass the instance around so we can provide it with baseUrl and other config
		this.authFlow = authFlowInstance;
		this._setup();
	}

	private async _setup() {
		window.addEventListener('auth-success', () => {
			// TODO: What happens when the user is successfully logged in - persist in user service?
			console.log('%cis logged in: ' + this.authFlow.loggedIn(), 'background: red; color: yellow; font-size: x-large');
		});

		// TODO: Handle fallthrough if no cases were hit in setInitialState() - this should mean we need to perform an authorization request
		await this.authFlow.setInitialState();

		this._iconRegistry.attach(this);
		this.provideContext('umbExtensionRegistry', this._extensionRegistry);

		await this._registerExtensionManifestsFromServer();
		await this._registerInternalManifests();
		await this._setInitStatus();
		this._redirect();
	}

	private async _setInitStatus() {
		try {
			const { data } = await getServerStatus({});
			this._serverStatus = data.serverStatus;
		} catch (error) {
			console.log(error);
		}
	}

	private _redirect() {
		switch (this._serverStatus) {
			case 'must-install':
				history.replaceState(null, '', '/install');
				break;

			case 'must-upgrade':
				history.replaceState(null, '', '/upgrade');
				break;

			case 'running': {
				const pathname =
					window.location.pathname === '/install' || window.location.pathname === '/upgrade'
						? '/'
						: window.location.href;
				history.replaceState(null, '', pathname);
				break;
			}
		}
	}

	private _isAuthorized(): boolean {
		return this.authFlow.loggedIn();
	}

	private _isAuthorizedGuard(redirectTo?: string): Guard {
		return () => {
			if (this._isAuthorized()) {
				return true;
			}

			// TODO: How do we preserve the redirectTo param - forward it to the login page?
			// TODO: How do we handle the case where the user is already logged in, but the session has expired?
			this.authFlow.makeAuthorizationRequest();

			// let returnPath = '/login';

			// if (redirectTo) {
			// 	returnPath += `?redirectTo=${redirectTo}`;
			// }

			// history.replaceState(null, '', returnPath);
			return false;
		};
	}

	private async _registerExtensionManifestsFromServer() {
		const res = await getManifests({});
		const { manifests } = res.data;
		manifests.forEach((manifest) => this._extensionRegistry.register(manifest));
	}

	private async _registerInternalManifests() {
		// TODO: where do we get these from?
		internalManifests.forEach((manifest) => this._extensionRegistry.register(manifest));
	}

	render() {
		return html`<router-slot id="router-slot" .routes=${this._routes}></router-slot>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-app': UmbApp;
	}
}
