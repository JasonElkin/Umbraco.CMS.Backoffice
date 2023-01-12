import { UUITextStyles } from '@umbraco-ui/uui-css';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('umb-media-workspace-view-info')
export class UmbMediaWorkspaceViewInfoElement extends LitElement {
	static styles = [
		UUITextStyles,
		css`
			:host {
				display: flex;
				flex-flow: row wrap;
				gap: var(--uui-size-space-6);
			}

			#left {
				flex: 10000 0 500px;
			}

			#right {
				flex: 1 0 300px;
			}
		`,
	];

	render() {
		return html`
			<div id="left">
				<uui-box id="links">
					<div slot="headline">Links</div>
				</uui-box>
				<uui-box id="references">
					<div slot="headline">References</div>
				</uui-box>
			</div>
			<div id="right">
				<uui-box id="info">
					<div slot="headline">Info</div>
				</uui-box>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-media-workspace-view-info': UmbMediaWorkspaceViewInfoElement;
	}
}
