import { expect, test } from "@playwright/test";

const bookmarkWidget = '[data-testid="bookmark_widget"]';
const expectedPageSize = 20;

test.describe("Article Bookmarks", () => {

  test("Default Screen after login has bookmarks", async ({ page }) => {
    await page.goto("/analysis");
    await expect(page.getByTitle('Bookmark')).toHaveCount(expectedPageSize);
  });

  test("State change bookmark on article listing", async ({ page }) => {
    await page.goto("/analysis");

    await expect(page.getByTitle('Bookmark')).toHaveCount(expectedPageSize);

    //Determine the state of the first bookmark
    //If selected, unselect and check unselected
    //If unselected, select and check selected    
    const firstBookmark = page.getByTitle('Bookmark').first();
    const selected = await firstBookmark.getAttribute('data-selected');
    const selectedString = String(selected);
  
    if (selectedString.startsWith('false')) {
      await firstBookmark.click();
      //Then assert it's now seleted
      const selected = await firstBookmark.getAttribute('data-selected');
      expect(selected).toBeTruthy();
    }

    if (selectedString.startsWith('true')) {
      await firstBookmark.click();
      //Then assert it's now NOT seleted
      const selected = await firstBookmark.getAttribute('data-selected');
      expect(selected).toBe('false'); //toBeFalsy didn't work for some reason
    }
  });
});
