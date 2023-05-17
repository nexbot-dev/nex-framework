import { defineConfig } from 'rollup';
import packageJson from './package.json' assert { type: 'json' };

import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';

export default defineConfig([
	{
		input: 'src/index.ts',
		output: {
			file: packageJson.main,
			format: 'esm',
			sourcemap: true,
		},
		plugins: [
			resolve(),
			typescript({
				tsconfig: './tsconfig.json',
			}),
			terser(),
		],
		external: [
			'discord.js',
		],
	},
	{
		input: 'dist/types/index.d.ts',
		output: {
			file: packageJson.types,
			format: 'esm',
		},
		plugins: [
			dts(),
		],
	},
]);