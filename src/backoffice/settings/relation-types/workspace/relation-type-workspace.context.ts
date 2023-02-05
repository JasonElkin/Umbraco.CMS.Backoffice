import { UmbWorkspaceContext } from '../../../shared/components/workspace/workspace-context/workspace-context';
import { UmbWorkspaceEntityContextInterface } from '../../../shared/components/workspace/workspace-context/workspace-entity-context.interface';
import { UmbEntityWorkspaceManager } from '../../../shared/components/workspace/workspace-context/entity-manager-controller';
import { UMB_RELATION_TYPE_DETAIL_STORE_CONTEXT_TOKEN } from '../relation-type.detail.store';
import type { RelationTypeDetails } from '@umbraco-cms/models';
import { appendToFrozenArray } from '@umbraco-cms/observable-api';

export class UmbWorkspaceRelationTypeContext
	extends UmbWorkspaceContext
	implements UmbWorkspaceEntityContextInterface<RelationTypeDetails | undefined>
{
	#manager = new UmbEntityWorkspaceManager(this._host, 'relation-type', UMB_RELATION_TYPE_DETAIL_STORE_CONTEXT_TOKEN);

	public readonly data = this.#manager.state.asObservable();
	public readonly name = this.#manager.state.getObservablePart((state) => state?.name);

	setName(name: string) {
		this.#manager.state.update({ name: name });
	}
	getEntityType = this.#manager.getEntityType;
	getUnique = this.#manager.getEntityKey;
	getEntityKey = this.#manager.getEntityKey;
	getStore = this.#manager.getStore;
	getData = this.#manager.getData;
	load = this.#manager.load;
	create = this.#manager.create;
	save = this.#manager.save;
	destroy = this.#manager.destroy;

	// This could eventually be moved out as well?
	setPropertyValue(alias: string, value: unknown) {
		const entry = { alias: alias, value: value };

		const currentData = this.#manager.getData();
		if (currentData) {
			const newDataSet = appendToFrozenArray(currentData.data, entry, (x) => x.alias);

			this.#manager.state.update({ data: newDataSet });
		}
	}
}
