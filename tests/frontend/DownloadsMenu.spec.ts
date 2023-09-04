import { expect } from "@playwright/test";
import { GlobalConstants } from "./pages/Layout";
import { DownloadsMenuPageModel } from "./pages/DownloadsMenuPage";
import { createTestFixture } from "../fixture";

const test = createTestFixture("downloadsMenuModel", DownloadsMenuPageModel);

const downloadsHref = "#nav-menu-downloads";
const downloadGroupList = '.downloads-group__list li a';
const downloadGroupListItemTitle ='.chw-archives-list__item__title';

test.describe("Downloads Page", () => {

  test("Dowloads menu item should exist", async ({ page,  downloadsMenuModel}) => {
    await downloadsMenuModel.load();
    await page.goto("/");
    await expect(page.locator(downloadsHref)).toHaveCount(1); 
  });

  test("Navigate to Downloads page", async ({ page, layout }) => {
     await expect (layout.header).toHaveText(GlobalConstants.downloadsPageTitle);
  
     await layout.downloadsTopNav.click();
  
     await expect(page).toHaveURL(GlobalConstants.downloadsPageURL);
     await expect(layout.header).toHaveText(GlobalConstants.downloadsPageTitle);
  
  });

   test("Direct Navigation to downloads", async ({ page, downloadsMenuModel }) => {
     await downloadsMenuModel.load();
     await page.goto("/downloads");

     //banner contains 
     await expect(page.locator(downloadsHref)).toHaveCount(1); 
     await page.locator(downloadsMenuModel.chwPageBanner + " " + downloadsMenuModel.header + ':text("Downloads")');

   });

  test("Download Item are available", async ({ page, downloadsMenuModel }) => {
     await downloadsMenuModel.load();
     await page.goto("/downloads");
     await expect(
       downloadsMenuModel.downloadCategory0,
     ).toBeAttached();
   });

  test("Click through get to downloads product page", async ({ page, downloadsMenuModel }) => {
     await downloadsMenuModel.load();
     await page.goto("/downloads");

     await expect(page.locator(downloadGroupList).first()).toHaveCount(1); 
     await page.locator(downloadGroupList).first().click();
     await expect(page).toHaveURL(new RegExp("/downloads/monitor"));
   });

   test("Downloads Edition Page contains Download files", async ({ page }) => {
    await page.goto("/downloads");
    await page.locator(downloadGroupList).first().click();

    await expect(page.locator(downloadGroupListItemTitle).first()).toHaveCount(1); 
  });

});

