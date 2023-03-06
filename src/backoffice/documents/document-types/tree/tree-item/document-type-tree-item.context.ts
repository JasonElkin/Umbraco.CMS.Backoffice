import { UmbTreeItemContextBase } from '../../../../shared/components/tree/tree-item/tree-item-base/tree-item-base.context';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';
import { DocumentTypeTreeItemModel } from '@umbraco-cms/backend-api';

export class UmbDocumentTypeTreeItemContext extends UmbTreeItemContextBase<DocumentTypeTreeItemModel> {
	constructor(host: UmbControllerHostInterface, treeItem: DocumentTypeTreeItemModel) {
		super(host, treeItem, (x: DocumentTypeTreeItemModel) => x.key);
	}
}
