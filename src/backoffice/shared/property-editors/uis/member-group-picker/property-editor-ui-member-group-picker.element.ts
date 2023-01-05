import { html, LitElement } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property } from 'lit/decorators.js';

/**
 * @element umb-property-editor-ui-member-group-picker
 */
@customElement('umb-property-editor-ui-member-group-picker')
export class UmbPropertyEditorUIMemberGroupPickerElement extends LitElement {
	static styles = [UUITextStyles];

	@property()
	value = '';

	@property({ type: Array, attribute: false })
	public config = [];

	render() {
		return html`<div>umb-property-editor-ui-member-group-picker</div>`;
	}
}

export default UmbPropertyEditorUIMemberGroupPickerElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-property-editor-ui-member-group-picker': UmbPropertyEditorUIMemberGroupPickerElement;
	}
}
