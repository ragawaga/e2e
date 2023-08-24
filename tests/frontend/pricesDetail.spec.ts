import { expect } from "@playwright/test";

import { createTestFixture } from "../fixture";

import { pricesDetailPageModel } from "./pages/PricesDetailPage";

const test = createTestFixture("pricesDetail", pricesDetailPageModel)

test.describe("Prices detail pages", () => {
  test("Display Ferromanganese price detail page", async ({ pricesDetail, page }) => {
    await page.goto("/price/543");
    
    // Check the title
    expect(pricesDetail.h1).toContain("Ferromanganese EU MC");
    
    expect(pricesDetail._data_testid_content_heading_)
      //.first()
      .toContain("Latest Prices");

    // There should be 2 price cards.
    expect(pricesDetail._data_testid_prices_card_).toHaveLength(2);
    expect(pricesDetail._data_testid_prices_table_).toHaveLength(2);
  });

  test("Display Optical fibre price detail page", async ({ pricesDetail, page }) => {
    await page.goto("/price/1562");
    
    // Check the title
    expect(pricesDetail.h1).toContain("Bare Fibre");

    expect(pricesDetail._data_testid_content_heading_)
    //.first()
      .toContain("Latest Prices");

    // There should only be 1 price card.
    expect(pricesDetail._data_testid_prices_card_).toHaveLength(1);
    expect(pricesDetail._data_testid_prices_table_).toHaveLength(1);
  });
});
