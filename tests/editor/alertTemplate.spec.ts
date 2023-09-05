import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";
import { alertTemplatesPageModel } from "./pages/AlertTemplatesPage";

const test = createTestFixture("alertTemplate", alertTemplatesPageModel);

test.describe("Alert templates", () => {
  test.beforeEach(async ({ alertTemplate }) => {
    await alertTemplate.load();
  });

  test.describe("Alert templates listing table", () => {
    test("displays list of Alert templates", async ({ alertTemplate }) => {
      await expect(alertTemplate.header).toBeVisible();
      await expect(alertTemplate.table).toBeVisible();
      await expect(alertTemplate.newTemplateLink).toBeVisible();
    });
  });

  test.describe("Alert template form", () => {
    test("Displays template name error for invalid min character length ", async ({ alertTemplate }) => {
      // Click the new template button
      await alertTemplate.newTemplateLink.click();

      await expect(alertTemplate.nameField).toHaveAttribute("aria-invalid", "false");

      // Input an invalid template name
      await alertTemplate.nameField.fill('I');

      // Click Save as draft button
      await alertTemplate.saveAsDraftButton.click();

      // Assert that input is invalid
      await expect(alertTemplate.nameField).toHaveAttribute("aria-invalid", "true");
    });

    test("Displays template name error for invalid max character length ", async ({ alertTemplate }) => {

      // value is 51 chars length
      const invalidNewValue = "X".repeat(51);

      // Click the new template button
      await alertTemplate.newTemplateLink.click();

      await expect(alertTemplate.nameField).toHaveAttribute("aria-invalid", "false");

      // Input an invalid template name
      await alertTemplate.nameField.fill(invalidNewValue);

      // Click Save as draft button
      await alertTemplate.saveAsDraftButton.click();

      // Assert that input is invalid
      await expect(alertTemplate.nameField).toHaveAttribute("aria-invalid", "true");
    });

    test("auto populates banner & subject fields", async ({ alertTemplate }) => {
      const nameFieldValue = 'This is my new template';

      await alertTemplate.newTemplateLink.click();

      // Input a template name
      await alertTemplate.nameField.fill(nameFieldValue);

      // Assert that other fields are autopopulated for Template name value
      await expect(alertTemplate.bannerField).toHaveValue(nameFieldValue);
      await expect(alertTemplate.subjectField).toHaveValue(nameFieldValue);
    });
  });

});
