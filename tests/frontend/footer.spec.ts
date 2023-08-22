import { expect, test } from "@playwright/test";

test.describe("Footer", () => {
  test("contains correct links to privacy policy and general terms and conditions", async ({
    page,
  }) => {
    await page.goto("/");

    const footer = page.locator('#footer');
    const privacyPolicy = footer.getByRole("link", { name: "Privacy Policy" });
    const termsAndConditions = footer.getByRole("link", { name: "General Terms & Conditions" });

    await expect(privacyPolicy).toBeAttached();
    await expect(termsAndConditions).toBeAttached();
  });
});
