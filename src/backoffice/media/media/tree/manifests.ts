import { UmbMediaRepository } from '../repository/media.repository';
import { MEDIA_ENTITY_TYPE } from '../';
import type { ManifestTree, ManifestTreeItemLabel, ManifestTreeItemAction } from '@umbraco-cms/models';

const treeAlias = 'Umb.Tree.Media';

const tree: ManifestTree = {
	type: 'tree',
	alias: treeAlias,
	name: 'Media Tree',
	meta: {
		repository: UmbMediaRepository, // TODO: use alias instead of class
	},
};

const treeItem: ManifestTreeItemLabel = {
	type: 'treeItemLabel',
	alias: 'Umb.TreeItem.Media',
	name: 'Media Tree Item',
	loader: () => import('./item-label/media-tree-item-label.element'),
	meta: {
		entityType: MEDIA_ENTITY_TYPE,
	},
};

const treeItemActions: Array<ManifestTreeItemAction> = [];

export const manifests = [tree, treeItem, ...treeItemActions];
