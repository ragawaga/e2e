import { expect, test } from "@playwright/test";

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
    const selected = await firstBookmark.getAttribute("data-selected") === "true";

    //If unselected, select and check selected
    if (!selected) {
      await firstBookmark.click();
      //Then assert it's now seleted
      await expect(firstBookmark).toHaveAttribute("data-selected", "true");
    }
    //Otherwise it was selected, so unselect and check unselected
    else {
      await firstBookmark.click();
      //Then assert it's now NOT seleted
      await expect(firstBookmark).toHaveAttribute("data-selected", "false");
    }
  });
});
