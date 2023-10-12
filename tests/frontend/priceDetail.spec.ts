import { expect } from "@playwright/test";

import { createTestFixture } from "../fixture";

import { priceDetailConstants, priceDetailPageModel } from "./pages/PriceDetailPage";

import { GlobalConstants } from "./pages/Layout";

const test = createTestFixture("priceDetail", priceDetailPageModel)

test.describe("Price Detail page", () => {

  test("Display Ferromanganese price detail page @unrestricted", async ({ priceDetail }) => {
    await priceDetail.load(543);

    // Check the title
    await expect(priceDetail.pageHeading.getByRole('heading')).toHaveText(priceDetailConstants.text.price543Title);
    await expect(priceDetail.contentHeading.first())
      .toHaveText(priceDetailConstants.text.firstRowHeading);

    // There should be 2 price cards.
    await expect(priceDetail.pricesCard).toHaveCount(2);
    await expect(priceDetail.pricesTable).toHaveCount(2);
  });

  test("Display Optical fibre price detail page @unrestricted", async ({ priceDetail }) => {
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

  test("Content Controls buttons are rendered and working @unrestricted", async ({ priceDetail }) => {
    await priceDetail.load(1001);
    await expect(priceDetail.printButton).toBeAttached();
    await expect(priceDetail.myPricesButton).toBeAttached();
    await expect(priceDetail.myPricesButton).toHaveAttribute('href', priceDetailConstants.text.myCruURL);
  });

  test("Display Price Analysis and Price News Articles with correct counts @unrestricted", async ({ priceDetail, page }) => {
    await priceDetail.load(1001);
    await page.waitForLoadState('networkidle');

    await expect(priceDetail.analysisArticles.locator(priceDetailConstants.css.article)).toHaveCount(priceDetailConstants.number.priceAnalysisArticleCount);
    await expect(priceDetail.newsArticles.locator(priceDetailConstants.css.article)).toHaveCount(priceDetailConstants.number.priceNewsArticleCount);
  });

  test("Analysis Article relevant fields and controls should be displayed @unrestricted", async ({ priceDetail }) => {
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

  test("Analysis Article bookmark widget works @unrestricted", async ({ priceDetail }) => {
    await priceDetail.load(1001);
    const el = priceDetail.analysisArticles.locator(priceDetailConstants.css.article).first()
    const firstBookmark = el.getByTestId(priceDetailConstants.testId.bookmarkWidget)
    const selectedNow = await firstBookmark.getAttribute(GlobalConstants.isSelectedAttribute) === priceDetailConstants.text.true;
    const selectedAfterClick = (!selectedNow).toString();
    await firstBookmark.click();
    await expect(firstBookmark).toHaveAttribute(GlobalConstants.isSelectedAttribute, selectedAfterClick);
  });

  test("News Article relevant fields and controls should be displayed @unrestricted", async ({ priceDetail }) => {
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

  test("News Article bookmark widget works @unrestricted", async ({ priceDetail }) => {
    await priceDetail.load(1001);
    const el = priceDetail.newsArticles.locator(priceDetailConstants.css.article).first()
    const firstBookmark = el.getByTestId(priceDetailConstants.testId.bookmarkWidget)
    const selectedNow = await firstBookmark.getAttribute(GlobalConstants.isSelectedAttribute) === priceDetailConstants.text.true;
    const selectedAfterClick = (!selectedNow).toString();
    await firstBookmark.click();
    await expect(firstBookmark).toHaveAttribute(GlobalConstants.isSelectedAttribute, selectedAfterClick);

  });



  test("Display Price Notice section @unrestricted", async ({ priceDetail, page }) => {
    //Confirms the Price Notice section is retrieved
    await priceDetail.load(1001);
    await page.waitForLoadState('networkidle')
    expect(priceDetail.priceNotice).toBeAttached();
  });

  test("2 Articles displayed in Price Notice section @unrestricted", async ({ priceDetail, page }) => {
    //Counts the number of articles listed in the Price Notice section, reports a failure if there are not 2 articles returned
    await priceDetail.load(1001);
    await page.waitForLoadState('networkidle')
    const priceNoticeArticleCount = await page.getByTestId('price-detail-PriceNotice').getByRole('article').count();
    expect(priceNoticeArticleCount).toEqual(2);
  });




  //Only present articles which have been published in the past 18 months from the current date; with the date range configuration based.
  test("Only articles from the past 18 months displayed @unrestricted", async ({ priceDetail, page }) => {
    //
    await priceDetail.load(1001);
    await page.waitForLoadState('networkidle')

    // Retrieve the article dates
    const firstDateElement = await page.getByTestId('price-detail-PriceNotice').getByRole('time').nth(0);
    const secondDateElement = await page.getByTestId('price-detail-PriceNotice').getByRole('time').nth(1);

    const firstDateString = await firstDateElement.textContent();
    const secondDateString = await secondDateElement.textContent();



    if (firstDateString === null) {
      throw new Error("First article date not found");
    }
    const firstDate = Date.parse(firstDateString);


    // calculate date 18 months before "today"
    const eighteenMonthsAgo = Date.now() - 18 * 30 * 24 * 60 * 60 * 1000; // months * days * hours * minutes * seconds * milliseconds
    // Check if the first date is more than 18 months ago
    if (firstDate < eighteenMonthsAgo) {
      throw new Error("The first article is dated more than 18 months ago");
    }




    if (secondDateString === null) {
      throw new Error("Second article date not found");
    }
    const secondDate = Date.parse(secondDateString);


    // Check if the first date is more than 18 months ago
    if (secondDate < eighteenMonthsAgo) {
      throw new Error("The second article date is more than 18 months ago");
    }


  });


  //Each article listed should display Platform Priority Tags, Title, Published Date and Documents available with the ability to Bookmark the article.

  //See more - link to the Notifications listing with the Price Notice content type selected as the filter value

  //Analytics should track article interaction from these Price point dashboard listing pages

  //Current bookmarked Price point data should be leveraged to inform the testing strategy. Test strategy should focus on testing the currently bookmarked prices, and assessing how the content presented per Price differs based on different Acode combinations.

});
