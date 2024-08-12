import { expect, test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogData = JSON.parse(
	fs.readFileSync(path.join(__dirname, '../../static/api/apps/index.json'), 'utf-8')
);

test.describe('Catalog View', () => {
	test('displays catalog items', async ({ page }) => {
		await page.goto('/apps');

		// Wait for the app cards to be visible
		await page.waitForSelector('.app-card', { state: 'visible' });

		// Get all app cards
		const appCards = await page.$$('.app-card');

		// Ensure there is at least one app card
		expect(appCards.length).toBeGreaterThan(0);

		// Check all available apps, up to the first 3
		const appsToCheck = Math.min(appCards.length, 3);
		for (let i = 0; i < appsToCheck; i++) {
			const app = catalogData[i];
			const appCard = appCards[i];

			console.log(`Checking app: ${app.metadata.name}`);

			// Check for app name
			const appNameElement = await appCard.$('.app-card-header-title');
			expect(appNameElement).not.toBeNull();
			const appNameText = (await appNameElement?.textContent()) ?? '';
			expect(appNameText).toBe(app.metadata.name);

			// Check for app description
			if (app.spec.description) {
				const descriptionText =
					app.spec.description.slice(0, 150) + (app.spec.description.length > 150 ? '...' : '');
				const descriptionElement = await appCard.$('.text-gray-300');
				expect(descriptionElement).not.toBeNull();
				const actualDescriptionText = await descriptionElement.textContent();
				expect(actualDescriptionText).toContain(descriptionText);
			}

			// Check for "Learn More" button
			const learnMoreButton = await appCard.$('text="Learn More"');
			expect(learnMoreButton).not.toBeNull();
		}
	});

	test('displays correct icons for apps', async ({ page }) => {
		await page.goto('/apps');

		// Wait for the app cards to be visible
		await page.waitForSelector('.app-card', { state: 'visible' });

		// Get all app cards
		const appCards = await page.$$('.app-card');

		// Ensure there is at least one app card
		expect(appCards.length).toBeGreaterThan(0);

		// Check all available apps, up to the first 3
		const appsToCheck = Math.min(appCards.length, 3);
		for (let i = 0; i < appsToCheck; i++) {
			const app = catalogData[i];
			const appCard = appCards[i];

			const appIcon = await appCard.$('.app-card-header-icon');
			expect(appIcon).not.toBeNull();

			if (app.spec.icons && app.spec.icons.length > 0) {
				const iconSrc = await appIcon.getAttribute('src');
				expect(iconSrc).toBe(app.spec.icons[0].src);
			} else {
				const iconSrc = await appIcon.getAttribute('src');
				expect(iconSrc).toContain('/doug.svg');
			}
		}
	});
});
