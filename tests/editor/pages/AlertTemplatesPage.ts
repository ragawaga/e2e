import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export function alertTemplatesPageModel(page: Page) {
  const editor = page.frameLocator("iframe");

  const screen = createComponentLocators(editor, {
    header: { role: "heading", name: "Alert Templates" },
    newTemplateLink: { role: "link", name: "New template" },
    table: "[role='grid']",
    saveAsDraftButton: { role: "button", name: "Save as Draft" },
    nameField: { getByLabel: "Template name" },
    bannerField: { getByLabel: "Email Banner Title" },
    subjectField: { getByLabel: "Default Email Subject" }
  });

  return {
    async load() {
      await page.goto("/umbraco/#/editorui/editor2/dashboard/-1?page=alertTemplates");
    },
    editor,
    ...screen,
  };
}
