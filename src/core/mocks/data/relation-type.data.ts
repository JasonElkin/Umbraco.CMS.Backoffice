import { v4 as uuid } from 'uuid';
import { UmbEntityData } from './entity.data';
import { createEntityTreeItem } from './utils';
import { EntityTreeItem, PagedEntityTreeItem, RelationType } from '@umbraco-cms/backend-api';

type RelationTypeDBItem = RelationType & EntityTreeItem;

const createRelationType = (dbItem: RelationTypeDBItem): RelationType => {
	return {
		key: dbItem.key,
		name: dbItem.name,
		alias: dbItem.alias,
		relationIsBidirectional: dbItem.relationIsBidirectional,
		relationIsDependency: dbItem.relationIsDependency,
		relationParentName: dbItem.relationParentName,
		relationChildName: dbItem.relationChildName,
	};
};

export const data: Array<RelationTypeDBItem> = [
	{
		name: 'It works???',
		key: '2bf4abb6-3aca-1588-b043-4eb439cc2643',
		alias: 'RT-01',
		type: 'relation-type',
		parentKey: null,
		relationIsBidirectional: false,
		relationIsDependency: false,
		relationParentName: 'PARENT NAME HERE',
		relationChildName: 'CHILD NAME HERE',
	},
	{
		name: 'It actually does lol',
		key: '21hdabb6-3aca-1588-b043-4eb439cc2643',
		alias: 'RT-02',
		type: 'relation-type',
		parentKey: null,
		relationIsBidirectional: true,
		relationIsDependency: true,
		relationParentName: 'PARENT NAME HERE',
		relationChildName: 'CHILD NAME HERE',
	},
];

// Temp mocked database
// TODO: all properties are optional in the server schema. I don't think this is correct.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
class UmbRelationTypeData extends UmbEntityData<RelationTypeDBItem> {
	constructor() {
		super(data);
	}

	getByKey(key: string): RelationType | undefined {
		const item = this.data.find((item) => item.key === key);
		return item ? createRelationType(item) : undefined;
	}

	//TODO: add model
	create(relationTypeData: any) {
		const relationType = {
			key: uuid(),
			...relationTypeData,
		};
		this.data.push(relationType);
		return relationType;
	}

	getTreeRoot(): PagedEntityTreeItem {
		const items = this.data.filter((item) => item.parentKey === null);
		const treeItems = items.map((item) => createEntityTreeItem(item));
		const total = items.length;
		return { items: treeItems, total };
	}

	getTreeItemChildren(key: string): PagedEntityTreeItem {
		const items = this.data.filter((item) => item.parentKey === key);
		const treeItems = items.map((item) => createEntityTreeItem(item));
		const total = items.length;
		return { items: treeItems, total };
	}

	getTreeItem(keys: Array<string>): Array<EntityTreeItem> {
		const items = this.data.filter((item) => keys.includes(item.key ?? ''));
		return items.map((item) => createEntityTreeItem(item));
	}
}

export const umbRelationTypeData = new UmbRelationTypeData();
