import { expect, test } from "@playwright/test";
import { globalLocators } from "./pages/GlobalLocators";

test.describe("Methodologies Screen", () => {
  test("should have the correct page structure", async ({ page }) => {
    await page.goto("/analysis");

    await page.locator(globalLocators.header).textContent();

    // Click Price methodologies within user menu
    //TODO Move the button John Smith into globalLocators somehow as it is used in a few tests
    //TODO as per Gary's feedback ideally we don't want to use text John Smith here, but I can't
    //see an alternative as getById isn't a thing. Need FE to add a data-testid here
    await page.getByRole('button', { name: globalLocators.userMenu.name }).click();
    await page.getByRole('link', { name: 'Price Methodologies' }).click();

    // Check we are now on the Price methodologies page
    await expect(page).toHaveURL("/methodologies");

    // Check main heading is there within page banner
    const text = await page.locator(globalLocators.header).textContent();
    expect(text).toEqual('Price Methodologies & Compliance Framework');

    // Check that the page renders body text
    expect(page.getByText('CRU’s Governance and internal oversight structures, policies and working practic')).toBeVisible();
  });
});
