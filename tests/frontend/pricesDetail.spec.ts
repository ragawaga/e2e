import { expect } from "@playwright/test";

import { createTestFixture } from "../fixture";

import { pricesDetailPageModel } from "./pages/PricesDetailPage";

import { GlobalConstants } from "./pages/Layout";

const test = createTestFixture("pricesDetail", pricesDetailPageModel)

test.describe("Price Detail page", () => {
  
  test("Display Ferromanganese price detail page", async ({ pricesDetail, layout }) => {
    await pricesDetail.load(543);

    // Check the title
    await expect(layout.header).toHaveText(/Ferromanganese EU MC/);
    await expect(pricesDetail.contentHeading.first())
      .toHaveText("Latest Prices");

    // There should be 2 price cards.
    await expect(pricesDetail.pricesCard).toHaveCount(2);
    await expect(pricesDetail.pricesTable).toHaveCount(2);
  });

  test("Display Optical fibre price detail page", async ({ pricesDetail, layout }) => {
    await pricesDetail.load(1562);

    // Check the title
    await expect(layout.header).toHaveText(/Bare Fibre/);
    await expect(pricesDetail.contentHeading.first())
      .toHaveText("Latest Prices");

    // There should only be 1 price card.
    await expect(pricesDetail.pricesCard).toHaveCount(1);
    await expect(pricesDetail.pricesTable).toHaveCount(1);
  });

  // Test xlsx download - wait for download to complete
  test("Download chart XLS", async ({ pricesDetail, page }) => {
    await pricesDetail.load(1);
    await expect(pricesDetail.chartDlMenu).toBeVisible()
    const downloadPromise = page.waitForEvent('download');
    await pricesDetail.chartDlMenu.first().click();
    await expect(pricesDetail.downloadXLS).toBeVisible()
    await pricesDetail.downloadXLS.first().click()
    const download = await downloadPromise;
    await download.path();
  });

  test("Content Controls buttons are rendered and working", async ({ pricesDetail }) => {
    await pricesDetail.load(1001);
    await expect(pricesDetail.printButton).toBeAttached();
    await expect(pricesDetail.myPricesButton).toBeAttached();
    expect(await pricesDetail.myPricesButton.getAttribute('href')).toContain('/mycru?tab=my-prices');
  });

  test("Display Price Analysis and Price News Articles with correct counts", async ({ pricesDetail }) => {
    await pricesDetail.load(1001);
    await expect(pricesDetail.analysisArticles.locator('article')).toHaveCount(20); // change this to 3
    await expect(pricesDetail.newsArticles.locator('article')).toHaveCount(10); // change this to 5
  });

  test("Analysis Article relevant fields and controls should be displayed", async ({ pricesDetail }) => {
    await pricesDetail.load(1001);

    //Analysis should have teaser, 
    const el = pricesDetail.analysisArticles.locator('article').first()
    const platformTagsItem = el.locator('.platform-tags__list-item').first();
    const headingLink = el.getByTestId('article-item-heading-link');
    const teaser = el.getByTestId('teaser');
    const date = el.locator('.chw-article-item__date');
    const firstBookmark = el.getByTestId('bookmark_widget')

    await expect(platformTagsItem).toHaveText(/analysis/i);
    await expect(headingLink).toHaveText(/.+/i);
    await expect(teaser).toHaveText(/.+/i);
    await expect(date).toHaveText(/.+/i);
    await expect(firstBookmark).toBeVisible();
  });

  test("Analysis Article bookmark widget works", async ({ pricesDetail }) => {
    await pricesDetail.load(1001);
    const el = pricesDetail.analysisArticles.locator('article').first()
    const firstBookmark = el.getByTestId('bookmark_widget')
    const selectedNow = await firstBookmark.getAttribute(GlobalConstants.isSelectedAttribute) === "true";
    const selectedAfterClick = (!selectedNow).toString();
    await firstBookmark.click();
    await expect(firstBookmark).toHaveAttribute(GlobalConstants.isSelectedAttribute, selectedAfterClick);
  });

  test("News Article relevant fields and controls should be displayed", async ({ pricesDetail }) => {
  await pricesDetail.load(1001);

    // News should not have teaser
      const el = pricesDetail.newsArticles.locator('article').first();
      const platformTagsItem = el.locator('.platform-tags__list-item').first();
      const headingLink = el.getByTestId('article-item-heading-link');
      const teaser = el.getByTestId('teaser');
      const date = el.locator('.chw-article-item__date');
      const firstBookmark = el.getByTestId('bookmark_widget')
      
      await expect(platformTagsItem).not.toHaveText(/analysis/i);
      await expect(headingLink).toHaveText(/.+/i);
      await expect(teaser).toHaveText('');
      await expect(date).toHaveText(/.+/i);
      await expect(firstBookmark).toBeVisible();
  });

  test("News Article bookmark widget works", async ({ pricesDetail }) => {
    await pricesDetail.load(1001);
    const el = pricesDetail.newsArticles.locator('article').first()
    const firstBookmark = el.getByTestId('bookmark_widget')
    const selectedNow = await firstBookmark.getAttribute(GlobalConstants.isSelectedAttribute) === "true";
    const selectedAfterClick = (!selectedNow).toString();
    await firstBookmark.click();
    await expect(firstBookmark).toHaveAttribute(GlobalConstants.isSelectedAttribute, selectedAfterClick);
  });



  



});
