import {
	UmbRelationTypeTreeStore,
	UMB_RELATION_TYPE_TREE_STORE_CONTEXT_TOKEN,
} from '../../tree/data/relation-type.tree.store';
import { UmbRelationTypeDetailStore, UMB_RELATION_TYPE_DETAIL_STORE_CONTEXT_TOKEN } from './relation-type.detail.store';
import { UmbRelationTypeDetailServerDataSource } from './sources/relation-type.detail.server.data';
import { ProblemDetails, RelationType } from '@umbraco-cms/backend-api';
import { UmbContextConsumerController } from '@umbraco-cms/context-api';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';
import { UmbNotificationService, UMB_NOTIFICATION_SERVICE_CONTEXT_TOKEN } from '@umbraco-cms/notification';

// Move to documentation / JSdoc
/* We need to create a new instance of the repository from within the element context. We want the notifications to be displayed in the right context. */
// element -> context -> repository -> (store) -> data source
// All methods should be async and return a promise. Some methods might return an observable as part of the promise response.
export class UmbRelationTypeDetailRepository {
	#host: UmbControllerHostInterface;
	#dataSource: UmbRelationTypeDetailServerDataSource;
	#detailStore?: UmbRelationTypeDetailStore;
	#treeStore?: UmbRelationTypeTreeStore;
	#notificationService?: UmbNotificationService;
	#initResolver?: () => void;
	#initialized = false;

	constructor(host: UmbControllerHostInterface) {
		this.#host = host;

		// TODO: figure out how spin up get the correct data source
		this.#dataSource = new UmbRelationTypeDetailServerDataSource(this.#host);

		// TODO: should we allow promises so each method can request the context when it needs it instead of initializing it upfront?
		new UmbContextConsumerController(this.#host, UMB_RELATION_TYPE_DETAIL_STORE_CONTEXT_TOKEN, (instance) => {
			this.#detailStore = instance;
			this.#checkIfInitialized();
		});

		new UmbContextConsumerController(this.#host, UMB_RELATION_TYPE_TREE_STORE_CONTEXT_TOKEN, (instance) => {
			this.#treeStore = instance;
			this.#checkIfInitialized();
		});

		new UmbContextConsumerController(this.#host, UMB_NOTIFICATION_SERVICE_CONTEXT_TOKEN, (instance) => {
			this.#notificationService = instance;
			this.#checkIfInitialized();
		});
	}

	#init() {
		// TODO: This would only works with one user of this method. If two, the first one would be forgotten, but maybe its alright for now as I guess this is temporary.
		return new Promise<void>((resolve) => {
			this.#initialized ? resolve() : (this.#initResolver = resolve);
		});
	}

	#checkIfInitialized() {
		if (this.#detailStore && this.#detailStore && this.#notificationService) {
			this.#initialized = true;
			this.#initResolver?.();
		}
	}

	async get(key: string) {
		await this.#init();

		// TODO: should we show a notification if the key is missing?
		// Investigate what is best for Acceptance testing, cause in that perspective a thrown error might be the best choice?
		if (!key) {
			const error: ProblemDetails = { title: 'Key is missing' };
			return { error };
		}

		return this.#dataSource.get(key);
	}

	async insert(relationType: RelationType) {
		await this.#init();

		// TODO: should we show a notification if the relation type is missing?
		// Investigate what is best for Acceptance testing, cause in that perspective a thrown error might be the best choice?
		if (!relationType) {
			const error: ProblemDetails = { title: 'Relation Type is missing' };
			return { error };
		}

		const { error } = await this.#dataSource.insert(relationType);

		if (!error) {
			const notification = { data: { message: `Relation Type created` } };
			this.#notificationService?.peek('positive', notification);
		}

		// TODO: we currently don't use the detail store for anything.
		// Consider to look up the data before fetching from the server
		this.#detailStore?.append(relationType);
		// TODO: Update tree store with the new item?

		return { error };
	}

	async update(relationType: RelationType) {
		await this.#init();

		// TODO: should we show a notification if the relation type is missing?
		// Investigate what is best for Acceptance testing, cause in that perspective a thrown error might be the best choice?
		if (!relationType || !relationType.key) {
			const error: ProblemDetails = { title: 'Relation Type is missing' };
			return { error };
		}

		const { error } = await this.#dataSource.update(relationType);

		if (!error) {
			const notification = { data: { message: `Relation Type saved` } };
			this.#notificationService?.peek('positive', notification);
		}

		// TODO: we currently don't use the detail store for anything.
		// Consider to look up the data before fetching from the server
		// Consider notify a workspace if a relation type is updated in the store while someone is editing it.
		this.#detailStore?.append(relationType);
		this.#treeStore?.updateItem(relationType.key, { name: relationType.name });
		// TODO: would be nice to align the stores on methods/methodNames.

		return { error };
	}

	async delete(key: string) {
		await this.#init();

		// TODO: should we show a notification if the key is missing?
		if (!key) {
			const error: ProblemDetails = { title: 'Key is missing' };
			return { error };
		}

		const { error } = await this.#dataSource.delete(key);

		if (!error) {
			const notification = { data: { message: `Relation type deleted` } };
			this.#notificationService?.peek('positive', notification);
		}

		// TODO: we currently don't use the detail store for anything.
		// Consider to look up the data before fetching from the server.
		// Consider notify a workspace if a relation type is deleted from the store while someone is editing it.
		this.#detailStore?.remove([key]);
		this.#treeStore?.removeItem(key);
		// TODO: would be nice to align the stores on methods/methodNames.

		return { error };
	}
}
