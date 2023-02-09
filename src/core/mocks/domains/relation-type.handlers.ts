import { rest } from 'msw';
import { umbRelationTypeData } from '../data/relation-type.data';
import { umbracoPath } from '@umbraco-cms/utils';
import { RelationTypeCreateModel } from 'libs/backend-api/src/models/RelationTypeCreateModel';

// TODO: add schema
export const handlers = [
	rest.get(umbracoPath('/tree/relation-type/root'), (req, res, ctx) => {
		const response = umbRelationTypeData.getTreeRoot();
		return res(ctx.status(200), ctx.json(response));
	}),

	rest.get(umbracoPath('/tree/relation-type/children'), (req, res, ctx) => {
		const parentKey = req.url.searchParams.get('parentKey');
		if (!parentKey) return;

		const response = umbRelationTypeData.getTreeItemChildren(parentKey);
		return res(ctx.status(200), ctx.json(response));
	}),

	rest.get(umbracoPath('/tree/relation-type/item'), (req, res, ctx) => {
		const keys = req.url.searchParams.getAll('key');
		if (!keys) return;

		const items = umbRelationTypeData.getTreeItem(keys);
		return res(ctx.status(200), ctx.json(items));
	}),

	rest.get(umbracoPath('/relation-type/:key'), (req, res, ctx) => {
		const key = req.params.key as string;
		if (!key) return;

		const response = umbRelationTypeData.getByKey(key);
		return res(ctx.status(200), ctx.json(response));
	}),

	rest.post<RelationTypeCreateModel>(umbracoPath('/relation-type'), async (req, res, ctx) => {
		const data = await req.json();
		if (!data) return;

		const created = umbRelationTypeData.create(data);
		return res(ctx.status(200), ctx.json(created));
	}),
];
