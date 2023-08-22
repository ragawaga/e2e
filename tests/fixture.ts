import { test as base, Page } from "@playwright/test";
import { layoutPageModel } from "./frontend/pages/Layout";

// TODO: this could be more flexible instead of deriving everything from layout.
export const test = base.extend<
  Record<"layout", ReturnType<typeof layoutPageModel>>
>({
  layout: async ({ page }, use) => {
    await use(layoutPageModel(page));
  },
});

export function createTestFixture<K extends string, T>(
  name: K,
  setup: (page: Page) => T
) {
  return test.extend<Record<K, T>>({
    [name as any]: async ({ page }, use) => {
      await use(setup(page));
    },
  });
}
