import { BehaviorSubject } from 'rxjs';
import type { ManifestSection, ManifestSectionView, ManifestTree, UmbTreeItem } from '@umbraco-cms/models';
import { UniqueBehaviorSubject } from '@umbraco-cms/observable-api';

export class UmbSectionContext {
	#manifest;
	public readonly manifest;

	// TODO: what is the best context to put this in?
	private _activeTree = new BehaviorSubject<ManifestTree | undefined>(undefined);
	public readonly activeTree = this._activeTree.asObservable();

	// TODO: what is the best context to put this in?
	private _activeTreeItem = new UniqueBehaviorSubject<UmbTreeItem | undefined>(undefined);
	public readonly activeTreeItem = this._activeTreeItem.asObservable();

	// TODO: what is the best context to put this in?
	private _activeView = new BehaviorSubject<ManifestSectionView | undefined>(undefined);
	public readonly activeView = this._activeView.asObservable();

	constructor(sectionManifest: ManifestSection) {
		this.#manifest = new UniqueBehaviorSubject<ManifestSection>(sectionManifest);
		this.manifest = this.#manifest.asObservable();
	}

	public setManifest(data: ManifestSection) {
		this.#manifest.next({ ...data });
	}

	public getData() {
		return this.#manifest.getValue();
	}

	public setActiveTree(tree: ManifestTree) {
		this._activeTree.next(tree);
	}

	public setActiveTreeItem(item: UmbTreeItem) {
		this._activeTreeItem.next(item);
	}

	public setActiveView(view: ManifestSectionView) {
		this._activeView.next(view);
	}
}
