import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UUIInputElement, UUITextareaElement } from '@umbraco-ui/uui';
import { UmbRelationTypeWorkspaceContext } from './relation-type-workspace.context';
import { UmbLitElement } from '@umbraco-cms/element';

@customElement('umb-relation-type-workspace')
export class UmbRelationTypeWorkspaceElement extends UmbLitElement {
	static styles = [
		UUITextStyles,
		css`
			:host {
				display: block;
				width: 100%;
				height: 100%;
			}
			#header {
				margin: 0 var(--uui-size-layout-1);
				flex: 1 1 auto;
			}
		`,
	];

	public load(entityKey: string) {
		this.#relationTypeWorkspaceContext.load(entityKey);
	}

	@state()
	private _name?: string | null = '';

	#relationTypeWorkspaceContext = new UmbRelationTypeWorkspaceContext(this);
	#isNew = false;

	async connectedCallback() {
		super.connectedCallback();

		this.provideContext('umbWorkspaceContext', this.#relationTypeWorkspaceContext);

		this.observe(this.#relationTypeWorkspaceContext.name, (name) => {
			console.log;
			this._name = name;
		});
	}

	#onNameInput(event: Event) {
		const target = event.target as UUIInputElement;
		const value = target.value as string;
		this.#relationTypeWorkspaceContext.setName(value);
	}

	#onSave() {
		this.#relationTypeWorkspaceContext.save(this.#isNew);
	}

	render() {
		return html`<umb-workspace-layout alias="Umb.Workspace.RelationType">
			<uui-input id="header" slot="header" .value=${this._name} @input="${this.#onNameInput}"></uui-input>
		</umb-workspace-layout>`;
	}
}

export default UmbRelationTypeWorkspaceElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-relation-type-workspace': UmbRelationTypeWorkspaceElement;
	}
}
