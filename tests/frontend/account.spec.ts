import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../auth";

test.describe("a logged in user with full permissions", () => {
  asAuthenticatedUser();

  test("should see their account settings", async ({ page }) => {
    await page.goto("/account-settings");

    await expect(page.getByTestId("account-details")).toBeVisible();

    for (const [field, value] of [
      ["name", "Cru Testuser11"],
      ["email", "Cruonlinetestuser11@gmail.com"],
      ["company", "CRU International"],
      ["job", "Research Analyst"],
    ]) {
      await expect(page.getByTestId(`account-${field}`)).toContainText(value);
    }

    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot();
  });
});
