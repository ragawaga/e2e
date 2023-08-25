import { expect } from "@playwright/test";

import { createTestFixture } from "../fixture";

import { pricesDetailPageModel } from "./pages/PricesDetailPage";

const test = createTestFixture("pricesDetail", pricesDetailPageModel)

test.describe("Prices detail pages", () => {
  test("Display Ferromanganese price detail page", async ({ pricesDetail, page }) => {
    await page.goto("/price/543");
    
    // Check the title
    await expect(pricesDetail.h1).toHaveText(/Ferromanganese EU MC/);
    
    await expect(pricesDetail._data_testid_content_heading_.first())
      .toHaveText("Latest Prices");

    // There should be 2 price cards.
    await expect(pricesDetail._data_testid_prices_card_).toHaveCount(2);
    await expect(pricesDetail._data_testid_prices_table_).toHaveCount(2);
  });

  test("Display Optical fibre price detail page", async ({ pricesDetail, page }) => {
    await page.goto("/price/1562");
    
    // Check the title
    await expect(pricesDetail.h1).toHaveText(/Bare Fibre/);

    await expect(pricesDetail._data_testid_content_heading_.first())
      .toHaveText("Latest Prices");

    // There should only be 1 price card.
    await expect(pricesDetail._data_testid_prices_card_).toHaveCount(1);
    await expect(pricesDetail._data_testid_prices_table_).toHaveCount(1);
  });
});
