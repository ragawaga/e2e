import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../auth";

const _header_nav_item_title_span = ".header-nav-item__title > span";

test.describe("Impersonate User", () => {
  const { username, password } = readCredentials(
    "LOGIN_SCREEN__RESTRICTED_CREDENTIALS",
  );

  test("should NOT have Impersonate User option for non-A999 user in user dropdown", async ({
    page,
  }) => {
    await page.goto("/analysis");

    //assuming LOGIN_SCREEN__RESTRICTED_CREDENTIALS in cypress.env.json is cruonlinetestuser11@gmail.com
    await expect(page.locator(_header_nav_item_title_span)).contain(
      "Cru Testuser11",
    );

    await expect(
      cy.contains("#chw-header-user-moniker", "Impersonate User"),
    ).not.toBeAttached();
  });
});
