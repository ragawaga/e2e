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
    pricesTopNav: {role: "button", name: 'Prices', exact: true },
    downloadsTopNav: {role: "link", name: 'Downloads', exact: true },
    cruspiMenuItem: {role: "link", name: GlobalConstants.cruspiString },
    pricesTabs: {role: "tablist" },
    methodologiesLink: { role: "link", name: "Price Methodologies" },
    footer: "#chw-footer",
    accountSettingsLink: { role: "link", name: "Account Settings" },
  });

}
