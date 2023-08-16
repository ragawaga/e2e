import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../auth";

const _header_nav_item_title_span = ".header-nav-item__title > span";
const _chw_header_user_moniker = "#chw-header-user-moniker";
const _modal_dialog = ".modal__dialog";
const _data_testid_input_userEmailInput_ =
  '[data-testid="input-userEmailInput"]';
const _chw_input_error = ".chw-input-error";
const _data_testid_impersonation_form_submit_btn_ =
  '[data-testid="impersonation-form__submit-btn"]';
const _nav_menu_prices_header_nav_item_header_sub_menu_header_sub_menu_category_header_sub_menu_category_items_header_sub_menu_item_a_contains_Copper_ =
  "#nav-menu-prices > .header-nav-item > .header-sub-menu > .header-sub-menu-category > .header-sub-menu-category-items > .header-sub-menu-item > a:contains(Copper)";
const _data_testid_info_bar_ = '[data-testid="info-bar"]';

test.describe("Impersonate User", () => {
  test("should have Impersonate User option for A999 user in user dropdown", async ({
    page,
  }) => {
    await page.goto("/analysis");

    await expect(page.locator(_header_nav_item_title_span)).contain(
      "John Smith",
    );

    //Click Impersonate User link from the user menu
    await expect(page.locator(_chw_header_user_moniker)).contain(
      "Impersonate User",
    );

    //Click Impersonate User link from the user menu
    page.locator(_chw_header_user_moniker).contains("Impersonate User").click({
      force: true,
    });

    await expect(page.locator(_modal_dialog)).visible();

    page.locator(_data_testid_input_userEmailInput_).type("blah");

    //Check error message appears for invalid email
    await expect(page.locator(_chw_input_error)).visible();

    page.locator(_data_testid_input_userEmailInput_).focus().clear();

    page
      .locator(_data_testid_input_userEmailInput_)
      .type("Cruonlinetestuser19@gmail.com");

    //impersonation-form__submit-btn
    page.locator(_data_testid_impersonation_form_submit_btn_).click({
      force: true,
    });

    //header-nav-item__title
    await expect(page.locator(_header_nav_item_title_span)).contain(
      "Test User19",
    );

    //Ensure impersonated user does not have copper - assuming impersonated user only has Nickel.
    await expect(
      page.locator(
        _nav_menu_prices_header_nav_item_header_sub_menu_header_sub_menu_category_header_sub_menu_category_items_header_sub_menu_item_a_contains_Copper_,
      ),
    ).not.toBeAttached();

    page.locator(_data_testid_info_bar_).contains("Stop impersonating").click({
      force: true,
    });

    await expect(page.locator(_header_nav_item_title_span)).contain(
      "John Smith",
    );
  });
});
