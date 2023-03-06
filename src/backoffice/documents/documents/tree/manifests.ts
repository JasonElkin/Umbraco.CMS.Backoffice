import { UmbDocumentRepository } from '../repository/document.repository';
import { DOCUMENT_ENTITY_TYPE } from '..';
import type { ManifestTree, ManifestTreeItem } from '@umbraco-cms/models';

export const DOCUMENT_TREE_ALIAS = 'Umb.Tree.Document';

const tree: ManifestTree = {
	type: 'tree',
	alias: DOCUMENT_TREE_ALIAS,
	name: 'Document Tree',
	meta: {
		repository: UmbDocumentRepository, // TODO: use alias instead of class
	},
};

const treeItem: ManifestTreeItem = {
	type: 'treeItem',
	alias: 'Umb.TreeItem.Document',
	name: 'Document Tree Item',
	loader: () => import('./tree-item/document-tree-item.element'),
	meta: {
		entityType: DOCUMENT_ENTITY_TYPE,
	},
};

export const manifests = [tree, treeItem];
