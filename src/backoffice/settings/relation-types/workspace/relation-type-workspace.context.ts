import { UmbRelationTypeDetailRepository } from './data/relation-type.detail.repository';
import { createObservablePart, DeepState } from '@umbraco-cms/observable-api';
import { RelationType } from '@umbraco-cms/backend-api';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';

export class UmbRelationTypeWorkspaceContext {
	#host: UmbControllerHostInterface;
	#relationTypeDetailRepo: UmbRelationTypeDetailRepository;

	#data = new DeepState<RelationType | undefined>(undefined);
	data = this.#data.asObservable();
	name = createObservablePart(this.#data, (data) => data?.name);
	content = createObservablePart(this.#data, (data) => data?.content);

	constructor(host: UmbControllerHostInterface) {
		this.#host = host;
		this.#relationTypeDetailRepo = new UmbRelationTypeDetailRepository(this.#host);
	}

	update<K extends keyof RelationType>(key: K, value: RelationType[K]) {
		this.#data.next({ ...this.#data.value, [key]: value });
	}

	async load(entityKey: string) {
		const { data } = await this.#relationTypeDetailRepo.get(entityKey);
		console.log('LOAD', entityKey, data);
		if (data) {
			this.#data.next(data);
		}
	}

	async save(isNew: boolean) {
		if (!this.#data.value) return;

		this.#data.value.key
			? this.#relationTypeDetailRepo.update(this.#data.value)
			: this.#relationTypeDetailRepo.insert(this.#data.value);
	}

	async delete(key: string) {
		await this.#relationTypeDetailRepo.delete(key);
	}
}
