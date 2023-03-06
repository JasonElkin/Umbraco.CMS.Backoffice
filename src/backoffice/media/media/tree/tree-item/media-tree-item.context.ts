import { UmbTreeItemContextBase } from '../../../../shared/components/tree/tree-item/tree-item-base/tree-item-base.context';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';
import { DocumentTreeItemModel, EntityTreeItemModel } from '@umbraco-cms/backend-api';

export class UmbDocumentTreeItemContext extends UmbTreeItemContextBase<EntityTreeItemModel> {
	constructor(host: UmbControllerHostInterface, treeItem: DocumentTreeItemModel) {
		super(host, treeItem, (x: DocumentTreeItemModel) => x.key);
	}
}
