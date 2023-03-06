import { UmbDataTypeRepository } from '../repository/data-type.repository';
import type { ManifestTree } from '@umbraco-cms/models';

export const DATA_TYPE_TREE_ALIAS = 'Umb.Tree.DataTypes';

const tree: ManifestTree = {
	type: 'tree',
	alias: DATA_TYPE_TREE_ALIAS,
	name: 'Data Types Tree',
	meta: {
		repository: UmbDataTypeRepository,
	},
};

export const manifests = [tree];
