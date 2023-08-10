import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../auth";


const _data_testid_related_articles_row_title_ =
  '[data-testid="related-articles-row-title"]';
const _featured_article_card = ".featured-article-card";
const _data_testid_featured_title_header_ =
  '[data-testid="featured-title-header"]';
const _article_stream_list = ".article-stream-list";
const _data_testid_platform_tags_ = '[data-testid="platform-tags"]';
const _featured_articles = ".featured-articles";
const _data_testid_chw_pagebanner_h1 = '[data-testid="chw-pagebanner"] h1';
const _chw_tab_button_title = ".chw-tab-button__title";
const _chw_article_item = ".chw-article-item";
const _article_results_count_number = ".article-results-count__number";
const _nth_child_1_chw_article_item_heading_a =
  ":nth-child(1) > .chw-article-item__heading > a";
const _nth_child_21_chw_article_item_heading_a =
  ":nth-child(21) > .chw-article-item__heading > a";
const _data_testid_chw_pagebanner_background_ =
  '[data-testid="chw-pagebanner_background"]';

test.describe("Platform Priority Tags", () => {
  test("can click on platform priority tag on the Related Articles component in an article", async ({
    page,
  }) => {
    await page.goto("/analysis/article/143080");

    //Check for the Commodity related articles and that it links to the PPT stream page
    page
      .locator(_data_testid_related_articles_row_title_)
      .first()
      .find("a")
      .click();
    checkThePlatformPriorityTagsListingPage();

    await page.goto("/analysis/article/143080");

    //Check for the Topic related articles and that it links to the PPT stream page
    page
      .locator(_data_testid_related_articles_row_title_)
      .last()
      .find("a")
      .click();
    checkThePlatformPriorityTagsListingPage();
  });

  test("can click on platform priority tag on the Featured Articles component in an article", async ({
    page,
  }) => {
    await page.goto("/analysis/article/143080");

    //Check for the featured analysis and that it links to the PPT stream page
    await expect(page.locator(_featured_article_card)).toBeAttached();
    await expect(page.locator(_featured_article_card).its("length")).lte(4);
    page
      .locator(_featured_article_card)
      .find(".platform-tags__link")
      .first()
      .click();
    checkThePlatformPriorityTagsListingPage();
  });

  test("can click on platform priority tag on an article on the analysis stream", async ({
    page,
  }) => {
    await page.goto("/analysis");

    //Check the stream listings for platform priority tags
    page
      .locator(_article_stream_list)
      .find(".chw-article-item")
      .find('[data-testid="platform-tags"]')
      .find(".platform-tags__link")
      .first()
      .click();

    checkThePlatformPriorityTagsListingPage();
  });

  test("can click on platform priority tag on a featured article on the analysis stream", async ({
    page,
  }) => {
    await page.goto("/analysis");

    //Check the featured listings for platform priority tags
    page
      .locator(_data_testid_platform_tags_)
      .find(".platform-tags__link")
      .first()
      .click();

    checkThePlatformPriorityTagsListingPage();
  });

  test("can click on platform priority tag on a search result", async ({
    page,
  }) => {
    await page.goto("/analysis");

    const searchTerm = "china";
    const expectedPageSize = 20;
    await page.goto("/");

    performSearch(searchTerm);

    page.locator(_data_testid_chw_pagebanner_h1).contains(searchTerm);
    await expect(page.locator(_chw_tab_button_title)).toBeAttached();
    await expect(page.locator(_chw_tab_button_title)).contain("My Articles");
    await expect(page.locator(_chw_article_item)).toHaveLength(
      expectedPageSize,
    );

    page
      .locator(_article_stream_list)
      .find(".chw-article-item")
      .find('[data-testid="platform-tags"]')
      .first()
      .find(".platform-tags__link")
      .first()
      .click();

    checkThePlatformPriorityTagsListingPage();
  });

  function checkThePlatformPriorityTagsListingPage() {
    //Check that the article count is there and contains 'tagged with' wording
    //as this shows we have moved to the new PPT stream
    cy.get(_article_results_count_number).should("contain", "tagged with");

    //Check the stream - check at least one and no more than 20 articles are listed
    cy.get(_nth_child_1_chw_article_item_heading_a).should("be.visible");
    cy.get(_nth_child_21_chw_article_item_heading_a).should("not.exist");

    //Check we are on a new page
    cy.get(_data_testid_chw_pagebanner_background_).should(
      "not.contain",
      "Analysis",
    );

    //Check that we can click on and get into the article
    cy.get(_nth_child_1_chw_article_item_heading_a).click();

    //Check the URL has changed to that of an article page
    cy.url().should("contain", "/article/");
  }
});
