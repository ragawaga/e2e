import { defineConfig, devices } from "@playwright/test";
import { umbracoSessionFile, frontendSessionFile } from "./tests/auth";
/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig({
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 30_000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 2,
  /* Opt out of parallel tests on CI. */
  workers: 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["junit", { outputFile: "test-results/e2e-junit-results.xml" }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 10_000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-all-retries",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "frontend-setup",
      testMatch: /.*\.setup\.ts/,
      testDir: "./tests/frontend",
      use: {
        baseURL: "https://chw-web-dev.azurefd.net/",
      },
    },
    {
      name: "editor-setup",
      testMatch: /.*\.setup\.ts/,
      testDir: "./tests/editor",
      use: {
        baseURL: "https://crudev.northeurope.cloudapp.azure.com/",
      },
    },
    {
      name: "frontend",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://chw-web-dev.azurefd.net/",
        storageState: frontendSessionFile,
      },
      testDir: "./tests/frontend",
      dependencies: ["frontend-setup"],
      testMatch: /.*\.spec\.ts/,
    },
    {
      name: "editor",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://crudev.northeurope.cloudapp.azure.com/",
        storageState: umbracoSessionFile,
      },
      testDir: "./tests/editor",
      dependencies: ["editor-setup"],
      testMatch: /.*\.spec\.ts/,
    },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { channel: 'chrome' },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
});
