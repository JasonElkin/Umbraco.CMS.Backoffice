import { defineConfig } from 'vite';
const { importMaps } = require('vite-plugin-import-maps');

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		sourcemap: true,
	},
	plugins: [
		importMaps([
			{
				imports: {
					'umbraco/context': '/context/index.js',
					'umbraco/stores': '/stores/index.js',
				},
			},
		]),
	],
});
