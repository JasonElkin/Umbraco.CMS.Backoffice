import type { ManifestElement } from './models';

export interface ManifestTreeItemLabel extends ManifestElement {
	type: 'treeItem';
	meta: MetaTreeItemLabel;
}

export interface MetaTreeItemLabel {
	entityType: string;
}
