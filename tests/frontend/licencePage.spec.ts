import { expect, test } from "@playwright/test";
import { globalLocators } from "./pages/GlobalLocators";

test.describe("Licence Terms and Conditions Screen", () => {
  test("should have the correct page structure", async ({ page }) => {
    await page.goto("/termsandconditions");

    // Check we are now on the Licence Terms and Conditions page
    await expect(page).toHaveURL("/termsandconditions");

    // Check main heading is there within page banner
    await expect(page.locator(globalLocators.header)).toHaveText('License Terms and Conditions');

    // Check that the page renders body text
    expect(page.getByText('PRODUCT LICENCE', { exact: true }));
  });
});
