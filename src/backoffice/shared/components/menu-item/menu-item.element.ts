import { css, html, nothing } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import {
	UmbSectionSidebarContext,
	UMB_SECTION_SIDEBAR_CONTEXT_TOKEN,
} from '../section/section-sidebar/section-sidebar.context';
import { UmbLitElement } from '@umbraco-cms/element';
import type { ManifestMenuItem } from '@umbraco-cms/models';
import { umbExtensionsRegistry } from '@umbraco-cms/extensions-api';
import { map } from 'rxjs';
import { UmbObserverController } from '@umbraco-cms/observable-api';

@customElement('umb-menu-item')
export class UmbMenuItemElement extends UmbLitElement {
	static styles = [UUITextStyles, css``];

	@property({ type: Object, attribute: false })
	manifest?: ManifestMenuItem;

	@property()
	label? = '';

	@property()
	icon? = '';

	private _entityType? = '';
	@property({ type: String, attribute: 'entity-type' })
	get entityType() {
		return this._entityType;
	}
	set entityType(newVal) {
		const oldVal = this._entityType;
		this._entityType = newVal;
		this.requestUpdate('entityType', oldVal);
		this.#observeTreeItemActions();
	}

	@property()
	unique?: string | null = null;

	@property({ type: Boolean, attribute: 'has-children' })
	hasChildren = false;

	@state()
	_hasActions = false;

	#sectionSidebarContext?: UmbSectionSidebarContext;
	#actionsObserver?: UmbObserverController;

	constructor() {
		super();

		this.consumeContext(UMB_SECTION_SIDEBAR_CONTEXT_TOKEN, (instance) => {
			this.#sectionSidebarContext = instance;
		});
	}

	#toggleActionsMenu() {
		const entityType = this.entityType || this.manifest?.meta.entityType;
		if (entityType && this.unique !== undefined) {
			this.#sectionSidebarContext?.toggleActionsMenu(entityType, this.unique);
		}
	}

	#observeTreeItemActions() {
		if (this.#actionsObserver) {
			this.#actionsObserver.destroy();
		}

		this.#actionsObserver = this.observe(
			umbExtensionsRegistry
				.extensionsOfType('entityAction')
				.pipe(map((actions) => actions.filter((action) => action.meta.entityType === this.entityType))),
			(actions) => {
				this._hasActions = actions.length > 0;
			}
		);
	}

	render() {
		return html`<uui-menu-item
			.label=${this.label || this.manifest?.meta.label || this.manifest?.name}
			?has-children=${this.hasChildren}>
			${this.#renderIcon()}${this.#renderContextMenuButton()}
		</uui-menu-item>`;
	}

	#renderIcon() {
		return html`
			${this.icon || this.manifest?.meta.icon
				? html` <uui-icon slot="icon" name="${ifDefined(this.icon || this.manifest?.meta.icon)}"></uui-icon> `
				: nothing}
		`;
	}

	#renderContextMenuButton() {
		return html`
			${this._hasActions
				? html`
						<uui-action-bar slot="actions">
							<uui-button @click=${this.#toggleActionsMenu} label="Open actions menu">
								<uui-symbol-more></uui-symbol-more>
							</uui-button>
						</uui-action-bar>
				  `
				: nothing}
		`;
	}
}

export default UmbMenuItemElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-menu-item': UmbMenuItemElement;
	}
}
