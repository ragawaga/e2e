# CRU End-to-end Test Suite

## Setting up dependencies

- `yarn install`
- `yarn run playwright install`
- `yarn run playwright test`

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

## Creating test fixtures (Page Object Models)

A test fixture in playwright is additional data that is supplied to each test scenario by the runner. In practice, this allows us to build Page Object Models representing the screens we are testing, and consolidate our layout/expectation logic in one place.

The way this works is by overriding the `test` function on a per-spec basis. An example of this can be seen in the `article.spec.ts` test and the associated `ArticlePage.ts` file:

```typescript
const test = createTestFixture("article", articlePageModel);
```

This call will override the `test` function to supply an additional `article` property alongside the `page` object, where the articles value will be created from the `articlePageModel` function. We can see where that happens here:

```typescript
export const ArticleScreenComponent : ComponentLocatorMap = {
  header: "h1",
  content: { testId: "article-content" },
  authors: { testId: "author-container" },
  authorImages: { testId: "author-image" },
  relatedArticles: { testId: "related-articles-row" },
  platformPriorityTags: { testId: "platform-tags" },
  topicTags: { testId: "topic-tags" },
  featuredArticles: ".featured-article-card",
  attachments: ".attachment-card",
  userMenu: { role: 'button', name: 'John Smith' }
};

export function articlePageModel(page: Page) {
  const screen = createComponentLocators(page, ArticleScreenComponent);

  return {
    async load(id: number) {
      await page.goto(`/analysis/article/${id}/`);
    },
    ...screen,
  };
}
```

The object we return from `articlePageModel` gives us a `load(id)` function, which will handle loading an article page given a numerical ID, and also sets up all of the locators listed in `ArticleScreenComponent`.
The `ComponentLocatorMap` pattern shown currently supports:

- CSS selectors (just a string)
- Test IDs (an object with a `testId` property)
- Role selectors (an object with a `role` property, and any other valid role selector property such as `name`)

This pattern is ultimately a shortcut. The following code below is equivalent for adding a `userMenu` property to the page object model:

```typescript
export function articlePageModel(page: Page) {
  const screen = createComponentLocators(page, ArticleScreenComponent);

  return {
    async load(id: number) {
      await page.goto(`/analysis/article/${id}/`);
    },
    userMenu: page.getByRole('button', { name: 'John Smith' }),
    ...screen,
  };
}
```

Looking back at `article.spec.ts`, we can see how to make use of these properties/functions within a test:

```typescript
  test("should have a body and header", async ({ article, page }) => {
    await article.load(143080);
    await expect(article.header).toBeVisible();
    await expect(article.content).toBeVisible();
    await article.userMenu.click();
  });
```

## Getting notified

The test suite will report its results to Slack on every run. This helps with visibility into test failures and ensuring we're paying proper attention to them. To make sure we're not delivering low signal-to-noise with these notifications there is an option to only be notified when the tests are failing. The results will be posted regardless.

## References

Official Playwright documentation: <https://playwright.dev/docs/intro>
