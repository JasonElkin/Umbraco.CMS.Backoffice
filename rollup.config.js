import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const packageNames = ['context', 'stores'];

const createPackageConfig = (name) => {
	return {
		input: `packages/${name}/index.ts`,
		output: {
			file: `public/${name}/index.js`,
			format: 'es',
		},
		plugins: [nodeResolve(), esbuild({ minify: true })],
	};
};

// TODO: Temp rollup config until we figure out how to build it with Vite
export default packageNames.map((name) => createPackageConfig(name));
