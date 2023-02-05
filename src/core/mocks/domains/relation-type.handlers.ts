import { rest } from 'msw';
import { umbRelationTypeData } from '../data/relation-type.data';
import type { RelationTypeDetails } from '@umbraco-cms/models';

// TODO: add schema
export const handlers = [
	rest.get('/umbraco/backoffice/relation-type/details/:key', (req, res, ctx) => {
		const key = req.params.key as string;
		if (!key) return;

		const dataType = umbRelationTypeData.getByKey(key);

		return res(ctx.status(200), ctx.json([dataType]));
	}),

	rest.post<RelationTypeDetails[]>('/umbraco/backoffice/relation-type/save', async (req, res, ctx) => {
		const data = await req.json();
		if (!data) return;

		const saved = umbRelationTypeData.save(data);

		return res(ctx.status(200), ctx.json(saved));
	}),

	rest.post<string[]>('/umbraco/backoffice/relation-type/delete', async (req, res, ctx) => {
		console.warn('Please move to schema');
		const keys = await req.json();

		umbRelationTypeData.delete(keys);

		return res(ctx.status(200));
	}),

	rest.get('/umbraco/management/api/v1/tree/relation-type/root', (req, res, ctx) => {
		const rootItems = umbRelationTypeData.getTreeRoot();
		const response = {
			total: rootItems.length,
			items: rootItems,
		};
		return res(ctx.status(200), ctx.json(response));
	}),

	rest.get('/umbraco/management/api/v1/tree/relation-type/children', (req, res, ctx) => {
		const parentKey = req.url.searchParams.get('parentKey');
		if (!parentKey) return;

		const children = umbRelationTypeData.getTreeItemChildren(parentKey);

		const response = {
			total: children.length,
			items: children,
		};

		return res(ctx.status(200), ctx.json(response));
	}),

	rest.get('/umbraco/management/api/v1/tree/relation-type/item', (req, res, ctx) => {
		const keys = req.url.searchParams.getAll('key');
		if (!keys) return;
		const items = umbRelationTypeData.getTreeItem(keys);
		return res(ctx.status(200), ctx.json(items));
	}),
];
