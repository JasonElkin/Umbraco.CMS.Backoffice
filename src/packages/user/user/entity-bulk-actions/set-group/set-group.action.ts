import type { UmbUserRepository } from '../../repository/user.repository.js';
import { UmbEntityBulkActionBase } from '@umbraco-cms/backoffice/entity-bulk-action';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbContextConsumerController } from '@umbraco-cms/backoffice/context-api';
import type { UmbModalManagerContext } from '@umbraco-cms/backoffice/modal';
import { UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal';

export class UmbSetGroupUserEntityBulkAction extends UmbEntityBulkActionBase<UmbUserRepository> {
	#modalContext?: UmbModalManagerContext;

	constructor(host: UmbControllerHost, repositoryAlias: string, selection: Array<string>) {
		super(host, repositoryAlias, selection);

		new UmbContextConsumerController(host, UMB_MODAL_MANAGER_CONTEXT, (instance) => {
			this.#modalContext = instance;

			//TODO: add user group picker modal
		});
	}

	async execute() {
		//TODO: Implement
		alert('Bulk set group is not implemented yet');
	}
}
