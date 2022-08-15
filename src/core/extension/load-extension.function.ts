import { UmbExtensionManifest } from './extension.registry';
import { loadScript } from './';

export function loadExtension(manifest: UmbExtensionManifest): Promise<object | HTMLElement> | Promise<null> {
	if (typeof manifest.js === 'function') {
		return manifest.js() as Promise<object | HTMLElement>;
	}

	// TODO: verify if this is acceptable solution.
	if (typeof manifest.js === 'string') {
		// TODO: change this back to dynamic import after POC. Vite complains about the dynamic imports in the public folder but doesn't include the temp app_plugins folder in the final build.
		// return import(/* @vite-ignore */ manifest.js);
		return loadScript(manifest.js);
	}

	console.log('-- Extension does not have any referenced JS');
	return Promise.resolve(null);
}
