import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export function cruspiPricesPageModel(page: Page) {
  const screen = createComponentLocators(page, {
    pricesDownloadButton: { testId: "prices-download-button" },
    pricesTable: { testId: "prices-table" },
    pricesChart: { testId: "cruspi-chart" },
    priceNoticesButton: { testId: "price-notices-button" }
  });

  return {
    async load() {
      await page.goto(`/prices/cruspi`);
    },
    ...screen,
  };
}
