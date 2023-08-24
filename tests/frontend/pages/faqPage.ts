import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export const faqConstants = {
  faqHeader: "User guides",
  faqFirstTabText: "User guides",
  firstAccordianText: "The attached document provides an overview on how to use the Interactive Data To"
};

export function faqPageModel(page: Page) {
  const screen = createComponentLocators(page, {
    faqAccordian: { testId: "accordion-heading" },
    firstAccordianButton: { role: "button", name: "CRU Interactive Data Tool User Guide", exact: true },
  });

  return {
    async load() {
      await page.goto(`/help`);
    },
    ...screen,
  };
}
