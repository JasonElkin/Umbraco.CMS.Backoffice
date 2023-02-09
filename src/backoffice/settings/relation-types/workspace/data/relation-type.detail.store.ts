import { UmbContextToken } from '@umbraco-cms/context-api';
import { ArrayState } from '@umbraco-cms/observable-api';
import { UmbStoreBase } from '@umbraco-cms/store';
import { RelationType } from '@umbraco-cms/backend-api';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';

/**
 * @export
 * @class UmbRelationTypeDetailStore
 * @extends {UmbStoreBase}
 * @description - Data Store for Relation Type Details
 */
export class UmbRelationTypeDetailStore extends UmbStoreBase {
	#data = new ArrayState<RelationType>([], (x) => x.key);

	/**
	 * Creates an instance of UmbRelationTypeDetailStore.
	 * @param {UmbControllerHostInterface} host
	 * @memberof UmbRelationTypeDetailStore
	 */
	constructor(host: UmbControllerHostInterface) {
		super(host, UmbRelationTypeDetailStore.name);
	}

	/**
	 * Append a relation type to the store
	 * @param {RelationType} relationType
	 * @memberof UmbRelationTypeDetailStore
	 */
	append(relationType: RelationType) {
		this.#data.append([relationType]);
	}

	/**
	 * Removes relation types in the store with the given uniques
	 * @param {string[]} uniques
	 * @memberof UmbRelationTypeDetailStore
	 */
	remove(uniques: string[]) {
		this.#data.remove(uniques);
	}
}

export const UMB_RELATION_TYPE_DETAIL_STORE_CONTEXT_TOKEN = new UmbContextToken<UmbRelationTypeDetailStore>(
	UmbRelationTypeDetailStore.name
);
