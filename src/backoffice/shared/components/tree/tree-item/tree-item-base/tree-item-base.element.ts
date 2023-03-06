import { css, html, nothing } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';
import { UmbTreeItemContextBase } from './tree-item-base.context';
import { UmbLitElement } from '@umbraco-cms/element';
import { TreeItemModel } from '@umbraco-cms/backend-api';

@customElement('umb-tree-item-base')
export class UmbTreeItemBase extends UmbLitElement {
	static styles = [UUITextStyles, css``];

	private _item?: TreeItemModel;
	@property({ type: Object, attribute: false })
	get item() {
		return this._item;
	}
	set item(newVal) {
		const oldVal = this._item;
		this._item = newVal;
		this.requestUpdate('item', oldVal);
		this.#init();
	}

	private _context?: UmbTreeItemContextBase;
	@property({ type: Object, attribute: false })
	get context() {
		return this._context;
	}
	set context(newVal) {
		const oldVal = this._context;
		this._context = newVal;
		this.requestUpdate('context', oldVal);
		this.#init();
	}

	@state()
	private _childItems?: any[];

	@state()
	private _href?: string;

	@state()
	private _isLoading = false;

	@state()
	private _isSelectable = false;

	@state()
	private _isSelected = false;

	@state()
	private _isActive = false;

	@state()
	private _hasActions = false;

	#init() {
		if (!this.item || !this.context) return;

		// TODO: investigate if we can make an observe decorator
		this.observe(this.context!.isLoading, (value) => (this._isLoading = value));
		this.observe(this.context!.isSelectable, (value) => (this._isSelectable = value));
		this.observe(this.context!.isSelected, (value) => (this._isSelected = value));
		this.observe(this.context!.isActive, (value) => (this._isActive = value));
		this.observe(this.context!.hasActions, (value) => (this._hasActions = value));
		this.observe(this.context!.path, (value) => (this._href = value));
	}

	connectedCallback(): void {
		super.connectedCallback();

		this.addEventListener('selected', this._handleSelectedItem);
		this.addEventListener('unselected', this._handleDeselectedItem);
	}

	private _handleSelectedItem(event: Event) {
		event.stopPropagation();
		this.context?.select();
	}

	private _handleDeselectedItem(event: Event) {
		event.stopPropagation();
		this.context?.deselect();
	}

	// TODO: do we want to catch and emit a backoffice event here?
	private _onShowChildren() {
		this._observeChildren();
	}

	private async _observeChildren() {
		if (!this.context?.requestChildren) return;

		const { asObservable } = await this.context.requestChildren();
		if (!asObservable) return;

		this.observe(asObservable(), (childItems) => {
			this._childItems = childItems;
		});
	}

	private _openActions() {
		this.context?.toggleContextMenu();
	}

	render() {
		return html`
			<uui-menu-item
				@show-children=${this._onShowChildren}
				?selectable=${this._isSelectable}
				?selected=${this._isSelected}
				.loading=${this._isLoading}
				?has-children=${this.item?.hasChildren}
				.label="${this.item?.name}"
				href="${ifDefined(this._href)}"
				?active=${this._isActive}>
				${this.#renderIcon()} ${this.#renderLabel()} ${this.#renderContextMenuButton()}${this.#renderChildItems()}
				<slot></slot>
			</uui-menu-item>
		`;
	}

	#renderLabel() {
		return html` <slot name="label" slot="label"></slot>`;
	}

	#renderIcon() {
		return html` <uui-icon slot="icon" name="${ifDefined(this.item?.icon)}"></uui-icon> `;
	}

	#renderChildItems() {
		return html`
			${this._childItems
				? repeat(
						this._childItems,
						(item) => item.name,
						(item) => html`<umb-tree-item .item=${item}></umb-tree-item>`
				  )
				: ''}
		`;
	}

	#renderContextMenuButton() {
		return html`
			${this._hasActions
				? html`
						<uui-action-bar slot="actions">
							<uui-button @click=${this._openActions} label="Open actions menu">
								<uui-symbol-more></uui-symbol-more>
							</uui-button>
						</uui-action-bar>
				  `
				: nothing}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-tree-item-base': UmbTreeItemBase;
	}
}
