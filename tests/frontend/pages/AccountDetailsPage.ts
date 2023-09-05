import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export const accountDetailsConstants = {
  accountSettingsHeader: "Account Settings",
  passedRuleClass: "passed",
  oldPassword: "OldPassword123",
  newPassword: "newPassword123&",
  mismatchPassword: "newPassword123&**",
};

export function accountDetailsPageModel(page: Page) {

  const screen = createComponentLocators(page, {
    accountDetailsSubHeading: {testId : "account-details"},
    accountDetailsTab: {role: "tab", name: "Account Details"},
    changePasswordTab: {role: "tab", name: "Change Password"},
    oldPassword: {testId : "input-oldPassword"},
    newPassword: {testId : "input-newPassword"},
    confirmPassword: {testId : "input-confirmPassword"},
    changePasswordButton: {role: "button", name: "Change password"},
    passwordRequirements: ".password-requirement",
    passwordMismatchError: {testId : "chw-text-input-error"},
  });

  return {
    async load() {
      await page.goto("/account-settings?tab=account-details");
    },
    ...screen,
  };
}
