import { expect } from "@playwright/test";

import { createTestFixture } from "../fixture";

import { pricesOverviewPageModel } from "./pages/PricesOverviewPage";

const test = createTestFixture("pricesOverview", pricesOverviewPageModel)

test.describe("Prices overview tab page", () => {
  test("Display Latest Prices price cards", async ({ pricesOverview }) => {

    await pricesOverview.load("aluminium");
    await expect(pricesOverview.overviewTab).toBeAttached();
    expect(await pricesOverview.pricesCard.count()).toBeGreaterThan(0);
  
    (await pricesOverview.pricesCardTitle.all()).forEach((el) => {
      expect(el.innerText).not.toHaveLength(0)
    });

    (await pricesOverview.pricesCardPriceValue.all()).forEach((el) => {
      expect(el.innerText).not.toHaveLength(0)
    });
   
    (await pricesOverview.pricesCardPriceUnit.all()).forEach((el) => {
      expect(el.innerText).not.toHaveLength(0)
    });

    (await pricesOverview.pricesCardChangeValue.all()).forEach((el) => {
      expect(el.innerText).not.toHaveLength(0)
    });

    (await pricesOverview.pricesCardChangeLabel.all()).forEach((el) => {
      expect(el.innerText).not.toHaveLength(0)
    });

    (await pricesOverview.pricesCardFootnoteDate.all()).forEach((el) => {
      expect(el.innerText).not.toHaveLength(0)
    });

    (await pricesOverview.pricesCardFootnoteFreq.all()).forEach((el) => {
      expect(el.innerText).not.toHaveLength(0)
    });

  });

  test("Article stream list", async ({ pricesOverview }) => {
    await pricesOverview.load("aluminium");
    await expect(pricesOverview.articleStreamList).toBeAttached();

    (await pricesOverview.articleItemHeadingLink.all()).forEach(async(el) =>  {
      const href = await el.getAttribute("href");
      expect(href).not.toBe(undefined || null);
      expect(href).not.toHaveLength(0);
    });
  });

  test("Price charts", async ({ pricesOverview }) => {
    await pricesOverview.load("aluminium");

    (await pricesOverview.highchartsContainer.all()).forEach(async(el) => {
      const svg = el.locator("svg");
      await expect(svg).toBeVisible();
    });
  });
});

