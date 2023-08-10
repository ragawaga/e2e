import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../auth";

const h1 = "h1";
const _data_testid_content_heading_ = '[data-testid="content-heading"]';
const _data_testid_prices_card_ = '[data-testid="prices-card"]';
const _data_testid_prices_table_ = '[data-testid="prices-table"]';

test.describe("Prices detail pages", () => {
  test("Display Ferromanganese price detail page", async ({ page }) => {
    await page.goto("/price/543");
    // Check the title
    page.locator(h1).contains("Ferromanganese EU MC");
    page
      .locator(_data_testid_content_heading_)
      .first()
      .contains("Latest Prices");

    // There should be 2 price cards.
    await expect(page.locator(_data_testid_prices_card_)).toHaveLength(2);
    await expect(page.locator(_data_testid_prices_table_)).toHaveLength(2);
  });

  test("Display Optical fibre price detail page", async ({ page }) => {
    await page.goto("/price/1562");
    // Check the title
    page.locator(h1).contains("Bare Fibre");

    page
      .locator(_data_testid_content_heading_)
      .first()
      .contains("Latest Prices");

    // There should only be 1 price card.
    await expect(page.locator(_data_testid_prices_card_)).toHaveLength(1);
    await expect(page.locator(_data_testid_prices_table_)).toHaveLength(1);
  });
});
