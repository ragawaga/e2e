import { expect } from "@playwright/test";
import { GlobalConstants } from "./pages/Layout";

import { createTestFixture } from "../fixture";

import {
  pricesWeeklyConstants,
  pricesWeeklyPageModel,
} from "./pages/PricesWeeklyPage";

const test = createTestFixture("pricesWeekly", pricesWeeklyPageModel);

const timeout = 12000;

test.describe("Prices bookmarking @unrestricted", () => {
  test("Should bookmark a price and display in My CRU", async ({
    pricesWeekly,
  }) => {
    // Navigate to the aluminium weekly price tab.
    await pricesWeekly.load("aluminium");

    pricesWeekly.aggridPricesTable.waitFor,
      {
        state: "visible",
        timeout: timeout,
      };

    // Check if price is already bookmarked.
    const isBookmarked = await pricesWeekly.priceBookmarkButton.getAttribute(
      GlobalConstants.isSelectedAttribute
    );

    // If price is bookmarked, click it to unbookmark.
    // eslint-disable-next-line playwright/no-conditional-in-test
    if (isBookmarked === "true") {
      await pricesWeekly.priceBookmarkButton.click();
    }

    // Click to bookmark price.
    await pricesWeekly.priceBookmarkButton.click();

    // Navigate to mycru my-prices tab.
    await pricesWeekly.page.goto(pricesWeeklyConstants.myPricesTab);

    // Wait for the anchor to appear.
    await pricesWeekly.bookmarkedPrice.waitFor({ state: "visible", timeout });

    // Check that the bookmarked price is visible.
    await expect(pricesWeekly.bookmarkedPrice).toBeVisible();
  });
});
