import { expect } from "@playwright/test";
import { test } from "../fixture";

test.describe("Methodologies Screen", () => {
  test("should have the correct page structure", async ({ page, layout }) => {
    await page.goto("/analysis");

    await layout.userMenu.click();
    await layout.methodologiesLink.click();

    await expect(page).toHaveURL("/methodologies");
    await expect(layout.header).toHaveText(
      "Price Methodologies & Compliance Framework",
    );

    await expect(
      page.getByText(
        "CRU’s Governance and internal oversight structures, policies and working practic",
      ),
    ).toBeVisible();
  });
});
