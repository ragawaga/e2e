import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../auth";


const { username, password } = readCredentials(
  "LOGIN_SCREEN__GOOD_CREDENTIALS",
);

const searchTerm = "china";

const _data_testid_saved_searches_ = '[data-testid="saved-searches"]';
const _data_testid_save_this_search_button_ =
  '[data-testid="save-this-search-button"]';
const _data_testid_see_all_button_ = '[data-testid="see-all-button"]';
const _data_testid_saved_searches_ = "[data-testid='saved-searches']";
const _data_testid_saved_search_modal_ = '[data-testid="saved-search-modal"]';
const _data_testid_tab_searches_ = '[data-testid="tab-searches"]';
const _data_testid_saved_searches_list_ = '[data-testid="saved-searches-list"]';
const _nth_child_2_data_testid_undo_button_ =
  ':nth-child(2) > [data-testid="undo-button"]';
const _data_testid_undo_button_ = '[data-testid="undo-button"]';

test.describe("Saved search component", () => {
  test("Search page has saved searches component", async ({ page }) => {
    login(username, password);
    await page.goto("/search");

    await expect(page.locator(_data_testid_saved_searches_)).toBeAttached();
    await expect(
      page.locator(_data_testid_save_this_search_button_),
    ).toBeAttached();
    await expect(page.locator(_data_testid_see_all_button_)).toBeAttached();
  });

  test("Can save search", async ({ page }) => {
    login(username, password);
    await page.goto("/search");

    performSearch(searchTerm);

    const { submitBtn } = inputSavedSearch(searchTerm);

    submitBtn.click();
    await expect(
      page
        .locator(_data_testid_saved_searches_)
        .contains(`${searchTerm} saved search`),
    ).toBeAttached();
  });

  test("Can cancel save search", async ({ page }) => {
    login(username, password);
    await page.goto("/search");

    performSearch(searchTerm);

    inputSavedSearch(searchTerm);

    page
      .locator(_data_testid_saved_search_modal_)
      .find("[data-testid='cancel-saved-search']")
      .click();
    await expect(
      page.locator(_data_testid_saved_search_modal_),
    ).not.toBeAttached();
  });
});

const navigateToSavedSearches = () => {
  cy.visit("/mycru");

  cy.get(_data_testid_tab_searches_).click();
  return cy.get(_data_testid_saved_searches_list_);
};

test.describe("Saved search tab", () => {
  test("Can navigate to MyCru searches tab", async ({ page }) => {
    login(username, password);
    const savedSearchesList = navigateToSavedSearches();

    await expect(savedSearchesList).toBeAttached();
  });

  test("Saved searches is a list of clickable links", async ({ page }) => {
    login(username, password);

    const savedSearchesList = navigateToSavedSearches();

    await expect(
      savedSearchesList.find('[data-testid="saved-searches-article-title"]'),
    ).toBeAttached();
    (await expect(savedSearchesList.find("a")).have.attr("href"))
      .and("match", /\/search/)
      .and("match", /queries=/);
  });

  test("Can delete a saved search", async ({ page }) => {
    login(username, password);
    const savedSearchesList = navigateToSavedSearches();

    const itemTitle = savedSearchesList
      .find('[data-testid="saved-searches-article-title"]')
      .contains(`${searchTerm} saved search`);
    const deleteBtn = itemTitle
      .parentsUntil("li")
      .find('[data-testid="saved-searches-article-delete"]');

    deleteBtn.click();
  });

  test("Can undo delete a saved search", async ({ page }) => {
    login(username, password);
    const savedSearchesList = navigateToSavedSearches();

    const itemTitle = savedSearchesList
      .find('[data-testid="saved-searches-article-title"]')
      .contains(`${searchTerm} saved search`);
    const deleteBtn = itemTitle
      .parentsUntil("li")
      .find('[data-testid="saved-searches-article-delete"]');

    deleteBtn.click();

    //Check the item is deleted from the screen
    await expect(deleteBtn).not.toBeAttached();

    // Check we can see the toast and click the undo button.
    //Check that there is only one toaster (as we had a bug that showed 2 at one point)
    await expect(
      page.locator(_nth_child_2_data_testid_undo_button_),
    ).not.toBeAttached();
    page.locator(_data_testid_undo_button_).click();

    //Check the item is back on the screen
    await expect(deleteBtn).toBeAttached();
  });
});
