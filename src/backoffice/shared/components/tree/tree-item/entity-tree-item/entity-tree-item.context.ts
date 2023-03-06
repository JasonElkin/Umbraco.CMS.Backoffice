import { UmbTreeItemContextBase } from '../tree-item-base/tree-item-base.context';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';
import { EntityTreeItemModel } from '@umbraco-cms/backend-api';

export class UmbEntityTreeItemContext extends UmbTreeItemContextBase<EntityTreeItemModel> {
	constructor(host: UmbControllerHostInterface, treeItem: EntityTreeItemModel) {
		super(host, treeItem, (x: EntityTreeItemModel) => x.key);
	}
}
