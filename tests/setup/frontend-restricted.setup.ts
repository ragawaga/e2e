import { expect, test as setup } from "@playwright/test";
import { frontendRestrictedSessionFile } from "../auth";

setup("login as restricted user", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  // Check if we're still logged in from a previous test run
  const { pathname } = new URL(page.url());
  if (pathname.includes("/login")) {
    await page.getByLabel("Email").click();
    await page
      .getByLabel("Email")
      .fill(process.env.FRONTEND_RESTRICTED_USERNAME!);
    await page.getByLabel("Email").press("Tab");
    await page
      .getByLabel("Password")
      .fill(process.env.FRONTEND_RESTRICTED_PASSWORD!);
    await page.getByRole("button", { name: "Log in" }).click();
  }

  await expect(page).toHaveURL("/analysis");

  await page.context().storageState({ path: frontendRestrictedSessionFile });
});