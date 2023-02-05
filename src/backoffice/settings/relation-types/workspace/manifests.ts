import type { ManifestWorkspace, ManifestWorkspaceAction, ManifestWorkspaceView } from '@umbraco-cms/models';

const workspace: ManifestWorkspace = {
	type: 'workspace',
	alias: 'Umb.Workspace.RelationType',
	name: 'Relation Type Workspace',
	loader: () => import('./relation-type-workspace.element'),
	meta: {
		entityType: 'relation-type',
	},
};

const workspaceViews: Array<ManifestWorkspaceView> = [
	{
		type: 'workspaceView',
		alias: 'Umb.WorkspaceView.RelationType.Edit',
		name: 'Relation Type Workspace Edit View',
		loader: () => import('./views/edit/relation-type-workspace-view-edit.element'),
		weight: 90,
		meta: {
			workspaces: ['Umb.Workspace.RelationType'],
			label: 'Edit',
			pathname: 'edit',
			icon: 'edit',
		},
	},
];

const workspaceActions: Array<ManifestWorkspaceAction> = [
	{
		type: 'workspaceAction',
		alias: 'Umb.WorkspaceAction.RelationType.Save',
		name: 'Save Relation Type Workspace Action',
		loader: () => import('src/backoffice/shared/components/workspace/actions/save/workspace-action-node-save.element'),
		meta: {
			workspaces: ['Umb.Workspace.RelationType'],
			look: 'primary',
			color: 'positive',
		},
	},
];

export const manifests = [workspace, ...workspaceViews, ...workspaceActions];
