import { UmbDataTypeRepository } from '../../repository/data-type.repository';
import { UmbEntityActionBase } from '@umbraco-cms/entity-action';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';
import { UmbContextConsumerController } from '@umbraco-cms/context-api';
import { UmbModalContext, UMB_MODAL_CONTEXT_TOKEN } from '@umbraco-cms/modal';

// TODO: this is probably be registered in the extension registry when that is possible
import './create-data-type-modal/create-data-type-modal.element';

export class UmbCreateDataTypeEntityAction extends UmbEntityActionBase<UmbDataTypeRepository> {
	#modalContext?: UmbModalContext;

	constructor(host: UmbControllerHostInterface, repositoryAlias: string, unique: string) {
		super(host, repositoryAlias, unique);

		new UmbContextConsumerController(this.host, UMB_MODAL_CONTEXT_TOKEN, (instance) => {
			this.#modalContext = instance;
		});
	}

	async execute() {
		if (!this.#modalContext) return;

		const modalHandler = this.#modalContext?.open('umb-create-data-type-modal', {
			type: 'sidebar',
			data: { unique: this.unique },
		});

		// TODO: get type from modal result
		await modalHandler.onClose();
	}
}
