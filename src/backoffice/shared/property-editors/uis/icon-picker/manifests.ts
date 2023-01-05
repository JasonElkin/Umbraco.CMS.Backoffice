import type { ManifestPropertyEditorUI } from '@umbraco-cms/models';

export const manifest: ManifestPropertyEditorUI = {
	type: 'propertyEditorUI',
	alias: 'Umb.PropertyEditorUI.IconPicker',
	name: 'Icon Picker Property Editor UI',
	loader: () => import('./property-editor-ui-icon-picker.element'),
	meta: {
		label: 'Icon Picker',
		icon: 'umb:fingerprint',
		group: 'pickers',
		propertyEditorModel: 'Umbraco.JSON',
	},
};
