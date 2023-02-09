import { RelationTypeTreeDataSource } from '.';
import { PagedEntityTreeItem, ProblemDetails, RelationTypeResource } from '@umbraco-cms/backend-api';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';
import { tryExecuteAndNotify } from '@umbraco-cms/resources';
import type { DataSourceResponse } from '@umbraco-cms/models';

/**
 * A data source for the Relation type tree that fetches data from the server
 * @export
 * @class RelationTypeTreeServerDataSource
 * @implements {RelationTypeTreeDataSource}
 */
export class RelationTypeTreeServerDataSource implements RelationTypeTreeDataSource {
	#host: UmbControllerHostInterface;

	/**
	 * Creates an instance of RelationTypeTreeServerDataSource.
	 * @param {UmbControllerHostInterface} host
	 * @memberof RelationTypeTreeServerDataSource
	 */
	constructor(host: UmbControllerHostInterface) {
		this.#host = host;
	}

	getChildrenOf(parentKey: string): Promise<DataSourceResponse<PagedEntityTreeItem>> {
		throw new Error('Method not implemented.');
	}

	/**
	 * Fetches the root items for the tree from the server
	 * @return {*}
	 * @memberof RelationTypeTreeServerDataSource
	 */
	async getRootItems() {
		return tryExecuteAndNotify(this.#host, RelationTypeResource.getTreeRelationTypeRoot({}));
	}

	/**
	 * Fetches the items for the given keys from the server
	 * @param {Array<string>} keys
	 * @return {*}
	 * @memberof RelationTypeTreeServerDataSource
	 */
	async getItems(keys: Array<string>) {
		if (keys) {
			const error: ProblemDetails = { title: 'Keys are missing' };
			return { error };
		}

		return tryExecuteAndNotify(
			this.#host,
			RelationTypeResource.getTreeRelationTypeItem({
				key: keys,
			})
		);
	}
}
