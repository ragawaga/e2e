import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export const SavedSearchPageConstants = {
  aboutBlank: "about:blank",
  searchTerm: "china"
};

export function SavedSearchPageModel(page: Page) {
  const screen = createComponentLocators(page, {
    savedsearches: { testId: "saved-searches" },
    saveSearchButton: { testId: "save-this-search-button" },
    seeAllButton: { testId: "see-all-button" },
    savedSearchModal: { testId: "saved-search-modal" },
    tabSearches: { testId: "tab-searches" },
    savedSearchesList: { testId: "saved-searches-list" },
    undoButton: { testId: "undo-button" },
    searchInput: { testId: "search-input" },
    searchButton: { testId: "search-button" },
    cancelSavedSearchButton: { testId: "cancel-saved-search" },
    savedSearchesArticleTitle: { testId: "saved-searches-article-title" },
    savedSearchesArticleDeleteButton: { testId: "saved-searches-article-delete" },
    deletedSavedSearchUndoButton: { testId: "undo-button" },
    savedSearchInput: { testId: "input-saved-search-input" },
  });

  return {
    async load() {
      await page.goto(`/search`);
    },
    ...screen,
  };
}
