import { map, Observable } from 'rxjs';
import { UmbTreeRepository } from '@umbraco-cms/repository';
import type { ManifestTree, ManifestTreeItem } from '@umbraco-cms/models';
import { DeepState, ObjectState, StringState, UmbObserverController } from '@umbraco-cms/observable-api';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';
import { umbExtensionsRegistry } from '@umbraco-cms/extensions-api';

export interface UmbTreeContext {
	tree: ManifestTree;
	treeItemManifest: Observable<ManifestTreeItem | undefined>;
	entityType: Observable<string | undefined>;
	readonly selectable: Observable<boolean>;
	readonly selection: Observable<Array<string>>;
	setSelectable(value: boolean): void;
	setSelection(value: Array<string>): void;
	select(key: string): void;
}

export class UmbTreeContextBase implements UmbTreeContext {
	host: UmbControllerHostInterface;
	public tree: ManifestTree;

	#entityType = new StringState<undefined>(undefined);
	public readonly entityType = this.#entityType.asObservable();

	#treeItemManifest = new ObjectState<ManifestTreeItem | undefined>(undefined);
	public readonly treeItemManifest = this.#treeItemManifest.asObservable();

	#selectable = new DeepState(false);
	public readonly selectable = this.#selectable.asObservable();

	#selection = new DeepState(<Array<string>>[]);
	public readonly selection = this.#selection.asObservable();

	repository!: UmbTreeRepository;

	constructor(host: UmbControllerHostInterface, tree: ManifestTree) {
		this.host = host;
		this.tree = tree;

		if (this.tree.meta.repository) {
			// TODO: should be using the right extension and the createExtensionClass method.
			this.repository = new this.tree.meta.repository(this.host) as any;
			this.#entityType.next(this.repository.getEntityType());
		}
	}

	public setSelectable(value: boolean) {
		this.#selectable.next(value);
	}

	public setSelection(value: Array<string>) {
		if (!value) return;
		this.#selection.next(value);
	}

	public select(key: string) {
		const oldSelection = this.#selection.getValue();
		if (oldSelection.indexOf(key) !== -1) return;

		const selection = [...oldSelection, key];
		this.#selection.next(selection);
	}

	public deselect(key: string) {
		const selection = this.#selection.getValue();
		this.#selection.next(selection.filter((x) => x !== key));
	}

	public async requestRootItems() {
		return this.repository.requestRootTreeItems();
	}

	public async rootItems() {
		return this.repository.rootTreeItems();
	}
}
