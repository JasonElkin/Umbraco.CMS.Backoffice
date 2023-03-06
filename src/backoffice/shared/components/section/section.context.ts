import type { Entity, ManifestSection, ManifestSectionView } from '@umbraco-cms/models';
import { ObjectState, StringState } from '@umbraco-cms/observable-api';
import { UmbContextToken } from '@umbraco-cms/context-api';
import { TreeItemModel } from '@umbraco-cms/backend-api';

export type ActiveTreeItemType = Entity | undefined;

export class UmbSectionContext {
	#manifestAlias = new StringState<string | undefined>(undefined);
	#manifestPathname = new StringState<string | undefined>(undefined);
	#manifestLabel = new StringState<string | undefined>(undefined);
	public readonly alias = this.#manifestAlias.asObservable();
	public readonly pathname = this.#manifestPathname.asObservable();
	public readonly label = this.#manifestLabel.asObservable();

	/*
	This was not used anywhere
	private _activeTree = new BehaviorSubject<ManifestTree | undefined>(undefined);
	public readonly activeTree = this._activeTree.asObservable();
	*/

	// TODO: what is the best context to put this in?
	#activeTreeItem = new ObjectState<TreeItemModel | undefined>(undefined);
	public readonly activeTreeItem = this.#activeTreeItem.asObservable();

	// TODO: what is the best context to put this in?
	#activeViewPathname = new StringState(undefined);
	public readonly activeViewPathname = this.#activeViewPathname.asObservable();

	constructor(manifest: ManifestSection) {
		this.setManifest(manifest);
	}

	public setManifest(manifest?: ManifestSection) {
		this.#manifestAlias.next(manifest?.alias);
		this.#manifestPathname.next(manifest?.meta?.pathname);
		this.#manifestLabel.next(manifest ? manifest.meta?.label || manifest.name : undefined);
	}

	public setActiveTreeItem(item?: TreeItemModel) {
		this.#activeTreeItem.next(item);
	}

	public setActiveView(view?: ManifestSectionView) {
		this.#activeViewPathname.next(view?.meta.pathname);
	}
}

export const UMB_SECTION_CONTEXT_TOKEN = new UmbContextToken<UmbSectionContext>('UmbSectionContext');
