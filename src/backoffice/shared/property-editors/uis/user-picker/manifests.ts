import type { ManifestPropertyEditorUI } from '@umbraco-cms/models';

export const manifest: ManifestPropertyEditorUI = {
	type: 'propertyEditorUI',
	alias: 'Umb.PropertyEditorUI.UserPicker',
	name: 'User Picker Property Editor UI',
	loader: () => import('./property-editor-ui-user-picker.element'),
	meta: {
		label: 'User Picker',
		icon: 'umb:user',
		group: 'pickers',
		propertyEditorModel: 'Umbraco.UserPicker',
	},
};
