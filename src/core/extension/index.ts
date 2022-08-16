// we have to make explicit exports for es-module-shims to work in browsers that doesn't support importmaps
export { UmbExtensionRegistry } from './extension.registry';
export { createExtensionElement } from './create-extension-element.function';
export { loadExtension } from './load-extension.function';
export { loadScript } from './load-script.function';

export type {
	UmbExtensionManifestJSModel,
	UmbExtensionManifestBase,
	UmbExtensionManifestStartUp,
	UmbManifestSectionMeta,
	UmbExtensionManifestSection,
	UmbManifestPropertyEditorMeta,
	UmbExtensionManifestPropertyEditorUI,
	UmbExtensionManifestPropertyAction,
	UmbManifestPropertyActionMeta,
	UmbManifestDashboardMeta,
	UmbExtensionManifestDashboard,
	UmbManifestEditorViewMeta,
	UmbExtensionManifestEditorView,
	UmbExtensionManifestCore,
	UmbExtensionManifest,
} from './extension.registry';
