import type { UmbWorkspaceContextInterface } from './workspace-context.interface.js';
import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';

export const UMB_WORKSPACE_CONTEXT = new UmbContextToken<UmbWorkspaceContextInterface>('UmbWorkspaceContext');
