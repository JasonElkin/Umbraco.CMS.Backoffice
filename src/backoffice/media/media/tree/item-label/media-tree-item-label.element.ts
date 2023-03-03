import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { UmbLitElement } from '@umbraco-cms/element';

@customElement('umb-media-tree-item-label')
export class UmbMediaTreeItemLabelElement extends UmbLitElement {
	render() {
		return html`<div>MEDIA LABEL FROM EXTENSION</div>`;
	}
}

export default UmbMediaTreeItemLabelElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-media-tree-item-label': UmbMediaTreeItemLabelElement;
	}
}
