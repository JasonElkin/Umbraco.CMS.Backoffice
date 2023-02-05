import type { RelationTypeDetails } from '@umbraco-cms/models';
import { UmbContextToken } from '@umbraco-cms/context-api';
import { ArrayState } from '@umbraco-cms/observable-api';
import { UmbEntityDetailStore, UmbStoreBase } from '@umbraco-cms/store';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';

export const UMB_RELATION_TYPE_DETAIL_STORE_CONTEXT_TOKEN = new UmbContextToken<UmbRelationTypeDetailStore>(
	'UmbRelationTypeDetailStore'
);

/**
 * @export
 * @class UmbRelationTypeDetailStore
 * @extends {UmbStoreBase}
 * @description - Details Data Store for Relation Types
 */
export class UmbRelationTypeDetailStore extends UmbStoreBase implements UmbEntityDetailStore<RelationTypeDetails> {
	#data = new ArrayState<RelationTypeDetails>([], (x) => x.key);

	constructor(host: UmbControllerHostInterface) {
		super(host, UMB_RELATION_TYPE_DETAIL_STORE_CONTEXT_TOKEN.toString());
	}

	getScaffold() {
		return {
			key: '',
		} as RelationTypeDetails;
	}

	/**
	 * @description - Request a Relation Type by key. The Relation Type is added to the store and is returned as an Observable.
	 * @param {string} key
	 * @return {*}  {(Observable<RelationTypeDetails | undefined>)}
	 * @memberof UmbDataTypesStore
	 */
	getByKey(key: string) {
		fetch(`/umbraco/backoffice/relation-type/details/${key}`)
			.then((res) => res.json())
			.then((data) => {
				this.#data.append(data);
			});

		return this.#data.getObservablePart((documents) => documents.find((document) => document.key === key));
	}

	/**
	 * @description - Save a Relation Type.
	 * @param {Array<RelationTypeDetails>} dataTypes
	 * @memberof UmbDataTypesStore
	 * @return {*}  {Promise<void>}
	 */
	save(data: RelationTypeDetails[]) {
		// fetch from server and update store
		let body: string;

		try {
			body = JSON.stringify(data);
		} catch (error) {
			console.error(error);
			return Promise.reject();
		}

		// TODO: use backend cli when available.
		return fetch('/umbraco/management/api/v1/relation-type/save', {
			method: 'POST',
			body: body,
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data: Array<RelationTypeDetails>) => {
				this.#data.append(data);
			});
	}

	/**
	 * @description - Delete a Relation Type.
	 * @param {string[]} keys
	 * @memberof UmbDataTypesStore
	 * @return {*}  {Promise<void>}
	 */
	async delete(keys: string[]) {
		await fetch('/umbraco/backoffice/relation-type/delete', {
			method: 'POST',
			body: JSON.stringify(keys),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		this.#data.remove(keys);
	}
}
