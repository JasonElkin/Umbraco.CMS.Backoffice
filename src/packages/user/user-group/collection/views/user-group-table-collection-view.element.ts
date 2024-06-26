import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { css, html, customElement, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import type { UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { UMB_DEFAULT_COLLECTION_CONTEXT } from '@umbraco-cms/backoffice/collection';

import '../components/user-group-table-name-column-layout.element.js';
import '../components/user-group-table-sections-column-layout.element.js';

import type {
	UmbTableColumn,
	UmbTableConfig,
	UmbTableDeselectedEvent,
	UmbTableElement,
	UmbTableItem,
	UmbTableSelectedEvent,
} from '@umbraco-cms/backoffice/components';
import type { UmbUserGroupDetailModel } from '../../types.js';

@customElement('umb-user-group-collection-table-view')
export class UmbUserGroupCollectionTableViewElement extends UmbLitElement {
	@state()
	private _tableConfig: UmbTableConfig = {
		allowSelection: true,
	};

	@state()
	private _tableColumns: Array<UmbTableColumn> = [
		{
			name: this.localize.term('general_name'),
			alias: 'userGroupName',
			elementName: 'umb-user-group-table-name-column-layout',
		},
		{
			name: this.localize.term('main_sections'),
			alias: 'userGroupSections',
			elementName: 'umb-user-group-table-sections-column-layout',
		},
		{
			name: this.localize.term('user_startnode'),
			alias: 'userGroupContentStartNode',
		},
		{
			name: this.localize.term('user_mediastartnode'),
			alias: 'userGroupMediaStartNode',
		},
	];

	@state()
	private _tableItems: Array<UmbTableItem> = [];

	@state()
	private _selection: Array<string | null> = [];

	#collectionContext?: UmbDefaultCollectionContext;

	constructor() {
		super();

		this.consumeContext(UMB_DEFAULT_COLLECTION_CONTEXT, (instance) => {
			this.#collectionContext = instance;
			this.observe(
				this.#collectionContext.selection.selection,
				(selection) => (this._selection = selection),
				'umbCollectionSelectionObserver',
			);
			this.observe(
				this.#collectionContext.items,
				(items) => {
					this._createTableItems(items);
				},
				'umbCollectionItemsObserver',
			);
		});
	}

	private _createTableItems(userGroups: Array<UmbUserGroupDetailModel>) {
		this._tableItems = userGroups.map((userGroup) => {
			return {
				id: userGroup.unique,
				icon: userGroup.icon,
				data: [
					{
						columnAlias: 'userGroupName',
						value: {
							name: userGroup.name,
						},
					},
					{
						columnAlias: 'userGroupSections',
						value: userGroup.sections,
					},
					{
						columnAlias: 'userGroupContentStartNode',
						value: userGroup.documentStartNode?.unique || this.localize.term('content_contentRoot'),
					},
					{
						columnAlias: 'userGroupMediaStartNode',
						value: userGroup.mediaStartNode?.unique || this.localize.term('media_mediaRoot'),
					},
				],
			};
		});
	}

	private _handleSelected(event: UmbTableSelectedEvent) {
		event.stopPropagation();
		const table = event.target as UmbTableElement;
		const selection = table.selection;
		this.#collectionContext?.selection.setSelection(selection);
	}

	private _handleDeselected(event: UmbTableDeselectedEvent) {
		event.stopPropagation();
		const table = event.target as UmbTableElement;
		const selection = table.selection;
		this.#collectionContext?.selection.setSelection(selection);
	}

	render() {
		return html`
			<umb-table
				.config=${this._tableConfig}
				.columns=${this._tableColumns}
				.items=${this._tableItems}
				.selection=${this._selection}
				@selected="${this._handleSelected}"
				@deselected="${this._handleDeselected}"></umb-table>
		`;
	}

	static styles = [
		UmbTextStyles,
		css`
			umb-table {
				padding: 0;
			}
		`,
	];
}

export default UmbUserGroupCollectionTableViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-user-group-collection-table-view': UmbUserGroupCollectionTableViewElement;
	}
}
