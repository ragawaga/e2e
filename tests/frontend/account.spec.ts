import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";
import { accountDetailsConstants, accountDetailsPageModel } from "./pages/AccountDetailsPage";
import { GlobalConstants } from "./pages/Layout";

const test = createTestFixture("accountDetailsModel", accountDetailsPageModel);

test.describe("a logged in user", () => {
  test("should see profile properties", async ({ page, accountDetailsModel }) => {

    //Navigate straight to the page
    await accountDetailsModel.load();

    //Check the header 'Your account details' is there
    await expect(accountDetailsModel.accountDetailsSubHeading).toBeVisible();

    //Check the 4 personal data fields are there
    for (const field of ["name", "email", "company", "job"]) {
      const valueElement = page.getByTestId(`account-${field}`);

      await expect(valueElement).toBeVisible();
    }
  });

  test("should have the correct Account details page structure", async ({
    page, layout, accountDetailsModel
  }) => {
    
    //Check can navigate via the menu structure
    await page.goto(GlobalConstants.home);

    //Get the user menu, and click Account settings
    await layout.userMenu.hover();
    await layout.accountSettingsLink.click();
    
    //Check we are now on the Account settings page
    await expect(accountDetailsModel.accountDetailsSubHeading).toBeVisible();

    //Check banner is there, and contains 'Account Settings'
    await expect(layout.header).toHaveText(accountDetailsConstants.accountSettingsHeader);

    //Check tabs are there. First tab should be 'Account Details'
    await expect(accountDetailsModel.accountDetailsTab).toBeVisible();
  });

  test("should have the change password functionality", async ({ page, layout, accountDetailsModel }) => {
  
    await page.goto(GlobalConstants.home);

    //Get the user menu, and click Account settings
    //Get the user menu, and click Account settings
    await layout.userMenu.hover();
    await layout.accountSettingsLink.click();

    //Check we are now on the Account settings page
    await expect(accountDetailsModel.accountDetailsSubHeading).toBeVisible();

    //Check tabs are there. Second tab should contain 'Change Password'
    await expect(accountDetailsModel.changePasswordTab).toBeVisible();

    //Click on the Change Password tab
    await accountDetailsModel.changePasswordTab.click();

    //Verify we see the 3 input fields
    await expect(accountDetailsModel.oldPassword).toBeAttached();
    await expect(accountDetailsModel.newPassword).toBeAttached();
    await expect(accountDetailsModel.confirmPassword).toBeAttached();

    //Check Change password button is disabled initially
    await expect(accountDetailsModel.changePasswordButton).toBeDisabled();

    //All items on the password guidance should not be green (passed)
    const listOfGuidance = accountDetailsModel.passwordRequirements;
    await expect (listOfGuidance).toBeVisible();

    //Check there are 5 pieces of password guidance
    expect (listOfGuidance.getByRole('listitem')).toHaveCount(5);

    //Check none have class 'passed'
    (await listOfGuidance.getByRole('listitem').all()).forEach((el) => {
      expect(el).not.toHaveClass(accountDetailsConstants.passedRuleClass);
    });

    //Enter a password into the old password field, and identical passwords into the
    //new and confirm fields, and check that the button is now enabled
    await accountDetailsModel.oldPassword.fill(accountDetailsConstants.oldPassword);
    await accountDetailsModel.newPassword.fill(accountDetailsConstants.newPassword);
    await accountDetailsModel.confirmPassword.fill(accountDetailsConstants.newPassword);

    await expect(accountDetailsModel.changePasswordButton).toBeEnabled();

    //All items on the password guidance should be green now (passed)
    (await listOfGuidance.getByRole('listitem').all()).forEach((el) => {
      expect(el).toHaveClass(accountDetailsConstants.passedRuleClass);
    });

    //Amend the confrm password so they do not match, check we get error message
    await expect(accountDetailsModel.passwordMismatchError).not.toBeVisible();
    await accountDetailsModel.confirmPassword.fill(accountDetailsConstants.mismatchPassword);
    await accountDetailsModel.oldPassword.click();
    await expect(accountDetailsModel.passwordMismatchError).toBeVisible();
  });
});
