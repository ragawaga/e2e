import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../auth";

const _data_articleid_1001_ = '[data-articleid="1001"]';
const _flex_1 = ".flex-1";
const _data_selected_true_ = '[data-selected="true"]';
const _data_testid_bookmark_price_button_ =
  '[data-testid="bookmark-price-button"]';
const _originalText = "@originalText";
const _data_testid_prices_card_title_ = '[data-testid="prices-card-title"]';
const _myCruText = "@myCruText";
const button = "button";

test.describe("Save filters", () => {
  test("should Save Prices Bookmark", async ({ page }) => {
    await page.goto("/prices/aluminium?tab=weekly");

    cy.wait(3000);

    page
      .locator(_data_articleid_1001_)
      .invoke("attr", "data-selected")
      .then(($el) => {
        if ($el === "true") {
          // Unbookmark the price before we test.
          page.locator(_data_articleid_1001_).click();
        }
      });

    cy.wait(1000);

    // Now bookmark the price.
    page.locator(_data_articleid_1001_).click({
      force: true,
    });

    cy.wait(1000);

    page
      .locator(_flex_1)
      .first()
      .invoke("text")
      .then((message) => {
        let originalText = message;
        cy.wrap(originalText).as("originalText");
      });

    await page.goto("/mycru?tab=my-prices");

    page.locator<string>(_originalText).then((name) => {
      page
        .locator(_data_testid_prices_card_title_)
        .contains(name.slice(0, -1))
        .first()
        .invoke("text")
        .then((message) => {
          let myCruText = message;
          cy.wrap(myCruText).as("myCruText");
        });
    });

    page.locator(_originalText).then((originalText) => {
      page.locator(_myCruText).then((myCruText) => {
        expect(myCruText).to.contain(originalText.slice(0, -1));
      });
    });

    cy.wait(1000);

    page.locator<string>(_originalText).then((name) => {
      page
        .locator(_data_testid_prices_card_title_)
        .contains(name.slice(0, -1))
        .parent()
        .within(($priceCard) => {
          page.locator(button).first().click({
            force: true,
          });
        });
    });
  });
});
