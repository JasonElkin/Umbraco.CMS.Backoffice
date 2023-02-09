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

			#content {
				height: 200px;
			}
		`,
	];

	public load(entityKey: string) {
		this.#relationTypeWorkspaceContext.load(entityKey);
	}

	public create(parentKey: string | null) {
		this.#isNew = true;
		this.#relationTypeWorkspaceContext.createScaffold(parentKey);
	}

	@state()
	private _name?: string | null = '';

	@state()
	private _content?: string | null = '';

	#relationTypeWorkspaceContext = new UmbRelationTypeWorkspaceContext(this);
	#isNew = false;

	async connectedCallback() {
		super.connectedCallback();

		this.observe(this.#relationTypeWorkspaceContext.name, (name) => {
			this._name = name;
		});

		this.observe(this.#relationTypeWorkspaceContext.content, (content) => {
			this._content = content;
		});
	}

	// TODO: temp code for testing create and save
	#onNameInput(event: Event) {
		const target = event.target as UUIInputElement;
		const value = target.value as string;
		this.#relationTypeWorkspaceContext.setName(value);
	}

	#onTextareaInput(event: Event) {
		const target = event.target as UUITextareaElement;
		const value = target.value as string;
		this.#relationTypeWorkspaceContext.setContent(value);
	}

	#onSave() {
		this.#relationTypeWorkspaceContext.save(this.#isNew);
	}

	render() {
		// TODO: add correct UI elements
		return html`<umb-workspace-layout alias="Umb.Workspace.RelationType"></umb-workspace-layout>`;
	}
}

export default UmbRelationTypeWorkspaceElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-relation-type-workspace': UmbRelationTypeWorkspaceElement;
	}
}
