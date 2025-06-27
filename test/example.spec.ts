import { expect, test } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

const COPY = {
  edit: 'Edit version of the content element',
  display: 'Display version of the content element',
  topToolbar: 'Edit element top toolbar',
  sideToolbar: 'Edit element side toolbar',
};

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
});

test('Renders Edit component', async ({ page }) => {
  const editPanel = new pom.EditPanel(page);
  await editPanel.persistFocus();
  await expect(editPanel.editor).toBeVisible();
  await expect(editPanel.editor.getByText(COPY.edit)).toBeVisible();
  await expect(editPanel.topToolbar).toBeVisible();
  await expect(editPanel.topToolbar.getByText(COPY.topToolbar)).toBeVisible();
  await expect(editPanel.sideToolbar).toBeVisible();
  await expect(editPanel.sideToolbar.getByText(COPY.sideToolbar)).toBeVisible();
});

test('Renders Display component', async ({ page }) => {
  const displayPanel = new pom.DisplayPanel(page);
  await expect(displayPanel.editor).toBeVisible();
  await expect(displayPanel.editor.getByText(COPY.display)).toBeVisible();
});

test('Renders server state panel', async ({ page }) => {
  const bottomPanel = new pom.BottomPanel(page);
  await expect(bottomPanel.el).toBeVisible();
  await bottomPanel.authoringTab.click();
  const properties = ['uid', 'type', 'meta', 'data', 'contentId'];
  for (const prop of properties) {
    await expect(bottomPanel.authoringWindow.getByText(prop)).toBeVisible();
  }
  await bottomPanel.userStateTab.click();
  await expect(
    bottomPanel.userStateWindow.locator('pre').getByText('state'),
  ).toBeVisible();
});
