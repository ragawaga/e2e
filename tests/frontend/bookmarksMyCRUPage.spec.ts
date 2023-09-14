import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";
import { GlobalConstants } from "./pages/Layout";
import { myCRUConstants, myCRUPageModel } from "./pages/MyCRUPage";

const test = createTestFixture("myCRUModel", myCRUPageModel);

test.describe("MyCRU Bookmark Tab", () => {

  test("Check basic My CRU page loads", async ({ page, layout, myCRUModel
  }) => {
    myCRUModel.load();
    await expect(page).toHaveURL(myCRUConstants.myCRUURL);

    //Check banner is there, and contains 'My CRU'
    await expect(layout.header).toHaveText(myCRUConstants.myCRUPageHeader);
  });

  test("Ensure Bookmark tab exits", async ({ myCRUModel
  }) => {
    myCRUModel.load();
    await expect(myCRUModel.bookmarkTab).toHaveText(myCRUConstants.bookmarksTabText);
  });

  test("Ensure there is a list of bookmarks", async ({ page, myCRUModel
  }) => {

    await page.goto(GlobalConstants.home);

    //Bookmark the first 2 items on the Article Listing page, if they aren't already
    //Determine the state of the first bookmark
    const firstBookmark = myCRUModel.bookmarkWidget.nth(0);
    const selected =
      (await firstBookmark.getAttribute(GlobalConstants.isSelectedAttribute)) === "true";

    //If unselected, select and check selected
    if (!selected) {
      await firstBookmark.click();
    }

    //Determine the state of the second bookmark
    const secondBookmark = myCRUModel.bookmarkWidget.nth(1);
    const secondSelected =
      (await secondBookmark.getAttribute(GlobalConstants.isSelectedAttribute)) === "true";

    //If unselected, select and check selected
    if (!secondSelected) {
      await secondBookmark.click();
    }

    //Now visit the MyCRU tab and ensure there are at least 2 bookmarks
    myCRUModel.load();
    await myCRUModel.bookmarkTab.click();
    const countOfBookmarks = await myCRUModel.bookmarkRemoveBtn.count();
    expect(countOfBookmarks).toBeGreaterThan(1);

    //Now delete the first one and check the count has reduced by 1
    await myCRUModel.bookmarkRemoveBtn.first().click();
    const afterDeletionCountOfBookmarks = await myCRUModel.bookmarkRemoveBtn.count();
    expect(afterDeletionCountOfBookmarks).toEqual(countOfBookmarks - 1);

    //Check that the 'undo' slider appears and brings the bookmark back
    await myCRUModel.undoButton.click();
    const afterUndoCountOfBookmarks = await myCRUModel.bookmarkRemoveBtn.count();
    expect(afterUndoCountOfBookmarks).toEqual(countOfBookmarks);

  });

});
