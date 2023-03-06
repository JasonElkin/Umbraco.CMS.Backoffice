import { DATA_TYPE_REPOSITORY_ALIAS } from '../repository/manifests';
import { DATA_TYPE_ENTITY_TYPE } from '..';
import { UmbCreateDataTypeEntityAction } from './create.action';
import { ManifestEntityAction } from '@umbraco-cms/extensions-registry';
import { UmbDeleteEntityAction } from '@umbraco-cms/entity-action';

const entityActions: Array<ManifestEntityAction> = [
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.DataType.Create',
		name: 'Create Data Type Entity Action',
		weight: 1000,
		meta: {
			entityType: DATA_TYPE_ENTITY_TYPE,
			icon: 'umb:add',
			label: 'Create',
			repositoryAlias: DATA_TYPE_REPOSITORY_ALIAS,
			api: UmbCreateDataTypeEntityAction,
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.DataType.Delete',
		name: 'Delete Data Type Entity Action',
		weight: 900,
		meta: {
			entityType: DATA_TYPE_ENTITY_TYPE,
			icon: 'umb:trash',
			label: 'Trash',
			repositoryAlias: DATA_TYPE_REPOSITORY_ALIAS,
			api: UmbDeleteEntityAction,
		},
	},
];

export const manifests = [...entityActions];
