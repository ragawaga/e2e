import { expect, test } from "@playwright/test";

const h1 = "h1";
const _data_testid_content_heading_ = '[data-testid="content-heading"]';
const _data_testid_prices_card_ = '[data-testid="prices-card"]';
const _data_testid_prices_table_ = '[data-testid="prices-table"]';

test.describe("Prices detail pages", () => {
  test("Display Ferromanganese price detail page", async ({ page }) => {
    await page.goto("/price/543");
    
    // Check the title
    expect(page.locator(h1)).toContain("Ferromanganese EU MC");
    
    expect(page
      .locator(_data_testid_content_heading_)
      .first())
      .toContain("Latest Prices");

    // There should be 2 price cards.
    expect(page.locator(_data_testid_prices_card_)).toHaveLength(2);
    expect(page.locator(_data_testid_prices_table_)).toHaveLength(2);
  });

  test("Display Optical fibre price detail page", async ({ page }) => {
    await page.goto("/price/1562");
    
    // Check the title
    expect(page.locator(h1)).toContain("Bare Fibre");

    expect(page
      .locator(_data_testid_content_heading_)
      .first())
      .toContain("Latest Prices");

    // There should only be 1 price card.
    expect(page.locator(_data_testid_prices_card_)).toHaveLength(1);
    expect(page.locator(_data_testid_prices_table_)).toHaveLength(1);
  });
});
