import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../auth";

const h1 = "h1";
const _data_testid_article_date_ = '[data-testid="article-date"';
const _data_testid_article_content_ = '[data-testid="article-content"]';
const _data_testid_article_print_btn_ = '[data-testid="article-print-btn"';
const _data_testid_attachment_container_ =
  '[data-testid="attachment-container"]';
const _data_testid_bookmark_widget_ = '[data-testid="bookmark_widget"]';
const _data_testid_platform_tags_ = '[data-testid="platform-tags"]';
const _data_testid_featured_title_header_ =
  '[data-testid="featured-title-header"]';

test.describe("Notification Screen", () => {
  const articleUrl = "/notifications/article/141704/";
  const articleUrlTags = "/notifications/article/142983/";

  test("should have a title, body and header", async ({ page }) => {
    await page.goto(articleUrl);
    // It should have a title in the banner.
    // It should have a Publication date and Bodytext.
    // It may have a subtitle.
    // Bookmark option should not be available
    // Print (browser default option) should be available
    //Downloads section of the template should be presented, if there are 1 or more documents attached to the article.

    await expect(page.locator(h1)).toBeAttached();
    await expect(page.locator(_data_testid_article_date_)).toBeAttached();
    await expect(page.locator(_data_testid_article_content_)).toBeAttached();
    await expect(page.locator(_data_testid_article_print_btn_)).toBeAttached();
    await expect(
      page.locator(_data_testid_attachment_container_),
    ).toBeAttached();
    await expect(
      page.locator(_data_testid_bookmark_widget_),
    ).not.toBeAttached();
  });

  test("notification contains platform priority tags", async ({ page }) => {
    await page.goto(articleUrlTags);

    //Check for the platform priority tags on the notification article
    await expect(page.locator(_data_testid_platform_tags_)).toBeAttached();
  });

  test("article does not contain featured analysis", async ({ page }) => {
    await page.goto(articleUrlTags);

    //Check there are no featured analysis
    await expect(
      page.locator(_data_testid_featured_title_header_),
    ).not.toBeAttached();
  });
});
