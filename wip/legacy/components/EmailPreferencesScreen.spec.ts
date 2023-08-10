import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../tests/auth";

const _chw_header_user_moniker = "#chw-header-user-moniker";
const _chw_tab_list = ".chw-tab-list";
const _data_testid_tab_email_preferences_ =
  '[data-testid="tab-email-preferences"]';
const _data_testid_preferences_title_news_alerts_ =
  '[data-testid="preferences-title-news-alerts"]';
const _data_testid_preferences_title_product_alerts_ =
  '[data-testid="preferences-title-product-alerts"]';
const _data_testid_preferences_title_market_alerts_ =
  '[data-testid="preferences-title-market-alerts"]';
const _data_testid_preferences_title_fertilizers_ =
  '[data-testid="preferences-title-fertilizers"]';
const _data_testid_preferences_title_price_alerts_ =
  '[data-testid="preferences-title-price-alerts"]';
const fieldset = "fieldset";
const _data_testid_preferences_container_ =
  '[data-testid="preferences-container"]';
const _chw_fw_checkbox_description = ".chw-fw-checkbox__description";
const _chw_fw_checkbox = ".chw-fw-checkbox";
const _id_preference_1_ = '[id="preference-1"]';

test.describe("Email preferences Screen", () => {
  test("should have the correct Email Preferences page structure", async ({
    page,
  }) => {
    //Click Account Setting link from the user menu
    page.locator(_chw_header_user_moniker).contains("Account Settings").click({
      force: true,
    });

    //Check tabs are there. Second tab should contain 'Email Preferences'
    await expect(page.locator(_chw_tab_list)).contain("Email Preferences");

    // Navigate to the Email preferences tab
    page.locator(_data_testid_tab_email_preferences_).click();

    // Check for the Email preferences lists
    await expect(
      page.locator(_data_testid_preferences_title_news_alerts_),
    ).contain("News Alerts");
    await expect(
      page.locator(_data_testid_preferences_title_product_alerts_),
    ).contain("Product Alerts");
    await expect(
      page.locator(_data_testid_preferences_title_market_alerts_),
    ).contain("Market Alerts");
    await expect(
      page.locator(_data_testid_preferences_title_fertilizers_),
    ).contain("Fertilizers");
    await expect(
      page.locator(_data_testid_preferences_title_price_alerts_),
    ).contain("Price Alerts");

    //Check for the explanatory text on each of the 3 elements which have 'group' text
    await expect(page.locator(fieldset).children().first()).contain(
      "News Alerts are sent out weekly for each commodity group",
    );

    await expect(page.locator(fieldset).children().first().next()).contain(
      "Product Alerts inform you of newly published content and documents available for your CRU subscriptions.",
    );

    await expect(
      page.locator(fieldset).children().first().next().next(),
    ).contain(
      "Market Alerts are emails sent to highlight new content including notifications, market stories, or price notices.",
    );

    //Check for the 'individual' explanatory text
    await expect(page.locator(_chw_fw_checkbox_description)).toHaveLength(23);
    await expect(page.locator(_chw_fw_checkbox_description).first()).contain(
      "Sent every Friday to provide an update for the Fertilizer Market in China.",
    );

    // Count the number of checkboxes
    await expect(page.locator(_chw_fw_checkbox)).toHaveLength(30);
    // Count the number of radio buttons
    await expect(page.locator(_id_preference_1_).children()).toHaveLength(2);
  });
  test("can navigate directly to the page tab", async ({ page }) => {
    //Click Email preferences link from the user menu - check direct access to the tab works
    page.locator(_chw_header_user_moniker).contains("Email Preferences").click({
      force: true,
    });

    // Check for the Email preferences lists
    await expect(
      page.locator(_data_testid_preferences_title_news_alerts_),
    ).contain("News Alerts");
    await expect(
      page.locator(_data_testid_preferences_title_product_alerts_),
    ).contain("Product Alerts");
    await expect(
      page.locator(_data_testid_preferences_title_market_alerts_),
    ).contain("Market Alerts");
    await expect(
      page.locator(_data_testid_preferences_title_fertilizers_),
    ).contain("Fertilizers");
    await expect(
      page.locator(_data_testid_preferences_title_price_alerts_),
    ).contain("Price Alerts");
  });
});
