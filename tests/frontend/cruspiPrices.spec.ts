import { expect } from "@playwright/test";
import { GlobalConstants } from "./pages/Layout";
import { cruspiPricesPageModel } from "./pages/CruspiPricesPage";
import { createTestFixture } from "../fixture";

const test = createTestFixture("cruspiPriceModel", cruspiPricesPageModel);

test.describe("CRUSpi Prices Page", () => {

  test("can navigate straight to the correct URL", async ({ page, layout, cruspiPriceModel  }) => {
    await cruspiPriceModel.load();
    expect(await layout.header.textContent()).toEqual(GlobalConstants.cruspiString);
  });

  test("can navigate to cruspi prices page via the Prices menu", async ({ page, layout  }) => {
    await page.goto("/analysis");
    await layout.pricesTopNav.hover();
    await layout.cruspiMenuItem.click();
    expect(await layout.header.textContent()).toEqual(GlobalConstants.cruspiString);
  });

  test("there are no tabs on the CRUSpi page and page structure is as expected", async ({ page, layout, cruspiPriceModel  }) => {
    await cruspiPriceModel.load();
    expect(await layout.header.textContent()).toEqual(GlobalConstants.cruspiString);

    //Check the Article content is there
    await expect(page.getByText('Price Indicators', { exact: true })).toBeVisible();

    //Check that there are no tabs on this Price page - only Price page with no tabs
    await expect(layout.pricesTabs).not.toBeAttached();  

    //Check the downloads button is there
    await expect(cruspiPriceModel.pricesDownloadButton).toBeVisible();

    //Check that the Prices table is there and that Check the chart is visible
    //There will be 2 occurances of 'Global Flat products Price Indicator', one 
    //in the table and one in the chart
    const cruspiTableChartText = "Global Flat products Price Indicator";
    await expect(cruspiPriceModel.pricesTable.getByText(cruspiTableChartText)).toBeVisible();
    await expect(cruspiPriceModel.pricesChart.getByText(cruspiTableChartText)).toBeVisible();
  
    //Click the Price notice button and check it takes you to tcruspiTableChartTexthe correct pages
    await cruspiPriceModel.priceNoticesButton.click();
    await expect(page).toHaveURL(/notifications*/);

  });
});
