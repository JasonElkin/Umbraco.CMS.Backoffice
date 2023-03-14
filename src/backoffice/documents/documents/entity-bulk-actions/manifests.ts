import { DOCUMENT_ENTITY_TYPE } from '..';
import { DOCUMENT_REPOSITORY_ALIAS } from '../repository/manifests';
import { UmbDocumentMoveEntityBulkAction } from './move/move.action';
import { UmbDocumentCopyEntityBulkAction } from './copy/copy.action';
import { ManifestEntityBulkAction } from '@umbraco-cms/extensions-registry';

const entityActions: Array<ManifestEntityBulkAction> = [
	{
		type: 'entityBulkAction',
		alias: 'Umb.EntityBulkAction.Document.Move',
		name: 'Move Document Entity Bulk Action',
		weight: 10,
		meta: {
			entityType: DOCUMENT_ENTITY_TYPE,
			label: 'Move',
			repositoryAlias: DOCUMENT_REPOSITORY_ALIAS,
			api: UmbDocumentMoveEntityBulkAction,
		},
	},
	{
		type: 'entityBulkAction',
		alias: 'Umb.EntityBulkAction.Document.Copy',
		name: 'Copy Document Entity Bulk Action',
		weight: 9,
		meta: {
			entityType: DOCUMENT_ENTITY_TYPE,
			label: 'Copy',
			repositoryAlias: DOCUMENT_REPOSITORY_ALIAS,
			api: UmbDocumentCopyEntityBulkAction,
		},
	},
];

export const manifests = [...entityActions];
