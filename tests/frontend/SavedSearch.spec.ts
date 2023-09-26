import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";
import { SavedSearchPageConstants, SavedSearchPageModel } from "./pages/SavedSearchPage";

const test = createTestFixture("savedSearchModel", SavedSearchPageModel);

test.describe("Searches and MyCru Page", () => {

  test("Search page has saved searches component", async ({ page, savedSearchModel }) => {
    await page.goto("/search");
    await expect(savedSearchModel.savedsearches).toBeVisible();
    await expect(savedSearchModel.saveSearchButton).toBeVisible();
    await expect(savedSearchModel.seeAllButton).toBeVisible();
  });

  test("Can save search", async ({ page, savedSearchModel }) => {
    await page.goto("/search");
    await expect(savedSearchModel.searchInput).toBeVisible();
    await savedSearchModel.searchInput.fill(SavedSearchPageConstants.searchTerm);
    await savedSearchModel.searchButton.click();

    //save the search using the modal
    //click saved search button
    await expect(savedSearchModel.saveSearchButton).toBeVisible();
    await savedSearchModel.saveSearchButton.click();

    let randomNumber = Math.random().toString().substring(2);
    //see saved search modal, enter text and click Save button
    await expect(savedSearchModel.savedSearchModal).toBeVisible();
    await savedSearchModel.savedSearchInput.fill(SavedSearchPageConstants.searchTerm + " saved search_" + randomNumber);
    await page.locator('"Save"').click();

    await expect(savedSearchModel.savedsearches).toContainText(
      SavedSearchPageConstants.searchTerm + " saved search_" + randomNumber
    );
  });

  test("Can cancel save search", async ({ page, savedSearchModel }) => {
    await page.goto("/search");
    //enter a search term
    await expect(savedSearchModel.searchInput).toBeVisible();
    await savedSearchModel.searchInput.fill(SavedSearchPageConstants.searchTerm);
    await savedSearchModel.searchButton.click();

    //click saved search button
    await expect(savedSearchModel.saveSearchButton).toBeVisible();
    await savedSearchModel.saveSearchButton.click();

    //see saved search modal and click cancel button
    await expect(savedSearchModel.savedSearchModal).toBeVisible();
    await expect(savedSearchModel.cancelSavedSearchButton).toBeVisible();
    await savedSearchModel.cancelSavedSearchButton.click();

    //search modal will disappear
    await expect(savedSearchModel.savedSearchModal).not.toBeVisible();
  });

  test("Can navigate to MyCru searches tab", async ({ page, savedSearchModel }) => {
    await page.goto("/search");
    await expect(savedSearchModel.searchInput).toBeVisible();
    await savedSearchModel.searchInput.fill(SavedSearchPageConstants.searchTerm);
    await savedSearchModel.searchButton.click();

    //save the search using the modal
    //click saved search button
    await expect(savedSearchModel.saveSearchButton).toBeVisible();
    await savedSearchModel.saveSearchButton.click();

    //see saved search modal, enter text and click Save button
    await expect(savedSearchModel.savedSearchModal).toBeVisible();
    await savedSearchModel.savedSearchInput.fill(SavedSearchPageConstants.searchTerm + " saved search_" + Math.random().toString().substring(2));
    await page.locator('"Save"').click();

    await page.goto("/mycru");

    await expect(savedSearchModel.tabSearches).toBeVisible();
    await savedSearchModel.tabSearches.click();
    await expect(savedSearchModel.savedSearchesList).toBeVisible();
  });

  test("Saved searches is a list of clickable links", async ({ page, savedSearchModel }) => {
    await page.goto("/mycru");
    await expect(savedSearchModel.tabSearches).toBeVisible();
    await savedSearchModel.tabSearches.click();
    await expect(savedSearchModel.savedSearchesList).toBeVisible();

    //expect search item to be visible
    await expect(savedSearchModel.savedSearchesArticleTitle.first()).toBeVisible();
  });

  test("Can delete a saved search", async ({ page, savedSearchModel }) => {
    await page.goto("/search");
    await expect(savedSearchModel.searchInput).toBeVisible();
    await savedSearchModel.searchInput.fill(SavedSearchPageConstants.searchTerm);
    await savedSearchModel.searchButton.click();

    //save the search using the modal
    //click saved search button
    await expect(savedSearchModel.saveSearchButton).toBeVisible();
    await savedSearchModel.saveSearchButton.click();

    let randomNumber = Math.random().toString().substring(2);
    //see saved search modal, enter text and click Save button
    await expect(savedSearchModel.savedSearchModal).toBeVisible();
    await savedSearchModel.savedSearchInput.fill(SavedSearchPageConstants.searchTerm + " saved search_" + randomNumber);
    await page.locator('"Save"').click();

    await page.goto("/mycru");
    await expect(savedSearchModel.tabSearches).toBeVisible();
    await savedSearchModel.tabSearches.click();
    await expect(savedSearchModel.savedSearchesList).toBeVisible();

    //expect search item to be visible
    await expect(savedSearchModel.savedSearchesArticleTitle.getByText(SavedSearchPageConstants.searchTerm + " saved search_" + randomNumber).first()).toBeVisible();

    await expect(savedSearchModel.savedSearchesArticleDeleteButton.first()).toBeVisible();
    await savedSearchModel.savedSearchesArticleDeleteButton.first().click();

    //initial saved search not visible now
    await expect(savedSearchModel.savedSearchesArticleTitle.getByText(SavedSearchPageConstants.searchTerm + " saved search_" + randomNumber).first()).not.toBeVisible();
  });


  test("Can undo a deleted saved search", async ({ page, savedSearchModel }) => {
    await page.goto("/mycru");
    await expect(savedSearchModel.tabSearches).toBeVisible();
    await savedSearchModel.tabSearches.click();
    await expect(savedSearchModel.savedSearchesList).toBeVisible();

    let randomNumber = Math.random().toString().substring(2);
    //expect search item to be visible
    await expect(savedSearchModel.savedSearchesArticleTitle.getByText(SavedSearchPageConstants.searchTerm + " saved search_" + randomNumber).first()).toBeVisible();

    await expect(savedSearchModel.savedSearchesArticleDeleteButton.first()).toBeVisible();
    await savedSearchModel.savedSearchesArticleDeleteButton.first().click();

    await expect(savedSearchModel.deletedSavedSearchUndoButton).toBeVisible();
    await savedSearchModel.deletedSavedSearchUndoButton.getByRole('button').first().click();

    //expect search item to be visible
    await expect(savedSearchModel.savedSearchesArticleTitle.getByText(SavedSearchPageConstants.searchTerm + " saved search_" + randomNumber).first()).toBeVisible();
  });
});

