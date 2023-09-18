import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export const pricePageConstants = {
  aluminiumURL : "aluminium",
  fwURL: "fertilizer-week-base?tab=weekly-prices",
  aluminiumPageHeader: "Aluminium",
  fwWeekPageHeader: "Fertilizer Week",
  tabActiveAttribute: "aria-selected",
  ureaOption: "Urea",
};

export function pricesPageModel(page: Page) {
  const screen = createComponentLocators(page, {

    overviewTab: {role: "tab", name: "Overview"},
    weeklyTab: {role: "tab", name: "Weekly"},
    monthlyTab: {role: "tab", name: "Monthly"},
    downloadTableButton: {role: "button", name: "Download table"},
    pricesTable: {testId: "prices-table"},
    fwNutrientDropdown: {testId: "select-prices-nutrient-select"}
});

  return {
    async load(id: string) {
      await page.goto(`/prices/${id}`);
    },
    ...screen,
  };
}
