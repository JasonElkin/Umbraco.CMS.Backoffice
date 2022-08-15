import { UmbContextConsumerMixin } from 'umbraco/context';

const template = document.createElement('template');
template.innerHTML = `  
  <div>Example of a vanilla JS Property Editor</div>
  <button>Say Hi</button>
`;

export default class MyPropertyEditorUI extends UmbContextConsumerMixin(HTMLElement) {
	_api = null;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		this.consumeContext('myFriendlyAPI', (api) => {
			this._api = api;
		});

		this.shadowRoot.querySelector('button').addEventListener('click', () => {
			if (this._api) {
				this._api.sayHi();
			}
		});
	}
}
customElements.define('my-property-editor-ui-custom', MyPropertyEditorUI);
