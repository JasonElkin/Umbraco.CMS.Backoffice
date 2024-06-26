import { UMB_STYLESHEET_TREE_ALIAS } from '../tree/manifests.js';
import type { ManifestTypes } from '@umbraco-cms/backoffice/extension-registry';

const menuItem: ManifestTypes = {
	type: 'menuItem',
	kind: 'tree',
	alias: 'Umb.MenuItem.Stylesheets',
	name: 'Stylesheets Menu Item',
	weight: 20,
	meta: {
		label: 'Stylesheets',
		treeAlias: UMB_STYLESHEET_TREE_ALIAS,
		menus: ['Umb.Menu.Templating'],
	},
};

export const manifests = [menuItem];
