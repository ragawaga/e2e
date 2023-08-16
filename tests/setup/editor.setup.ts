import { expect, test as setup } from "@playwright/test";
import { umbracoSessionFile } from "../auth";

setup("login as editor", async ({ page }) => {
  await page.goto("/umbraco", { waitUntil: "networkidle" });

  const { hash } = new URL(page.url());
  if (hash.startsWith("#/login")) {
    let username = page.getByPlaceholder("Enter your username");
    await username.fill(process.env.UMBRACO_USERNAME!);
    await username.press("Tab");

    let password = page.getByRole("textbox", { name: "Enter your password" });
    await password.fill(process.env.UMBRACO_PASSWORD!);
    await password.press("Enter");
  }

  let content = page.locator("#mainwrapper");
  await expect(content).toBeVisible({ timeout: 10_000 });

  await page.context().storageState({ path: umbracoSessionFile });
});
