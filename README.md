# CRU End-to-end Test Suite

## Setting up dependencies

- `yarn install`
- `yarn run playwright install`
- `yarn test`

## Configuring environments and credentials

Environment specific configuration is stored in its own individual `dotenv` file. For example:

- `.env.dev` - Development environment
- `.env.uat4` - UAT4 environment

Each of these files can depend on values specified in a user-specific (and `.gitignored`) `.env.local` file:

- `.env.dev.local` - Your local overrides/settings for the development environment

Anything set in `.env.dev.local` can be referenced in `.env.dev` using `$VARIABLE_INTERPOLATION`, but the inverse is not true.

## Running tests

There are 2 primary mechanisms for running the Playwright tests. Both allow execution of individual tests, however the vscode extension will always execute test dependencies (such as login).

### In UI mode

From the command-line, execute the following:

```shell
yarn run playwright test --ui
```

This will open an embedded Chromium instance containing the Playwright trace viewer and test runner.

### From vscode

To install the vscode extension, enter this command into the command palette (Ctrl+P): `ext install ms-playwright.playwright`. Playwright tests should now appear under the `Testing` sidebar.


## Getting notified

The test suite will report its results to Slack on every run. This helps with visibility into test failures and ensuring we're paying proper attention to them. To make sure we're not delivering low signal-to-noise with these notifications there is an option to only be notified when the tests are failing. The results will be posted regardless.

## References

Official Playwright documentation: <https://playwright.dev/docs/intro>
