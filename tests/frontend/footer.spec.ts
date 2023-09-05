import { expect } from "@playwright/test";
import { test } from "../fixture";

test.describe("Footer", () => {
  test("contains correct links to privacy policy and general terms and conditions", async ({
    page,
    layout,
  }) => {
    await page.goto("/");

    const privacyPolicy = layout.footer.getByRole("link", {
      name: "Privacy Policy",
    });

    const termsAndConditions = layout.footer.getByRole("link", {
      name: "General Terms & Conditions",
    });

    await expect(privacyPolicy).toBeAttached();
    await expect(termsAndConditions).toBeAttached();
  });
});
