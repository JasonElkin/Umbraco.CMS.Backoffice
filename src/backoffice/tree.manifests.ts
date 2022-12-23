// TODO: temp file until we have a way to register from each extension
import { manifests as dictionaryTreeManifests } from './test/translation/dictionary-tree.manifest';
import { manifests as dataTypeTreeManifests } from './test/core/data-types/tree/manifests';
import { manifests as documentBlueprintTreeManifests } from './test/documents/trees/document-blueprints/manifests';
import { manifests as documentTypeTreeManifests } from './test/documents/trees/document-types/manifests';
import { manifests as extensionTreeManifests } from './test/core/extensions/tree/manifests';
import { manifests as languageTreeManifests } from './test/core/languages/tree/manifests';
import { manifests as mediaTreeManifests } from './test/media/trees/media/manifests';
import { manifests as documentTreeManifests } from './test/documents/trees/documents/manifests';
import { manifests as mediaTypeTreeManifests } from './test/media/trees/media-types/manifests';
import { manifests as memberTypesTreeManifests } from './test/members/trees/member-types/manifests';
import { manifests as memberGroupTreeManifests } from './test/members/trees/member-groups/manifests';

import type { ManifestTree, ManifestTreeItemAction } from '@umbraco-cms/models';

export const manifests: Array<ManifestTree | ManifestTreeItemAction> = [
	...dataTypeTreeManifests,
	...dictionaryTreeManifests,
	...documentBlueprintTreeManifests,
	...documentTypeTreeManifests,
	...documentTreeManifests,
	...extensionTreeManifests,
	...languageTreeManifests,
	...mediaTreeManifests,
	...mediaTypeTreeManifests,
	...memberGroupTreeManifests,
	...memberTypesTreeManifests,
];
