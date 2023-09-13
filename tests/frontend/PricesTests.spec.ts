import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";
import { notificationsStreamPageModel } from "./pages/NotificationsStreamPage";

const test = createTestFixture("notificationsStream", notificationsStreamPageModel);

test.describe("Prices Tests", () => {
  
  test("Prices button exists in the top nav", async ({ notificationsStream, page, layout })  => {
    await page.goto("/analysis");
    await expect(layout.pricesTopNav).toBeVisible(); 
  });

  test("Navigate to price page", async ({ notificationsStream, page, layout })  => {
    const navTo = `/prices/aluminium`;
    await page.goto(navTo);
    await expect(page).toHaveURL(navTo);
    await expect(layout.header).toHaveText("Aluminium");
  });

  test("Can click ranges changes state", async ({ notificationsStream, page, layout })  => {
    const navTo = `/prices/aluminium`;
    await page.goto(navTo);
    await expect(page).toHaveURL(navTo);

    //Check we are on the Overview tab
    await expect(page.getByRole('tab', {name:'Overview'})).toHaveAttribute("aria-selected", "true");

    //Navigate to the other tabs, check the page changes
    const weekly = page.getByRole('tab', {name: 'Weekly'});
    const monthly = page.getByRole('tab', {name: 'Monthly'});

    await weekly.click();
    await expect(weekly).toHaveAttribute("aria-selected", "true");
    await expect(monthly).toHaveAttribute("aria-selected", "false");
    await expect(page.getByRole('button', {name: 'Download table'})).toBeVisible();

    await monthly.click();
    await expect(monthly).toHaveAttribute("aria-selected", "true");
    await expect(weekly).toHaveAttribute("aria-selected", "false");
  });

  test("Prices table and download button exists on Weekly and Monthly", async ({ notificationsStream, page, layout })  => {
    const navTo = `/prices/aluminium`;
    await page.goto(navTo);
    await expect(page).toHaveURL(navTo);

    //Navigate to the weekly tab and check donwload option and the table are there
    const weekly = page.getByRole('tab', {name: 'Weekly'});
    await weekly.click();
    await expect(page.getByTestId("prices-table")).toBeVisible();
    await expect(page.getByRole('button', {name: 'Download table'})).toBeVisible();

    //Navigate to the monthly tab and check donwload option and the table are there
    const monthly = page.getByRole('tab', {name: 'Monthly'});
    await monthly.click();
    await expect(page.getByTestId("prices-table")).toBeVisible();
    await expect(page.getByRole('button', {name: 'Download table'})).toBeVisible();
  });

  test("Fertilizer Week Prices has nutrient filter", async ({ notificationsStream, page, layout })  => {
    const navTo = `prices/fertilizer-week-base?tab=weekly-prices`;
    await page.goto(navTo);
    await expect(page).toHaveURL(navTo);

    //Should be on FW page initally
    await expect(layout.header).toHaveText("Fertilizer Week");

    // Select Urea to filter page content
    await page.getByTestId("select-prices-nutrient-select").selectOption('Urea');

    // Confirm that the page has changed to the Urea page
    await expect(layout.header).toHaveText("Urea");
  });
});
