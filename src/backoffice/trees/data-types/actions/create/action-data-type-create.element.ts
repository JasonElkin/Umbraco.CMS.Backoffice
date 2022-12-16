import { UUITextStyles } from '@umbraco-ui/uui-css';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import UmbTreeItemActionElement from '../../../shared/tree-item-action.element';

@customElement('umb-tree-action-data-type-create')
export default class UmbTreeActionDataTypeCreateElement extends UmbTreeItemActionElement {
	static styles = [UUITextStyles, css``];

	// TODO: how do we handle the href?
	private _constructUrl() {
		return `section/settings/${this._activeTreeItem?.type}/create/${this._activeTreeItem?.key || 'root'}`;
	}

	private _handleLabelClick() {
		this._treeContextMenuService?.close();
	}

	render() {
		return html`<uui-menu-item
			label=${this.treeAction?.meta.label ?? ''}
			@click-label="${this._handleLabelClick}"
			href="${this._constructUrl()}">
			<uui-icon slot="icon" name=${this.treeAction?.meta.icon ?? ''}></uui-icon>
		</uui-menu-item>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-tree-action-data-type-create': UmbTreeActionDataTypeCreateElement;
	}
}
