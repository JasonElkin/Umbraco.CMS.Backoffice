import { UMB_RELATION_TYPE_TREE_STORE_CONTEXT_TOKEN } from './relation-type.tree.store';
import type { ManifestTree, ManifestTreeItemAction } from '@umbraco-cms/models';

const tree: ManifestTree = {
	type: 'tree',
	alias: 'Umb.Tree.RelationTypes',
	name: 'Relation Types Tree',
	meta: {
		storeAlias: UMB_RELATION_TYPE_TREE_STORE_CONTEXT_TOKEN.toString(),
	},
};

const treeItemActions: Array<ManifestTreeItemAction> = [
	{
		type: 'treeItemAction',
		alias: 'Umb.TreeItemAction.RelationType.Create',
		name: 'Tree Item Action Create',
		loader: () => import('./actions/create/action-relation-type-create.element'),
		weight: 200,
		meta: {
			entityType: 'relation-type',
			label: 'Create',
			icon: 'umb:add',
		},
	},
	{
		type: 'treeItemAction',
		alias: 'Umb.TreeItemAction.RelationType.Delete',
		name: 'Tree Item Action Delete',
		loader: () => import('./actions/delete/action-relation-type-delete.element'),
		weight: 100,
		meta: {
			entityType: 'relation-type',
			label: 'Delete',
			icon: 'umb:delete',
		},
	},
];

export const manifests = [tree, ...treeItemActions];
