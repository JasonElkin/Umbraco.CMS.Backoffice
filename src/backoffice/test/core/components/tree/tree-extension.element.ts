import { CSSResultGroup, html, LitElement } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property, state } from 'lit/decorators.js';
import { createExtensionElement } from '@umbraco-cms/extensions-api';
import type { ManifestTree } from '@umbraco-cms/models';

import './tree-navigator.element';
import './context-menu/tree-context-menu-page-action-list.element';
import './context-menu/tree-context-menu-page.service';
import './context-menu/tree-context-menu.service';
import './tree-item-action-extension.element';

@customElement('umb-tree-extension')
export class UmbTreeExtension extends LitElement {
	static styles: CSSResultGroup = [UUITextStyles];

	private _tree?: ManifestTree;

	@property({ type: Object })
	public get tree(): ManifestTree | undefined {
		return this._tree;
	}
	public set tree(value: ManifestTree | undefined) {
		this._tree = value;
		this._createElement();
	}

	@state()
	private _element?: any;

	private async _createElement() {
		if (!this.tree) return;

		// If the manifest doesn't specify a custom element, we will render a default tree element
		if (!this.tree.elementName && !this.tree.js && !this.tree.loader) {
			this._element = document.createElement('umb-tree-navigator');
			return;
		}

		try {
			this._element = (await createExtensionElement(this.tree)) as any | undefined;
			if (!this._element) return;
			this._element.tree = this._tree;
		} catch (error) {
			// TODO: loading JS failed so we should do some nice UI. (This does only happen if extension has a js prop, otherwise we concluded that no source was needed resolved the load.)
		}
	}

	render() {
		return html`${this._element}`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-tree-extension': UmbTreeExtension;
	}
}
