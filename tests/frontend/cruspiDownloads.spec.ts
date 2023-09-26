import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";
import { cruspiDownloadsPageModel } from "./pages/CruspiDownloadsPage";
import { GlobalConstants } from "./pages/Layout";

const test = createTestFixture("cruspiDownloadsModel", cruspiDownloadsPageModel);

test.describe("CRUSpi Downloads Page", () => {

  test("Navigate to CRUspi downloads page @unrestricted", async ({ page, layout, cruspiDownloadsModel  }) => {

    //Navigate directly the known URL
    await cruspiDownloadsModel.load();
    await expect (layout.header).toHaveText(GlobalConstants.cruspiString);

    //Check navigating via the Downloads Menu works (had issues in the past where CRUspi disappeared from the menu)
    await layout.downloadsTopNav.click();
  
    //Check we are on the Download index page and CRUspi exists
    await expect(page).toHaveURL(GlobalConstants.downloadsPageURL);
    await expect(layout.header).toHaveText(GlobalConstants.downloadsPageTitle);

    //Click through to the CRUspi downloads page
    const cruspiLink = cruspiDownloadsModel.cruspiDownloadButton.getByRole('link', { name: GlobalConstants.cruspiString });
    await cruspiLink.isVisible();
    await cruspiLink.scrollIntoViewIfNeeded();
    await cruspiLink.click();
    
    await expect (layout.header).toHaveText(GlobalConstants.cruspiString);

    //Check downloads links are there, and working
    //Use Feb 2022 as this file should always be there
    await cruspiDownloadsModel.cruspiFebruaryButton.click();
    await expect (cruspiDownloadsModel.cruspiFebruaryHeading).toBeVisible();

    //Check the download link exists and works .
    const excelFileButton = page.getByRole('button', { name: 'CRUspi 1994-2023 (10 02 2022).xlsx', exact: true });
    const downloadPromise = page.waitForEvent('download');
    await excelFileButton.hover();
    excelFileButton.click();
    const download = await downloadPromise;
    expect (await download.path()).not.toBeNull();
  });
})
