import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";
import { dashboardConstants, dashboardPageModel } from "./pages/DashboardPage";

const test = createTestFixture("dashboard", dashboardPageModel);

test.describe("Dashboard", () => {

    test.beforeEach(async ({ dashboard }) => {
        await dashboard.load();
    });

    test("Header is loaded", async ({dashboard}) => {
        await expect(dashboard.header).toBeVisible();
    });

    test("Clicking to edit an article", async ({dashboard}) => {
        const firstTitleEl = dashboard.muiDataGridRow.first().locator('a');
        const firstRowDataId = await dashboard.muiDataGridRow.first().getAttribute(dashboardConstants.text.dataAttribute) as string;
        await firstTitleEl.click();
        await expect(dashboard.editHeader).toBeVisible();
        await expect(dashboard.editPreview).toHaveAttribute('href', new RegExp(firstRowDataId, "i"));
    });

});

test.describe("Paginator", () => {

    test.beforeEach(async ({ dashboard }) => {
        await dashboard.load();
    });

    test("Paginator buttons initial state", async ({dashboard}) => {
        await expect(dashboard.nextButton).toBeEnabled();
        await expect(dashboard.prevButton).toBeDisabled();
    });

    test("Number of rows in table", async ({dashboard}) => {
        await expect(dashboard.muiDataGridRow).toHaveCount(dashboardConstants.number.rowsPerPageDefault);
    });

    test("Next button loads different articles", async ({dashboard}) => {
        const firstRowDataId = await dashboard.muiDataGridRow.first().getAttribute(dashboardConstants.text.dataAttribute) as string;
        await dashboard.nextButton.click();
        await expect(dashboard.muiDataGridRow.first()).not.toHaveAttribute(dashboardConstants.text.dataAttribute, firstRowDataId)
    });

    test("Previous button reloads first page articles", async ({dashboard}) => {
        const firstRowDataId = await dashboard.muiDataGridRow.first().getAttribute(dashboardConstants.text.dataAttribute) as string;
        await dashboard.nextButton.click();
        await dashboard.prevButton.click()
        await expect(dashboard.muiDataGridRow.first()).toHaveAttribute(dashboardConstants.text.dataAttribute, firstRowDataId)
    });

    test("Paginator buttons page 2 state", async ({dashboard}) => {
        await dashboard.nextButton.click();
        await expect(dashboard.nextButton).toBeEnabled();
        await expect(dashboard.prevButton).toBeEnabled();
    });

    test("Number of articles per page changes when the option is selected", async ({dashboard}) => {
        await dashboard.rowsPerPageSelect.click();
        await dashboard.rowsPerPageOption0.click();
        await expect(dashboard.muiDataGridRow).toHaveCount(dashboardConstants.number.rowsPerPageOption0);
    });

});
