import { UUITextStyles } from '@umbraco-ui/uui-css';
import { UmbMediaTypeRepository } from '../repository/media-type.repository.js';
import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller-api';

export default class UmbReloadMediaTypeEntityAction extends UmbEntityActionBase<UmbMediaTypeRepository> {
	static styles = [UUITextStyles];

	constructor(host: UmbControllerHostElement, repositoryAlias: string, unique: string) {
		super(host, repositoryAlias, unique);
	}

	async execute() {
		alert('refresh');
	}
}
