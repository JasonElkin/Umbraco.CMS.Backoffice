import { css, html } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property, state } from 'lit/decorators.js';
import { UmbLitElement } from '@umbraco-cms/element';
import { TreeItemModel } from '@umbraco-cms/backend-api';
import { UmbObserverController } from '@umbraco-cms/observable-api';
import {
	createExtensionElement,
	createExtensionElementOrFallback,
	umbExtensionsRegistry,
} from '@umbraco-cms/extensions-api';
import { map } from 'rxjs';
import { ManifestTreeItem } from '@umbraco-cms/extensions-registry';
import { UmbTreeItemBase } from '../tree-item-base/tree-item-base.element';
import { UmbTreeContext } from '../../tree.context';

@customElement('umb-tree-item')
export class UmbTreeItem extends UmbLitElement {
	static styles = [UUITextStyles, css``];

	private _item?: TreeItemModel;
	@property({ type: Object, attribute: false })
	get item() {
		return this._item;
	}
	set item(newVal) {
		const oldVal = this._item;
		this._item = newVal;

		if (this._element) {
			(this._element as any).item = newVal;
		}

		this.#observeTreeItemExtension();

		this.requestUpdate('item', oldVal);
	}

	@state()
	private _element?: unknown;

	#observer?: UmbObserverController;

	#observeTreeItemExtension() {
		if (this.#observer) {
			this.#observer.destroy();
		}

		this.#observer = new UmbObserverController(
			this,
			umbExtensionsRegistry
				.extensionsOfType('treeItem')
				.pipe(
					map((treeItemManifests) => treeItemManifests.find((manifest) => manifest.meta.entityType === this.item?.type))
				),
			async (item) => {
				if (!item) return;
				this.#createElement(item);
			}
		);
	}

	async #createElement(item: ManifestTreeItem) {
		const element = (await createExtensionElementOrFallback(item, 'umb-entity-tree-item')) as UmbTreeItemBase;
		element.item = this.item;
		this._element = element;
	}

	render() {
		return html`${this._element}`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-tree-item': UmbTreeItem;
	}
}
