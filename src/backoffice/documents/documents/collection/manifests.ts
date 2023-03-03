import { ManifestCollectionView } from '@umbraco-cms/extensions-registry';
import { DOCUMENT_ENTITY_TYPE } from '..';

export const manifests: Array<ManifestCollectionView> = [
	{
		type: 'collectionView',
		alias: 'Umb.CollectionView.Document.Table',
		name: 'Document Table Collection View',
		loader: () => import('./views/table/document-table-collection-view.element'),
		weight: 200,
		meta: {
			label: 'Table',
			icon: 'umb:box',
			entityType: DOCUMENT_ENTITY_TYPE,
			pathName: 'table',
		},
	},
];
