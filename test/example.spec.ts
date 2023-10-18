import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// test('Renders Edit component', async ({ page }) => {
//   const editFrame = page.frameLocator('#editPanel')
//   await expect(editFrame.getByText('Edit preview')).toBeVisible();
//   const EDIT_COPY = 'Edit version of the content element';
//   await expect(editFrame.getByText(EDIT_COPY)).toBeVisible();
//   const TOP_TOOLBAR_COPY = 'Edit element top toolbar';
//   await expect(editFrame.getByText(TOP_TOOLBAR_COPY)).toBeVisible();
//   const SIDE_TOOLBAR_COPY = 'Edit element side toolbar';
//   await expect(editFrame.getByText(SIDE_TOOLBAR_COPY)).toBeVisible();
// });

// test('Renders Display component', async ({ page }) => {
//   const displayFrame = page.frameLocator('#displayPanel')
//   await expect(displayFrame.getByText('Display preview')).toBeVisible();
//   const DISPLAY_COPY = 'This is the display version of the content element';
//   await expect(displayFrame.getByText(DISPLAY_COPY)).toBeVisible();
// });

// test('Renders server state panel', async ({ page }) => {
//   const properties = ['uid', 'type', 'meta', 'data', 'contentId'];
//   const bottomPanel = page.locator('#panelBottom');
//   for (const prop of properties) {
//     await expect(bottomPanel.getByText(prop)).toBeVisible();
//   }
// });
