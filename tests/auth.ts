const { test } = require("@playwright/test");

export const umbracoSessionFile = "playwright/.auth/umbraco.json";
export const sessionFile = "playwright/.auth/admin.json";

export const asAuthenticatedUser = () => {
  test.use({
    storageState: sessionFile,
  });
};
