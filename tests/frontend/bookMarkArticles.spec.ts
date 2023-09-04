import { expect, test } from "@playwright/test";
import { GlobalConstants } from "./pages/Layout";

const expectedPageSize = 20;

test.describe("Article Bookmarks", () => {
  test("Default Screen after login has the bookmarks on every article", async ({
    page,
  }) => {
    await page.goto("/analysis");
    await expect(page.getByTitle("Bookmark")).toHaveCount(expectedPageSize);
  });

  test("Can change the state of the bookmark on article listing", async ({
    page,
  }) => {
    await page.goto("/analysis");

    await expect(page.getByTitle("Bookmark")).toHaveCount(expectedPageSize);

    //Determine the state of the first bookmark
    const firstBookmark = page.getByTitle("Bookmark").first();
    const selected: boolean =
      (await firstBookmark.getAttribute(GlobalConstants.isSelectedAttribute)) === "true";

    //If unselected, select and check selected
    //Otherwise it was selected, so unselect and check unselected
    const notSelectedStr: string = (!selected).toString()
    await firstBookmark.click();
    await expect(firstBookmark).toHaveAttribute(GlobalConstants.isSelectedAttribute, notSelectedStr);

  });
});
