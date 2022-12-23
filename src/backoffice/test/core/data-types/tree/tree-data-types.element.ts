import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { UmbContextConsumerMixin, UmbContextProviderMixin } from '@umbraco-cms/context-api';
import { umbExtensionsRegistry } from '@umbraco-cms/extensions-registry';
import type { ManifestTreeItemAction } from '@umbraco-cms/models';

import '../../components/tree/tree-navigator.element';
import { UmbDataTypeStore } from '@umbraco-cms/stores/data-type/data-type.store';

@customElement('umb-tree-data-types')
export class UmbTreeDataTypesElement extends UmbContextProviderMixin(UmbContextConsumerMixin(LitElement)) {
	constructor() {
		super();

		this._registerTreeItemActions();

		// TODO: how do we best expose the tree api to the tree navigator element?
		this.consumeContext('umbDataTypeStore', (dataTypeStore: UmbDataTypeStore) => {
			this.provideContext('umbTreeStore', dataTypeStore);
		});
	}

	private _registerTreeItemActions() {
		const dashboards: Array<ManifestTreeItemAction> = [
			{
				type: 'treeItemAction',
				alias: 'Umb.TreeItemAction.DataType.Create',
				name: 'Tree Item Action Create',
				loader: () => import('./actions/create/action-data-type-create.element'),
				weight: 200,
				meta: {
					trees: ['Umb.Tree.DataTypes'],
					label: 'Create',
					icon: 'umb:add',
				},
			},
			{
				type: 'treeItemAction',
				alias: 'Umb.TreeItemAction.DataType.Delete',
				name: 'Tree Item Action Delete',
				loader: () => import('./actions/delete/action-data-type-delete.element'),
				weight: 100,
				meta: {
					trees: ['Umb.Tree.DataTypes'],
					label: 'Delete',
					icon: 'umb:delete',
				},
			},
		];

		dashboards.forEach((dashboard) => {
			if (umbExtensionsRegistry.isRegistered(dashboard.alias)) return;
			umbExtensionsRegistry.register(dashboard);
		});
	}

	render() {
		return html`<umb-tree-navigator></umb-tree-navigator>`;
	}
}

export default UmbTreeDataTypesElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-tree-data-types': UmbTreeDataTypesElement;
	}
}
