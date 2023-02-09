/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RelationTypeCreateModel = {
	name?: string;

	parentKey?: string;
	parentName?: string;

	childKey?: string;
	childName?: string;

	isBidirectional?: boolean;
	isDependency?: boolean;
};
