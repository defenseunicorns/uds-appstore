// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig(({ mode }) => ({
	plugins: [sveltekit(), purgeCss()],
	server: {
		proxy: {
			// Proxy all requests starting with /api to the go server
			'/api': {
				target: 'http://localhost:8080',
				changeOrigin: true
			}
		}
	},
	test: {
		include: ['src/**/*.test.{js,ts}'],
		environment: 'jsdom',
		globals: true,
		setupFiles: ['src/setupTests.ts']
	},
	resolve: {
		conditions: mode === 'test' ? ['browser'] : []
	}
}));
