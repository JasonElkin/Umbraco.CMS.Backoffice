import { html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UmbLitElement } from '@umbraco-cms/element';

@customElement('umb-relation-types-sidebar-menu-item')
export class UmbRelationTypesSidebarMenuItemElement extends UmbLitElement {
	@state()
	private _renderTree = false;

	private _onShowChildren() {
		this._renderTree = true;
	}

	private _onHideChildren() {
		this._renderTree = false;
	}

	render() {
		return html`<umb-tree-item
			label="Relation Types"
			icon="umb:folder"
			entity-type="data-type"
			@show-children=${this._onShowChildren}
			@hide-children=${this._onHideChildren}
			has-children>
			${this._renderTree ? html`<umb-tree alias="Umb.Tree.RelationTypes"></umb-tree>` : nothing}
		</umb-tree-item> `;
	}
}

export default UmbRelationTypesSidebarMenuItemElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-relation-types-sidebar-menu-item': UmbRelationTypesSidebarMenuItemElement;
	}
}
