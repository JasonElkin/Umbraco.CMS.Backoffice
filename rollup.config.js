import esbuild from 'rollup-plugin-esbuild';
//import { nodeResolve } from '@rollup/plugin-node-resolve';

// TODO: Temp rollup config until we figure out how to build it with Vite
export default [
	{
		input: 'packages/context/index.ts',
		output: {
			file: 'public/context/index.js',
			format: 'es',
		},
		plugins: [esbuild()],
	},
];
