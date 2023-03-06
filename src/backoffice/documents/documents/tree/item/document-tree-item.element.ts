import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { UmbLitElement } from '@umbraco-cms/element';
import { DocumentTreeItemModel } from '@umbraco-cms/backend-api';

@customElement('umb-document-tree-item-label')
export class UmbDocumentTreeItemLabelElement extends UmbLitElement {
	static styles = [
		UUITextStyles,
		css`
			:host {
				display: flex;
				align-items: center;
			}

			#status {
				width: 6px;
				height: 6px;
				background-color: blue;
				display: block;
				border-radius: 3px;
				margin-right: 10px;
			}
		`,
	];

	@property({ type: Object, attribute: false })
	item?: DocumentTreeItemModel;

	render() {
		return html`<span id="status"></span><span>${this.item?.name}</span>`;
	}
}

export default UmbDocumentTreeItemLabelElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-document-tree-item-label': UmbDocumentTreeItemLabelElement;
	}
}
