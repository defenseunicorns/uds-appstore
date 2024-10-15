import { expect, test } from '@playwright/test';

test.describe('UDS page', () => {
  test('links work', async ({ page }) => {
    await page.goto('/uds');

    const pageContainer = await page.waitForSelector('#uds-page-container', { state: 'visible' });

    // Open each accordion to see links
    await pageContainer.$$eval(
      '#accordion-item-header',
      (allHeaders) =>
        allHeaders.forEach(async (header) => {
          await header.click();
        })
    );
    // Get all links
    const links = await pageContainer.$$eval('a', (allLinks) =>
      allLinks.map((link) => ({
        href: link.href,
        text: link.innerText.trim()
      }))
    );

    // Iterate over each link and check if the URL returns a 200 status code
    for (const link of links) {
      const response = await page.request.get(link.href);
      expect(response.status(), `Link "${link.text}" (${link.href}) is broken`).toBe(200);
    }

    // CTA button
    const button = page.getByRole('button', { name: /talk to a mission expert/i });
    await button.click();
    await page.waitForLoadState('load');
    await expect(page).toHaveURL(`/contact`);
  });
});
