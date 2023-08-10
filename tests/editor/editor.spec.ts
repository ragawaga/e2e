import { expect, test } from "@playwright/test";

test.describe("a user with editor permissions", () => {
  test("can see the editor page", async ({ context, page }) => {
    await page.goto("/umbraco/#/editorui/editor2/dashboard/-1?page=create");

    const editor = page.frameLocator("iframe");
    const header = editor.getByText("Create Article");

    await expect(header).toBeVisible();
    // await editor.locator('#publishingGroupsInputId').click();
    // await editor.getByRole('option', { name: 'Aluminium Products' }).click();
    // await editor.getByRole('checkbox', { name: 'Monitor' }).check();
    // await editor.getByLabel('Title *').click();
    // await editor.getByLabel('Title *').fill('My Article Title');
    // await editor.getByLabel('Title *').press('Tab');
    // await editor.frameLocator('#body-text_ifr').getByRole('paragraph').click();
    // await editor.frameLocator('#body-text_ifr').locator('#tinymce').fill('Body text');
    // await editor.getByRole('button', { name: 'Open documents list' }).click();
    // await editor.getByRole('checkbox', { name: 'aluminium-products-monitor-december-2022-composite-scrap-index' }).check();
  });
});
