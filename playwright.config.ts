import { PlaywrightTestConfig, defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { frontendSessionFile, umbracoSessionFile } from "./tests/auth";

const environment = process.env.PLAYWRIGHT_ENVIRONMENT ?? "dev";

const localConfig = dotenv.config({ path: `.env.${environment}.local` });
dotenvExpand.expand(localConfig);

const environmentConfig = dotenv.config({ path: `.env.${environment}` });
dotenvExpand.expand(environmentConfig);

const reporters: PlaywrightTestConfig["reporter"] = [
  ["html", { outputFolder: "playwright-report" }],
  ["junit", { outputFile: "test-results/e2e-junit-results.xml" }],
];

if (process.env.CI) {
  reporters.push(
    [
      "./support/SlackReporter.ts",
      {
        token: process.env.SLACK_TOKEN,
        channel: process.env.SLACK_CHANNEL,
        notify: process.env.SLACK_NOTIFY === 'true',
        notifiedUsers: [/* garytierney */ "U5YN0B43S", /* Christine */ "U23H8R73J"],
        notifyOnlyOnFailure: true,
      },
    ],
    ["dot"]
  );
} else {
  reporters.push(["list"]);
}

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
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? "100%" : "50%",
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: reporters,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 10_000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',
    screenshot: "only-on-failure",
    video: "off",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-all-retries",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "frontend-setup",
      testMatch: /frontend\.setup\.ts/,
      testDir: "./tests/setup",
      use: {
        baseURL: process.env.FRONTEND_BASE_URL,
      },
    },
    {
      name: "editor-setup",
      testMatch: /editor\.setup\.ts/,
      testDir: "./tests/setup",
      use: {
        baseURL: process.env.UMBRACO_BASE_URL,
      },
    },
    {
      name: "frontend",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.FRONTEND_BASE_URL,
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
        baseURL: process.env.UMBRACO_BASE_URL,
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
