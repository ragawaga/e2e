import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";
import { dashboardPageModel } from "./pages/DashboardPage";

const test = createTestFixture("dashboard", dashboardPageModel);

test.describe("Dashboard", () => {

    test("Is loaded", async ({dashboard}) => {
        await expect(dashboard.header).toBeVisible();
    });

});

// test.describe("Pagination", () => {

//     test.describe("Next", async({dashboard}) => {

//     });

// });