import { expect, test as setup } from "@playwright/test";
import { sessionFile, umbracoSessionFile } from "../auth";

setup("test", async ({ page }) => {
  await page.goto("/umbraco/#/login/false");

  let username = page.getByPlaceholder("Enter your username");
  await username.fill("crudev@digirati.co.uk");
  await username.press("Tab");

  let password = page.getByRole("textbox", { name: "Enter your password" });
  await password.fill("PawelNeedsARaise2019");
  await password.press("Enter");

  let content = page.locator("#mainwrapper");
  await expect(content).toBeVisible();

  await page.context().storageState({ path: umbracoSessionFile });
});
