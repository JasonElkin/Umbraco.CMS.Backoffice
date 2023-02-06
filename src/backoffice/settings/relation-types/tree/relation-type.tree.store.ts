import { DocumentTreeItem } from '@umbraco-cms/backend-api';
import { UmbContextToken } from '@umbraco-cms/context-api';
import { ArrayState } from '@umbraco-cms/observable-api';
import { UmbStoreBase } from '@umbraco-cms/store';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';

export const UMB_RELATION_TYPE_TREE_STORE_CONTEXT_TOKEN = new UmbContextToken<UmbRelationTypeTreeStore>(
	'UmbRelationTypeTreeStore'
);

/**
 * @export
 * @class UmbRelationTypeTreeStore
 * @extends {UmbStoreBase}
 * @description - Tree Data Store for Data Types
 */
export class UmbRelationTypeTreeStore extends UmbStoreBase {
	#data = new ArrayState<DocumentTreeItem>([], (x) => x.key);

	constructor(host: UmbControllerHostInterface) {
		super(host, UMB_RELATION_TYPE_TREE_STORE_CONTEXT_TOKEN.toString());
	}

	/**
	 * @description - Delete a Data Type.
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

	getTreeRoot() {
		fetch('/umbraco/management/api/v1/tree/relation-type/root')
			.then((res) => res.json())
			.then((data) => {
				this.#data.append(data.items);
			});

		return this.#data.getObservablePart((items) => items.filter((item) => item.parentKey === null && !item.isTrashed));
	}

	getTreeItemChildren(key: string) {
		fetch(
			'/umbraco/management/api/v1/tree/relation-type/root' +
				new URLSearchParams({
					parentKey: key,
				})
		)
			.then((res) => res.json())
			.then((data) => {
				this.#data.append(data.items);
			});

		return this.#data.getObservablePart((items) => items.filter((item) => item.parentKey === key && !item.isTrashed));
	}

	getTreeItems(keys: Array<string>) {
		if (keys?.length > 0) {
			fetch(
				'/umbraco/management/api/v1/tree/relation-type/root' +
					new URLSearchParams({
						key: keys.toString(),
					})
			)
				.then((res) => res.json())
				.then((data) => {
					this.#data.append(data);
				});
		}

		return this.#data.getObservablePart((items) => items.filter((item) => keys.includes(item.key ?? '')));
	}
}
