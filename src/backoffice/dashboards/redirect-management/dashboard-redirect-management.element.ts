import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html, LitElement } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { UmbModalService, UmbNotificationDefaultData, UmbNotificationService } from '@umbraco-cms/services';
import { UmbContextConsumerMixin } from '@umbraco-cms/context-api';

@customElement('umb-dashboard-redirect-management')
export class UmbDashboardRedirectManagementElement extends UmbContextConsumerMixin(LitElement) {
	static styles = [
		UUITextStyles,
		css`
			.actions {
				display: flex;
				gap: 4px;
				justify-content: space-between;
				margin-bottom: 12px;
			}

			uui-input uui-icon {
				padding-left: var(--uui-size-space-3);
			}
			uui-table uui-icon {
				vertical-align: middle;
			}

			p {
				margin: 0;
			}

			.trackerDisabled {
				position: relative;
				-webkit-user-select: none;
				-ms-user-select: none;
				user-select: none;
			}
			.trackerDisabled::after {
				content: '';
				background-color: rgba(250, 250, 250, 0.5);
				position: absolute;
				border-radius: 2px;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				-webkit-user-select: none;
				-ms-user-select: none;
				user-select: none;
			}

			a {
				font-weight: bold;
				color: var(--uui-color-interactive);
			}
			a:hover,
			a:focus {
				color: var(--uui-color-interactive-emphasis);
			}
		`,
	];

	@state()
	private redirectData: RedirectData[] = redirectData;

	@state()
	private redirectDataFiltered: RedirectData[] = this.redirectData;

	@state()
	private trackerDisabled = false;

	@query('#search')
	private _searchField!: HTMLInputElement;

	private _notificationService?: UmbNotificationService;
	private _modalService?: UmbModalService;

	private _removeRedirectHandler(data: RedirectData) {
		const modalHandler = this._modalService?.confirm({
			headline: 'Delete',
			content: html`
				<div style="width:300px">
					<p>This will remove the redirect</p>
					Original URL: <strong>${data.originalUrl}</strong><br />
					Redirected To: <strong>${data.destinationUrl}</strong>
					<p>Are you sure you want to delete?</p>
				</div>
			`,
			color: 'danger',
			confirmLabel: 'Delete',
		});
		modalHandler?.onClose().then(({ confirmed }: any) => {
			if (confirmed) this._removeRedirect(data);
		});
	}

	private _removeRedirect(r: RedirectData) {
		const index = this.redirectData.findIndex((data) => {
			return data.redirectKey === r.redirectKey;
		});
		this.redirectData.splice(index, 1);

		this.requestUpdate();

		const data: UmbNotificationDefaultData = {
			message: `Redirect "${r.originalUrl} → ${r.destinationUrl}" has been removed`,
		};
		this._notificationService?.peek('positive', { data });
	}

	private _disableRedirectHandler() {
		const modalHandler = this._modalService?.confirm({
			headline: 'Disable URL tracker',
			content: html`Are you sure you want to disable the URL tracker?`,
			color: 'danger',
			confirmLabel: 'Disable',
		});
		modalHandler?.onClose().then(({ confirmed }: any) => {
			if (confirmed) this._toggleRedirect();
		});
	}
	private _toggleRedirect() {
		this.trackerDisabled = !this.trackerDisabled;
		if (this.trackerDisabled) {
			const data: UmbNotificationDefaultData = { message: 'URL tracker has now been disabled' };
			this._notificationService?.peek('positive', { data });
		} else {
			const data: UmbNotificationDefaultData = { message: 'URL tracker has now been enabled' };
			this._notificationService?.peek('positive', { data });
		}
	}

	private _searchHandler() {
		this.redirectDataFiltered = this.redirectData.filter((data) => {
			return data.originalUrl?.includes(this._searchField.value);
		});
	}

	constructor() {
		super();
		this.consumeAllContexts(['umbNotificationService', 'umbModalService'], (instances) => {
			this._notificationService = instances['umbNotificationService'];
			this._modalService = instances['umbModalService'];
		});
	}

	connectedCallback() {
		super.connectedCallback();
		//call api
	}

	render() {
		return html`<div class="actions">
				${this.trackerDisabled
					? html`<uui-button
							label="Enable URL tracker"
							look="primary"
							color="positive"
							@click="${this._toggleRedirect}">
							Enable URL tracker
					  </uui-button>`
					: html`
							<uui-input id="search" placeholder="Type to search..." label="Search" @keyup="${this._searchHandler}">
								<uui-icon slot="prepend" name="umb:search"></uui-icon>
							</uui-input>
							<uui-button
								label="Disable URL tracker"
								look="outline"
								color="danger"
								@click="${this._disableRedirectHandler}">
								Disable URL tracker
							</uui-button>
					  `}
			</div>

			${this.redirectDataFiltered.length
				? html`<div class="${this.trackerDisabled ? 'trackerDisabled' : 'trackerEnabled'}">${this.renderTable()}</div>`
				: this.renderNoRedirects()} `;
	}

	renderNoRedirects() {
		return html`<uui-box>
			<strong slot="header">No redirects have been made</strong>
			<p>When a published page gets renamed or moved, a redirect will automatically be made to the new page.</p>
		</uui-box>`;
	}

