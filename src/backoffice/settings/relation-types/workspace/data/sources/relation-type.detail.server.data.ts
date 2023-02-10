import { umbRelationTypeData } from '../../../../../../core/mocks/data/relation-type.data';
import { RelationTypeDetailDataSource } from '.';
import { CancelablePromise, ProblemDetails, RelationType, TemplateResource } from '@umbraco-cms/backend-api';
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
	get(key: string) {
		//TODO: Use resource when updated
		return tryExecuteAndNotify(
			this.#host,
			new CancelablePromise<RelationType>((resolve) => resolve(umbRelationTypeData.getByKey(key)!))
		);
	}
	insert(relationTypes: RelationType): Promise<DataSourceResponse<undefined>> {
		throw new Error('Method not implemented.');
	}
	async update(relationTypes: RelationType): Promise<DataSourceResponse<undefined>> {
		return await tryExecuteAndNotify(
			this.#host,
			new CancelablePromise<any>((resolve) => {
				umbRelationTypeData.save([relationTypes]);
				return resolve(undefined);
			})
		);
	}

	async delete(key: string) {
		if (!key) {
			const error: ProblemDetails = { title: 'Key is missing' };
			return { error };
		}

		return await tryExecuteAndNotify(
			this.#host,
			new CancelablePromise<any>((resolve) => {
				umbRelationTypeData.delete([key]);
				return resolve(undefined);
			})
		);
	}
}
