import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";
import { notificationStreamConstants, notificationsStreamPageModel } from "./pages/NotificationsStreamPage";

const test = createTestFixture("notificationsStream", notificationsStreamPageModel);

test.describe("Notifications Stream", () => {

  test.beforeEach(async ({ notificationsStream }) => await notificationsStream.load());

  test("shows the notifications bell and panel to logged in users in the top nav menu", async ({ notificationsStream, page, layout }) => {
    
    //Hover over the bell and check the Notification Panel is visible
    await notificationsStream.notificationsBell.hover();
    await expect(notificationsStream.notificationsPanel).toBeVisible();
    
    //Check that there are exactly 3 Notifications listed in the panel
    const listOfTopThreeNotifications = notificationsStream.notificationsPanelList  ;
    await expect (listOfTopThreeNotifications).toBeVisible();
    expect (listOfTopThreeNotifications.getByRole('listitem')).toHaveCount(3);

    //Check that there is a link to Notifications Stream, and that it takes you there
    await notificationsStream.allNotificationsLink.click();
    await expect(page).toHaveURL("/notifications");
  });

  test("filter Type should show and have the 5 Notifications options", async ({ notificationsStream, page, layout }) => {
    await notificationsStream.typeFilter.click();
    await expect(notificationsStream.platformUpdateType).toBeVisible();
    await expect(notificationsStream.priceNoticeType).toBeVisible();
    await expect(notificationsStream.serviceUpdateType).toBeVisible();
    await expect(notificationsStream.webinarType).toBeVisible();
    await expect(notificationsStream.notificationType).toBeVisible();
  });

  test("check number and order of filters is correct", async ({ notificationsStream, page, layout }) => {
    await expect(notificationsStream.filtersBar.getByRole("button")).toHaveCount(2);
    await expect(notificationsStream.filtersBar.getByRole("button").first()).toHaveText("Type");
  });

  test("shows a listing of notifications to logged in users", async ({ notificationsStream, page, layout }) => {

    //Check the header is good
    await expect(layout.header).toHaveText(notificationStreamConstants.pageHeader);

    //There should be exactly 20 Article Headings
    await expect(notificationsStream.articleHeader).toHaveCount(20);

    //Check that there are 20 occurances of platform priority tags
    await expect(notificationsStream.platformPriorityTags).toHaveCount(20);

    //Check that the teaser DOES NOT show on Notifications
    await expect(notificationsStream.teaser).toHaveCount(20);
    (await notificationsStream.teaser.all()).forEach((el) => {
      expect(el).toBeEmpty();
    });
  });

  test("test sends filter options to API and count of articles amended", async ({ notificationsStream, page, layout })  => {

    //Click on Webinar, and confirm platform priority tags are all Webinar in the results
    await notificationsStream.typeFilter.click();
    await notificationsStream.priceNoticeType.click();

    //Check that there are 20 occurances of platform priority tags
    await expect(notificationsStream.platformPriorityTags).toHaveCount(20);
    (await notificationsStream.platformPriorityTags.all()).forEach((el) => {
      expect(el).toContainText("Price Notice");
    });
  });

  test("sends date filter to API", async ({ notificationsStream, page, layout }) => {

    //Set the Published start and end dates
    await notificationsStream.publishedFilter.click();
    await notificationsStream.startDate.fill("2023-09-01");
    await notificationsStream.endDate.fill("2023-09-05");

    //This particular date range should only bring back 1 result
    await expect(notificationsStream.articleHeader).toHaveCount(1);

    //Check that the date filter pills are there
    await expect(notificationsStream.dateFilterPill).toHaveCount(2);

    //Check for Clear all, and click it
    await notificationsStream.clearAllButton.click();

    //We should be back to 20 results now
    await expect(notificationsStream.articleHeader).toHaveCount(20);
  });  

  test("filter notifications with start and end date of today brings No results found ", async ({ notificationsStream, page, layout }) => {
    
    //This test could fail when someone is working on Notifications 
    //and actively publishing them on dev
    
    //Build today's date
    const date = new Date();
    const getYear = date.toLocaleString("default", { year: "numeric" });
    const getMonth = date.toLocaleString("default", { month: "2-digit" });
    const getDay = date.toLocaleString("default", { day: "2-digit" });
    const dateFormat = getYear + "-" + getMonth + "-" + getDay;

    //Set today's date into the date picker
    await notificationsStream.publishedFilter.click();
    await notificationsStream.startDate.fill(dateFormat);
    await notificationsStream.endDate.fill(dateFormat);
    await expect(notificationsStream.articleHeader).toHaveCount(0);
    await page.getByTestId("no-results-found").isVisible();

  });

  test("pagination changes the notifications list", async ({ notificationsStream, page, layout }) => {
    await expect(notificationsStream.paginationInfo).toContainText("Page 1 of");
    await page.getByLabel(notificationStreamConstants.nextPageButton).click();
    await expect(notificationsStream.paginationInfo).toContainText("Page 2 of");
  });

});
