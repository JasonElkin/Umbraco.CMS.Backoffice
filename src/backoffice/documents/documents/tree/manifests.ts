import { UmbDocumentRepository } from '../repository/document.repository';
import { DOCUMENT_ENTITY_TYPE } from '..';
import type { ManifestTree, ManifestTreeItemLabel } from '@umbraco-cms/models';

const treeAlias = 'Umb.Tree.Documents';

const tree: ManifestTree = {
	type: 'tree',
	alias: treeAlias,
	name: 'Documents Tree',
	meta: {
		repository: UmbDocumentRepository, // TODO: use alias instead of class
	},
};

const treeItem: ManifestTreeItemLabel = {
	type: 'treeItemLabel',
	alias: 'Umb.TreeItem.Document',
	name: 'Document Tree Item',
	loader: () => import('./item-label/document-tree-item-label.element'),
	meta: {
		entityType: DOCUMENT_ENTITY_TYPE,
	},
};

export const manifests = [tree, treeItem];
