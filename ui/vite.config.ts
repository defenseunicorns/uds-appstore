// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.test.{js,ts}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/setupTests.ts']
  },
  server: {
    fs: {
      allow: ['tailwind.config.ts']
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    conditions: mode === 'test' ? ['browser'] : []
  }
}));
