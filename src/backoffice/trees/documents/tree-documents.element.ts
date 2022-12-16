import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { UmbTreeBase } from '../shared/tree-base.element';
import type { ManifestTreeItemAction } from '@umbraco-cms/models';
import { umbExtensionsRegistry } from '@umbraco-cms/extensions-registry';

import '../shared/tree-navigator.element';
@customElement('umb-tree-documents')
export class UmbTreeDocumentsElement extends UmbTreeBase {
	constructor() {
		super();

		this._registerTreeItemActions();
	}

	private _registerTreeItemActions() {
		const dashboards: Array<ManifestTreeItemAction> = [
			{
				type: 'treeItemAction',
				alias: 'Umb.TreeItemAction.Document.Create',
				name: 'Document Tree Item Action Create',
				loader: () => import('./actions/action-document-create.element'),
				weight: 100,
				meta: {
					trees: ['Umb.Tree.Documents'],
					label: 'Create',
					icon: 'add',
				},
			},
			{
				type: 'treeItemAction',
				alias: 'Umb.TreeItemAction.Document.Delete',
				name: 'Document Tree Item Action Delete',
				loader: () => import('./actions/action-document-delete.element'),
				weight: 100,
				meta: {
					trees: ['Umb.Tree.Documents'],
					label: 'Delete',
					icon: 'delete',
				},
			},
			{
				type: 'treeItemAction',
				alias: 'Umb.TreeItemAction.Document.Paged',
				name: 'Document Tree Item Action Paged',
				loader: () => import('./actions/action-document-paged.element'),
				weight: 100,
				meta: {
					trees: ['Umb.Tree.Documents'],
					label: 'Paged',
					icon: 'favorite',
				},
			},
		];

		dashboards.forEach((dashboard) => {
			if (umbExtensionsRegistry.isRegistered(dashboard.alias)) return;
			umbExtensionsRegistry.register(dashboard);
		});
	}

	render() {
		return html`<umb-tree-navigator store-context-key="umbDocumentStore"></umb-tree-navigator>`;
	}
}

export default UmbTreeDocumentsElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-tree-documents': UmbTreeDocumentsElement;
	}
}
