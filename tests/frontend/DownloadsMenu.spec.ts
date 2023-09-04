import { expect } from "@playwright/test";
import { GlobalConstants } from "./pages/Layout";
import { DownloadsMenuPageModel } from "./pages/DownloadsMenuPage";
import { createTestFixture } from "../fixture";

const test = createTestFixture("downloadsMenuModel", DownloadsMenuPageModel);

test.describe("Downloads Page", () => {

  test("Downloads menu item should exist", async ({ page, downloadsMenuModel }) => {
    await page.goto("/");
    await expect(downloadsMenuModel.downloadsHref).toBeVisible();
  });

  test("Navigate to Downloads page", async ({ page, layout }) => {
     await page.goto("/downloads");
     await expect (layout.header).toHaveText(GlobalConstants.downloadsPageTitle);
  
     await layout.downloadsTopNav.click();
     await expect(page).toHaveURL(GlobalConstants.downloadsPageURL);
     await expect(layout.header).toHaveText(GlobalConstants.downloadsPageTitle);
  
  });

  test("Direct Navigation to downloads", async ({ page, downloadsMenuModel }) => {
     await page.goto("/downloads");
     await expect(downloadsMenuModel.downloadsHref).toBeVisible();
     await page.locator(downloadsMenuModel.chwPageBanner + " " + downloadsMenuModel.header + ':text("Downloads")');
   });

  test("Download Item are available", async ({ page, downloadsMenuModel }) => {
     await page.goto("/downloads");
     await expect(downloadsMenuModel.downloadCategory0).toBeVisible();
   });

  test("Click through get to downloads product page", async ({ page, downloadsMenuModel }) => {
     await page.goto("/downloads");
     await downloadsMenuModel.downloadGroupList.first().click();
     await expect(page).toHaveURL(new RegExp("/downloads/monitor"));
   });

   test("Downloads Edition Page contains Download files", async ({ page, downloadsMenuModel }) => {
    await page.goto("/downloads");
    await downloadsMenuModel.downloadGroupList.first().click();
    await expect(downloadsMenuModel.downloadGroupListItemTitle.first()).toBeVisible();
  });

});

