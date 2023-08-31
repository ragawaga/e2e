import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export const myCRUConstants = {
  bookmarksTabText: "Bookmarks",
  myCRUURL: "/mycru",
  myCRUPageHeader: "My CRU",
};

export function myCRUPageModel(page: Page) {
  const screen = createComponentLocators(page, {
    bookmarkTab: { role: "tab", name: 'Bookmarks', exact: true },
    bookmarkRemoveBtn: { testId: "bookmark-remove-button" },
    bookmarkWidget: { testId: "bookmark_widget" },
    undoButton: { role: "button", name: 'Undo', exact: true },
  });

  return {
    async load() {
      await page.goto(`/mycru`);
    },
    ...screen,
  };
}
