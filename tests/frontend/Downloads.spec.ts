import { expect } from "@playwright/test";
import fs from 'fs';
import { createTestFixture } from "../fixture";
import { DownloadsPageModel } from "./pages/DownloadsPage";

const test = createTestFixture("downloadsModel", DownloadsPageModel);

test.describe("Downloads Page", () => {

  test("Prices table download file", async ({ page, downloadsModel }) => {

    await page.goto("/prices/aluminium?tab=weekly");

    downloadsModel.pricesDownloadButton.first().click();

    // Start waiting for download before clicking. Note no await.
    const downloadPromise = page.waitForEvent('download');

    const download = await downloadPromise;

    expect((await fs.promises.stat(await download.path() as string)).size).toBeGreaterThan(14000);

  });

  test("Open download file in another tab", async ({ page, downloadsModel }) => {

    await page.goto("/downloads");

    await downloadsModel.downloadCategory0.getByRole('link').first().click();

    let firstFile = await downloadsModel.downloadGroupListItemTitle.getByText(new RegExp("pdf")).first();

    var firstFileText = await firstFile.innerText();

    downloadsModel.downloadGroupListItemTitle.first().click();

    const newTabPromise = page.waitForEvent("popup");

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    let charindex = firstFileText.lastIndexOf('.pdf');

    await expect(newTab).toHaveURL(new RegExp(firstFileText.substring(0, charindex)));

  });

});

