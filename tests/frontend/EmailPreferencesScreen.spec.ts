import { expect } from "@playwright/test";
import { GlobalConstants } from "./pages/Layout";
import { emailPrefsPageModel } from "./pages/EmailPrefsPage";
import { emailPrefsConstants } from "./pages/EmailPrefsPage";
import { createTestFixture } from "../fixture";

const test = createTestFixture("emailPrefsModel", emailPrefsPageModel);

test.describe("Email preferences Screen", () => {

  test("should have the correct Email Preferences page structure", async ({
    page, layout, emailPrefsModel
  }) => {

    await page.goto("/");

    //Click Account Setting link from the user menu
    await layout.userMenu.hover();
    await layout.accountSettingsLink.click();

    //Check tabs are there. Second tab should contain 'Email Preferences'
    await expect(emailPrefsModel.emailPrefsTabLink).toHaveText(emailPrefsConstants.emailPrefsTabText);

    // Navigate to the Email preferences tab
    await emailPrefsModel.emailPrefsTabLink.click();

    // Check for the Email preferences lists to validate the basic page structure is there
    await validatePageStructure(emailPrefsModel);

    //Check for the explanatory text on each of the 3 elements which have 'group' text
    await expect (page.getByText(emailPrefsConstants.newsAlertBlurb)).toBeVisible();
    await expect (page.getByText(emailPrefsConstants.productAlertBlurb)).toBeVisible();
    await expect (page.getByText(emailPrefsConstants.marketAlertBlurb)).toBeVisible();

    // Count the number of checkboxes
    await expect(page.getByRole('checkbox')).toHaveCount(30);
    // Count the number of radio buttons
    await expect(page.getByRole('radio')).toHaveCount(2);
    
    //Check for the 'individual' explanatory text - 23 of the checkboxes shoul have this
    await expect(emailPrefsModel.checkBoxDescription).toHaveCount(23);

    //Check the value of the explanatory text is as expected
    await expect (page.getByText(emailPrefsConstants.explanatoryText)).toBeVisible();
  });

  test("can navigate directly to the page tab via URL", async ({
    page, layout, emailPrefsModel
  }) => {

    //Navigate directly to the URL
    emailPrefsModel.load();

    //Check tabs are there. Second tab should contain 'Email Preferences'
    await expect(emailPrefsModel.emailPrefsTabLink).toHaveText(emailPrefsConstants.emailPrefsTabText);
    await validatePageStructure(emailPrefsModel);

  });

  async function validatePageStructure(emailPrefsModel: ReturnType<typeof emailPrefsPageModel>) {
    //Check basic page structire exists
    await expect(
      emailPrefsModel.newsAlertHeaderId).toHaveText(emailPrefsConstants.newsAlertText);

    await expect(
      emailPrefsModel.productAlertHeaderId).toHaveText(emailPrefsConstants.productAlertText);

    await expect(
      emailPrefsModel.marketAlertHeaderId).toHaveText(emailPrefsConstants.marketAlertText);

    await expect(
      emailPrefsModel.priceAlertHeaderId).toHaveText(emailPrefsConstants.priceAlertText);

    await expect(
      emailPrefsModel.fertilizerAlertHeaderId).toHaveText(emailPrefsConstants.fertilizersText);
    
}


    
});
