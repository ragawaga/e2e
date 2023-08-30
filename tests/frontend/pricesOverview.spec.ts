import { expect } from "@playwright/test";

import { createTestFixture } from "../fixture";

import { pricesOverviewPageModel } from "./pages/PricesOverviewPage";

const test = createTestFixture("pricesOverview", pricesOverviewPageModel)

// const _data_testid_tab_overview_ = '[data-testid="tab-overview"]';
// const _data_testid_prices_card_ = '[data-testid="prices-card"]';
// const _data_testid_prices_card_title_ = '[data-testid="prices-card-title"]';
// const _data_testid_prices_card_price_value_ =
//   '[data-testid="prices-card-price-value"]';
// const _data_testid_prices_card_price_unit_ =
//   '[data-testid="prices-card-price-unit"]';
// const _data_testid_prices_card_change_value_ =
//   '[data-testid="prices-card-change-value"]';
// const _data_testid_prices_card_change_label_ =
//   '[data-testid="prices-card-change-label"]';
// const _data_testid_prices_card_footnote_date_ =
//   '[data-testid="prices-card-footnote-date"]';
// const _data_testid_prices_card_footnote_frequency_ =
//   '[data-testid="prices-card-footnote-frequency"]';
const _article_stream_list = ".article-stream-list";
// const _data_testid_article_item_heading_link_ =
//   '[data-testid="article-item-heading-link"]';
const _highcharts_container = ".highcharts-container";

test.describe("Prices overview tab page", () => {
  test("Display Latest Prices price cards", async ({ page, pricesOverview }) => {
    await page.goto("/prices/aluminium?tab=overview");

    await expect(pricesOverview.overviewTab).toBeAttached();

    await expect(pricesOverview.pricesCard.count()).toBeGreaterThan(0)

    page.locator(_data_testid_prices_card_title_).each(($priceCardTitle) => {
      expect($priceCardTitle.length).to.be.gt(0);
    });

    page
      .locator(_data_testid_prices_card_price_value_)
      .each(($priceCardPriceValue) => {
        expect($priceCardPriceValue.length).to.gt(0);
      });

    page
      .locator(_data_testid_prices_card_price_unit_)
      .each(($priceCardPriceUnit) => {
        expect($priceCardPriceUnit.length).to.gt(0);
      });

    page
      .locator(_data_testid_prices_card_change_value_)
      .each(($priceCardChangeValue) => {
        expect($priceCardChangeValue.length).to.gt(0);
      });

    page
      .locator(_data_testid_prices_card_change_label_)
      .each(($priceCardChangeLabel) => {
        expect($priceCardChangeLabel.length).to.gt(0);
      });

    page
      .locator(_data_testid_prices_card_footnote_date_)
      .each(($priceCardFootnoteDate) => {
        expect($priceCardFootnoteDate.length).to.gt(0);
      });

    page
      .locator(_data_testid_prices_card_footnote_frequency_)
      .each(($priceCardFootnoteFrequency) => {
        expect($priceCardFootnoteFrequency.length).to.gt(0);
      });
  });

  test("Article stream list", async ({ page }) => {
    await page.goto("/prices/aluminium?tab=overview");

    await expect(page.locator(_article_stream_list)).toBeAttached();

    (
      await expect(
        page.locator(_data_testid_article_item_heading_link_),
      ).have.attr("href")
    ).then((href) => {
      expect(href.length).to.gt(0);
    });

    page
      .locator(_data_testid_article_item_heading_link_)
      .each(($articleItemHeadingLink) => {
        expect($articleItemHeadingLink.length).to.gt(0);
      });
  });

  test("Price charts", async ({ page }) => {
    await page.goto("/prices/aluminium?tab=overview");

    page.locator(_highcharts_container).each(($highchartsContainer) => {
      expect($highchartsContainer.length).to.gt(0);
    });
  });
});
