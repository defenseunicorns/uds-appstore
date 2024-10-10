import { expect, test } from '@playwright/test';

test('Check navbar links and button are working', async ({ page }) => {
  await page.goto('/apps');

  const nav = await page.waitForSelector('#nav', { state: 'visible' });

  // Get all links in navbar
  const links = await nav.$$eval('a', (allLinks) =>
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
  const button = page.getByRole('button', { name: /talk to mission expert/i });
  await button.click();
  await page.waitForLoadState('load');
  await expect(page).toHaveURL(`/contact`);
});
