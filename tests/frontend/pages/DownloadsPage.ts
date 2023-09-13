import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export function DownloadsPageModel(page: Page) {
  const screen = createComponentLocators(page, {
    header: "h1",
    chwPageBanner: { testId: "chw-pagebanner" },
    downloadCategory0: { testId: "download-category__0-list" },
    downloadsHref: "#nav-menu-downloads",
    downloadGroupListItemTitle: '.chw-archives-list__item__title',
    pricesDownloadButton: { testId: "prices-download-button" },
  });

  return {
    async load() {
      await page.goto(`/downloads`);
    },
    ...screen,
  };
}
