import { html, LitElement } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property } from 'lit/decorators.js';

/**
 * @element umb-property-editor-ui-user-picker
 */
@customElement('umb-property-editor-ui-user-picker')
export class UmbPropertyEditorUIUserPickerElement extends LitElement {
	static styles = [UUITextStyles];

	@property()
	value = '';

	@property({ type: Array, attribute: false })
	public config = [];

	render() {
		return html`<div>umb-property-editor-ui-user-picker</div>`;
	}
}

export default UmbPropertyEditorUIUserPickerElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-property-editor-ui-user-picker': UmbPropertyEditorUIUserPickerElement;
	}
}
