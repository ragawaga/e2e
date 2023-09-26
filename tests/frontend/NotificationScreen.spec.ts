import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";
import { notificationArticleConstants, notificationsArticlePageModel } from "./pages/NotificationsArticlePage";

const test = createTestFixture("notificationArticle", notificationsArticlePageModel);

test.describe("Notification Article Screen @unrestricted", () => {
  test("should have a body and header", async ({ notificationArticle, page, layout }) => {
    // It should have a title in the banner.
    // It should have a Publication date and Bodytext.
    // Bookmark option should not be available
    // Print (browser default option) should be available
    await notificationArticle.load(notificationArticleConstants.articleWithAuthorAndTags);
    await expect(layout.header).toBeVisible();
    await expect(notificationArticle.content).toBeVisible();
    await expect(notificationArticle.articleDate).toBeVisible();
    await expect(page.getByTitle("Bookmark")).not.toBeAttached();
    await expect(layout.printIcon).toBeVisible();
  });

  test("notification contains an author", async ({ notificationArticle, layout }) => {
    await notificationArticle.load(notificationArticleConstants.articleWithAuthorAndTags);
    await expect(layout.header).toBeVisible();
    await expect(notificationArticle.content).toBeVisible();
    await expect(notificationArticle.authorImages.first()).toBeVisible();
  });

  test("notification does not contain an author", async ({ notificationArticle, layout }) => {
    await notificationArticle.load(notificationArticleConstants.articleWithoutAuthor);
    await expect(layout.header).toBeVisible();
    await expect(notificationArticle.content).toBeVisible();
    await expect(notificationArticle.authors).toBeHidden();
  });
});

test.describe("tags @unrestricted", () => {
  test.beforeEach(async ({ notificationArticle }) => await notificationArticle.load(notificationArticleConstants.articleWithAuthorAndTags));

  test("article contains platform priority tags", async ({ notificationArticle }) => {
    await expect(notificationArticle.platformPriorityTags).toHaveText("price notice");
  });

  test("article contains topic tags", async ({ notificationArticle }) => {
    await expect(notificationArticle.topicTags).toHaveText("Prices");
  });
});

test.describe("media @unrestricted", () => {
  test("article contains document links", async ({ notificationArticle }) => {
    //Downloads section of the template should be presented, if there are 1 or more documents attached to the article.
    await notificationArticle.load(notificationArticleConstants.articleWithAuthorAndTags);
    await expect(notificationArticle.attachments).toHaveCount(1);
  });
});

test.describe("does NOT have featured and related items @unrestricted", () => {
  test.beforeEach(async ({ notificationArticle }) => await notificationArticle.load(notificationArticleConstants.articleWithAuthorAndTags));

  test("article does NOT contains related articles", async ({ notificationArticle }) => {
    await expect(notificationArticle.relatedArticles.first()).not.toBeVisible();
  });

  test("does NOT have featured analysis cards", async ({ notificationArticle }) => {
    await expect(notificationArticle.featuredArticles).toHaveCount(0);
  });
});