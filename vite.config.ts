import { defineConfig } from 'vite';
const { importMaps } = require('vite-plugin-import-maps');
import FullReload from 'vite-plugin-full-reload';

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
				},
			},
		]),
		FullReload(['public/context/*']),
	],
});
