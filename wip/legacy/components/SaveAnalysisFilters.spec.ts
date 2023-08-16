import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../auth";

const _data_testid_chw_filter_widget_type_data_testid_filter_menu_button_ =
  '[data-testid="chw-filter-widget-type"] [data-testid="filter-menu-button"]';
const _data_testid_filter_item_analysis_chw_fw_checkbox =
  '[data-testid="filter-item-analysis"] .chw-fw-checkbox';
const _data_testid_filter_tags_ = '[data-testid="filter-tags"]';
const button_data_testid_save_filters_button_ =
  'button[data-testid="save-filters-button"]';
const _modal_role_dialog_ = '.modal[role="dialog"]';
const _data_testid_article_count_ = '[data-testid="article-count"]';
const _data_testid_input_saved_search_input_ =
  '[data-testid="input-saved-search-input"]';
const _data_testid_saved_search_modal_button_type_submit_ =
  '[data-testid="saved-search-modal"] button[type="submit"]';
const _data_testid_tab_analysis_filters_ =
  '[data-testid="tab-analysis-filters"]';
const _data_testid_saved_searches_list_a =
  '[data-testid="saved-searches-list"] a';
const _originalArticleCount = "@originalArticleCount";
const _returnArticleCount = "@returnArticleCount";
const _data_testid_filter_tags_button = "[data-testid='filter-tags'] button";
const _saved_filters_menu_trigger = "#saved-filters-menu-trigger";
const _data_testid_saved_filters_results_a =
  '[data-testid="saved-filters-results"] a';

test.describe("Save filters", () => {
  test("should Save Filters search and view saved filter search", async ({
    page,
  }) => {
    await page.goto("/analysis");

    page
      .locator(
        _data_testid_chw_filter_widget_type_data_testid_filter_menu_button_,
      )
      .click();

    // Spy on API request
    cy.intercept("POST", "//api/Article/List*").as("setFilters");

    page
      .locator(_data_testid_filter_item_analysis_chw_fw_checkbox)
      .first()
      .click({
        force: true,
      });

    cy.wait("@setFilters"); // <--- wait for setFilters to finish

    page
      .locator(
        _data_testid_chw_filter_widget_type_data_testid_filter_menu_button_,
      )
      .click();

    await expect(page.locator(_data_testid_filter_tags_)).visible();

    page.locator(button_data_testid_save_filters_button_).click();

    await expect(page.locator(_modal_role_dialog_)).visible();

    page
      .locator(_data_testid_article_count_)
      .invoke("text")
      .then((message) => {
        let originalArticleCount = message;
        cy.wrap(originalArticleCount).as("originalArticleCount");
      });

    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const testname = `testname${id}`;

    page.locator(_data_testid_input_saved_search_input_).type(testname);

    page.locator(_data_testid_saved_search_modal_button_type_submit_).click();

    await page.goto("/mycru");

    // Spy on API request
    cy.intercept("GET", "//api/SavedSearch/AllForUser?type=analysis").as(
      "getSavedFilters",
    );

    page.locator(_data_testid_tab_analysis_filters_).click();

    cy.wait("@getSavedFilters"); // <--- wait for getSavedFilters to finish

    page.locator(_data_testid_saved_searches_list_a).first().click();

    page
      .locator(_data_testid_article_count_)
      .invoke("text")
      .then((message) => {
        let returnArticleCount = message;
        cy.wrap(returnArticleCount).as("returnArticleCount");
      });

    page.locator(_originalArticleCount).then((originalArticleCount) => {
      page.locator(_returnArticleCount).then((returnArticleCount) => {
        expect(returnArticleCount).to.contain(originalArticleCount);
      });
    });

    page
      .locator(_data_testid_filter_tags_button)
      .contains("Clear All")
      .click({ force: true });

    page.locator(_saved_filters_menu_trigger).click();

    page.locator(_data_testid_saved_filters_results_a).first().click();

    page
      .locator(_data_testid_article_count_)
      .invoke("text")
      .then((message) => {
        let returnArticleCount = message;
        cy.wrap(returnArticleCount).as("returnArticleCount");
      });

    page.locator(_originalArticleCount).then((originalArticleCount) => {
      page.locator(_returnArticleCount).then((returnArticleCount) => {
        expect(returnArticleCount).to.contain(originalArticleCount);
      });
    });
  });
});
