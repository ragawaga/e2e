import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export function layoutPageModel(page: Page) {
  return createComponentLocators(page, {
    header: "h1",
    userMenu: { role: "button", name: "John Smith" },
    methodologiesLink: { role: "link", name: "Price Methodologies" },
  });
}
