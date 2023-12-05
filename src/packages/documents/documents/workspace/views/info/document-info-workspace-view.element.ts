import { css, html, nothing, repeat, customElement, state } from '@umbraco-cms/backoffice/external/lit';
import { UUIPaginationEvent } from '@umbraco-cms/backoffice/external/uui';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';
import { UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import { UMB_WORKSPACE_MODAL, UmbModalRouteRegistrationController } from '@umbraco-cms/backoffice/modal';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
interface HistoryNode {
	userId?: number;
	userAvatars?: [];
	userName?: string;
	timestamp?: string;
	comment?: string;
	entityType?: string;
	logType?: HistoryLogType;
	nodeId?: string;
	parameters?: string;
}

type HistoryLogType = 'Publish' | 'Save' | 'Unpublish' | 'ContentVersionEnableCleanup' | 'ContentVersionPreventCleanup';

@customElement('umb-document-info-workspace-view')
export class UmbDocumentInfoWorkspaceViewElement extends UmbLitElement {
	@state()
	private _historyList: HistoryNode[] = [
		{
			userId: -1,
			userAvatars: [],
			userName: 'Lone Iversen',
			timestamp: 'December 5, 2022 2:59 PM',
			comment: undefined,
			entityType: 'Document',
			logType: 'Save',
			nodeId: '1058',
			parameters: undefined,
		},
		{
			userId: -1,
			userAvatars: [],
			userName: 'Lone Iversen',
			timestamp: 'December 5, 2022 2:59 PM',
			comment: undefined,
			entityType: 'Document',
			logType: 'Unpublish',
			nodeId: '1058',
			parameters: undefined,
		},
		{
			userId: -1,
			userAvatars: [],
			userName: 'Lone Iversen',
			timestamp: 'December 5, 2022 2:59 PM',
			comment: undefined,
			entityType: 'Document',
			logType: 'Publish',
			nodeId: '1058',
			parameters: undefined,
		},

		{
			userId: -1,
			userAvatars: [],
			userName: 'Lone Iversen',
			timestamp: 'December 5, 2022 2:59 PM',
			comment: undefined,
			entityType: 'Document',
			logType: 'Save',
			nodeId: '1058',
			parameters: undefined,
		},

		{
			userId: -1,
			userAvatars: [],
			userName: 'Lone Iversen',
			timestamp: 'December 5, 2022 2:59 PM',
			comment: undefined,
			entityType: 'Document',
			logType: 'Save',
			nodeId: '1058',
			parameters: undefined,
		},
	];

	@state()
	private _total?: number;

	@state()
	private _currentPage = 1;

	@state()
	private _nodeName = '';

	@state()
	private _documentTypeId = '';

	private _workspaceContext?: typeof UMB_WORKSPACE_CONTEXT.TYPE;
	private itemsPerPage = 10;

	@state()
	private _editDocumentTypePath = '';

	constructor() {
		super();

		new UmbModalRouteRegistrationController(this, UMB_WORKSPACE_MODAL)
			.addAdditionalPath('document-type')
			.onSetup(() => {
				return { entityType: 'document-type', preset: {} };
			})
			.observeRouteBuilder((routeBuilder) => {
				this._editDocumentTypePath = routeBuilder({});
			});

		this.consumeContext(UMB_WORKSPACE_CONTEXT, (nodeContext) => {
			this._workspaceContext = nodeContext;
			this._observeContent();
		});
	}

	private _observeContent() {
		if (!this._workspaceContext) return;

		this._nodeName = 'TBD, with variants this is not as simple.';
		this._documentTypeId = (this._workspaceContext as any).getContentTypeId();

		/*
		this.observe(this._workspaceContext.name, (name) => {
			this._nodeName = name || '';
		});
		*/
	}

	#onPageChange(event: UUIPaginationEvent) {
		if (this._currentPage === event.target.current) return;
		this._currentPage = event.target.current;
		//TODO: Run endpoint to get next history parts
	}

	render() {
		return html`<div class="container">
				<uui-box headline=${this.localize.term('general_links')} style="--uui-box-default-padding: 0;">
					${this.#renderLinksSection()}
				</uui-box>
				<uui-box headline=${this.localize.term('general_history')}>
					<umb-history-list>
						${repeat(
							this._historyList,
							(item) => item.timestamp,
							(item) => this.#renderHistory(item),
						)}
					</umb-history-list>
					${this.#renderHistoryPagination()}
				</uui-box>
			</div>
			<div class="container">
				<uui-box headline="General" id="general-section">${this.#renderGeneralSection()}</uui-box>
			</div>`;
	}

	#renderLinksSection() {
		//repeat
		return html`<div id="link-section">
			<a href="http://google.com" target="_blank" class="link-item with-href">
				<span class="link-language">da-DK</span>
				<span class="link-content"> <uui-icon name="icon-out"></uui-icon>google.com </span>
			</a>
			<div class="link-item">
				<span class="link-language">en-EN</span>
				<span class="link-content italic"><umb-localize key="content_parentNotPublishedAnomaly"></umb-localize></span>
			</div>
		</div>`;
	}

	#renderGeneralSection() {
		return html`
			<div class="general-item">
				<strong>${this.localize.term('content_publishStatus')}</strong>
				<span
					><uui-tag color="positive" look="primary" label=${this.localize.term('content_published')}
						><umb-localize key="content_published"></umb-localize></uui-tag
				></span>
			</div>
			<div class="general-item">
				<strong><umb-localize key="content_createDate"></umb-localize></strong>
				<span><umb-localize-date date="${new Date()}"></umb-localize-date></span>
			</div>
			<div class="general-item">
				<strong><umb-localize key="content_documentType"></umb-localize></strong>
				<uui-button
					href=${this._editDocumentTypePath + 'edit/' + this._documentTypeId}
					label=${this.localize.term('general_edit')}></uui-button>
			</div>
			<div class="general-item">
				<strong><umb-localize key="template_template"></umb-localize></strong>
				<span>IMPLEMENT template picker?</span>
			</div>
			<div class="general-item">
				<strong><umb-localize key="template_id"></umb-localize></strong>
				<span>...</span>
			</div>
		`;
	}

	#renderHistory(history: HistoryNode) {
		return html` <umb-history-item .name="${history.userName}" .detail="${this.localize.date(history.timestamp!)}">
			<span class="log-type"
				>${this.#renderTag(history.logType)} ${this.#renderTagDescription(history.logType, history)}</span
			>
			<uui-button label=${this.localize.term('actions_rollback')} look="secondary" slot="actions">
				<uui-icon name="icon-undo"></uui-icon>
				<umb-localize key="actions_rollback"></umb-localize>
			</uui-button>
		</umb-history-item>`;
	}

	#renderHistoryPagination() {
		if (!this._total) return nothing;

		const totalPages = Math.ceil(this._total / this.itemsPerPage);

		if (totalPages <= 1) return nothing;

		return html`<div class="pagination">
			<uui-pagination .total=${totalPages} @change="${this.#onPageChange}"></uui-pagination>
		</div>`;
	}

	#renderTag(type?: HistoryLogType) {
		switch (type) {
			case 'Publish':
				return html`<uui-tag look="primary" color="positive" label=${this.localize.term('content_publish')}
					><umb-localize key="content_publish"></umb-localize
				></uui-tag>`;
			case 'Unpublish':
				return html`<uui-tag look="primary" color="warning" label=${this.localize.term('content_unpublish')}
					><umb-localize key="content_unpublish"></umb-localize
				></uui-tag>`;
			case 'Save':
				return html`<uui-tag look="primary" label=${this.localize.term('auditTrails_smallSave')}
					><umb-localize key="auditTrails_smallSave"></umb-localize
				></uui-tag>`;
			case 'ContentVersionEnableCleanup':
				return html`<uui-tag
					look="secondary"
					label=${this.localize.term('contentTypeEditor_historyCleanupEnableCleanup')}
					><umb-localize key="contentTypeEditor_historyCleanupEnableCleanup"></umb-localize
				></uui-tag>`;
			case 'ContentVersionPreventCleanup':
				return html`<uui-tag
					look="secondary"
					label=${this.localize.term('contentTypeEditor_historyCleanupPreventCleanup')}
					><umb-localize key="contentTypeEditor_historyCleanupPreventCleanup"></umb-localize
				></uui-tag>`;
			default:
				return 'Could not detect log type';
		}
	}

	#renderTagDescription(type?: HistoryLogType, params?: HistoryNode) {
		switch (type) {
			case 'Publish':
				return this.localize.term('auditTrails_publish');
			case 'Unpublish':
				return this.localize.term('auditTrails_unpublish');
			case 'Save':
				return this.localize.term('auditTrails_save');
			case 'ContentVersionEnableCleanup':
				return this.localize.term('auditTrails_contentversionenablecleanup', [params?.nodeId]);
			case 'ContentVersionPreventCleanup':
				return this.localize.term('auditTrails_contentversionpreventcleanup', [params?.nodeId]);
			default:
				return 'Could not detect log type';
		}
	}

	static styles = [
		UmbTextStyles,
		css`
			:host {
				display: grid;
				gap: var(--uui-size-layout-1);
				padding: var(--uui-size-layout-1);
				grid-template-columns: 1fr 350px;
			}

			div.container {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-layout-1);
			}

			//General section

			#general-section {
				display: flex;
				flex-direction: column;
			}

			.general-item {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-1);
			}

			.general-item:not(:last-child) {
				margin-bottom: var(--uui-size-space-6);
			}

			// Link section

			#link-section {
				display: flex;
				flex-direction: column;
				text-align: left;
			}

			.link-item {
				padding: var(--uui-size-space-4) var(--uui-size-space-6);
				display: grid;
				grid-template-columns: 75px 1fr;
				color: inherit;
				text-decoration: none;
			}

			.link-language {
				color: var(--uui-color-divider-emphasis);
			}

			.link-content.italic {
				font-style: italic;
			}

			.link-item uui-icon {
				margin-right: var(--uui-size-space-2);
				vertical-align: middle;
			}

			.link-item.with-href {
				cursor: pointer;
			}

			.link-item.with-href:hover {
				background: var(--uui-color-divider);
			}

			//History section

			uui-tag uui-icon {
				margin-right: var(--uui-size-space-1);
			}

			.log-type {
				display: flex;
				gap: var(--uui-size-space-2);
			}
			uui-pagination {
				display: inline-block;
			}
			.pagination {
				display: flex;
				justify-content: center;
				margin-top: var(--uui-size-space-4);
			}
		`,
	];
}

export default UmbDocumentInfoWorkspaceViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-document-info-workspace-view': UmbDocumentInfoWorkspaceViewElement;
	}
}
