import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export const pricesWeeklyConstants = {
  myPricesTab: "/mycru?tab=my-prices",
};

export function pricesWeeklyPageModel(page: Page) {
  const priceId = 1001;
  const screen = createComponentLocators(page, {
    aggridPricesTable: ".ag-theme-material.prices-table",
    priceBookmarkButton: `button[data-testId="bookmark-price-button"][data-articleid="${priceId}"]`,
    bookmarkedPrice: `a[href="/price/${priceId}"]`,
  });

  return {
    async load(id: string) {
      await page.goto(`/prices/${id}?tab=weekly`);
    },
    page,
    ...screen,
  };
}
