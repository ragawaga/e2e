import { expect } from "@playwright/test";
import { createTestFixture } from "../fixture";
import { analysisStreamPageModel } from "./pages/AnalysisStreamPage";

const test = createTestFixture("analysis", analysisStreamPageModel);

test.describe("analysis stream", () => {
  test.beforeEach(async ({ analysis }) => {
    await analysis.load();
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Commodity Market Analysis/);
  });

  test("has the correct number of results", async ({ analysis }) => {
    await expect(analysis.articleCounter).toBeVisible();
    await expect(analysis.articles).toHaveCount(20);
  });

  test("links to the article viewer screen", async ({ analysis, page }) => {
    await analysis.articleHeaders.first().click();
    await expect(page).toHaveURL(/article/);
  });
});
