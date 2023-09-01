import { FrameLocator, Locator, Page } from "@playwright/test";

export type ComponentLocators<T> = {
  [key in keyof T]: Locator;
};

export type ComponentLocatorMap = { [k: string]: LocatorSpecification };

export type GetByRoleParams = Parameters<Page["getByRole"]>;
export type Role = GetByRoleParams[0];
export type RoleAttributes = GetByRoleParams[1];

export type CssSelector = string;
export type TestId = { testId: string };
export type RoleLocator = { role: Role } & RoleAttributes;
export type ByLabelLocator = { getByLabel: string };
export type LocatorSpecification = CssSelector | RoleLocator | TestId | ByLabelLocator;

function isLabelLocator(locator: LocatorSpecification): locator is ByLabelLocator {
  return typeof locator !== "string" && "getByLabel" in locator;
}

function isTestIdLocator(locator: LocatorSpecification): locator is TestId {
  return typeof locator !== "string" && "testId" in locator;
}

function isRoleLocator(locator: LocatorSpecification): locator is RoleLocator {
  return typeof locator !== "string" && "role" in locator;
}

export function createComponentLocators<
  T extends { [k: string]: LocatorSpecification },
>(page: Page | FrameLocator, component: T) {
  const root = {} as ComponentLocators<T>;

  for (const [k, v] of Object.entries(component)) {
    let locator: Locator;
    if (isRoleLocator(v)) {
      const { role, ...attributes } = v;
      locator = page.getByRole(role, attributes);
    } else if (isTestIdLocator(v)) {
      locator = page.getByTestId(v.testId);
    } else if (isLabelLocator(v)) {
      locator = page.getByLabel(v.getByLabel);
    } else {
      locator = page.locator(v);
    }

    root[k as keyof T] = locator;
  }

  return root;
}
