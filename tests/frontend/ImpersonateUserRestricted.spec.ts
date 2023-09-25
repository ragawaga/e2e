import { expect } from "@playwright/test";
import { test } from "../fixture";

test.describe("Impersonate User @restricted", () => {

  test("should NOT have Impersonate User option for non-A999 user in user dropdown", async ({
    page, layout
  }) => {
    await page.goto("/analysis");
    await (layout.userMenu).hover();
    await expect(layout.impersonateMenuOption).not.toBeAttached();
  });
});
