import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Renders Edit component', async ({ page }) => {
  const editFrame = page.frameLocator('#editPanel>iframe')
  await expect(editFrame.getByText('Authoring component')).toBeVisible();
  const EDIT_COPY = 'Edit version of the content element';
  await expect(editFrame.getByText(EDIT_COPY)).toBeVisible();
  await expect(editFrame.getByText('Top toolbar')).toBeVisible();
  await editFrame.getByText('Persist').nth(0).click();
  const TOP_TOOLBAR_COPY = 'Edit element top toolbar';
  await expect(editFrame.getByText(TOP_TOOLBAR_COPY)).toBeVisible();
  await expect(editFrame.getByText('Side toolbar')).toBeVisible();
  await editFrame.getByText('Persist').nth(1).click();
  const SIDE_TOOLBAR_COPY = 'Edit element side toolbar';
  await expect(editFrame.getByText(SIDE_TOOLBAR_COPY)).toBeVisible();
});

test('Renders Display component', async ({ page }) => {
  const displayFrame = page.frameLocator('#displayPanel>iframe')
  await expect(displayFrame.getByText('End-user component')).toBeVisible();
  const DISPLAY_COPY = 'Display version of the content element';
  await expect(displayFrame.getByText(DISPLAY_COPY)).toBeVisible();
});

test('Renders server state panel', async ({ page }) => {
  const bottomPanel = page.locator('#panelBottom');
  const authoringTab = bottomPanel.getByRole('tab', { name: 'Authoring history' });
  await expect(authoringTab).toBeVisible();
  const userStateTab = bottomPanel.getByRole('tab', { name: 'End-user state history' });
  await expect(userStateTab).toBeVisible();
  await authoringTab.click();
  const properties = ['uid', 'type', 'meta', 'data', 'contentId'];
  for (const prop of properties) {
    await expect(bottomPanel.getByText(prop)).toBeVisible();
  }
  await userStateTab.click();
  await expect(bottomPanel.locator('pre').getByText('state')).toBeVisible();
});
