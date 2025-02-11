import dotenv from 'dotenv';
import { defineConfig, devices } from '@playwright/test';

dotenv.config();

if (!process.env.PREVIEW_RUNTIME_URL) process.env.PREVIEW_RUNTIME_URL = 'http://localhost:8080';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: '.',
  outputDir: './out',
  timeout: 10 * 60 * 1000,
  expect: { timeout: 30 * 1000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: process.env.PREVIEW_RUNTIME_URL,
    trace: 'on-first-retry',
    video: 'on-first-retry'
  },
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ]
});
