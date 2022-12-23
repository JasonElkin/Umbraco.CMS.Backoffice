//TODO: we need to figure out what components should be available for extensions and load them upfront
import './test/core/components/workspace/workspace-entity/workspace-entity.element';
import './components/ref-property-editor-ui/ref-property-editor-ui.element';
import './components/backoffice-frame/backoffice-header.element';
import './components/backoffice-frame/backoffice-main.element';
import './components/backoffice-frame/backoffice-modal-container.element';
import './components/backoffice-frame/backoffice-notification-container.element';
import './components/content-property/content-property.element';
import './components/table/table.element';
import './components/shared/code-block.element';
import './components/extension-slot/extension-slot.element';
import './test/core/components/section/section-main/section-main.element';
import './test/core/components/section/section-sidebar/section-sidebar.element';
import './test/core/components/section/section.element';
import './test/core/components/tree/tree.element';

import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html, LitElement } from 'lit';

import { UmbModalService } from '../core/services/modal';
import { UmbNotificationService } from '../core/services/notification';
import { UmbDataTypeStore } from '../core/stores/data-type/data-type.store';
import { UmbDocumentTypeStore } from '../core/stores/document-type/document-type.store';
import { UmbMediaTypeStore } from '../core/stores/media-type/media-type.store';
import { UmbMemberTypeStore } from '../core/stores/member-type/member-type.store';
import { UmbDocumentStore } from '../core/stores/document/document.store';
import { UmbMediaStore } from '../core/stores/media/media.store';
import { UmbMemberGroupStore } from '../core/stores/member-group/member-group.store';
import { UmbSectionStore } from '../core/stores/section.store';
import { UmbIconStore } from '../core/stores/icon/icon.store';
import { UmbCurrentUserHistoryStore } from '../core/stores/current-user-history/current-user-history.store';
import { UmbDocumentBlueprintStore } from '../core/stores/document-blueprint/document-blueprint.store';
import { UmbUserGroupStore } from './test/users/user-group.store';
import { UmbUserStore } from './test/users/user.store';
import { UmbDictionaryStore } from './test/translation/dictionary.store';

import { manifests as sectionManifests } from './section.manifests';
import { manifests as propertyEditorModelManifests } from './property-editors/models/manifests';
import { manifests as propertyEditorUIManifests } from './property-editors/uis/manifests';
import { manifests as treeManifests } from './tree.manifests';
import { manifests as editorManifests } from './workspace.manifests';
import { manifests as propertyActionManifests } from './property-actions/manifests';
import { manifests as externalLoginProviderManifests } from './external-login-providers/manifests';
import { manifests as userDashboards } from './user-dashboards/manifests';

import { UmbContextConsumerMixin, UmbContextProviderMixin } from '@umbraco-cms/context-api';
import { umbExtensionsRegistry } from '@umbraco-cms/extensions-registry';

import type { ManifestTypes } from '@umbraco-cms/models';

@defineElement('umb-backoffice')
export class UmbBackofficeElement extends UmbContextConsumerMixin(UmbContextProviderMixin(LitElement)) {
	static styles = [
		UUITextStyles,
		css`
			:host {
				display: flex;
				flex-direction: column;
				height: 100%;
				width: 100%;
				color: var(--uui-color-text);
				font-size: 14px;
				box-sizing: border-box;
			}
		`,
	];

	private _umbIconRegistry = new UmbIconStore();

	constructor() {
		super();

		// TODO: this needs to happen in each extension
		this._registerExtensions(sectionManifests);
		this._registerExtensions(treeManifests);
		this._registerExtensions(editorManifests);
		this._registerExtensions(propertyEditorModelManifests);
		this._registerExtensions(propertyEditorUIManifests);
		this._registerExtensions(propertyActionManifests);
		this._registerExtensions(externalLoginProviderManifests);
		this._registerExtensions(userDashboards);

		this._umbIconRegistry.attach(this);

		// TODO: find a way this is possible outside this element. It needs to be possible to register stores in extensions
		this.provideContext('umbDocumentStore', new UmbDocumentStore());
		this.provideContext('umbMediaStore', new UmbMediaStore());
		this.provideContext('umbDataTypeStore', new UmbDataTypeStore());
		this.provideContext('umbDocumentTypeStore', new UmbDocumentTypeStore());
		this.provideContext('umbMediaTypeStore', new UmbMediaTypeStore());
		this.provideContext('umbMemberTypeStore', new UmbMemberTypeStore());
		this.provideContext('umbUserStore', new UmbUserStore());
		this.provideContext('umbUserGroupStore', new UmbUserGroupStore());
		this.provideContext('umbMemberGroupStore', new UmbMemberGroupStore());
		this.provideContext('umbNotificationService', new UmbNotificationService());
		this.provideContext('umbModalService', new UmbModalService());
		this.provideContext('umbSectionStore', new UmbSectionStore());
		this.provideContext('umbCurrentUserHistoryStore', new UmbCurrentUserHistoryStore());
		this.provideContext('umbDictionaryStore', new UmbDictionaryStore());
		this.provideContext('umbDocumentBlueprintStore', new UmbDocumentBlueprintStore());
	}

	private _registerExtensions(manifests: Array<ManifestTypes> | Array<ManifestTypes>) {
		manifests.forEach((manifest) => {
			if (umbExtensionsRegistry.isRegistered(manifest.alias)) return;
			umbExtensionsRegistry.register(manifest);
		});
	}

	render() {
		return html`
			<umb-backoffice-header></umb-backoffice-header>
			<umb-backoffice-main></umb-backoffice-main>
			<umb-backoffice-notification-container></umb-backoffice-notification-container>
			<umb-backoffice-modal-container></umb-backoffice-modal-container>
		`;
	}
}

export default UmbBackofficeElement;
declare global {
	interface HTMLElementTagNameMap {
		'umb-backoffice': UmbBackofficeElement;
	}
}
