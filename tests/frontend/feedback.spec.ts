import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";

import { FeedbackPageConstants, FeedbackPageModel } from "./pages/FeedbackPage";

const test = createTestFixture("feedbackModel", FeedbackPageModel);

test.describe("Feedback form visible and form elements existing", () => {

  //this will run after each test below
  test.afterEach(async ({ feedbackModel }) => {
    await feedbackModel.feedbackDesktopButton.click();
    await expect(feedbackModel.feedbackRatingGroup).toBeVisible();

    //check rating group has 5 checkboxes
    await expect(feedbackModel.feedbackRatingGroup.getByTestId(FeedbackPageConstants.feedbackRadioItem)).toHaveCount(5);
    //check target group has 5 checkboxes
    await expect(feedbackModel.feedbackTargetGroup.getByTestId(FeedbackPageConstants.feedbackRadioItem)).toHaveCount(2);
    await expect(feedbackModel.feedbackSubmitButton).toBeDisabled();

    await expect(feedbackModel.feedbackTextArea).toBeVisible();
    await feedbackModel.feedbackTextArea.type("Feedback entered via the Plawyright test suite");

    //click a radio buton in each radio button list i.e. Rating and Target
    await feedbackModel.feedbackRatingGroup.getByTestId(FeedbackPageConstants.feedbackRadioItem).first().click();
    await feedbackModel.feedbackTargetGroup.getByTestId(FeedbackPageConstants.feedbackRadioItem).first().click();
    await expect(feedbackModel.feedbackSubmitButton).not.toBeDisabled();
  });

  test("Feedback form is visible on analysis page", async ({ page }) => {
    await page.goto("/analysis");
  });

  test("Feedback form is visible on aluminium prices page", async ({ page }) => {
    await page.goto("/prices/Aluminium");
  });

  test("Feedback form is visible on downloads page", async ({ page }) => {
    await page.goto("/downloads");
  });

  test("Feedback form is visible on downloads aluminum monitor page", async ({ page }) => {
    await page.goto("/downloads/Monitor/Aluminium");
  });

  test("Feedback form is visible on My Cru page", async ({ page }) => {
    await page.goto("/mycru");
  });

  test("Feedback form is visible on account settings page", async ({ page }) => {
    await page.goto("/account-settings");
  });

  test("Feedback form is visible on methodologies page", async ({ page }) => {
    await page.goto("/methodologies");
  });

  test("Feedback form is visible on help page", async ({ page }) => {
    await page.goto("/help");
  });

});

test.describe("Feedback form submit", () => {

  //this will run after each test below
  test.afterEach(async ({ feedbackModel }) => {
    await feedbackModel.feedbackDesktopButton.click();
    await expect(feedbackModel.feedbackRatingGroup).toBeVisible();

    //check rating group has 5 checkboxes
    await expect(feedbackModel.feedbackRatingGroup.getByTestId(FeedbackPageConstants.feedbackRadioItem)).toHaveCount(5);
    //check target group has 5 checkboxes
    await expect(feedbackModel.feedbackTargetGroup.getByTestId(FeedbackPageConstants.feedbackRadioItem)).toHaveCount(2);
    await expect(feedbackModel.feedbackSubmitButton).toBeDisabled();

    await expect(feedbackModel.feedbackTextArea).toBeVisible();
    await feedbackModel.feedbackTextArea.type("Feedback entered via the Plawyright test suite");

    //click a radio buton in each radio button list i.e. Rating and Target
    await feedbackModel.feedbackRatingGroup.getByTestId(FeedbackPageConstants.feedbackRadioItem).first().click();
    await feedbackModel.feedbackTargetGroup.getByTestId(FeedbackPageConstants.feedbackRadioItem).first().click();
    await expect(feedbackModel.feedbackSubmitButton).not.toBeDisabled();
    await feedbackModel.feedbackSubmitButton.click();

    await expect(feedbackModel.feedbackFormTitle.first()).toContainText("Thank you for submitting your feedback on CRU Online.")

  });

  test("Feedback form is visible and submittable on analysis page", async ({ page }) => {
    await page.goto("/analysis");
  });
});
