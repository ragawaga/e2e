import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";
import { GlobalConstants } from "./pages/Layout";
import { faqConstants, faqPageModel } from "./pages/faqPage";

const test = createTestFixture("faqPageModel", faqPageModel);

test.describe("FAQ Screen", () => {
  test("should have the correct FAQ page structure", async ({ page, layout, faqPageModel }) => {
    await page.goto(GlobalConstants.home);

    //Click Account Setting link from the user menu
    await layout.userMenu.hover();
    await layout.helpLink.click();

    //Check we are now on the Help page
    await expect(page).toHaveURL(/help*/);

    //Check banner is there, and contains 'User guides'
    expect(await layout.header.textContent()).toEqual(faqConstants.faqHeader);

    //Check tabs are there. First tab should be 'User guides'
    await expect(page.getByRole("tablist").first()).toContainText(faqConstants.firstAccordianText);

    //Check that there is at least one accordian but that all accordians are closed
    await expect(faqPageModel.faqAccordian).toHaveCount(6);
    await expect(page.getByText(faqConstants.firstAccordianText)).toBeHidden();

    //Expand the first accordian, and check that there is text within the accordian
    await faqPageModel.firstAccordianButton.click();
    await expect(page.getByText(faqConstants.firstAccordianText)).toBeVisible();

    //Close accordian, check that the data no longer displays
    await faqPageModel.firstAccordianButton.click();
    await expect(page.getByText(faqConstants.firstAccordianText)).toBeHidden();

  });
});
