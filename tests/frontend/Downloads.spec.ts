import { expect } from "@playwright/test";
import fs from 'fs';
import { createTestFixture } from "../fixture";

import { DownloadsPageConstants, DownloadsPageModel } from "./pages/DownloadsPage";

const test = createTestFixture("downloadsModel", DownloadsPageModel);

test.describe("Downloads Page", () => {

  test("Prices table download file @unrestricted", async ({ page, downloadsModel }) => {
    await page.goto("/prices/aluminium?tab=weekly");
    //click the prices download button
    downloadsModel.pricesDownloadButton.first().click();
    // Start waiting for download before clicking. Note no await.
    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;
    //check the downloaded file is greater than 14000 bytes as that is the size of an empty excel file
    expect((await fs.promises.stat(await download.path() as string)).size).toBeGreaterThan(14000);
  });

  test("Open download file in another tab", async ({ page, downloadsModel }) => {
    await page.goto("/downloads");
    //click the first download lozenge
    await downloadsModel.downloadCategory0.getByRole('link').first().click();
    //get the first pdf file element
    let firstFile = await downloadsModel.downloadGroupListItemTitle.getByText(new RegExp("pdf")).first();
    //get the name of the file for use later
    let firstFileText = await firstFile.innerText();
    //click the file to open in a new tab
    firstFile.click();
    //the promise is for the popup new tab event and will wait fro the new tab opening before proceeding
    const newTabPromise = page.waitForEvent("popup");
    const newTab = await newTabPromise;
    await newTab.waitForLoadState();
    //this is going to be used to avoid numbers appending to existing file names as the file names 
    //with numbers appended do not appear in the tab Url only the original file name
    let charindex = firstFileText.lastIndexOf('.pdf');
    //check the Url of the download tab has the name of the file included in it or about:blank if file not found
    await expect(newTab).toHaveURL(new RegExp(firstFileText.substring(0, charindex) + '|' + DownloadsPageConstants.aboutBlank));
  });
});

