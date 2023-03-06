import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { UmbLitElement } from '@umbraco-cms/element';

@customElement('umb-media-tree-item')
export class UmbMediaTreeItemElement extends UmbLitElement {
	render() {
		return html`<div>MEDIA LABEL FROM EXTENSION</div>`;
	}
}

export default UmbMediaTreeItemElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-media-tree-item': UmbMediaTreeItemElement;
	}
}
