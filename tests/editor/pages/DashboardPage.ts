import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export function dashboardPageModel(page: Page) {
  const editor = page.frameLocator("iframe");

  const screen = createComponentLocators(editor, {
    header: { role: "heading", name: "Editor UI Dashboard" },
  });

  return {
    async load() {
      await page.goto("/umbraco/#/editorui/editor2/dashboard/-1?page=dashboard");
    },
    editor,
    ...screen,
  };
}
