import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../tests/auth";

const _main_nav_list = ".main-nav__list";
const a_href_prices_cruspi_ = 'a[href="/prices/cruspi"]';
const _data_testid_chw_pagebanner_h1 = '[data-testid="chw-pagebanner"] h1';
const _data_testid_article_content_ = '[data-testid="article-content"]';
const _data_testid_tablist_ = '[data-testid="tablist"]';
const _data_testid_prices_download_button_ =
  '[data-testid="prices-download-button"]';
const _chw_prices_table = ".chw-prices-table";
const _highcharts_container_highcharts_root =
  ".highcharts-container highcharts-root";
const _data_testid_price_notices_button_ =
  '[data-testid="price-notices-button"]';
const _data_testid_download_category_0_list_ =
  '[data-testid="download-category__0-list"]';
const a_href_downloads_monitor_cruspi_ = 'a[href="/downloads/monitor/cruspi"]';
const _chw_archivesummary_item = ".chw-archivesummary__item";
const _chw_archives_list_item_title = ".chw-archives-list__item__title";

test.describe("CRUspi Tests", () => {
  test("Navigate to CRUspi prices page", async ({ page }) => {
    const navTo = `/prices/cruspi`;
    await page.goto(navTo);

    //Check navgating via the Prices Menu works (had issues in the past where CRUspi disappeared from the menu)
    await page.goto("/analysis");
    page.locator(_main_nav_list).first().contains("Prices").click();
    page.locator(a_href_prices_cruspi_).first().click();

    page.locator(_data_testid_chw_pagebanner_h1).contains("CRUspi");
    await expect(
      page
        .locator(_data_testid_article_content_)
        .children("p")
        .first()
        .invoke("text"),
    ).not.empty();

    await expect(page.locator(_data_testid_tablist_)).not.toBeAttached();

    //Check the downloads button is there
    await expect(
      page.locator(_data_testid_prices_download_button_),
    ).toBeAttached();

    //Check that the Prices table is there
    await expect(page.locator(_chw_prices_table)).not.empty();

    //Check the chart is visible.
    await expect(
      page.locator(_highcharts_container_highcharts_root),
    ).not.empty();

    //Click the Price notice button and assert it takes you to the correct pages
    page.locator(_data_testid_price_notices_button_).click();

    await expect(cy.url()).contain("/notifications");
  });

  test("Navigate to CRUspi downloads page", async ({ page }) => {
    const navTo = `/downloads/monitor/cruspi`;
    await page.goto(navTo);
    await expect(cy.url()).contain(navTo);

    //Check navgating via the Downloads Menu works (had issues in the past where CRUspi disappeared from the menu)
    await page.goto("/analysis");
    page.locator(_main_nav_list).first().contains("Downloads").click();

    //Check we are on the Download index page and CRUspi exists
    page.locator(_data_testid_chw_pagebanner_h1).contains("Downloads");
    await expect(
      page.locator(_data_testid_download_category_0_list_),
    ).toBeAttached();
    await expect(cy.contains("ul", "CRUspi")).toBeAttached();

    //Click through to the CRUspi downloads page
    page.locator(a_href_downloads_monitor_cruspi_).click();
    await expect(cy.url()).contain(navTo);

    //Check downloads links are there, and working
    //Use Feb 2022 as this file should always be there
    page.locator(_chw_archivesummary_item).contains("February 2022").click();

    //Check the download link exists and works
    //Need the 2 second wait for the page link to refresh itself, otherwise cypress still sees the most recent month's download file
    cy.wait(2000);
    page
      .locator(_chw_archives_list_item_title)
      .contains("CRUspi 1994-2023 (10 02 2022).xlsx");
    page.locator(_chw_archives_list_item_title).click();
    //TODO this is the wrong path. Can we control the downloads path somehow??
    //cy.readFile('cypress\\Downloads\\cruspi-1994-2023-10-02-2022.xlsx').should("exist");
  });
});
