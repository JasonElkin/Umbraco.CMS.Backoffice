import { UmbRelationTypeTreeRepository } from './data/relation-type.tree.repository';
import type { ManifestTree, ManifestTreeItemAction } from '@umbraco-cms/models';

const tree: ManifestTree = {
	type: 'tree',
	alias: 'Umb.Tree.RelationTypes',
	name: 'Relation Types Tree',
	meta: {
		repository: UmbRelationTypeTreeRepository,
	},
};

const treeItemActions: Array<ManifestTreeItemAction> = [
	{
		type: 'treeItemAction',
		alias: 'Umb.TreeItemAction.RelationType.Create',
		name: 'Create Relation Type Tree Action',
		loader: () => import('./actions/create/create-relation-type-tree-action.element'),
		weight: 300,
		meta: {
			entityType: 'relation-type',
			label: 'Create',
			icon: 'umb:add',
		},
	},
	{
		type: 'treeItemAction',
		alias: 'Umb.TreeItemAction.RelationType.Delete',
		name: 'Delete Relation Type Tree Action',
		loader: () => import('./actions/delete/delete-relation-type-tree-action.element'),
		weight: 200,
		meta: {
			entityType: 'relation-type',
			label: 'Delete',
			icon: 'umb:trash',
		},
	},
];

export const manifests = [tree, ...treeItemActions];
