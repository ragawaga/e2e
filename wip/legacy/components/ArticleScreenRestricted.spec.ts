import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../tests/auth";
const h1 = "h1";
const _data_testid_article_content_ = '[data-testid="article-content"]';
const _data_testid_author_container_a_href_mailto_ =
  '[data-testid="author-container"] a[href^="mailto:"]';
const _data_testid_analysts_contact_access_button_ =
  '[data-testid="analysts-contact-access-button"]';

test.describe("Article Screen Restricted", () => {
  const { username, password } = readCredentials(
    "LOGIN_SCREEN__RESTRICTED_CREDENTIALS",
  );

  test("should have a body and header", async ({ page }) => {
    await page.goto("/analysis/article/153266");
    await expect(page.locator(h1)).toBeAttached();
    await expect(page.locator(_data_testid_article_content_)).toBeAttached();
    await expect(
      page.locator(_data_testid_author_container_a_href_mailto_),
    ).not.toBeAttached();
    await expect(
      page.locator(_data_testid_analysts_contact_access_button_),
    ).toBeAttached();
  });
});
