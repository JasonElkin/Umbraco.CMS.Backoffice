import { html } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement } from 'lit/decorators.js';
import { UmbModalLayoutElement } from '@umbraco-cms/modal';

export interface UmbCreateDataTypeFolderModalData {
	unique: string | null;
}

@customElement('umb-create-data-type-modal')
export class UmbCreateDataTypeFolderModalElement extends UmbModalLayoutElement<UmbCreateDataTypeFolderModalData> {
	static styles = [UUITextStyles];

	private _handleCancel() {
		this.modalHandler?.close();
	}

	#onClick(event: PointerEvent) {
		event.stopPropagation();
		this.modalHandler?.close();
	}

	render() {
		return html`
			<umb-body-layout headline="Create Folder">
				<uui-box headline="Create an item under [GET NAME OF ENTITY]">
					<uui-form>
						<form id="dataTypeFolderForm" name="dataTypeFolderForm">
							<uui-form-layout-item>
								<uui-label for="folderName" slot="label" required>Folder name</uui-label>
								<uui-input id="folderName" name="folderName" label="Folder name" required></uui-input>
							</uui-form-layout-item>

							<uui-button type="submit" label="Create folder"></uui-button>
						</form>
					</uui-form>

					<uui-button slot="actions" id="cancel" label="Cancel" @click="${this._handleCancel}">Cancel</uui-button>
				</uui-box>
			</umb-body-layout>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-create-data-type-folder-modal': UmbCreateDataTypeModalElement;
	}
}
