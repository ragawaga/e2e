import { expect, test } from "@playwright/test";

test.describe("a logged in user", () => {
  test("should see profile properties", async ({ page }) => {
    await page.goto("/account-settings");

    await expect(page.getByTestId("account-details")).toBeVisible();

    for (const field of ["name", "email", "company", "job"]) {
      const valueElement = page.getByTestId(`account-${field}`);

      await expect(valueElement).toBeVisible();
    }
  });
});
