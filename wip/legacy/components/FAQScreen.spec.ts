import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../tests/auth";

const _header_nav_item_button = ".header-nav-item__button";
const a_href_help_tab_user_guides_ = 'a[href="/help?tab=user-guides"]';
const _data_testid_chw_pagebanner_background_ =
  '[data-testid="chw-pagebanner_background"]';
const _chw_tab_button_title = ".chw-tab-button__title";
const _data_testid_accordion_heading_ = '[data-testid="accordion-heading"]';
const _accordion_panel_raa_0_chw_helpstream_question_content_p =
  "#accordion__panel-raa-0 > .chw-helpstream-question-content > p";

test.describe("FAQ Screen", () => {
  test("should have the correct FAQ page structure", async ({ page }) => {
    await page.goto("/analysis");

    //Get the user menu, and click Help
    page.locator(_header_nav_item_button).invoke("show");
    page.locator(a_href_help_tab_user_guides_).first().click({ force: true }); // if the onhover effect is done in CSS, we can't trigger it in cypress

    //Check we are now on the Help page
    await expect(cy.url()).contain("/help");

    //Check banner is there, and contains 'User guides'
    await expect(page.locator(_data_testid_chw_pagebanner_background_)).contain(
      "User guides",
    );

    //Check tabs are there. First tab should be 'User guides'
    await expect(page.locator(_chw_tab_button_title)).contain("User guides");

    //Check that there is at least one accordian but that all accordians are closed
    await expect(page.locator(_data_testid_accordion_heading_)).toBeAttached();
    await expect(
      page.locator(_accordion_panel_raa_0_chw_helpstream_question_content_p),
    ).not.visible();

    //Expand the first accordian, and check that there is text within the accordian
    page.locator(_data_testid_accordion_heading_).first().click();
    await expect(
      page.locator(_accordion_panel_raa_0_chw_helpstream_question_content_p),
    ).visible();

    //Close accordian, check that the data no longer displays
    page.locator(_data_testid_accordion_heading_).first().click();
    await expect(
      page.locator(_accordion_panel_raa_0_chw_helpstream_question_content_p),
    ).not.visible();
  });
});
