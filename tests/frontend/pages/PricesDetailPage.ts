import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export function pricesDetailPageModel(page: Page) {
  const screen = createComponentLocators(page, {
    pageHeading: { testId: 'chw-pagebanner_background'},
    contentHeading: { testId: "content-heading" },
    myPricesButton: { role: 'link', name: /my prices/i },
    printButton: { role: 'button', name: /print/i },
    pricesCard: { testId: "prices-card" },
    pricesTable: { testId: "prices-table" },
    chartDlMenu: { role: 'button', name: /view chart menu/i },
    downloadXLS: { text: /download xls/i },
    analysisArticles: { testId: "price-detail-analysis" },
    newsArticles: { testId: "price-detail-news" },
  });

  return {
    async load(id: number) {
      await page.goto(`/price/${id}/`);
    },
    ...screen,
  };
}
