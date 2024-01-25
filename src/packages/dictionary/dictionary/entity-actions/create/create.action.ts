import type { UmbDictionaryRepository } from '../../repository/dictionary.repository.js';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import type { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller-api';

export default class UmbCreateDictionaryEntityAction extends UmbEntityActionBase<UmbDictionaryRepository> {
	static styles = [UmbTextStyles];

	constructor(host: UmbControllerHostElement, repositoryAlias: string, unique: string) {
		super(host, repositoryAlias, unique);
	}

	async execute() {
		history.pushState({}, '', `/section/dictionary/workspace/dictionary-item/create/${this.unique ?? 'null'}`);
	}
}
