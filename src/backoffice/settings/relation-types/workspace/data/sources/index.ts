import { RelationType } from '@umbraco-cms/backend-api';
import type { DataSourceResponse } from '@umbraco-cms/models';

export interface RelationTypeDetailDataSource {
	createScaffold(parentKey: string | null): Promise<DataSourceResponse<RelationType>>;
	get(key: string): Promise<DataSourceResponse<RelationType>>;
	insert(relationType: RelationType): Promise<DataSourceResponse>;
	update(relationType: RelationType): Promise<DataSourceResponse>;
	delete(key: string): Promise<DataSourceResponse>;
}
