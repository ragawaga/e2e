import { expect } from "@playwright/test";

import { createTestFixture } from "../fixture";

import { pricesDetailPageModel } from "./pages/PricesDetailPage";

const test = createTestFixture("pricesDetail", pricesDetailPageModel)

test.describe("Prices detail pages", () => {
  test("Display Ferromanganese price detail page", async ({ pricesDetail, layout }) => {
    await pricesDetail.load(543);

    // Check the title
    await expect(layout.header).toHaveText(/Ferromanganese EU MC/);
    await expect(pricesDetail.contentHeading.first())
      .toHaveText("Latest Prices");

    // There should be 2 price cards.
    await expect(pricesDetail.pricesCard).toHaveCount(2);
    await expect(pricesDetail.pricesTable).toHaveCount(2);
  });

  test("Display Optical fibre price detail page", async ({ pricesDetail, layout }) => {
    await pricesDetail.load(1562);

    // Check the title
    await expect(layout.header).toHaveText(/Bare Fibre/);
    await expect(pricesDetail.contentHeading.first())
      .toHaveText("Latest Prices");

    // There should only be 1 price card.
    await expect(pricesDetail.pricesCard).toHaveCount(1);
    await expect(pricesDetail.pricesTable).toHaveCount(1);
  });

  // Test xlsx download - wait for download to complete
  test("Download chart XLS", async ({ pricesDetail, page }) => {
    await pricesDetail.load(1);
    await expect(pricesDetail.chartDlMenu).toBeVisible()
    const downloadPromise = page.waitForEvent('download');
    await pricesDetail.chartDlMenu.first().click();
    await expect(pricesDetail.downloadXLS).toBeVisible()
    await pricesDetail.downloadXLS.first().click()
    const download = await downloadPromise;
    await download.path();
  });

});