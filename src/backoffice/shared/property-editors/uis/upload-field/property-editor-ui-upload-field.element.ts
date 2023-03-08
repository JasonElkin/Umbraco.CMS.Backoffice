import { html } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property, state } from 'lit/decorators.js';
import { UmbLitElement } from '@umbraco-cms/element';
import { DataTypePropertyModel } from '@umbraco-cms/backend-api';
import UmbInputUploadFieldElement from 'src/backoffice/shared/components/input-upload-field/input-upload-field.element';

/**
 * @element umb-property-editor-ui-upload-field
 */
@customElement('umb-property-editor-ui-upload-field')
export class UmbPropertyEditorUIUploadFieldElement extends UmbLitElement {
	static styles = [UUITextStyles];

	@property()
	value = '';

	@property({ type: Array, attribute: false })
	public set config(config: Array<DataTypePropertyModel>) {
		const fileExtensions = config.find((x) => x.alias === 'fileExtensions');
		if (fileExtensions) this._fileExtensions = fileExtensions.value;

		const multiple = config.find((x) => x.alias === 'multiple');
		if (multiple) this._multiple = multiple.value;
	}

	@state()
	private _fileExtensions?: Array<string>;

	@state()
	private _multiple?: boolean;

	private _onChange(event: CustomEvent) {
		this.value = (event.target as UmbInputUploadFieldElement).value as string;
		this.dispatchEvent(new CustomEvent('property-value-change'));
	}

	render() {
		return html`<umb-input-upload-field
			@change="${this._onChange}"
			?multiple="${this._multiple}"
			.fileExtensions="${this._fileExtensions}"></umb-input-upload-field>`;
	}
}

export default UmbPropertyEditorUIUploadFieldElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-property-editor-ui-upload-field': UmbPropertyEditorUIUploadFieldElement;
	}
}
