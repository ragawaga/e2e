const { test } = require("@playwright/test");

export const sessionFile = "playwright/.auth/admin.json";
export const asAuthenticatedUser = () => {
  test.use({
    storageState: sessionFile,
  });
};
