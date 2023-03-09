import { manifests as repositoryManifests } from './repository/manifests';
import { manifests as packageBuilderManifests } from './package-builder/manifests';
import { manifests as packageRepoManifests } from './package-repo/manifests';
import { manifests as packageSectionManifests } from './package-section/manifests';

import { umbExtensionsRegistry } from '@umbraco-cms/extensions-api';
import { ManifestTypes } from '@umbraco-cms/extensions-registry';

const registerExtensions = (manifests: Array<ManifestTypes>) => {
	manifests.forEach((manifest) => umbExtensionsRegistry.register(manifest));
};

registerExtensions([
	...repositoryManifests,
	...packageBuilderManifests,
	...packageRepoManifests,
	...packageSectionManifests,
]);
