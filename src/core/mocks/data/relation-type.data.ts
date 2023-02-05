import { UmbEntityData } from './entity.data';
import { createFolderTreeItem } from './utils';
import { FolderTreeItem } from '@umbraco-cms/backend-api';
import type { RelationTypeDetails } from '@umbraco-cms/models';

export const data: Array<RelationTypeDetails> = [
	{
		name: 'Related document on copy',
		type: 'relation-type',
		key: '1209312jh31i2uh3i1u2h3',
		parentKey: null,
		parent: 'Document',
		child: 'Document',
		direction: 'Parent to child',
		isDependency: false,
		data: [],
	},
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
class UmbRelationTypeData extends UmbEntityData<RelationTypeDetails> {
	constructor() {
		super(data);
	}

	getTreeRoot(): Array<FolderTreeItem> {
		const rootItems = this.data.filter((item) => item.parentKey === null);
		return rootItems.map((item) => createFolderTreeItem(item));
	}

	getTreeItemChildren(key: string): Array<FolderTreeItem> {
		const childItems = this.data.filter((item) => item.parentKey === key);
		return childItems.map((item) => createFolderTreeItem(item));
	}

	getTreeItem(keys: Array<string>): Array<FolderTreeItem> {
		const items = this.data.filter((item) => keys.includes(item.key ?? ''));
		return items.map((item) => createFolderTreeItem(item));
	}
}

export const umbRelationTypeData = new UmbRelationTypeData();
