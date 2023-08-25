import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export function pricesOverviewPageModel(page: Page) {
  const screen = createComponentLocators(page, {

    overviewTab: {testId: "tab-overview"},
    pricesCard: {testId: "prices-card"},
    pricesCardTitle: {testId: "prices-card-title"},
    pricesCardPriceValue: {testId: "prices-card-price-value"},
    pricesCardPriceUnit: {testId: "prices-card-price-unit"},
    pricesCardChangeValue: {testId: "prices-card-change-value"},
    pricesCardChangeLabel: {testId: "prices-card-change-label"},
    pricesCardFootnoteDate: {testId: "prices-card-footnote-date"},
    pricesCardFootnoteFreq: {testId: "prices-card-footnote-frequency"},
    
});

  return {
    async load(id: number) {
      await page.goto(`/price/${id}/`);
    },
    ...screen,
  };
}
