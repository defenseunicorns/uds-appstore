import { expect, test } from '@playwright/test';

test('home page redirects to /apps', async ({ page }) => {
	await page.goto('/');
	await page.waitForURL('/apps');
	await expect(page.locator('h1')).toBeVisible();
});
