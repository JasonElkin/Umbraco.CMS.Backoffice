import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UUIBooleanInputEvent } from '@umbraco-ui/uui';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { UmbLitElement } from '@umbraco-cms/element';
import type { RelationTypeDetails } from '@umbraco-cms/models';

import '../../../../../shared/property-editors/shared/property-editor-config/property-editor-config.element';
import '../../../../../shared/components/ref-property-editor-ui/ref-property-editor-ui.element';

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
	private _relationType?: RelationTypeDetails = {
		key: '',
		parent: '',
		child: '',
		direction: 'parent-to-child',
		isDependency: true,
		data: [],
	};

	constructor() {
		super();
		//TODO: Get the relation type from the database
		//TODO: Is a workspace context necessary here? This view is readonly and should not be able to change the relation type.

		//TODO Code below fixes an issue with radio-group, where the initial value is not passed to the children.
		requestAnimationFrame(() => {
			const radioGroup = this.shadowRoot?.querySelector('uui-radio-group');
			radioGroup?.setAttribute('value', '');
			radioGroup?.setAttribute('value', 'parent-to-child');
		});
	}

	get #parent() {
		//TODO: Return the parent from the parent key
		return 'Document';
	}

	get #child() {
		//TODO: Return the child from the parent key
		return 'Document';
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
						value=${ifDefined(this._relationType?.direction)}
						@change=${this.#handleDirectionChange}
						slot="editor">
						<uui-radio label="Parent to child" value="parent-to-child"></uui-radio>
						<uui-radio label="Bidirectional" value="bidirectional"></uui-radio>
					</uui-radio-group>
				</umb-workspace-property-layout>
				<umb-workspace-property-layout label="Parent">
					<div slot="editor">${this.#parent}</div>
				</umb-workspace-property-layout>
				<umb-workspace-property-layout label="Child">
					<div slot="editor">${this.#child}</div>
				</umb-workspace-property-layout>
				<umb-workspace-property-layout label="Is dependency">
					<uui-toggle
						slot="editor"
						@change=${this.#handleIsDependencyChange}
						value=${ifDefined(this._relationType?.isDependency)}></uui-toggle>
				</umb-workspace-property-layout>
			</uui-box>
		`;
	}
}

export default UmbRelationTypeWorkspaceViewEditElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-relation-type-workspace-view-edit': UmbRelationTypeWorkspaceViewEditElement;
	}
}
