import { DATA_TYPE_ENTITY_TYPE } from '..';
import type { ManifestMenuItem } from '@umbraco-cms/models';

const menuItem: ManifestMenuItem = {
	type: 'menuItem',
	alias: 'Umb.MenuItem.DataTypes',
	name: 'Data Types Menu Item',
	weight: 40,
	loader: () => import('./data-types-menu-item.element'),
	meta: {
		label: 'Data Types',
		icon: 'umb:folder',
		entityType: DATA_TYPE_ENTITY_TYPE,
		menus: ['Umb.Menu.Settings'],
	},
};

export const manifests = [menuItem];
