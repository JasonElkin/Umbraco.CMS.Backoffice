import { css, html, nothing } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property } from 'lit/decorators.js';
import { UmbDocumentTypeTreeItemContext } from './document-type-tree-item.context';
import { UmbLitElement } from '@umbraco-cms/element';
import { DocumentTypeTreeItemModel } from '@umbraco-cms/backend-api';

@customElement('umb-document-type-tree-item')
export class UmbDocumentTypeTreeItemElement extends UmbLitElement {
	static styles = [UUITextStyles, css``];

	@property({ type: Object, attribute: false })
	public item?: DocumentTypeTreeItemModel;

	render() {
		if (!this.item) return nothing;
		return html`
			<umb-tree-item-base .item=${this.item} .context=${new UmbDocumentTypeTreeItemContext(this, this.item)}>
				<!-- TODO: show icon for element type -->
				<div slot="label">${this.item.name}</div>
			</umb-tree-item-base>
		`;
	}
}

export default UmbDocumentTypeTreeItemElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-document-type-tree-item': UmbDocumentTypeTreeItemElement;
	}
}
