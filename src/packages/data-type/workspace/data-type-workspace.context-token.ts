import type { UmbDataTypeWorkspaceContext } from './data-type-workspace.context.js';
import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import type { UmbWorkspaceContextInterface } from '@umbraco-cms/backoffice/workspace';

export const UMB_DATA_TYPE_WORKSPACE_CONTEXT = new UmbContextToken<
	UmbWorkspaceContextInterface,
	UmbDataTypeWorkspaceContext
>(
	'UmbWorkspaceContext',
	undefined,
	(context): context is UmbDataTypeWorkspaceContext => context.getEntityType?.() === 'data-type',
);
