import { Locator, Page } from "@playwright/test";

export type ComponentLocators<T> = {
  [key in keyof T]: Locator;
};

export type CssSelector = string;
export type TestId = { testId: string };
export type LocatorSpecification = CssSelector | TestId;

function isTestIdLocator(locator: LocatorSpecification): locator is TestId {
  return typeof locator !== "string" && locator.testId !== undefined;
}

export function createComponentLocators<T extends { [k: string]: LocatorSpecification }>(
  page: Page,
  component: T
) {
  const root = {} as ComponentLocators<T>;

  for (let [k, v] of Object.entries(component)) {
    const locator = isTestIdLocator(v)
      ? page.getByTestId(v.testId)
      : page.locator(v);
    
    root[k as keyof T] = locator;
  }

  return root;
}
