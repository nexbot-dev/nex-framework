import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	target: 'es2022',
	clean: true,
	bundle: true,
	skipNodeModulesBundle: true,
	treeshake: true,
	splitting: false,
	minify: 'terser',
	sourcemap: true,
	dts: true,
});