import { EntityTreeItem } from '@umbraco-cms/backend-api';
import { UmbContextToken } from '@umbraco-cms/context-api';
import { ArrayState } from '@umbraco-cms/observable-api';
import { UmbStoreBase } from '@umbraco-cms/store';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';

/**
 * @export
 * @class UmbRelationTypeTreeStore
 * @extends {UmbStoreBase}
 * @description - Tree Data Store for Relation Types
 */
export class UmbRelationTypeTreeStore extends UmbStoreBase {
	#data = new ArrayState<EntityTreeItem>([], (x) => x.key);

	/**
	 * Creates an instance of UmbRelationTypeTreeStore.
	 * @param {UmbControllerHostInterface} host
	 * @memberof UmbRelationTypeTreeStore
	 */
	constructor(host: UmbControllerHostInterface) {
		super(host, UMB_RELATION_TYPE_TREE_STORE_CONTEXT_TOKEN.toString());
	}

	/**
	 * Appends items to the store
	 * @param {Array<EntityTreeItem>} items
	 * @memberof UmbRelationTypeTreeStore
	 */
	appendItems(items: Array<EntityTreeItem>) {
		this.#data.append(items);
	}

	/**
	 * Updates an item in the store
	 * @param {string} key
	 * @param {Partial<EntityTreeItem>} data
	 * @memberof UmbRelationTypeTreeStore
	 */
	updateItem(key: string, data: Partial<EntityTreeItem>) {
		const entries = this.#data.getValue();
		const entry = entries.find((entry) => entry.key === key);

		if (entry) {
			this.#data.appendOne({ ...entry, ...data });
		}
	}

	/**
	 * Removes an item from the store
	 * @param {string} key
	 * @memberof UmbRelationTypeTreeStore
	 */
	removeItem(key: string) {
		const entries = this.#data.getValue();
		const entry = entries.find((entry) => entry.key === key);

		if (entry) {
			this.#data.remove([key]);
		}
	}

	/**
	 * Returns an observable to observe the root items
	 * @return {*}
	 * @memberof UmbRelationTypeTreeStore
	 */
	rootItems() {
		return this.#data.getObservablePart((items) => items.filter((item) => item.parentKey === null));
	}

	/**
	 * Returns an observable to observe the children of a given parent
	 * @param {(string | null)} parentKey
	 * @return {*}
	 * @memberof UmbRelationTypeTreeStore
	 */
	childrenOf(parentKey: string | null) {
		return this.#data.getObservablePart((items) => items.filter((item) => item.parentKey === parentKey));
	}

	/**
	 * Returns an observable to observe the items with the given keys
	 * @param {Array<string>} keys
	 * @return {*}
	 * @memberof UmbRelationTypeTreeStore
	 */
	items(keys: Array<string>) {
		return this.#data.getObservablePart((items) => items.filter((item) => keys.includes(item.key ?? '')));
	}
}

export const UMB_RELATION_TYPE_TREE_STORE_CONTEXT_TOKEN = new UmbContextToken<UmbRelationTypeTreeStore>(
	UmbRelationTypeTreeStore.name
);
