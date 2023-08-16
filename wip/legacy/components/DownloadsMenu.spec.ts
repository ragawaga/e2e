import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../auth";

const a_href_downloads_ = "a[href='/downloads']";
const _data_testid_chw_pagebanner_h1 = '[data-testid="chw-pagebanner"] h1';
const _data_testid_download_category_0_ =
  '[data-testid="download-category__0"]';
const _data_testid_download_category_0_li_a =
  '[data-testid="download-category__0"] li a';
const _data_testid_chw_archive_summary_ = '[data-testid="chw-archive-summary"]';
const _data_testid_chw_pagebanner_background_ =
  '[data-testid="chw-pagebanner_background"]';
const _chw_archives_list_label = ".chw-archives-list__label";
const _chw_archives_list_item = ".chw-archives-list__item";

test.describe("Download Menu", () => {
  test("Dowloads menu item should exist", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(a_href_downloads_)).toBeAttached();
  });

  test("Click download menu naviagates to downloads page", async ({ page }) => {
    await page.goto("/");
    (await expect(page.locator(a_href_downloads_)).toBeAttached()).click();
    await expect(cy.url()).contain("/downloads");
    page.locator(_data_testid_chw_pagebanner_h1).contains("Downloads");
  });

  test("Direct Navigation to downloads", async ({ page }) => {
    await page.goto("/downloads");
    page.locator(_data_testid_chw_pagebanner_h1).contains("Downloads");
  });

  test("Dowload Item are available", async ({ page }) => {
    await page.goto("/downloads");
    await expect(
      page.locator(_data_testid_download_category_0_),
    ).toBeAttached();
  });

  test("Click through get to downloads product page", async ({ page }) => {
    await page.goto("/downloads");
    page.locator(_data_testid_download_category_0_li_a).first().click();
    await expect(cy.url()).contain("/downloads/monitor");
  });

  test("Downloads Edition Page contains Editions ", async ({ page }) => {
    await page.goto("/downloads");
    page.locator(_data_testid_download_category_0_li_a).first().click();

    await expect(
      page.locator(_data_testid_chw_archive_summary_),
    ).toBeAttached();
    await expect(
      page.locator(_data_testid_chw_pagebanner_background_),
    ).toBeAttached();
  });

  test("Downloads Edition Page contains File headings ", async ({ page }) => {
    await page.goto("/downloads");
    page.locator(_data_testid_download_category_0_li_a).first().click();

    await expect(page.locator(_chw_archives_list_label)).contain("Files");
    await expect(page.locator(_chw_archives_list_item)).toBeAttached();
  });

  test("Downloads Edition Page contains Dowload files ", async ({ page }) => {
    await page.goto("/downloads");
    page.locator(_data_testid_download_category_0_li_a).first().click();

    await expect(page.locator(_chw_archives_list_item)).toBeAttached();
  });
});
