import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export function pricesWeeklyPageModel(page: Page) {
  const screen = createComponentLocators(page, {});

  return {
    async load(id: string) {
      await page.goto(`/prices/${id}?tab=weekly`);
    },
    page,
    ...screen,
  };
}
