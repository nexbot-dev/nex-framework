import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'clover', 'lcov'],
		},
	},
	esbuild: {
		target: 'es2022',
	},
});