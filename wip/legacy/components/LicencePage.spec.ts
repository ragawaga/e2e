import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../auth";

const _data_testid_chw_pagebanner_background_ =
  '[data-testid="chw-pagebanner_background"]';
const _data_testid_generic_page_bodytext_ =
  '[data-testid="generic-page-bodytext"]';

test.describe("Licence Terms and Conditions Screen", () => {
  test("should have the correct page structure", async ({ page }) => {
    await page.goto("/termsandconditions");

    // Check we are now on the Licence Terms and Conditions page
    await expect(cy.url()).contain("/termsandconditions");

    // Check main heading is there within page banner
    await expect(page.locator(_data_testid_chw_pagebanner_background_)).contain(
      "License Terms and Conditions",
    );

    // Check that the page renders body text
    await expect(page.locator(_data_testid_generic_page_bodytext_)).not.empty();
  });
});
