import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";
import { cruspiPricesPageModel } from "./pages/CruspiPricesPage";
import { GlobalConstants } from "./pages/Layout";

const test = createTestFixture("cruspiPriceModel", cruspiPricesPageModel);

test.describe("CRUSpi Prices Page", () => {

  test("can navigate straight to the correct URL @unrestricted", async ({ layout, cruspiPriceModel  }) => {
    await cruspiPriceModel.load();
    await expect(layout.header).toHaveText(GlobalConstants.cruspiString);
  });

  test("can navigate to cruspi prices page via the Prices menu @unrestricted", async ({ page, layout  }) => {
    await page.goto("/analysis");
    await layout.pricesTopNav.hover();
    await layout.cruspiMenuItem.click();
    await expect(layout.header).toHaveText(GlobalConstants.cruspiString);
  });

  test("there are no tabs on the CRUSpi page and page structure is as expected @unrestricted", async ({ page, layout, cruspiPriceModel  }) => {
    await cruspiPriceModel.load();
    await expect(layout.header).toHaveText(GlobalConstants.cruspiString);

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
