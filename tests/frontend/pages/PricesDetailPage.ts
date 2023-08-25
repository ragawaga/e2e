import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export function pricesDetailPageModel(page: Page) {
  const screen = createComponentLocators(page, {
    h1: "h1",
    contentHeading: {testId: "content-heading"},
    pricesCard: {testId: "prices-card"},
    pricesTable: {testId:"prices-table"},
    chartDlMenu: {role: 'button', name: /view chart menu/},
    downloadXLS: {text: /download xls/}
});

  return {
    async load(id: number) {
      await page.goto(`/price/${id}/`);
    },
    ...screen,
  };
}
