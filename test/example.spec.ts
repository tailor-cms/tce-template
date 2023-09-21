import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// test('Renders Display component', async ({ page }) => {
//   await page.reload();
//   const displayFrame = page.frameLocator('#displayPanel')
//   await expect(displayFrame.getByText('Display preview')).toBeVisible();
//   const DISPLAY_COPY = 'This is the display version of the content element';
//   await expect(displayFrame.getByText(DISPLAY_COPY)).toBeVisible();
// });

// test('Renders server state panel', async ({ page }) => {
//   await page.reload();
//   const properties = ['uid', 'type', 'meta', 'data', 'contentId'];
//   const bottomPanel = page.locator('#panelBottom');
//   for (const prop of properties) {
//     await expect(bottomPanel.getByText(prop)).toBeVisible();
//   }
// });
