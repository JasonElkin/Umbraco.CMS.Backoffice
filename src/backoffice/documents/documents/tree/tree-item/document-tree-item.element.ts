import { css, html, nothing } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property } from 'lit/decorators.js';
import { UmbDocumentTreeItemContext } from './document-tree-item.context';
import { UmbLitElement } from '@umbraco-cms/element';
import { DocumentTreeItemModel } from '@umbraco-cms/backend-api';

@customElement('umb-document-tree-item')
export class UmbDocumentTreeItemElement extends UmbLitElement {
	static styles = [UUITextStyles, css``];

	@property({ type: Object, attribute: false })
	public item?: DocumentTreeItemModel;

	render() {
		if (!this.item) return html`Hello Hello`;
		return html`
			<umb-tree-item-base
				.item=${this.item}
				.context=${new UmbDocumentTreeItemContext(this, this.item)}></umb-tree-item-base>
		`;
	}
}

export default UmbDocumentTreeItemElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-document-tree-item': UmbDocumentTreeItemElement;
	}
}
