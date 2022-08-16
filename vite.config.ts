import { defineConfig } from 'vite';
const { importMaps } = require('vite-plugin-import-maps');
import FullReload from 'vite-plugin-full-reload';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		sourcemap: true,
	},
	plugins: [
		viteImportmapPlugin({
			'umbraco/context': '/context/index.js',
		}),
		FullReload(['public/context/*']),
	],
});

// solution from: https://github.com/vitejs/vite/issues/6393
function viteImportmapPlugin(importmapObj) {
	const keys = Object.keys(importmapObj);
	return {
		name: 'vite-plugin-importmap',
		enforce: 'pre',
		// 1. insert to optimizeDeps.exclude to prevent pre-transform
		config(config) {
			config.optimizeDeps = {
				...(config.optimizeDeps ?? {}),
				exclude: [...(config.optimizeDeps?.exclude ?? []), ...keys],
			};
		},
		// 2. push a plugin to rewrite the 'vite:import-analysis' prefix
		configResolved(resolvedConfig) {
			const VALID_ID_PREFIX = `/@id/`;
			const reg = new RegExp(`${VALID_ID_PREFIX}(${keys.join('|')})`, 'g');
			resolvedConfig.plugins.push({
				name: 'vite-plugin-importmap-replace-idprefix',
				transform: (code) => (reg.test(code) ? code.replace(reg, (m, s1) => s1) : code),
			});
		},
		// 3. rewrite the id before 'vite:resolve' plugin transform to 'node_modules/...'
		resolveId: (id) => importmapObj[id] && { id, external: true },
		// 4. inject importmap script to head-prepend before '@vite/client' scripts tag
		transformIndexHtml: {
			enforce: 'pre',
			transform: (html) => ({
				html,
				tags: [
					{
						tag: 'script',
						attrs: {
							type: 'esms-options',
						},
						children: JSON.stringify(
							{
								shimMode: false,
							},
							null,
							2
						),
						injectTo: 'head-prepend',
					},
					{
						tag: 'script',
						attrs: {
							src: 'https://ga.jspm.io/npm:es-module-shims@1.5.15/dist/es-module-shims.js',
						},
						injectTo: 'head-prepend',
					},
					{
						tag: 'script',
						attrs: { type: 'importmap' },
						injectTo: 'head-prepend',
						children: JSON.stringify({ imports: importmapObj }, null, 2),
					},
				],
			}),
		},
	};
}

function viteIgnoreStaticImport(importKeys) {
	return {
		name: 'vite-plugin-ignore-static-import',
		enforce: 'pre',
		// 1. insert to optimizeDeps.exclude to prevent pre-transform
		config(config) {
			config.optimizeDeps = {
				...(config.optimizeDeps ?? {}),
				exclude: [...(config.optimizeDeps?.exclude ?? []), ...importKeys],
			};
		},
		// 2. push a plugin to rewrite the 'vite:import-analysis' prefix
		configResolved(resolvedConfig) {
			const VALID_ID_PREFIX = `/@id/`;
			const reg = new RegExp(`${VALID_ID_PREFIX}(${importKeys.join('|')})`, 'g');
			resolvedConfig.plugins.push({
				name: 'vite-plugin-ignore-static-import-replace-idprefix',
				transform: (code) => (reg.test(code) ? code.replace(reg, (m, s1) => s1) : code),
			});
		},
		// 3. rewrite the id before 'vite:resolve' plugin transform to 'node_modules/...'
		resolveId: (id) => {
			if (importKeys.includes(id)) {
				return { id, external: true };
			}
		},
	};
}
