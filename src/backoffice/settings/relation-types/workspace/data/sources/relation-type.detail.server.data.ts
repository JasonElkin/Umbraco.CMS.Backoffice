import { RelationTypeDetailDataSource } from '.';
import { CancelablePromise, RelationType } from '@umbraco-cms/backend-api';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';
import { tryExecuteAndNotify } from '@umbraco-cms/resources';
import type { DataSourceResponse } from '@umbraco-cms/models';

/**
 * A data source for the Relation type detail that fetches data from the server
 * @export
 * @class UmbRelationTypeDetailServerDataSource
 * @implements {RelationTypeDetailDataSource}
 */
export class UmbRelationTypeDetailServerDataSource implements RelationTypeDetailDataSource {
	#host: UmbControllerHostInterface;

	/**
	 * Creates an instance of UmbRelationTypeDetailServerDataSource.
	 * @param {UmbControllerHostInterface} host
	 * @memberof UmbRelationTypeDetailServerDataSource
	 */
	constructor(host: UmbControllerHostInterface) {
		this.#host = host;
	}
	get(key: string): Promise<DataSourceResponse<RelationType>> {
		//TODO: Use resource when updated
		return tryExecuteAndNotify(
			this.#host,
			new CancelablePromise<RelationType>((resolve) => resolve(MockData.find((x) => x.key === key)!))
		);
	}
	createScaffold(parentKey: string | null): Promise<DataSourceResponse<RelationType>> {
		throw new Error('Method not implemented.');
	}
	insert(relationTypes: RelationType): Promise<DataSourceResponse<undefined>> {
		throw new Error('Method not implemented.');
	}
	update(relationTypes: RelationType): Promise<DataSourceResponse<undefined>> {
		throw new Error('Method not implemented.');
	}
	delete(key: string): Promise<DataSourceResponse<undefined>> {
		throw new Error('Method not implemented.');
	}
}

const MockData: Array<RelationType> = [
	{
		name: 'Related document on copy',
		key: 'ajwhdawhdkjawhdkj',
	},
];
