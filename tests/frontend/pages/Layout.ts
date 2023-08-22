import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export const GlobalConstants = {
  cruspiString: 'CRUspi',
  cruSpiPricesPageURL: '/prices/cruspi',
  cruSpiDownloadsPageURL: 'downloads/monitor/cruspi',
  downloadsPageURL: '/downloads',
  downloadsPageTitle: 'Downloads'
};


export function layoutPageModel(page: Page) {
  return createComponentLocators(page, {
    header: "h1",
    userMenu: { role: "button", name: "John Smith" },
    methodologiesLink: { role: "link", name: "Price Methodologies" },
    footer: "#chw-footer"
  });
}
