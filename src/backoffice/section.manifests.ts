// TODO: temp file until we have a way to register from each extension
import { manifests as packageSectionManifests } from './test/packages/section/manifests';
import { manifests as translationSectionManifests } from './test/translation/translation-section.manifest';
import { manifests as contentSectionManifests } from './test/documents/manifests';
import { manifests as settingsSectionManifests } from './test/core/section/manifests';
import { manifests as mediaSectionManifests } from './test/media/media-section.manifest';
import { manifests as memberSectionManifests } from './test/members/manifests';
import { manifests as userSectionManifests } from './test/users/section/manifests';

import type { ManifestDashboard, ManifestSection, ManifestSectionView } from '@umbraco-cms/models';

export const manifests: Array<ManifestSection | ManifestDashboard | ManifestSectionView> = [
	...contentSectionManifests,
	...mediaSectionManifests,
	...memberSectionManifests,
	...packageSectionManifests,
	...settingsSectionManifests,
	...translationSectionManifests,
	...userSectionManifests,
];
