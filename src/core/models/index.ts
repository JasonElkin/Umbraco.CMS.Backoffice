import type { UserStatus } from '../../backoffice/sections/users/user-extensions';
import {
	ContentTreeItem,
	DocumentTreeItem,
	DocumentTypeTreeItem,
	EntityTreeItem,
	FolderTreeItem,
} from '@umbraco-cms/backend-api';

// Extension Manifests
export * from '../extensions-registry/models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HTMLElementConstructor<T = HTMLElement> = new (...args: any[]) => T;

// Users
export interface Entity {
	key: string;
	name: string;
	icon: string;
	type: string;
	hasChildren: boolean;
	parentKey: string | null;
}

export interface UserEntity extends Entity {
	type: 'user';
}

export interface UserDetails extends UserEntity {
	email: string;
	status: UserStatus;
	language: string;
	lastLoginDate?: string;
	lastLockoutDate?: string;
	lastPasswordChangeDate?: string;
	updateDate: string;
	createDate: string;
	failedLoginAttempts: number;
	userGroups: Array<string>;
	contentStartNodes: Array<string>;
	mediaStartNodes: Array<string>;
}

export interface UserGroupEntity extends Entity {
	type: 'user-group';
}

export interface UserGroupDetails extends UserGroupEntity {
	sections: Array<string>;
	contentStartNode?: string;
	mediaStartNode?: string;
	permissions: Array<string>;
}

// Data Types
export interface DataTypeDetails extends FolderTreeItem {
	key: string; // TODO: Remove this when the backend is fixed
	propertyEditorModelAlias: string | null;
	propertyEditorUIAlias: string | null;
	data: Array<DataTypePropertyData>;
}

export interface DataTypePropertyData {
	alias: string;
	value: any;
}

// Document Types
export interface DocumentTypeDetails extends DocumentTypeTreeItem {
	key: string; // TODO: Remove this when the backend is fixed
	alias: string;
	properties: [];
}

export interface MemberTypeDetails extends EntityTreeItem {
	key: string; // TODO: Remove this when the backend is fixed
	alias: string;
	properties: [];
}

// Content
export interface ContentProperty {
	alias: string;
	label: string;
	description: string;
	dataTypeKey: string;
}

export interface ContentPropertyData {
	alias: string;
	value: any;
}

// Documents
export interface DocumentDetails extends DocumentTreeItem {
	key: string; // TODO: Remove this when the backend is fixed
	isTrashed: boolean; // TODO: remove only temp part of refactor
	properties: Array<ContentProperty>;
	data: Array<ContentPropertyData>;
	variants: Array<any>; // TODO: define variant data
	//layout?: any; // TODO: define layout type - make it non-optional
}

// Media
export interface MediaDetails extends ContentTreeItem {
	key: string; // TODO: Remove this when the backend is fixed
	isTrashed: boolean; // TODO: remove only temp part of refactor
	properties: Array<ContentProperty>;
	data: Array<ContentPropertyData>;
	variants: Array<any>; // TODO: define variant data
	//layout?: any; // TODO: define layout type - make it non-optional
}

// Media Types

export interface MediaTypeDetails extends FolderTreeItem {
	key: string; // TODO: Remove this when the backend is fixed
	alias: string;
	properties: [];
}

// Member Groups
export interface MemberGroupDetails extends EntityTreeItem {
	key: string; // TODO: Remove this when the backend is fixed
}
