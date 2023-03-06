import type { ManifestElement } from './models';

export interface ManifestTreeItem extends ManifestElement {
	type: 'treeItem';
	meta: MetaTreeItem;
}

export interface MetaTreeItem {
	entityType: string;
}
