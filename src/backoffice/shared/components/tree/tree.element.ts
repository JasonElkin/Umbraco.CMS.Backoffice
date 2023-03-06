import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'rxjs';
import { repeat } from 'lit-html/directives/repeat.js';
import { UmbTreeContextBase } from './tree.context';
import type { ManifestTree } from '@umbraco-cms/models';
import { umbExtensionsRegistry } from '@umbraco-cms/extensions-api';
import { UmbLitElement } from '@umbraco-cms/element';
import { TreeItemModel } from '@umbraco-cms/backend-api';

import './tree-item/tree-item-base/tree-item-base.element';
import './tree-item/entity-tree-item/entity-tree-item.element';
import './context-menu/tree-context-menu-page-action-list.element';
import './context-menu/tree-context-menu-page.service';
import './context-menu/tree-context-menu.service';
import './action/tree-item-action-extension.element';

import '../../../documents/documents/tree/item/document-tree-item.element';

@customElement('umb-tree')
export class UmbTreeElement extends UmbLitElement {
	private _alias = '';
	@property({ type: String, reflect: true })
	get alias() {
		return this._alias;
	}
	set alias(newVal) {
		const oldVal = this._alias;
		this._alias = newVal;
		this.requestUpdate('alias', oldVal);
		this.#observeTree();
	}

	private _selectable = false;
	@property({ type: Boolean, reflect: true })
	get selectable() {
		return this._selectable;
	}
	set selectable(newVal) {
		const oldVal = this._selectable;
		this._selectable = newVal;
		this.requestUpdate('selectable', oldVal);
		this.#treeContext?.setSelectable(newVal);
	}

	private _selection: Array<string> = [];
	@property({ type: Array })
	get selection() {
		return this._selection;
	}
	set selection(newVal: Array<string>) {
		const oldVal = this._selection;
		this._selection = newVal;
		this.requestUpdate('selection', oldVal);
		this.#treeContext?.setSelection(newVal);
	}

	@state()
	private _tree?: ManifestTree;

	@state()
	private _items: Array<TreeItemModel> = [];

	#treeContext?: UmbTreeContextBase;

	#observeTree() {
		if (!this.alias) return;

		this.observe(
			umbExtensionsRegistry
				.extensionsOfType('tree')
				.pipe(map((trees) => trees.find((tree) => tree.alias === this.alias))),
			async (tree) => {
				if (this._tree?.alias === tree?.alias) return;
				this._tree = tree;
				this.#provideTreeContext();
			}
		);
	}

	#provideTreeContext() {
		if (!this._tree || this.#treeContext) return;

		// TODO: if a new tree comes around, which is different, then we should clean up and re provide.
		this.#treeContext = new UmbTreeContextBase(this, this._tree);
		this.#treeContext.setSelectable(this.selectable);
		this.#treeContext.setSelection(this.selection);

		this.#observeSelection();
		this.#observeTreeRoot();

		this.provideContext('umbTreeContext', this.#treeContext);
	}

	async #observeTreeRoot() {
		if (!this.#treeContext?.requestRootItems) return;

		this.#treeContext.requestRootItems();

		this.observe(await this.#treeContext.rootItems(), (rootItems) => {
			this._items = rootItems as TreeItemModel[];
		});
	}

	#observeSelection() {
		if (!this.#treeContext) return;

		this.observe(this.#treeContext.selection, (selection) => {
			if (this._selection === selection) return;
			this._selection = selection;
			this.dispatchEvent(new CustomEvent('selected'));
		});
	}

	render() {
		return html`
			${repeat(
				this._items,
				(item) => item.name,
				(item) => html`<umb-entity-tree-item .item=${item}></umb-entity-tree-item>`
			)}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-tree': UmbTreeElement;
	}
}
