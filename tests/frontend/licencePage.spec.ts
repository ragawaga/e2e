import { expect } from "@playwright/test";
import { test } from "../fixture";

test.describe("Licence Terms and Conditions Screen", () => {
  test("should have the correct page structure", async ({ layout, page }) => {
    await page.goto("/termsandconditions");

    // Check we are now on the Licence Terms and Conditions page
    await expect(page).toHaveURL("/termsandconditions");

    // Check main heading is there within page banner
    await expect(layout.header).toHaveText("License Terms and Conditions");

    await expect(page.getByText("PRODUCT LICENCE", { exact: true })).toBeAttached();
  });
});
