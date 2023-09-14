import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export const dashboardConstants = {
  number: {
    rowsPerPageDefault: 100,
    rowsPerPageOption0: 25
  },
  text: {
    dataAttribute: 'data-id'
  }
}

export function dashboardPageModel(page: Page) {
  const editor = page.frameLocator("iframe");

  const screen = createComponentLocators(editor, {
    header: { role: "heading", name: "Editor UI Dashboard" },
    nextButton: { role: "button", name: /go to next page/i },
    prevButton: { role: "button", name: /go to previous page/i },
    muiDataGridRow: '.MuiDataGrid-row',
    rowsPerPageSelect: { role: "button", name: `Rows per page: ${dashboardConstants.number.rowsPerPageDefault.toString()}` },
    rowsPerPageOption0: { role: "option", name: dashboardConstants.number.rowsPerPageOption0.toString()},
    editHeader: { role: "heading", name: "Editor UI Edit Article" },
    editPreview: { role: "link", name: /preview/i },
  });

  return {
    async load() {
      await page.goto("/umbraco/#/editorui/editor2/dashboard/-1?page=dashboard");
    },
    editor,
    ...screen,
  };
}


