import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UUIBooleanInputEvent } from '@umbraco-ui/uui';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { UmbLitElement } from '@umbraco-cms/element';

import '../../../../../shared/property-editors/shared/property-editor-config/property-editor-config.element';
import '../../../../../shared/components/ref-property-editor-ui/ref-property-editor-ui.element';
import { RelationType } from '@umbraco-cms/backend-api';
import { UmbRelationTypeWorkspaceContext } from '../../relation-type-workspace.context';
import { UmbModalService, UMB_MODAL_SERVICE_CONTEXT_TOKEN } from '@umbraco-cms/modal';

@customElement('umb-relation-type-workspace-view-edit')
export class UmbRelationTypeWorkspaceViewEditElement extends UmbLitElement {
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
	private _relationType?: RelationType;

	#workspaceContext?: UmbRelationTypeWorkspaceContext;
	#modalService?: UmbModalService;

	constructor() {
		super();

		this.consumeContext(UMB_MODAL_SERVICE_CONTEXT_TOKEN, (instance) => {
			this.#modalService = instance;
		});

		this.consumeContext<UmbRelationTypeWorkspaceContext>('umbWorkspaceContext', (instance) => {
			this.#workspaceContext = instance;
			this._observeRelationType();
		});
	}

	private _observeRelationType() {
		if (!this.#workspaceContext) {
			return;
		}

		this.observe(this.#workspaceContext.data, (relationType) => {
			if (!relationType) return;
			this._relationType = relationType as RelationType;
		});
	}

	#handleDirectionChange(e: UUIBooleanInputEvent) {
		//TODO handle direction change
	}

	#handleIsDependencyChange(e: UUIBooleanInputEvent) {
		//TODO handle isDependency change
	}

	render() {
		return html`
			<uui-box>
				<umb-workspace-property-layout label="Direction">
					<uui-radio-group
						value=${ifDefined(this._relationType?.relationIsBidirectional)}
						@change=${this.#handleDirectionChange}
						slot="editor">
						<uui-radio label="Parent to child" value="false"></uui-radio>
						<uui-radio label="Bidirectional" value="true"></uui-radio>
					</uui-radio-group>
				</umb-workspace-property-layout>
				<umb-workspace-property-layout label="Parent">${this.#renderParentProperty()}</umb-workspace-property-layout>
				<umb-workspace-property-layout label="Child"> ${this.#renderChildProperty()} </umb-workspace-property-layout>
				<umb-workspace-property-layout label="Is dependency">
					<uui-toggle
						slot="editor"
						@change=${this.#handleIsDependencyChange}
						.checked=${this._relationType?.relationIsDependency ?? false}></uui-toggle>
				</umb-workspace-property-layout>
			</uui-box>
		`;
	}

	#renderParentProperty() {
		if (this._relationType) return html`<div slot="editor">${this._relationType.relationParentName}</div>`;

		return html`<uui-select slot="editor"></uui-select>`;
	}

	#renderChildProperty() {
		if (this._relationType) return html`<div slot="editor">${this._relationType.relationParentName}</div>`;

		return html`<uui-select slot="editor"></uui-select>`;
	}
}

export default UmbRelationTypeWorkspaceViewEditElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-relation-type-workspace-view-edit': UmbRelationTypeWorkspaceViewEditElement;
	}
}