	renderTable() {
		return html`<uui-box style="--uui-box-default-padding: 0;">
				<uui-table>
					<uui-table-head>
						<uui-table-head-cell style="width:0;">Culture</uui-table-head-cell>
						<uui-table-head-cell>Original URL</uui-table-head-cell>
						<uui-table-head-cell style="width:0;"></uui-table-head-cell>
						<uui-table-head-cell>Redirected To</uui-table-head-cell>
						<uui-table-head-cell style="width:0;">Actions</uui-table-head-cell>
					</uui-table-head>
					${this.redirectDataFiltered.map((data) => {
						return html` <uui-table-row>
							<uui-table-cell> ${data.culture || 'All'} </uui-table-cell>
							<uui-table-cell>
								<a href="${data.originalUrl || '#'}" target="_blank"> ${data.originalUrl} </a>
							</uui-table-cell>
							<uui-table-cell>
								<uui-icon name="umb:arrow-right"></uui-icon>
							</uui-table-cell>
							<uui-table-cell>
								<a href="${data.destinationUrl || '#'}" target="_blank"> ${data.destinationUrl} </a>
							</uui-table-cell>
							<uui-table-cell>
								<uui-action-bar style="justify-self: left;">
									<uui-button
										label="Delete"
										look="secondary"
										.disabled=${this.trackerDisabled}
										@click="${() => this._removeRedirectHandler(data)}">
										<uui-icon name="delete"></uui-icon>
									</uui-button>
								</uui-action-bar>
							</uui-table-cell>
						</uui-table-row>`;
					})}
				</uui-table>
			</uui-box></uui-scroll-container
		>`;
	}
}

export default UmbDashboardRedirectManagementElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-dashboard-redirect-management': UmbDashboardRedirectManagementElement;
	}
}

export interface Redirect {
	currentPage?: number;
	pageCount?: number;
	searchResults?: RedirectData[];
	totalCount?: number;
}

export interface RedirectData {
	contentId?: number;
	createDateUtc?: string;
	culture?: unknown;
	destinationUrl?: string;
	originalUrl?: string;
	redirectKey: string;
}

export const redirectData: RedirectData[] = [
	{
		contentId: 1,
		createDateUtc: '2022-12-05T13:59:43.6827244',
		destinationUrl: 'kitty.com',
		originalUrl: 'kitty.dk',
		redirectKey: '7191c911-6747-4824-849e-5208e2b31d9f2',
	},
	{
		contentId: 2,
		createDateUtc: '2022-13-05T13:59:43.6827244',
		destinationUrl: 'umbraco.com',
		originalUrl: 'umbraco.dk',
		redirectKey: '7191c911-6747-4824-849e-5208e2b31d9f',
	},
	{
		contentId: 3,
		createDateUtc: '2022-12-05T13:59:43.6827244',
		destinationUrl: 'uui.umbraco.com',
		originalUrl: 'uui.umbraco.dk',
		redirectKey: '7191c911-6747-4824-849e-5208e2b31d9f23',
	},
	{
		contentId: 4,
		createDateUtc: '2022-13-05T13:59:43.6827244',
		destinationUrl: 'umbracoffee.com',
		originalUrl: 'umbracoffee.dk',
		redirectKey: '7191c911-6747-4824-849e-5208e2b31d9fdsaa',
	},
	{
		contentId: 5,
		createDateUtc: '2022-12-05T13:59:43.6827244',
		destinationUrl: 'section/settings',
		originalUrl: 'section/settings/123',
		redirectKey: '7191c911-6747-4824-849e-5208e2b31d9f2e23',
	},
	{
		contentId: 6,
		createDateUtc: '2022-13-05T13:59:43.6827244',
		destinationUrl: 'dxp.com',
		originalUrl: 'dxp.dk',
		redirectKey: '7191c911-6747-4824-849e-5208e2b31d9fsafsfd',
	},
	{
		contentId: 7,
		createDateUtc: '2022-12-05T13:59:43.6827244',
		destinationUrl: 'google.com',
		originalUrl: 'google.dk',
		redirectKey: '7191c911-6747-4824-849e-5208e2b31d9f2cxza',
	},
	{
		contentId: 8,
		createDateUtc: '2022-13-05T13:59:43.6827244',
		destinationUrl: 'unicorns.com',
		originalUrl: 'unicorns.dk',
		redirectKey: '7191c911-6747-4824-849e-5208e2b31d9fweds',
	},
	{
		contentId: 9,
		createDateUtc: '2022-12-05T13:59:43.6827244',
		destinationUrl: 'h5yr.com',
		originalUrl: 'h5yr.dk',
		redirectKey: '7191c911-6747-4824-849e-5208e2b31ddsfsdsfadsfdx9f2',
	},
	{
		contentId: 10,
		createDateUtc: '2022-13-05T13:59:43.6827244',
		destinationUrl: 'our.umbraco.com',
		originalUrl: 'our.umbraco.dk',
		redirectKey: '7191c911-6747-4824-849e-52dsacx08e2b31d9dsafdsff',
	},
	{
		contentId: 11,
		createDateUtc: '2022-13-05T13:59:43.6827244',
		destinationUrl: 'your.umbraco.com',
		originalUrl: 'your.umbraco.dk',
		redirectKey: '7191c911-6747-4824-849e-52dsacx08e2b31d9fsda',
	},
];
