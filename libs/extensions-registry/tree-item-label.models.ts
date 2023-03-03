import type { ManifestElement } from './models';

export interface ManifestTreeItemLabel extends ManifestElement {
	type: 'treeItemLabel';
	meta: MetaTreeItemLabel;
}

export interface MetaTreeItemLabel {
	entityType: string;
}
