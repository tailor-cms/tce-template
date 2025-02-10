import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Renders Edit component', async ({ page }) => {
  const editFrame = page.frameLocator('#editPanel')
  await expect(editFrame.getByText('Authoring component')).toBeVisible();
  const EDIT_COPY = 'Edit version of the content element';
  await expect(editFrame.getByText(EDIT_COPY)).toBeVisible();
  const TOP_TOOLBAR_COPY = 'Top toolbar';
  await expect(editFrame.getByText(TOP_TOOLBAR_COPY)).toBeVisible();
  const SIDE_TOOLBAR_COPY = 'Side toolbar';
  await expect(editFrame.getByText(SIDE_TOOLBAR_COPY)).toBeVisible();
});

test('Renders Display component', async ({ page }) => {
  const displayFrame = page.frameLocator('#displayPanel')
  await expect(displayFrame.getByText('End-user component')).toBeVisible();
  const DISPLAY_COPY = 'Display version of the content element';
  await expect(displayFrame.getByText(DISPLAY_COPY)).toBeVisible();
});

test('Renders server state panel', async ({ page }) => {
  const properties = ['uid', 'type', 'meta', 'data', 'contentId'];
  const bottomPanel = page.locator('#panelBottom');
  for (const prop of properties) {
    await expect(bottomPanel.getByText(prop)).toBeVisible();
  }
});
