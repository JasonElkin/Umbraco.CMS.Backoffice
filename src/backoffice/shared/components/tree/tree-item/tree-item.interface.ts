import { Observable } from 'rxjs';
import { UmbTreeContextBase } from '../tree.context';
import { TreeItemModel } from '@umbraco-cms/backend-api';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';

export interface UmbTreeItemContext<T extends TreeItemModel = TreeItemModel> {
	host: UmbControllerHostInterface;
	treeContext: UmbTreeContextBase;
	item: T;

	children: Observable<Array<T>>;
	requestChildren(): void;

	isSelected: Observable<boolean>;
	isSelectable: Observable<boolean>;

	select(unique: string): void;
	deselect(unique: string): void;

	hasActions: Observable<boolean>;

	toggleContextMenu(item: T): void;
}
