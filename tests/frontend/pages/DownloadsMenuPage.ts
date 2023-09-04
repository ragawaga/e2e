import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export function DownloadsMenuPageModel(page: Page) {
  const screen = createComponentLocators(page, {
    header: "h1",
    chwPageBanner: { testId: "chw-pagebanner" },
    downloadCategory0: { testId: "download-category__0-list" },
    downloadsHref: "#nav-menu-downloads",
    downloadGroupList: '.downloads-group__list li a',
    downloadGroupListItemTitle: '.chw-archives-list__item__title'
  });

  return {
    async load() {
      await page.goto(`/downloads`);
    },
    ...screen,
  };
}
