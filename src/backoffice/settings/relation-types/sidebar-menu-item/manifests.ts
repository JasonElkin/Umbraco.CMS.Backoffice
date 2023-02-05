import type { ManifestSidebarMenuItem } from '@umbraco-cms/models';

const sidebarMenuItem: ManifestSidebarMenuItem = {
	type: 'sidebarMenuItem',
	alias: 'Umb.SidebarMenuItem.RelationTypes',
	name: 'Relation Types Sidebar Menu Item',
	weight: 40,
	loader: () => import('./relation-types-sidebar-menu-item.element'),
	meta: {
		label: 'Relation Types',
		icon: 'umb:folder',
		sections: ['Umb.Section.Settings'],
		entityType: 'relation-type',
	},
};

export const manifests = [sidebarMenuItem];
