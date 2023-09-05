import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";
import { articlePageModel } from "./pages/ArticlePage";

const test = createTestFixture("article", articlePageModel);

test.describe("Article Screen", () => {
  test("should have a body and header", async ({ article, page, layout }) => {
    await page.goto("/analysis/article/143080");
    await expect(layout.header).toBeVisible();
    await expect(article.content).toBeVisible();
  });

  test.describe("authors", () => {
    test("article contains an author", async ({ article }) => {
      await article.load(132636);
      await expect(article.authorImages.first()).toBeVisible();
    });

    test("article does not contain an author", async ({ article }) => {
      await article.load(132643);
      await expect(article.authors).toBeHidden();
    });
  });

  test.describe("tags", () => {
    test.beforeEach(async ({ article }) => await article.load(142939));

    test("article contains platform priority tags", async ({ article }) => {
      await expect(article.platformPriorityTags).toHaveText("markets");
    });

    test("article contains topic tags", async ({ article }) => {
      await expect(article.topicTags).toHaveText("Trade");
    });
  });

  test.describe("media", () => {
    test("article contains document links", async ({ article }) => {
      await article.load(142709);
      await expect(article.attachments).toHaveCount(2);
    });

    test("article contains image", async ({ article }) => {
      await article.load(139961);
      await expect(article.content.locator("img").first()).toBeVisible();
    });
  });

  test.describe("has featured and related items", () => {
    test.beforeEach(async ({ article }) => await article.load(143080));

    test("article contains relevant articles", async ({ article }) => {
      await expect(article.relatedArticles.first()).toBeVisible();
    });

    test("has 4 featured analysis cards", async ({ article }) => {
      await expect(article.featuredArticles).toHaveCount(4);
    });
  });
});
