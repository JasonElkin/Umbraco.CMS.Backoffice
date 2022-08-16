import { rest } from 'msw';

// TODO: set up schema
export const handlers = [
	rest.get('/umbraco/backoffice/manifests', (_req, res, ctx) => {
		console.warn('Please move to schema');
		return res(
			// Respond with a 200 status code
			ctx.status(200),
			ctx.json({
				manifests: [
					{
						type: 'propertyEditorUI',
						alias: 'My.PropertyEditorUI.Custom',
						name: 'My Custom Property Editor UI',
						js: '/App_Plugins/property-editor.js',
						elementName: 'my-property-editor-ui-custom',
						meta: {
							icon: 'document',
							group: 'common',
						},
					},
				],
			})
		);
	}),
];
