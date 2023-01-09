import { css, html } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, state } from 'lit/decorators.js';
import { distinctUntilChanged } from 'rxjs';
import type { UmbWorkspaceContentContext } from '../../workspace-content.context';
import type { ContentProperty, ContentPropertyData, DocumentDetails, MediaDetails } from '@umbraco-cms/models';

import '../../../../content-property/content-property.element';
import { UmbLitElement } from '@umbraco-cms/element';

@customElement('umb-workspace-view-content-edit')
export class UmbWorkspaceViewContentEditElement extends UmbLitElement {
	static styles = [
		UUITextStyles,
		css`
			:host {
				display: block;
				margin: var(--uui-size-layout-1);
			}
		`,
	];

	@state()
	_properties: ContentProperty[] = [];

	@state()
	_data: ContentPropertyData[] = [];

	private _workspaceContext?: UmbWorkspaceContentContext<DocumentDetails | MediaDetails>;

	constructor() {
		super();

		this.consumeContext('umbWorkspaceContext', (workspaceContext) => {
			this._workspaceContext = workspaceContext;
			this._observeContent();
		});
	}

	private _observeContent() {
		if (!this._workspaceContext) return;

		this.observe(
			this._workspaceContext.data.pipe(distinctUntilChanged()),
			(content) => {
				this._properties = content.properties;
				this._data = content.data;
			}
		);
	}

	render() {
		return html`
			<uui-box>
				${this._properties?.map(
					(property: ContentProperty) => html`
						<umb-content-property
							.property=${property}
							.value=${this._data.find((data) => data.alias === property.alias)?.value}></umb-content-property>
					`
				)}
			</uui-box>
		`;
	}
}

export default UmbWorkspaceViewContentEditElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-workspace-view-content-edit': UmbWorkspaceViewContentEditElement;
	}
}