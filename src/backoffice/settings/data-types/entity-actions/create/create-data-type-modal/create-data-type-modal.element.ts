import { html } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement } from 'lit/decorators.js';
import { UmbModalBaseElement } from '@umbraco-cms/modal';

export interface UmbCreateDataTypeModalData {
	unique: string | null;
}

export interface UmbCreateDataTypeModalResultData {
	documentType: string;
}

@customElement('umb-create-data-type-modal')
export class UmbCreateDataTypeModalElement extends UmbModalBaseElement<UmbCreateDataTypeModalData> {
	static styles = [UUITextStyles];

	private _handleCancel() {
		this.modalHandler?.reject();
	}

	#createNewDataType(event: PointerEvent) {
		event.stopPropagation();
		this.modalHandler?.submit();
	}

	#createFolder() {
		alert('Start create folder flow');
	}

	render() {
		return html`
			<umb-body-layout headline="Create">
				<uui-box headline="Create an item under [GET NAME OF ENTITY]">
					<uui-menu-item label="New Data Type..." @click=${this.#createNewDataType}
						><uui-icon slot="icon" name="umb:autofill"></uui-icon
					></uui-menu-item>
					<uui-menu-item label="New Folder" @click=${
						this.#createFolder
					}><uui-icon slot="icon" name="umb:folder"></uui-icon></uui-icon></uui-menu-item>
					<uui-button slot="actions" id="cancel" label="Cancel" @click="${this._handleCancel}">Cancel</uui-button>
				</uui-box>
			</umb-body-layout>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-create-data-type-modal': UmbCreateDataTypeModalElement;
	}
}
