import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../tests/auth";
const _header_link_inaccessible_data_testid_header_link_1_button_ =
  '.header-link--inaccessible [data-testid="header-link-1__button"]';

test.describe("Article Screen Restricted", () => {
  const { username, password } = readCredentials(
    "LOGIN_SCREEN__RESTRICTED_CREDENTIALS",
  );

  test("User does not have access to Prices", async ({ page }) => {
    await page.goto("/analysis");
    page
      .locator(_header_link_inaccessible_data_testid_header_link_1_button_)
      .contains("Prices");
  });
});
