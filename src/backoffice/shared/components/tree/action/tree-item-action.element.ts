import { customElement, property, state } from 'lit/decorators.js';
import { UmbTreeItem } from '..';
import { UmbSectionContext, UMB_SECTION_CONTEXT_TOKEN } from '../../section/section.context';
import {
	UmbTreeContextMenuService,
	UMB_TREE_CONTEXT_MENU_SERVICE_CONTEXT_TOKEN,
} from '../context-menu/tree-context-menu.service';
import { UmbTreeContextMenuPageService } from '../context-menu/tree-context-menu-page.service';
import type { ManifestTreeItemAction, ManifestTree } from '@umbraco-cms/models';
import { UmbLitElement } from '@umbraco-cms/element';

export type ActionPage = {
	unique: string;
	name: string;
};

@customElement('umb-tree-item-action')
export default class UmbTreeItemActionElement extends UmbLitElement {
	@property({ attribute: false })
	public treeAction?: ManifestTreeItemAction;

	@state()
	protected _actionPage: ActionPage = { unique: '', name: '' };

	protected _activeTree?: ManifestTree;
	protected _activeTreeItem?: UmbTreeItem;

	protected _sectionContext?: UmbSectionContext;
	protected _treeContextMenuService?: UmbTreeContextMenuService;
	protected _actionPageService?: UmbTreeContextMenuPageService;

	connectedCallback() {
		super.connectedCallback();

		this.consumeContext(UMB_SECTION_CONTEXT_TOKEN, (sectionContext) => {
			this._sectionContext = sectionContext;
			this._observeActiveTree();
			this._observeActiveTreeItem();
		});

		this.consumeContext(UMB_TREE_CONTEXT_MENU_SERVICE_CONTEXT_TOKEN, (treeContextMenuService) => {
			this._treeContextMenuService = treeContextMenuService;
		});

		this.consumeContext(UMB_TREE_CONTEXT_MENU_PAGE_SERVICE_CONTEXT_TOKEN, (actionPageService) => {
			this._actionPageService = actionPageService;
			this._observeEntity();
		});
	}

	private _observeEntity() {
		if (!this._actionPageService) return;

		this.observe(this._actionPageService.entity, (entity) => {
			this._actionPage = entity;
		});
	}

	private _observeActiveTree() {
		if (!this._sectionContext) return;

		this.observe(this._sectionContext.activeTree, (tree) => {
			this._activeTree = tree;
		});
	}

	private _observeActiveTreeItem() {
		if (!this._sectionContext) return;

		this.observe(this._sectionContext.activeTreeItem, (treeItem) => {
			this._activeTreeItem = treeItem;
		});
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-tree-item-action': UmbTreeItemActionElement;
	}
}
