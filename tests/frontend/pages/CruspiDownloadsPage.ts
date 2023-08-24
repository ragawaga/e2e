import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export function cruspiDownloadsPageModel(page: Page) {
  const screen = createComponentLocators(page, {
    header: "h1",
    cruspiDownloadButton: { testId: "download-category__0-list" },
    cruspiFebruaryButton: { role: "button", name: "February 2022" },
    cruspiFebruaryHeading: {role: "heading", name: "February 2022" }
  });

  return {
    async load() {
      await page.goto(`/downloads/monitor/cruspi`);
    },
    ...screen,
  };
}
