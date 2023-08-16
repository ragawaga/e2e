import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../auth";

const a_href_https_www_crugroup_com_privacy_policy_ =
  'a[href="https://www.crugroup.com/privacy-policy"]';
const _id_chw_footer_ = '[id="chw-footer"]';
const a_href_https_www_crugroup_com_terms_and_conditions_ =
  'a[href="https://www.crugroup.com/terms-and-conditions"]';

test.describe("Footer", () => {
  test("contains correct links to privacy policy and general terms and conditions", async ({
    page,
  }) => {
    await page.goto("/analysis");

    //Check the footer for the privacy policy link
    await expect(
      page.locator(a_href_https_www_crugroup_com_privacy_policy_),
    ).toBeAttached();

    //Check the footer for the genral terms and conditions link
    await expect(
      page.locator(a_href_https_www_crugroup_com_terms_and_conditions_),
    ).toBeAttached();
  });
});
