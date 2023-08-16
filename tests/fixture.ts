import { expect, test as base, Page } from "@playwright/test";

export function createTestFixture<K extends string, T>(
    name: K,
    setup: (page: Page) => T
  ) {
    return base.extend<Record<K, T>>({
      [name as any]: async ({ page }, use) => {
        await use(setup(page));
      },
    });
  }
  