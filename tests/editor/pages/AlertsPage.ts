import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export function alertsPageModel(page: Page) {
  const editor = page.frameLocator("iframe");

  const screen = createComponentLocators(editor, {
    pageHeading: "header h1",
    contentHeading: "main h1",
    alertForm: "#alert-form",
    nextButton: { role: "button", name: "Next" },
    cancelButton: { role: "button", name: "Cancel" },
    table: "[role='grid']",
    templatesLink: { role: "link", name: "Templates" },
    newAlertLink: { role: "link", name: "New Email alert" },
    templateOptions: "div[role='button'][aria-expanded='false']",
    templateOptionsListItem: "ul[role='listbox'] li[role='option']:first-child",
  });

  return {
    async load() {
      await page.goto("/umbraco/#/editorui/editor2/dashboard/-1?page=alerts");
    },
    editor,
    ...screen,
  };
}
