import { MEDIA_ENTITY_TYPE } from '..';
import { UmbTrashEntityAction } from '@umbraco-cms/entity-action';
import { ManifestEntityAction } from 'libs/extensions-registry/entity-action.models';

const entityActions: Array<ManifestEntityAction> = [
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.Media.Trash',
		name: 'Trash Media Entity Action ',
		meta: {
			entityType: MEDIA_ENTITY_TYPE,
			icon: 'umb:trash',
			label: 'Trash',
			api: UmbTrashEntityAction,
			repositoryAlias: 'Umb.Repository.Media',
		},
	},
];

export const manifests = [...entityActions];
