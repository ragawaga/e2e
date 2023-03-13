import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../auth";

test.describe("a logged in user with full permissions", () => {
  asAuthenticatedUser();

  test.beforeEach(async ({ page }) => {
    await page.goto("/analysis");
  });

  test("can see the analysis page", async ({ context, page }) => {
    const articleCounter = page.getByTestId("number-of-articles");
    const articles = page.locator("article.chw-article-item");

    await expect(page).toHaveTitle(/Commodity Market Analysis/);
    await expect(articleCounter).toBeVisible();
    await expect(articles).toHaveCount(20);
  });

  test("can click article titles through to a view page", async ({ page }) => {
    const articleLink = page.getByTestId("article-item-heading-link").first();
    await articleLink.click();

    await expect(page).toHaveURL(/article/);
  });
});
