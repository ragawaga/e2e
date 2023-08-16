import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../auth";

const _data_testid_feedback_desktop_button_ =
  '[data-testid="feedback-desktop-button"]';
const _id_feedback_rating_group_ = '[id="feedback-rating-group"]';
const _id_feedback_text_area_ = '[id="feedback-text-area"]';
const _id_feedback_target_group_ = '[id="feedback-target-group"]';
const _data_testid_feedback_submit_button_ =
  '[data-testid="feedback-submit-button"]';
const _data_testid_feedback_form_submit_result_ =
  '[data-testid="feedback-form-submit-result"]';
const _feedback_form_title = ".feedback-form-title";
const _data_testid_feedback_form_close_desktop_ =
  '[data-testid="feedback-form-close-desktop"]';

test.describe("Feedback", () => {
  test("Feedback form is visible on each page", async ({ page }) => {
    //test that the Feedback wiget appears on a variety of pages
    await page.goto("/analysis");
    fillInFeedbackFormAndSubmit();

    await page.goto("/prices/Aluminium");
    fillInFeedbackForm();

    await page.goto("/downloads");
    fillInFeedbackForm();

    await page.goto("/downloads/Monitor/Aluminium");
    fillInFeedbackForm();

    await page.goto("/mycru");
    fillInFeedbackForm();

    await page.goto("/account-settings");
    fillInFeedbackForm();

    await page.goto("/methodologies");
    fillInFeedbackForm();

    await page.goto("/help");
    fillInFeedbackForm();
  });

  function fillInFeedbackForm() {
    //Check that the Feedback form button is there
    cy.get(_data_testid_feedback_desktop_button_).should("exist");

    //Click it, and check we see the form
    cy.get(_data_testid_feedback_desktop_button_).click();

    //Check for the 5 ratings
    cy.get(_id_feedback_rating_group_)
      .should("exist")
      .children()
      .should("have.length", 5);

    //Check for the freetext field
    cy.get(_id_feedback_text_area_).should("exist");

    //Check for the 2 radios for page/platform
    cy.get(_id_feedback_target_group_)
      .should("exist")
      .children()
      .should("have.length", 2);

    //Check that the Send is disabled
    cy.get(_data_testid_feedback_submit_button_).should("be.disabled");

    //Fill in the form, check Send enabled
    cy.get(_id_feedback_rating_group_)
      .children()
      .first()
      .find('[data-testid="chw-radio-input"]')
      .check();

    cy.get(_id_feedback_text_area_).type(
      "Feedback entered via the Cypress test suite",
    );

    cy.get(_id_feedback_target_group_)
      .children()
      .first()
      .find('[data-testid="chw-radio-input"]')
      .check();

    cy.get(_data_testid_feedback_submit_button_).should("not.be.disabled");
  }

  function fillInFeedbackFormAndSubmit() {
    fillInFeedbackForm();

    //Click the Send button
    cy.get(_data_testid_feedback_submit_button_).click();

    //Check result form displays
    cy.get(_data_testid_feedback_form_submit_result_).should("exist");

    cy.get(_feedback_form_title).should(
      "contain",
      "Thank you for submitting your feedback on CRU Online.",
    );

    //Close the form, re-open and check fields are empty again
    //Close
    cy.get(_data_testid_feedback_form_close_desktop_).click();

    //Re-open
    cy.get(_data_testid_feedback_desktop_button_).click();

    //Check the text field is empty
    cy.get(_id_feedback_text_area_).should("have.value", "");
  }
});
