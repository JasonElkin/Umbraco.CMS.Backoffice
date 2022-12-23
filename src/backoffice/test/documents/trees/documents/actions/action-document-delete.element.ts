import { UUITextStyles } from '@umbraco-ui/uui-css';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { UmbModalService } from '../../../../../../core/services/modal';
import { UmbDocumentStore } from '../../../../../../core/stores/document/document.store';
import UmbTreeItemActionElement from '../../../../core/components/tree/tree-item-action.element';
import { UmbContextConsumerMixin } from '@umbraco-cms/context-api';

@customElement('umb-tree-action-document-delete')
export default class UmbTreeActionDocumentDeleteElement extends UmbContextConsumerMixin(UmbTreeItemActionElement) {
	static styles = [UUITextStyles, css``];

	private _modalService?: UmbModalService;
	private _documentStore?: UmbDocumentStore;

	connectedCallback(): void {
		super.connectedCallback();

		this.consumeContext('umbModalService', (modalService: UmbModalService) => {
			this._modalService = modalService;
		});

		this.consumeContext('umbDocumentStore', (documentStore: UmbDocumentStore) => {
			this._documentStore = documentStore;
		});
	}

	private _handleLabelClick() {
		const modalHandler = this._modalService?.confirm({
			headline: `Delete ${this._activeTreeItem?.name ?? 'item'}`,
			content: 'Are you sure you want to delete this item?',
			color: 'danger',
			confirmLabel: 'Delete',
		});

		modalHandler?.onClose().then(({ confirmed }: any) => {
			if (confirmed && this._treeContextMenuService && this._documentStore && this._activeTreeItem) {
				this._documentStore?.trash([this._activeTreeItem.key]);
				this._treeContextMenuService.close();
			}
		});
	}

	render() {
		return html`<uui-menu-item label=${this.treeAction?.meta.label ?? ''} @click-label="${this._handleLabelClick}">
			<uui-icon slot="icon" name=${this.treeAction?.meta.icon ?? ''}></uui-icon>
		</uui-menu-item>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-tree-action-document-delete': UmbTreeActionDocumentDeleteElement;
	}
}
