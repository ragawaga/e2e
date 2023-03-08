import { expect, test as setup } from "@playwright/test";
import { sessionFile } from "./auth";

setup("login as user", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill("cruonlinetestuser11@gmail.com");
  await page.getByLabel("Email").press("Tab");
  await page.getByLabel("Password").fill("Cru0nline2018");
  await page.getByRole("button", { name: "Log in" }).click();

  await expect(page).toHaveURL("/analysis");

  await page.context().storageState({ path: sessionFile });
});
