import { Page, expect, test } from "@playwright/test";

const _data_testid_search_input_ = '[data-testid="search-input"]';
const _data_testid_search_button_ = '[data-testid="search-button"]';
const _data_testid_chw_pagebanner_h1 = '[data-testid="chw-pagebanner"] h1';
const _chw_tab_button_title = ".chw-tab-button__title";
const _chw_article_item = ".chw-article-item";
const _chw_searchlist_count = ".chw-searchlist-count";
const _chw_article_item_heading_a = ".chw-article-item__heading a";
const div_data_testid_teaser_ = 'div[data-testid="teaser"]';
const _chw_article_item_info = ".chw-article-item__info";
const _chw_searchlist_filters = ".chw-searchlist-filters";
const _chw_filter_widget = ".chw-filter-widget";
const _pagination = ".pagination";
const _aria_label_Next_page_ = '[aria-label="Next page"]';
const _aria_label_Previous_page_ = '[aria-label="Previous page"]';
const _data_testid_tab_my_documents_ = '[data-testid="tab-my-documents"]';
const _chw_archives_list_item = ".chw-archives-list__item";
const _nth_child_1_chw_article_item_platform_tags =
  ":nth-child(1) > .chw-article-item__platform-tags";
const _nth_child_1_data_testid_platform_tags_ =
  ':nth-child(1) > [data-testid="platform-tags"]';

test.describe("Search bar search", () => {
  const search = async (page: Page, term: string) => {
    const searchInput = page.getByTestId("search-input");

    await searchInput.type(term);
    await searchInput.press("Enter");

    await expect(page).toHaveURL(/search/);
  };

  test("Default Screen has search input and button", async ({ page }) => {
    await page.goto("/");
    const searchInput = () => page.locator(_data_testid_search_input_);
    await expect(searchInput()).toBeAttached();
    const searchButton = () => page.locator(_data_testid_search_button_);
    await expect(searchButton()).toBeAttached();
  });

  test("Search with common search term", async ({ page }) => {
    await page.routeFromHAR("./hars/fruit.har", {
      url: "*/api/*",
      update: true,
    });

    const searchTerm = "china";
    const expectedPageSize = 20;
    await page.goto("/");

    await search(page, "china");

    await expect(page.locator(_data_testid_chw_pagebanner_h1)).toContainText(
      searchTerm,
    );

    await expect(page.locator(_chw_tab_button_title)).toContainText([
      "My Articles",
      "My Documents",
    ]);

    await expect(page.locator(_chw_article_item)).toHaveCount(expectedPageSize);
  });

  test.skip("Search with no results term", async ({ page }) => {
    const searchTerm = "fdsfer4wr34r34rr343r4";
    const expectedPageSize = 0;
    await page.goto("/");

    search(page, searchTerm);

    await expect(page.locator(_data_testid_chw_pagebanner_h1)).toContainText(
      searchTerm,
    );
    await expect(page.locator(_chw_tab_button_title)).toBeAttached();
    await expect(page.locator(_chw_searchlist_count)).toContainText("(0)");
    await expect(page.locator(_chw_article_item)).toHaveCount(expectedPageSize);
  });

  //   test("Examine first article search summary", async ({ page }) => {
  //     const searchTerm = "china";
  //     await page.goto("/");

  //     performSearch(searchTerm);

  //     const firstArticle = () => page.locator(_chw_article_item).first();
  //     await expect(page.locator(_chw_article_item_heading_a)).toBeAttached();
  //     await expect(page.locator(div_data_testid_teaser_)).toBeAttached();
  //     await expect(page.locator(_chw_article_item_info)).toBeAttached();
  //   });

  //   test("Filters exist for searches", async ({ page }) => {
  //     const searchTerm = "china";
  //     const expectedFilters = 5;
  //     await page.goto("/");

  //     performSearch(searchTerm);

  //     await expect(page.locator(_chw_searchlist_filters)).toBeAttached();
  //     await expect(page.locator(_chw_filter_widget)).toHaveLength(
  //       expectedFilters
  //     );
  //   });

  //   test("Pagination available", async ({ page }) => {
  //     const searchTerm = "china";
  //     await page.goto("/");

  //     performSearch(searchTerm);

  //     const paginationText = () => page.locator(_pagination).locator("span");
  //     const nextButton = () => page.locator(_aria_label_Next_page_);
  //     const prevButton = () => page.locator(_aria_label_Previous_page_);

  //     await expect(paginationText()).toContainText("Page 1");

  //     // Now paginate forwards.
  //     nextButton().click();
  //     // Now check we're on page 2
  //     await expect(paginationText()).toContainText("Page 2");

  //     nextButton().click();
  //     // Now check we're on page 3
  //     await expect(paginationText()).toContainText("Page 3");

  //     prevButton().click();
  //     // Now check we're on page 2
  //     await expect(paginationText()).toContainText("Page 2");

  //     prevButton().click();
  //     // Now check we're on page 1
  //     await expect(paginationText()).toContainText("Page 1");
  //   });

  //   test("Document list is available", async ({ page }) => {
  //     const searchTerm = "china";
  //     const expectedFilters = 1;
  //     const expectedDocList = 10;
  //     await page.goto("/");

  //     performSearch(searchTerm);

  //     // Switch to the documents tab
  //     page.locator(_data_testid_tab_my_documents_).click();

  //     await expect(page.locator(_chw_searchlist_filters)).toBeAttached();
  //     await expect(page.locator(_chw_filter_widget)).toHaveLength(
  //       expectedFilters
  //     );
  //     await expect(page.locator(_chw_archives_list_item)).toHaveLength.at.least(
  //       expectedDocList
  //     );
  //   });

  //   test("shows platform priority tags on the listings", async ({ page }) => {
  //     const searchTerm = "china";
  //     await page.goto("/");

  //     performSearch(searchTerm);

  //     page.locator(_data_testid_chw_pagebanner_h1).contains(searchTerm);
  //     await expect(page.locator(_chw_tab_button_title)).toBeAttached();
  //     await expect(page.locator(_chw_tab_button_title)).contain("My Articles");

  //     //Check the stream listings for platform priority tags
  //     await expect(
  //       page.locator(_nth_child_1_chw_article_item_platform_tags)
  //     ).not.empty();
  //     await expect(
  //       page.locator(_nth_child_1_data_testid_platform_tags_)
  //     ).not.empty();
  //   });
});
