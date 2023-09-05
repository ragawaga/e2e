import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export const accountDetailsConstants = {
  accountSettingsHeader: "Account Settings",
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
  });

  return {
    async load() {
      await page.goto("/account-settings?tab=account-details");
    },
    ...screen,
  };
}
