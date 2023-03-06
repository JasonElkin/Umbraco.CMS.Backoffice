import { css, html, nothing } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property } from 'lit/decorators.js';
import { UmbEntityTreeItemContext } from './entity-tree-item.context';
import { UmbLitElement } from '@umbraco-cms/element';
import { EntityTreeItemModel } from '@umbraco-cms/backend-api';

@customElement('umb-entity-tree-item')
export class UmbEntityTreeItemElement extends UmbLitElement {
	static styles = [UUITextStyles, css``];

	@property({ type: Object, attribute: false })
	public item?: EntityTreeItemModel;

	render() {
		if (!this.item) return nothing;
		return html`<umb-tree-item-base
			.item=${this.item}
			.context=${new UmbEntityTreeItemContext(this, this.item)}></umb-tree-item-base> `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-entity-tree-item': UmbEntityTreeItemElement;
	}
}
