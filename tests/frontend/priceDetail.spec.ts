import { expect } from "@playwright/test";

import { createTestFixture } from "../fixture";

import { priceDetailConstants, priceDetailPageModel } from "./pages/PriceDetailPage";

import { GlobalConstants } from "./pages/Layout";

const test = createTestFixture("priceDetail", priceDetailPageModel)

test.describe("Price Detail page", () => {
  
  test("Display Ferromanganese price detail page", async ({ priceDetail }) => {
    await priceDetail.load(543);

    // Check the title
    await expect(priceDetail.pageHeading.getByRole('heading')).toHaveText(priceDetailConstants.text.price543Title);
    await expect(priceDetail.contentHeading.first())
      .toHaveText(priceDetailConstants.text.firstRowHeading);

    // There should be 2 price cards.
    await expect(priceDetail.pricesCard).toHaveCount(2);
    await expect(priceDetail.pricesTable).toHaveCount(2);
  });

  test("Display Optical fibre price detail page", async ({ priceDetail }) => {
    await priceDetail.load(1562);

    // Check the title
    await expect(priceDetail.pageHeading.getByRole('heading')).toHaveText(priceDetailConstants.text.price1562Title);
    await expect(priceDetail.contentHeading.first())
      .toHaveText(priceDetailConstants.text.firstRowHeading);

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
    await expect(priceDetail.myPricesButton).toHaveAttribute('href', priceDetailConstants.text.myCruURL);
  });

  test("Display Price Analysis and Price News Articles with correct counts", async ({ priceDetail }) => {
    await priceDetail.load(1001);
    await expect(priceDetail.analysisArticles.locator(priceDetailConstants.css.article)).toHaveCount(priceDetailConstants.number.priceAnalysisArticleCount);
    await expect(priceDetail.newsArticles.locator(priceDetailConstants.css.article)).toHaveCount(priceDetailConstants.number.priceNewsArticleCount);
  });

  test("Analysis Article relevant fields and controls should be displayed", async ({ priceDetail }) => {
    await priceDetail.load(1001);

    //Analysis should have teaser, 
    const el = priceDetail.analysisArticles.locator(priceDetailConstants.css.article).first()
    const platformTagsItem = el.locator(priceDetailConstants.css.platformTags).first();
    const headingLink = el.getByTestId(priceDetailConstants.testId.articleItemHeadingLink);
    const teaser = el.getByTestId(priceDetailConstants.testId.teaser);
    const date = el.locator(priceDetailConstants.css.articleItemDate);
    const firstBookmark = el.getByTestId(priceDetailConstants.testId.bookmarkWidget);

    await expect(platformTagsItem).toHaveText(priceDetailConstants.text.analysisPlatformTagValues);
    await expect(headingLink).toHaveText(priceDetailConstants.text.anyText);
    await expect(teaser).toHaveText(priceDetailConstants.text.anyText);
    await expect(date).toHaveText(priceDetailConstants.text.anyText);
    await expect(firstBookmark).toBeVisible();
  });

  test("Analysis Article bookmark widget works", async ({ priceDetail }) => {
    await priceDetail.load(1001);
    const el = priceDetail.analysisArticles.locator(priceDetailConstants.css.article).first()
    const firstBookmark = el.getByTestId(priceDetailConstants.testId.bookmarkWidget)
    const selectedNow = await firstBookmark.getAttribute(GlobalConstants.isSelectedAttribute) === priceDetailConstants.text.true;
    const selectedAfterClick = (!selectedNow).toString();
    await firstBookmark.click();
    await expect(firstBookmark).toHaveAttribute(GlobalConstants.isSelectedAttribute, selectedAfterClick);
  });

  test("News Article relevant fields and controls should be displayed", async ({ priceDetail }) => {
  await priceDetail.load(1001);

    // News should not have teaser
      const el = priceDetail.newsArticles.locator(priceDetailConstants.css.article).first();
      const platformTagsItem = el.locator(priceDetailConstants.css.platformTags).first();
      const headingLink = el.getByTestId(priceDetailConstants.testId.articleItemHeadingLink);
      const teaser = el.getByTestId(priceDetailConstants.testId.teaser);
      const date = el.locator(priceDetailConstants.css.articleItemDate);
      const firstBookmark = el.getByTestId(priceDetailConstants.testId.bookmarkWidget)
      
      await expect(platformTagsItem).toHaveText(priceDetailConstants.text.newsPlatformTagValues);
      await expect(headingLink).toHaveText(priceDetailConstants.text.anyText);
      await expect(teaser).toHaveText(priceDetailConstants.text.emptyStr);
      await expect(date).toHaveText(priceDetailConstants.text.anyText);
      await expect(firstBookmark).toBeVisible();
  });

  test("News Article bookmark widget works", async ({ priceDetail }) => {
    await priceDetail.load(1001);
    const el = priceDetail.newsArticles.locator(priceDetailConstants.css.article).first()
    const firstBookmark = el.getByTestId(priceDetailConstants.testId.bookmarkWidget)
    const selectedNow = await firstBookmark.getAttribute(GlobalConstants.isSelectedAttribute) === priceDetailConstants.text.true;
    const selectedAfterClick = (!selectedNow).toString();
    await firstBookmark.click();
    await expect(firstBookmark).toHaveAttribute(GlobalConstants.isSelectedAttribute, selectedAfterClick);
  });

});
