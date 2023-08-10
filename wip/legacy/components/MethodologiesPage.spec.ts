import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../auth";

const _chw_header_user_moniker_a_href_methodologies_ =
  '#chw-header-user-moniker a[href="/methodologies"]';
const _data_testid_chw_pagebanner_background_ =
  '[data-testid="chw-pagebanner_background"]';
const _data_testid_generic_page_bodytext_ =
  '[data-testid="generic-page-bodytext"]';

test.describe("Methodologies Screen", () => {
  test("should have the correct page structure", async ({ page }) => {
    await page.goto("/analysis");

    // Click Price methodologies within user menu
    page.locator(_chw_header_user_moniker_a_href_methodologies_).click({
      force: true,
    });

    // Check we are now on the Price methodologies page
    await expect(cy.url()).contain("/methodologies");

    // Check main heading is there within page banner
    await expect(page.locator(_data_testid_chw_pagebanner_background_)).contain(
      "Price Methodologies & Compliance Framework",
    );

    // Check that the page renders body text
    await expect(page.locator(_data_testid_generic_page_bodytext_)).not.empty();
  });
});
