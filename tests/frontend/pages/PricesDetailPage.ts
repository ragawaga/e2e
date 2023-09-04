import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export function pricesDetailPageModel(page: Page) {
  const screen = createComponentLocators(page, {
    contentHeading: { testId: "content-heading" },
    pricesCard: { testId: "prices-card" },
    pricesTable: { testId: "prices-table" },
    chartDlMenu: { role: 'button', name: /view chart menu/i },
    downloadXLS: { text: /download xls/i }
  });

  return {
    async load(id: number) {
      await page.goto(`/price/${id}/`);
    },
    ...screen,
  };
}
