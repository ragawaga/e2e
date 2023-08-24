import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

const PricesDetailLocators = {
//   articleCounter: { testId: "number-of-articles" },
//   articleHeaders: { testId: "article-item-heading-link" },
//   articles: "article.chw-article-item",
};

export function pricesDetailPageModel(page: Page) {
  const screen = createComponentLocators(page, PricesDetailLocators);

  return {
    async load() {
      await page.goto("/price/1");
    },
    ...screen,
  };
}
