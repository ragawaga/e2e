import { expect, test } from "@playwright/test";

const _downloads_group_list_li_a = ".downloads-group__list > li > a";
const _attachment_card_title_button = ".attachment-card__title > button";
const _attachment_card_info = ".attachment-card__info";
const _data_testid_icon_excel_ = '[data-testid="icon-excel"]';
const _data_testid_prices_download_button_ =
  '[data-testid="prices-download-button"]';

test.describe("File downloads", () => {
  test("should download file and know the size of the file", async ({
    page,
  }) => {
    await page.goto("/downloads");

    page.locator(_downloads_group_list_li_a).first().click({
      force: true,
    });

    //this is temporary as the default view does not have any downloadable files.
    //Blobs need copied across environments
    cy.contains("button", "February 2022").first().click({
      force: true,
    });

    //get the first .xlsx file
    cy.contains("button", ".xlsx")
      .first()
      .then(($btn) => {
        const fileName = $btn.text();

        cy.contains("button", fileName).first().click({
          force: true,
        });

        cy.readFile(
          "cypress/downloads/" + fileName.replace(/\s+/g, "-").toLowerCase(),
          null
        ).should((buffer) => {
          console.log("Buffer length:- ", buffer.length);
          expect(buffer.length).to.be.gt(14000); //an empty .xlsx file is ~ 14000 bytes/14 KB
        });
      });
  });

  test("specific article id 141546 which exists on prod too had downloadable file - check it downloads", async ({
    page,
  }) => {
    await page.goto(
      "/analysis/article/141546/turbulent-times-ahead-as-alumina-trades-higher"
    );

    page
      .locator(_attachment_card_title_button)
      .first()
      .then(($btn) => {
        const fileName = $btn.text();

        cy.contains("button", fileName).first().click({
          force: true,
        });

        cy.readFile(
          "cypress/downloads/" +
            fileName.replace(/\s+/g, "-").toLowerCase() +
            ".xlsx"
        ).should((buffer) => {
          console.log("Buffer length:- ", buffer.length);
          expect(buffer.length).to.be.gt(14000); //an empty .xlsx file is ~ 14000 bytes/14 KB
        });
      });
  });

  test("Download Table for prices page", async ({ page }) => {
    await page.goto("/prices/aluminium?tab=weekly");

    page.locator(_data_testid_prices_download_button_).then(($btn) => {
      const fileName = $btn.text();

      cy.contains("button", fileName).first().click({
        force: true,
      });

      cy.readFile("cypress/downloads/Aluminium - report.xlsx").should(
        (buffer) => {
          console.log("Buffer length:- ", buffer.length);
          expect(buffer.length).to.be.gt(14000); //an empty .xlsx file is ~ 14000 bytes/14 KB
        }
      );
    });
  });
});
