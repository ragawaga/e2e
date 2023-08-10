import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../tests/auth";

const _header_nav_item_button = ".header-nav-item__button";
const a_href_account_settings_tab_account_details_ =
  'a[href="/account-settings?tab=account-details"]';
const _data_testid_chw_pagebanner_background_ =
  '[data-testid="chw-pagebanner_background"]';
const _chw_tab_button_title = ".chw-tab-button__title";
const _data_testid_account_name_ = '[data-testid="account-name"]';
const _data_testid_account_email_ = '[data-testid="account-email"]';
const _data_testid_account_company_ = '[data-testid="account-company"]';
const _data_testid_account_job_ = '[data-testid="account-job"]';
const _chw_tab_list_chw_tab_button = ".chw-tab-list .chw-tab-button";
const _data_testid_tab_change_password_ = '[data-testid="tab-change-password"]';
const _data_testid_input_oldPassword_ = '[data-testid="input-oldPassword"]';
const _data_testid_input_newPassword_ = '[data-testid="input-newPassword"]';
const _data_testid_input_confirmPassword_ =
  '[data-testid="input-confirmPassword"]';
const _button_standard = ".button--standard";
const ul_password_requirement = "ul.password-requirement";
const _data_testid_change_password_submit_ =
  '[data-testid="change-password-submit"]';
const _data_testid_chw_text_input_error_ =
  '[data-testid="chw-text-input-error"]';

test.describe("Account details Screen", () => {
  test("should have the correct Account details page structure", async ({
    page,
  }) => {
    const containsValue = "contain.value";
    await page.goto("/analysis");

    //Get the user menu, and click Account settings
    page.locator(_header_nav_item_button).invoke("show");
    page
      .locator(a_href_account_settings_tab_account_details_)
      .first()
      .click({ force: true }); // if the onhover effect is done in CSS, we can't trigger it in cypress

    //Check we are now on the Account settings page
    await expect(cy.url()).contain("/account-settings");

    //Check banner is there, and contains 'Account Settings'
    await expect(page.locator(_data_testid_chw_pagebanner_background_)).contain(
      "Account Settings",
    );

    //Check tabs are there. First tab should be 'Account Details'
    await expect(page.locator(_chw_tab_button_title)).contain(
      "Account Details",
    );

    //Check for presence of the Account details information
    await expect(page.locator(_data_testid_account_name_)).contain(
      "John Smith",
    );
    await expect(page.locator(_data_testid_account_email_)).contain(
      "crudev@digirati.co.uk",
    );
    await expect(page.locator(_data_testid_account_company_)).contain(
      "CRU International",
    );
    await expect(page.locator(_data_testid_account_job_)).contain(
      "Senior Developer",
    );
  });

  test("should have the change password functionality", async ({ page }) => {
    const containsValue = "contain.value";
    await page.goto("/analysis");

    //Get the user menu, and click Account settings
    page.locator(_header_nav_item_button).invoke("show");
    page.locator(a_href_account_settings_tab_account_details_).click({
      force: true,
    }); // if the onhover effect is done in CSS, we can't trigger it in cypress

    //Check tabs are there. Second tab should contain 'Change Password'
    await expect(
      page.locator(_chw_tab_list_chw_tab_button).first().next(),
    ).contain("Change Password");

    //Click on the Change Password tab
    page.locator(_data_testid_tab_change_password_).click();

    //Verify we see the 3 input fields
    await expect(page.locator(_data_testid_input_oldPassword_)).toBeAttached();
    await expect(page.locator(_data_testid_input_newPassword_)).toBeAttached();
    await expect(
      page.locator(_data_testid_input_confirmPassword_),
    ).toBeAttached();

    //Check Change password button is disabled initially
    await expect(page.locator(_button_standard)).disabled();

    //All items on the password guidance should not be green (passed)
    await expect(
      page.locator(ul_password_requirement).children(".passed"),
    ).toHaveLength(0);

    //Enter a password into the old password field, and identical passwords into the
    //new and confirm fields, and check that the button is now enabled
    page.locator(_data_testid_input_oldPassword_).type("OldPassword123");
    page.locator(_data_testid_input_newPassword_).type("newPassword123&");
    page.locator(_data_testid_input_confirmPassword_).type("newPassword123&");
    await expect(
      page.locator(_data_testid_change_password_submit_),
    ).not.disabled();

    //All items on the password guidance should be green now (passed)
    await expect(
      page.locator(ul_password_requirement).children(".passed"),
    ).toHaveLength(5);

    //Amend the confrm password so they do not match, check we get error message
    await expect(
      page.locator(_data_testid_chw_text_input_error_),
    ).not.toBeAttached();
    page.locator(_data_testid_input_confirmPassword_).type("newPassword123&**");
    page.locator(_data_testid_input_oldPassword_).click();
    await expect(
      page.locator(_data_testid_chw_text_input_error_),
    ).toBeAttached();
  });
});
