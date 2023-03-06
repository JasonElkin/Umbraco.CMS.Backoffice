import { css, html, nothing } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property } from 'lit/decorators.js';
import { UmbDocumentTreeItemContext } from './media-tree-item.context';
import { UmbLitElement } from '@umbraco-cms/element';
import { DocumentTreeItemModel } from '@umbraco-cms/backend-api';

@customElement('umb-media-tree-item')
export class UmbMediaTreeItemElement extends UmbLitElement {
	static styles = [
		UUITextStyles,
		css`
			#label {
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
	public item?: DocumentTreeItemModel;

	render() {
		if (!this.item) return nothing;
		return html`
			<umb-tree-item-base .item=${this.item} .context=${new UmbDocumentTreeItemContext(this, this.item)}>
				<span slot="label">MEDIA: ${this.item?.name}</span>
			</umb-tree-item-base>
		`;
	}
}

export default UmbMediaTreeItemElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-media-tree-item': UmbMediaTreeItemElement;
	}
}
