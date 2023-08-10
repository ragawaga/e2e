import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

const AnalysisStreamLocators = {
  articleCounter: { testId: "number-of-articles" },
  articleHeaders: { testId: "article-item-heading-link" },
  articles: "article.chw-article-item",
};

export function analysisStreamPageModel(page: Page) {
  const screen = createComponentLocators(page, AnalysisStreamLocators);

  return {
    async load() {
      await page.goto("/analysis");
    },
    ...screen,
  };
}
