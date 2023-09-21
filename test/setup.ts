import { test } from '@playwright/test';

test('Renders preview', async ({ page }) => {
  await page.goto('/');
  // First time boot setup
  await page.waitForTimeout(20000);
  await page.reload();
  await page.context().storageState({ path: './test/.boot-state.json' });
});
