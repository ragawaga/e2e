import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";
import { alertsPageModel } from "./pages/AlertsPage";

const test = createTestFixture("alerts", alertsPageModel);

const timeout = 3000;

test.describe("Alerts", () => {
  test.beforeEach(async ({ alerts }) => {
    await alerts.load();
  });

  test.describe("Alerts listing view", () => {
    test("displays the Alerts view", async ({ alerts }) => {
      await expect(alerts.pageHeading).toContainText("Alerts");
      await expect(alerts.contentHeading).toContainText("Alerts");
      await expect(alerts.table).toBeVisible();
      await expect(alerts.templatesLink).toBeVisible();
      await expect(alerts.newAlertLink).toBeVisible();
      await alerts.newAlertLink.click();
      // step 1
      await expect(alerts.pageHeading).toContainText("Create News Alert");
      await expect(alerts.contentHeading).toContainText("Choose your alert");
      await alerts.templateOptions.click();
      await alerts.templateOptionsListItem.waitFor({
        state: "visible",
        timeout,
      });
      await alerts.templateOptionsListItem.click();
      await alerts.nextButton.click();
      // step 2
      await expect(alerts.contentHeading).toContainText("Email content");
      await expect(alerts.alertForm).toBeVisible();
      await alerts.nextButton.click();
      // step 3
      await expect(alerts.contentHeading).toContainText("Review email");
      await expect(alerts.alertForm).toBeVisible();
      // stop the alert being created
      await alerts.cancelButton.click();
    });
  });
});
