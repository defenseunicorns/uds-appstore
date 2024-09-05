// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

import { test } from '@playwright/test';

test('home page redirects to /apps', async ({ page }) => {
	await page.goto('/');
	await page.waitForURL('/apps');
});
