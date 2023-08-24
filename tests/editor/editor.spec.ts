import { expect, test } from "@playwright/test";

test.describe("a user with editor permissions", () => {
  test("can see the editor page", async ({ page }) => {
    await page.goto("/umbraco/#/editorui/editor2/dashboard/-1?page=create");

    const editor = page.frameLocator("iframe");
    const header = editor.getByText("Create Article");

    await expect(header).toBeVisible();
  });
});
