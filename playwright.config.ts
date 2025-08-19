import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './TBRtest',
  fullyParallel: false, // Enable parallel execution of test cases
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Run up to 4 tests in parallel

  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    headless: false, // Show browser during test
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        headless: false,
      },
    },
    // {
    //   name: 'Firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     headless: false,
    //   },
    // },
    // {
    //   name: 'WebKit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     headless: false,
    //   },
    // },
  ],

  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
