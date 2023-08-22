import { expect } from "@playwright/test";
import { test } from "../fixture";
import { GlobalConstants } from "./pages/Layout";

test.describe("CRUSpi Prices Page", () => {

  test("can navigate straight to the correct URL", async ({ page, layout  }) => {
    await page.goto(GlobalConstants.cruSpiPricesPageURL);
    expect(await layout.header.textContent()).toEqual(GlobalConstants.cruspiString);
  });

  test("can navigate to cruspi prices page via the Prices menu", async ({ page, layout  }) => {
    await page.goto("/analysis");
    await layout.pricesTopNav.hover();
    await layout.cruspiMenuItem.click();
    expect(await layout.header.textContent()).toEqual(GlobalConstants.cruspiString);
  });

  test("there are no tabs on the CRUSpi page and page structure is as expected", async ({ page, layout  }) => {
    await page.goto(GlobalConstants.cruSpiPricesPageURL);
    expect( await layout.header.textContent()).toEqual(GlobalConstants.cruspiString);
    await expect( page.getByText('Price Indicators', { exact: true })).toBeVisible();

    //Check that there are no tabs on this Price page - only Price page with no tabs
    //expect(await page.getByRole('tablist').count()).toBe(0); 
    await expect(layout.pricesTabs).not.toBeAttached();

    //Check the Article content is there
    await expect(page.getByText('Price Indicators', { exact: true })).toBeVisible();

    //Check the downloads button is there
    await expect(page.getByTestId('prices-download-button')).toBeVisible();

    //Check that the Prices table is there and that Check the chart is visible
    //There will be 2 occurances of 'Global Flat products Price Indicator', one 
    //in the table and one in the chart
    await expect(page.getByTestId('prices-table').getByText('Global Flat products Price Indicator')).toBeVisible();
    await expect(page.getByTestId('cruspi-chart').getByText('Global Flat products Price Indicator')).toBeVisible();
  
    //Click the Price notice button and check it takes you to the correct pages
    await page.getByTestId('price-notices-button').click();
    await expect(page).toHaveURL(/notifications*/);

  });
});

test.describe("CRUSpi Downloads Page", () => {

  test("Navigate to CRUspi downloads page", async ({ page, layout  }) => {

    //Navigate directly the known URL
    await page.goto(GlobalConstants.cruSpiDownloadsPageURL);
    expect( await layout.header.textContent()).toEqual(GlobalConstants.cruspiString);

    //Check navigating via the Downloads Menu works (had issues in the past where CRUspi disappeared from the menu)
    await layout.downloadsTopNav.click();
  
    //Check we are on the Download index page and CRUspi exists
    await expect(page).toHaveURL(GlobalConstants.downloadsPageURL);
    expect( await layout.header.textContent()).toEqual(GlobalConstants.downloadsPageTitle);

    //Click through to the CRUspi downloads page
    const cruspiLink = page.getByTestId('download-category__0-list').getByRole('link', { name: GlobalConstants.cruspiString });
    await cruspiLink.isVisible();
    await cruspiLink.scrollIntoViewIfNeeded();
    await cruspiLink.click();
    
    expect(await layout.header.textContent()).toEqual(GlobalConstants.cruspiString);

    //Check downloads links are there, and working
    //Use Feb 2022 as this file should always be there
    await page.getByRole('button', { name: 'February 2022' }).click();
    await page.getByRole('heading', { name: 'February 2022' }).isVisible();

    //Check the download link exists and works .
    const excelFileButton = page.getByRole('button', { name: 'CRUspi 1994-2023 (10 02 2022).xlsx', exact: true });
    const downloadPromise = page.waitForEvent('download');
    await excelFileButton.hover();
    excelFileButton.click();
    const download = await downloadPromise;
    expect (await download.path()).not.toBeNull;
  });
})
