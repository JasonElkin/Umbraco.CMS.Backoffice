import { UUITextStyles } from '@umbraco-ui/uui-css';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { UmbModalService, UMB_MODAL_SERVICE_CONTEXT_TOKEN } from '../../../../../../core/modal';
import UmbTreeItemActionElement from '../../../../../shared/components/tree/action/tree-item-action.element';
import {
	UmbRelationTypeDetailStore,
	UMB_RELATION_TYPE_DETAIL_STORE_CONTEXT_TOKEN,
} from '../../../relation-type.detail.store';

@customElement('umb-tree-action-relation-type-delete')
export default class UmbTreeActionDataTypeDeleteElement extends UmbTreeItemActionElement {
	static styles = [UUITextStyles, css``];

	private _modalService?: UmbModalService;
	private _relationTypeStore?: UmbRelationTypeDetailStore;

	connectedCallback(): void {
		super.connectedCallback();

		this.consumeContext(UMB_MODAL_SERVICE_CONTEXT_TOKEN, (modalService) => {
			this._modalService = modalService;
		});

		this.consumeContext(UMB_RELATION_TYPE_DETAIL_STORE_CONTEXT_TOKEN, (relationTypeStore) => {
			this._relationTypeStore = relationTypeStore;
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
			if (confirmed && this._treeContextMenuService && this._relationTypeStore && this._activeTreeItem) {
				this._relationTypeStore?.delete([this._activeTreeItem.key]);
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
		'umb-tree-action-relation-type-delete': UmbTreeActionDataTypeDeleteElement;
	}
}
