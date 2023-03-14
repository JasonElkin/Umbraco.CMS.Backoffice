import { DOCUMENT_ENTITY_TYPE } from '..';
import { DOCUMENT_REPOSITORY_ALIAS } from '../repository/manifests';
import { UmbCreateDocumentEntityAction } from './create/create.action';
import { UmbPublishDocumentEntityAction } from './publish.action';
import { UmbDocumentCultureAndHostnamesEntityAction } from './culture-and-hostnames.action';
import { UmbCreateDocumentBlueprintEntityAction } from './create-blueprint.action';
import { UmbDocumentPublicAccessEntityAction } from './public-access.action';
import { UmbDocumentPermissionsEntityAction } from './permissions.action';
import { UmbUnpublishDocumentEntityAction } from './unpublish.action';
import { UmbRollbackDocumentEntityAction } from './rollback.action';
import {
	UmbCopyEntityAction,
	UmbMoveEntityAction,
	UmbTrashEntityAction,
	UmbSortChildrenOfEntityAction,
} from '@umbraco-cms/entity-action';
import { ManifestEntityAction, ManifestModal } from '@umbraco-cms/extensions-registry';

const entityActions: Array<ManifestEntityAction> = [
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.Document.Create',
		name: 'Create Document Entity Action',
		weight: 1000,
		meta: {
			entityType: DOCUMENT_ENTITY_TYPE,
			icon: 'umb:add',
			label: 'Create',
			repositoryAlias: DOCUMENT_REPOSITORY_ALIAS,
			api: UmbCreateDocumentEntityAction,
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.Document.Trash',
		name: 'Trash Document Entity Action',
		weight: 900,
		meta: {
			entityType: DOCUMENT_ENTITY_TYPE,
			icon: 'umb:trash',
			label: 'Trash',
			repositoryAlias: DOCUMENT_REPOSITORY_ALIAS,
			api: UmbTrashEntityAction,
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.Document.CreateBlueprint',
		name: 'Create Document Blueprint Entity Action',
		weight: 800,
		meta: {
			entityType: DOCUMENT_ENTITY_TYPE,
			icon: 'umb:blueprint',
			label: 'Create Content Template',
			repositoryAlias: DOCUMENT_REPOSITORY_ALIAS,
			api: UmbCreateDocumentBlueprintEntityAction,
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.Document.Move',
		name: 'Move Document Entity Action',
		weight: 700,
		meta: {
			entityType: DOCUMENT_ENTITY_TYPE,
			icon: 'umb:enter',
			label: 'Move',
			repositoryAlias: DOCUMENT_REPOSITORY_ALIAS,
			api: UmbMoveEntityAction,
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.Document.Copy',
		name: 'Copy Document Entity Action',
		weight: 600,
		meta: {
			entityType: DOCUMENT_ENTITY_TYPE,
			icon: 'umb:documents',
			label: 'Copy',
			repositoryAlias: DOCUMENT_REPOSITORY_ALIAS,
			api: UmbCopyEntityAction,
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.Document.Sort',
		name: 'Sort Document Entity Action',
		weight: 500,
		meta: {
			entityType: DOCUMENT_ENTITY_TYPE,
			icon: 'umb:navigation-vertical',
			label: 'Sort',
			repositoryAlias: DOCUMENT_REPOSITORY_ALIAS,
			api: UmbSortChildrenOfEntityAction,
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.Document.CultureAndHostnames',
		name: 'Culture And Hostnames Document Entity Action',
		weight: 400,
		meta: {
			entityType: DOCUMENT_ENTITY_TYPE,
			icon: 'umb:home',
			label: 'Culture And Hostnames',
			repositoryAlias: DOCUMENT_REPOSITORY_ALIAS,
			api: UmbDocumentCultureAndHostnamesEntityAction,
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.Document.Permissions',
		name: 'Document Permissions Entity Action',
		meta: {
			entityType: DOCUMENT_ENTITY_TYPE,
			icon: 'umb:vcard',
			label: 'Permissions',
			repositoryAlias: DOCUMENT_REPOSITORY_ALIAS,
			api: UmbDocumentPermissionsEntityAction,
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.Document.PublicAccess',
		name: 'Document Permissions Entity Action',
		meta: {
			entityType: DOCUMENT_ENTITY_TYPE,
			icon: 'umb:lock',
			label: 'Public Access',
			repositoryAlias: DOCUMENT_REPOSITORY_ALIAS,
			api: UmbDocumentPublicAccessEntityAction,
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.Document.Publish',
		name: 'Publish Document Entity Action',
		meta: {
			entityType: DOCUMENT_ENTITY_TYPE,
			icon: 'umb:globe',
			label: 'Publish',
			repositoryAlias: DOCUMENT_REPOSITORY_ALIAS,
			api: UmbPublishDocumentEntityAction,
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.Document.Unpublish',
		name: 'Unpublish Document Entity Action',
		meta: {
			entityType: DOCUMENT_ENTITY_TYPE,
			icon: 'umb:globe',
			label: 'Unpublish',
			repositoryAlias: DOCUMENT_REPOSITORY_ALIAS,
			api: UmbUnpublishDocumentEntityAction,
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.Document.Rollback',
		name: 'Rollback Document Entity Action',
		meta: {
			entityType: DOCUMENT_ENTITY_TYPE,
			icon: 'umb:undo',
			label: 'Rollback',
			repositoryAlias: DOCUMENT_REPOSITORY_ALIAS,
			api: UmbRollbackDocumentEntityAction,
		},
	},
];

const modals: Array<ManifestModal> = [
	{
		type: 'modal',
		alias: 'Umb.Modal.CreateDocument',
		name: 'Create Document Modal',
		loader: () => import('./create/create-document-modal.element'),
	},
];

export const manifests = [...entityActions, ...modals];
