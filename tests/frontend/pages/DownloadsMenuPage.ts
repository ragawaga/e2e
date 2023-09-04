import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

/* export const downloadsMenuConstants = {
  aHrefDownloads_: "a[href='/downloads']",
  dataTestId_ChwPageBannerH1: '[data-testid="chw-pagebanner"] h1',
  dataTestIdDownloadCategory0 : '[data-testid="download-category__0"]',
  dataTestIdDownloadCategory0LiA: '[data-testid="download-category__0"] li a',
  dataTestIdChwArchiveSummary : '[data-testid="chw-archive-summary"]',

  dataTestIdChwPageBannerBackground: '[data-testid="chw-pagebanner_background"]',
  chwArchivesListLabel: ".chw-archives-list__label",
  chwArchivesListItem: ".chw-archives-list__item" 
}; */

export function DownloadsMenuPageModel(page: Page) {
  const screen = createComponentLocators(page, {
    header: "h1",
    listItem: "li",
    anchor: "a",
    chwPageBanner: { testId: "chw-pagebanner" },
    downloadCategory0: { testId: "download-category__0-list" },
    ownloadCategory0: { testId: "download-category__0-list" },
    chwArchiveSummary: { testId: "chw-archive-summary" },
    chwPageBannerBackground: { testId: "chw-pagebanner_background" },
    chwArchivesListLabel: ".chw-archives-list__label",
    chwArchivesListItem: ".chw-archives-list__item" 
  });

  return {
    async load() {
      await page.goto(`/downloads`);
    },
    ...screen,
  };
}
