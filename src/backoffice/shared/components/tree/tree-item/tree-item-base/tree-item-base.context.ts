import { map } from 'rxjs';
import {
	UmbSectionSidebarContext,
	UMB_SECTION_SIDEBAR_CONTEXT_TOKEN,
} from '../../../section/section-sidebar/section-sidebar.context';
import { UmbSectionContext, UMB_SECTION_CONTEXT_TOKEN } from '../../../section/section.context';
import { UmbTreeContextBase } from '../../tree.context';
import { DeepState, ObjectState, StringState, UmbObserverController } from '@umbraco-cms/observable-api';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';
import { UmbContextConsumerController } from '@umbraco-cms/context-api';
import { TreeItemModel } from '@umbraco-cms/backend-api';
import { umbExtensionsRegistry } from '@umbraco-cms/extensions-api';
import { ManifestTreeItem } from '@umbraco-cms/extensions-registry';

export class UmbTreeItemContextBase<T extends TreeItemModel = TreeItemModel> {
	public host: UmbControllerHostInterface;
	public treeItem: T;
	public unique: string;
	public type: string;

	#isLoading = new DeepState<boolean>(false);
	isLoading = this.#isLoading.asObservable();

	#isSelectable = new DeepState<boolean>(false);
	isSelectable = this.#isSelectable.asObservable();

	#isSelected = new DeepState<boolean>(false);
	isSelected = this.#isSelected.asObservable();

	#isActive = new DeepState<boolean>(false);
	isActive = this.#isActive.asObservable();

	#hasActions = new DeepState<boolean>(false);
	hasActions = this.#hasActions.asObservable();

	#path = new StringState('');
	path = this.#path.asObservable();

	treeContext?: UmbTreeContextBase;
	#sectionContext?: UmbSectionContext;
	#sectionSidebarContext?: UmbSectionSidebarContext;

	constructor(host: UmbControllerHostInterface, treeItem: T, getUnique: (x: T) => string | null | undefined) {
		this.host = host;
		this.treeItem = treeItem;

		const unique = getUnique(this.treeItem);
		if (!unique) throw new Error('Could not create tree item context, unique key is missing');
		this.unique = unique;

		if (!this.treeItem.type) throw new Error('Could not create tree item context, tree item type is missing');

		this.type = this.treeItem.type;

		new UmbContextConsumerController(host, UMB_SECTION_CONTEXT_TOKEN, (instance) => {
			this.#sectionContext = instance;
			this.#observeSectionPath();
		});

		new UmbContextConsumerController(host, UMB_SECTION_SIDEBAR_CONTEXT_TOKEN, (instance) => {
			this.#sectionSidebarContext = instance;
		});

		new UmbContextConsumerController(host, 'umbTreeContext', (treeContext: UmbTreeContextBase) => {
			this.treeContext = treeContext;
			this.#observeIsSelectable();
			this.#observeIsSelected();
		});

		this.#observeTreeItemActions();
	}

	public async requestChildren() {
		// TODO: wait for tree context to be ready
		this.#isLoading.next(true);
		const response = await this.treeContext!.repository.requestTreeItemsOf(this.unique);
		this.#isLoading.next(false);
		return response;
	}

	public toggleContextMenu() {
		this.#sectionContext?.setActiveTreeItem(this.treeItem);
		this.#sectionSidebarContext?.toggleContextMenu(this.type, this.unique);
	}

	public select() {
		this.treeContext?.select(this.unique);
	}

	public deselect() {
		this.treeContext?.deselect(this.unique);
	}

	#observeIsSelectable() {
		if (!this.treeContext) return;
		new UmbObserverController(this.host, this.treeContext.selectable, (value) => this.#isSelectable.next(value));
	}

	#observeIsSelected() {
		if (!this.treeContext) return;

		new UmbObserverController(
			this.host,
			this.treeContext.selection.pipe(map((selection) => selection.includes(this.unique))),
			(isSelected) => {
				this.#isSelected.next(isSelected);
			}
		);
	}

	#observeSectionPath() {
		if (!this.#sectionContext) return;

		new UmbObserverController(this.host, this.#sectionContext.pathname, (pathname) => {
			if (!pathname) return;
			const path = this.#constructPath(pathname, this.type, this.unique);
			this.#path.next(path);
		});
	}

	#observeTreeItemActions() {
		// TODO: Stop previous observation, currently we can do this from the UmbElementMixin as its a new subscription when Actions or entityType has changed.
		// Solution: store the current observation controller and if it existing then destroy it.
		// TODO: as long as a tree consist of one entity type we don't have to observe this every time a new tree item is created.
		// Solution: move this to the tree context and observe it once.
		new UmbObserverController(
			this.host,
			umbExtensionsRegistry
				.extensionsOfType('entityAction')
				.pipe(map((actions) => actions.filter((action) => action.meta.entityType === this.treeItem.type))),
			(actions) => {
				this.#hasActions.next(actions.length > 0);
			}
		);
	}

	#constructPath(pathname: string, entityType: string, key: string) {
		return `section/${pathname}/${entityType}/edit/${key}`;
	}
}
