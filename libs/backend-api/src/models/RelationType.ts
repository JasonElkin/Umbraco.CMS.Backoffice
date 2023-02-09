/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RelationType = {
	name?: string;
	alias?: string;
	content?: string | null;
	key?: string;

	relationParentKey?: string;
	relationParentName?: string;

	relationChildKey?: string;
	relationChildName?: string;

	relationIsBidirectional?: boolean;
	relationIsDependency?: boolean;
};
