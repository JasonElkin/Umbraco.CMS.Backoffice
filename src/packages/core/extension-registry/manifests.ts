import { manifests as conditionManifests } from './conditions/manifests.js';
import { manifests as menuItemManifests } from './menu-item/manifests.js';
import { manifests as workspaceManifests } from './workspace/manifests.js';

export const manifests = [...conditionManifests, ...menuItemManifests, ...workspaceManifests];
