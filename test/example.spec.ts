import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Renders Edit component', async ({ page }) => {
  const editFrame = page.frameLocator('#editPanel>iframe')
  await expect(editFrame.getByText('Authoring component')).toBeVisible();
  const EDIT_COPY = 'Edit version of the content element';
  await expect(editFrame.getByText(EDIT_COPY)).toBeVisible();
  const TOP_TOOLBAR_COPY = 'Top toolbar';
  await expect(editFrame.getByText(TOP_TOOLBAR_COPY)).toBeVisible();
  const SIDE_TOOLBAR_COPY = 'Side toolbar';
  await expect(editFrame.getByText(SIDE_TOOLBAR_COPY)).toBeVisible();
});

test('Renders Display component', async ({ page }) => {
  const displayFrame = page.frameLocator('#displayPanel>iframe')
  await expect(displayFrame.getByText('End-user component')).toBeVisible();
  const DISPLAY_COPY = 'Display version of the content element';
  await expect(displayFrame.getByText(DISPLAY_COPY)).toBeVisible();
});

test('Renders server state panel', async ({ page }) => {
  const properties = ['uid', 'type', 'meta', 'data', 'contentId'];
  const bottomPanel = page.locator('#panelBottom');
  const authoringTab = bottomPanel.getByRole('tab', { name: 'Authoring history' });
  const userStateTab = bottomPanel.getByRole('tab', { name: 'End-user state history' });
  await expect(authoringTab).toBeVisible();
  await expect(bottomPanel.locator('pre').getByText('state')).toBeVisible();
  await expect(userStateTab).toBeVisible();
  await authoringTab.click();
  for (const prop of properties) {
    await expect(bottomPanel.getByText(prop)).toBeVisible();
  }
});
