import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { UmbWorkspaceDocumentContext } from './workspace-document.context';
import { umbExtensionsRegistry } from '@umbraco-cms/extensions-registry';
import type { ManifestWorkspaceView } from '@umbraco-cms/models';
import { UmbContextConsumerMixin, UmbContextProviderMixin } from '@umbraco-cms/context-api';
import '../../../core/components/workspace/workspace-content/workspace-content.element';
import { UmbObserverMixin } from '@umbraco-cms/observable-api';

@customElement('umb-workspace-document')
export class UmbWorkspaceDocumentElement extends UmbObserverMixin(
	UmbContextConsumerMixin(UmbContextProviderMixin(LitElement))
) {
	static styles = [
		UUITextStyles,
		css`
			:host {
				display: block;
				width: 100%;
				height: 100%;
			}
		`,
	];

	private _entityKey!: string;
	@property()
	public get entityKey(): string {
		return this._entityKey;
	}
	public set entityKey(value: string) {
		this._entityKey = value;
		this._provideWorkspace();
	}

	private _workspaceContext?: UmbWorkspaceDocumentContext;

	constructor() {
		super();

		// TODO: consider if registering extensions should happen initially or else where, to enable unregister of extensions.
		this._registerWorkspaceViews();
	}

	connectedCallback(): void {
		super.connectedCallback();
		// TODO: avoid this connection, our own approach on Lit-Controller could be handling this case.
		this._workspaceContext?.connectedCallback();
	}
	disconnectedCallback(): void {
		super.connectedCallback();
		// TODO: avoid this connection, our own approach on Lit-Controller could be handling this case.
		this._workspaceContext?.disconnectedCallback();
	}

	protected _provideWorkspace() {
		if (this._entityKey) {
			this._workspaceContext = new UmbWorkspaceDocumentContext(this, this._entityKey);
			this.provideContext('umbWorkspaceContext', this._workspaceContext);
		}
	}

	private _registerWorkspaceViews() {
		const dashboards: Array<ManifestWorkspaceView> = [
			{
				type: 'workspaceView',
				alias: 'Umb.WorkspaceView.Document.Edit',
				name: 'Document Workspace Edit View',
				loader: () =>
					import('../../../core/components/workspace/workspace-content/views/edit/workspace-view-content-edit.element'),
				weight: 200,
				meta: {
					workspaces: ['Umb.Workspace.Document'],
					label: 'Info',
					pathname: 'content',
					icon: 'document',
				},
			},
			{
				type: 'workspaceView',
				alias: 'Umb.WorkspaceView.Document.Info',
				name: 'Document Workspace Info View',
				loader: () =>
					import('../../../core/components/workspace/workspace-content/views/info/workspace-view-content-info.element'),
				weight: 100,
				meta: {
					workspaces: ['Umb.Workspace.Document'],
					label: 'Info',
					pathname: 'info',
					icon: 'info',
				},
			},
		];

		dashboards.forEach((dashboard) => {
			if (umbExtensionsRegistry.isRegistered(dashboard.alias)) return;
			umbExtensionsRegistry.register(dashboard);
		});
	}

	render() {
		return html`<umb-workspace-content alias="Umb.Workspace.Document"></umb-workspace-content>`;
	}
}

export default UmbWorkspaceDocumentElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-workspace-document': UmbWorkspaceDocumentElement;
	}
}
