import { UmbMediaRepository } from '../repository/media.repository';
import { MEDIA_ENTITY_TYPE } from '../';
import type { ManifestTree, ManifestTreeItem } from '@umbraco-cms/models';

const treeAlias = 'Umb.Tree.Media';

const tree: ManifestTree = {
	type: 'tree',
	alias: treeAlias,
	name: 'Media Tree',
	meta: {
		repository: UmbMediaRepository, // TODO: use alias instead of class
	},
};

const treeItem: ManifestTreeItem = {
	type: 'treeItem',
	alias: 'Umb.TreeItem.Media',
	name: 'Media Tree Item',
	loader: () => import('./tree-item/media-tree-item.element'),
	meta: {
		entityType: MEDIA_ENTITY_TYPE,
	},
};

export const manifests = [tree, treeItem];
