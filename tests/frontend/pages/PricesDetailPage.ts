import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export function pricesDetailPageModel(page: Page) {
  const screen = createComponentLocators(page, {
    h1: "h1",
    _data_testid_content_heading_: {testId: "content-heading"},
    _data_testid_prices_card_: {testId: "prices-card"},
    _data_testid_prices_table_: {testId:"prices-table"}
});

  return {
    async load(id: number) {
      await page.goto(`/price/${id}/`);
    },
    ...screen,
  };
}
