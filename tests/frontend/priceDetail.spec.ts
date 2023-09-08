import { expect } from "@playwright/test";

import { createTestFixture } from "../fixture";

import { priceDetailPageModel } from "./pages/PriceDetailPage";

import { GlobalConstants } from "./pages/Layout";

const test = createTestFixture("priceDetail", priceDetailPageModel)

test.describe("Price Detail page", () => {
  
  test("Display Ferromanganese price detail page", async ({ priceDetail }) => {
    await priceDetail.load(543);

    // Check the title
    await expect(priceDetail.pageHeading.getByRole('heading')).toHaveText(/Ferromanganese EU MC/);
    await expect(priceDetail.contentHeading.first())
      .toHaveText("Latest Prices");

    // There should be 2 price cards.
    await expect(priceDetail.pricesCard).toHaveCount(2);
    await expect(priceDetail.pricesTable).toHaveCount(2);
  });

  test("Display Optical fibre price detail page", async ({ priceDetail }) => {
    await priceDetail.load(1562);

    // Check the title
    await expect(priceDetail.pageHeading.getByRole('heading')).toHaveText(/Bare Fibre/);
    await expect(priceDetail.contentHeading.first())
      .toHaveText("Latest Prices");

    // There should only be 1 price card.
    await expect(priceDetail.pricesCard).toHaveCount(1);
    await expect(priceDetail.pricesTable).toHaveCount(1);
  });

  // Test xlsx download - wait for download to complete
  test("Download chart XLS", async ({ priceDetail, page }) => {
    await priceDetail.load(1);
    await expect(priceDetail.chartDlMenu).toBeVisible()
    const downloadPromise = page.waitForEvent('download');
    await priceDetail.chartDlMenu.first().click();
    await expect(priceDetail.downloadXLS).toBeVisible()
    await priceDetail.downloadXLS.first().click()
    const download = await downloadPromise;
    await download.path();
  });

  test("Content Controls buttons are rendered and working", async ({ priceDetail }) => {
    await priceDetail.load(1001);
    await expect(priceDetail.printButton).toBeAttached();
    await expect(priceDetail.myPricesButton).toBeAttached();
    expect(await priceDetail.myPricesButton.getAttribute('href')).toContain('/mycru?tab=my-prices');
  });

  test("Display Price Analysis and Price News Articles with correct counts", async ({ priceDetail }) => {
    await priceDetail.load(1001);
    await expect(priceDetail.analysisArticles.locator('article')).toHaveCount(20); // change this to 3
    await expect(priceDetail.newsArticles.locator('article')).toHaveCount(10); // change this to 5
  });

  test("Analysis Article relevant fields and controls should be displayed", async ({ priceDetail }) => {
    await priceDetail.load(1001);

    //Analysis should have teaser, 
    const el = priceDetail.analysisArticles.locator('article').first()
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

  test("Analysis Article bookmark widget works", async ({ priceDetail }) => {
    await priceDetail.load(1001);
    const el = priceDetail.analysisArticles.locator('article').first()
    const firstBookmark = el.getByTestId('bookmark_widget')
    const selectedNow = await firstBookmark.getAttribute(GlobalConstants.isSelectedAttribute) === "true";
    const selectedAfterClick = (!selectedNow).toString();
    await firstBookmark.click();
    await expect(firstBookmark).toHaveAttribute(GlobalConstants.isSelectedAttribute, selectedAfterClick);
  });

  test("News Article relevant fields and controls should be displayed", async ({ priceDetail }) => {
  await priceDetail.load(1001);

    // News should not have teaser
      const el = priceDetail.newsArticles.locator('article').first();
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

  test("News Article bookmark widget works", async ({ priceDetail }) => {
    await priceDetail.load(1001);
    const el = priceDetail.newsArticles.locator('article').first()
    const firstBookmark = el.getByTestId('bookmark_widget')
    const selectedNow = await firstBookmark.getAttribute(GlobalConstants.isSelectedAttribute) === "true";
    const selectedAfterClick = (!selectedNow).toString();
    await firstBookmark.click();
    await expect(firstBookmark).toHaveAttribute(GlobalConstants.isSelectedAttribute, selectedAfterClick);
  });



  



});
