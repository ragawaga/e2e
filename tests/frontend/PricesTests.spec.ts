import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";
import { GlobalConstants } from "./pages/Layout";
import { pricePageConstants, pricesPageModel } from "./pages/PricesPage";

const test = createTestFixture("prices", pricesPageModel);

test.describe("Prices Tests", () => {
  
  test("Prices button exists in the top nav", async ({ page, layout })  => {
    await page.goto(GlobalConstants.home);
    await expect(layout.pricesTopNav).toBeVisible(); 
  });

  test("Navigate to price page", async ({ prices, page, layout })  => {
    prices.load(pricePageConstants.aluminiumURL);
    await expect(layout.header).toHaveText(pricePageConstants.aluminiumPageHeader);
  });

  test("Can click ranges changes state", async ({ prices })  => {
    prices.load(pricePageConstants.aluminiumURL);

    //Check we are on the Overview tab
    await expect(prices.overviewTab).toHaveAttribute(pricePageConstants.tabActiveAttribute, "true");

    //Navigate to the other tabs, check the page changes
    await prices.weeklyTab.click();
    await expect(prices.weeklyTab).toHaveAttribute(pricePageConstants.tabActiveAttribute, "true");
    await expect(prices.monthlyTab).toHaveAttribute(pricePageConstants.tabActiveAttribute, "false");
    await expect(prices.downloadTableButton).toBeVisible();

    await prices.monthlyTab.click();
    await expect(prices.monthlyTab).toHaveAttribute(pricePageConstants.tabActiveAttribute, "true");
    await expect(prices.weeklyTab).toHaveAttribute(pricePageConstants.tabActiveAttribute, "false");
    await expect(prices.downloadTableButton).toBeVisible();
  });

  test("Prices table and download button exists on Weekly and Monthly", async ({ prices })  => {
    prices.load(pricePageConstants.aluminiumURL);

    //Navigate to the weekly tab and check donwload option and the table are there
    await prices.weeklyTab.click();
    await expect(prices.pricesTable).toBeVisible();
    await expect(prices.downloadTableButton).toBeVisible();

    //Navigate to the monthly tab and check donwload option and the table are there
    await prices.monthlyTab.click();
    await expect(prices.pricesTable).toBeVisible();
    await expect(prices.downloadTableButton).toBeVisible();
  });

  test("Fertilizer Week Prices has nutrient filter", async ({ prices, page, layout })  => {
    prices.load(pricePageConstants.fwURL);

    //Should be on FW page initally
    await expect(layout.header).toHaveText(pricePageConstants.fwWeekPageHeader);

    // Select Urea to filter page content
    await prices.fwNutrientDropdown.selectOption(pricePageConstants.ureaOption);

    // Confirm that the page has changed to the Urea page
    await expect(layout.header).toHaveText(pricePageConstants.ureaOption);
  });
});
