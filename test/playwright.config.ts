import { defineConfig, devices } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

if (!process.env.PREVIEW_RUNTIME_URL)
  process.env.PREVIEW_RUNTIME_URL = 'http://localhost:8080';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: '.',
  outputDir: './out',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: process.env.PREVIEW_RUNTIME_URL,
    trace: 'on-first-retry',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
});
