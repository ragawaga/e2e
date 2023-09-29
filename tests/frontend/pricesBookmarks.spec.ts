import { expect } from "@playwright/test";

import { createTestFixture } from "../fixture";

import { pricesWeeklyPageModel } from "./pages/PricesWeeklyPage";

const test = createTestFixture("pricesWeekly", pricesWeeklyPageModel);

const priceId = 1001;
const timeout = 12000;

test.describe("Prices bookmarking @unrestricted", () => {
  test("Should bookmark a price and display in My CRU", async ({
    pricesWeekly,
  }) => {
    // Navigate to the aluminium weekly price tab.
    await pricesWeekly.load("aluminium");

    // Wait for AG-Grid to render and generate a selector.
    await pricesWeekly.page.waitForSelector(".ag-theme-material.prices-table", {
      timeout,
    });

    // Get the aluminium price bookmark button.
    const priceBookmarkButton = pricesWeekly.page.locator(
      `button[data-testId="bookmark-price-button"][data-articleid="${priceId}"]`
    );

    // Check if price is already bookmarked.
    const isBookmarked = await priceBookmarkButton.getAttribute(
      "data-selected"
    );

    // If price is bookmarked, click it to unbookmark.
    // eslint-disable-next-line playwright/no-conditional-in-test
    if (isBookmarked === "true") {
      await priceBookmarkButton.click();
    }

    // Click to bookmark price.
    await priceBookmarkButton.click();

    // Navigate to mycru my-prices tab.
    await pricesWeekly.page.goto("/mycru?tab=my-prices");

    // Check if an anchor is displayed in relation to the bookmarked price.
    const bookmarkedPrice = pricesWeekly.page.locator(
      `a[href="/price/${priceId}"]`
    );

    // Wait for the anchor to appear.
    await bookmarkedPrice.waitFor({ state: "visible", timeout });

    // Check that the bookmarked price is visible.
    await expect(bookmarkedPrice).toBeVisible();
  });
});
