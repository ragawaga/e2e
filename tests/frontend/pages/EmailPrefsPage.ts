import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export const emailPrefsConstants = {
  emailPrefsTabText: "Email Preferences",
  newsAlertText: "News Alerts",
  productAlertText: "Product Alerts",
  marketAlertText: "Market Alerts",
  fertilizersText: "Fertilizers",
  priceAlertText: "Price Alerts",
  newsAlertBlurb: "News Alerts are sent out weekly for each commodity group – Aluminium, Base Metal",
  productAlertBlurb: "Product Alerts inform you of newly published content and documents available for your CRU subscriptions.",
  marketAlertBlurb: "Market Alerts are emails sent to highlight new content including notifications, market stories, or price notices.",
  explanatoryText: "Sent every Friday to provide an update for the Fertilizer Market in China."

};

export function emailPrefsPageModel(page: Page) {

  const screen = createComponentLocators(page, {
    emailPrefsTabLink: { testId: "tab-email-preferences" },
    newsAlertHeaderId: { testId: "preferences-title-news-alerts" },
    productAlertHeaderId: { testId: "preferences-title-product-alerts" },
    marketAlertHeaderId: { testId: "preferences-title-market-alerts" },
    fertilizerAlertHeaderId: { testId: "preferences-title-fertilizers" },
    priceAlertHeaderId: { testId: "preferences-title-price-alerts" },
    checkBoxDescription: ".chw-fw-checkbox__description"
  });

  return {
    async load() {
      await page.goto("/account-settings?tab=email-preferences");
    },
    ...screen,
  };
}
