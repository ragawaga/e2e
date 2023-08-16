import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../auth";

describe("Article Stream Filters", () => {
  function validateNumberOfArticlesDecreased(numberOfArticles: string) {
    //Get the count of articles after we have filtered and validate that it's changed
    cy.get('[data-testid="article-count"]').should(($numberOfArticles2) => {
      const countBefore = Number(numberOfArticles.replace(",", ""));
      const countAfter = Number($numberOfArticles2.text().replace(",", ""));

      expect(countAfter).not.to.eq(countBefore);
      expect(countAfter).to.be.lessThan(countBefore);
    });
  }

  function filterDropdownWithEntry(
    dropDownText: string,
    checkBoxLabel: string,
  ) {
    cy.visit("/analysis");

    //Get the count of articles before we filter
    cy.get('[data-testid="article-count"]').then(($numberOfArticles) => {
      const numberOfArticlesBefore = $numberOfArticles.text();

      cy.get('[data-testid="filter-menu-button"]')
        .contains(dropDownText)
        .click();

      cy.get(".filter-checkbox")
        .contains(checkBoxLabel)
        .parent()
        .find("input[type='checkbox']")
        .check({ force: true });

      //Wait until the article list is re-loaded before we read the new count, otherwise it just says 0
      cy.get(":nth-child(1) > .chw-article-item__heading > a").should(
        "be.visible",
      );

      //Get the count of articles after we have filtered and validate that it's changed
      validateNumberOfArticlesDecreased(numberOfArticlesBefore);
    });
  }

  const filterDropdownWithText = (dropDownText: string) =>
    cy
      .get('[data-testid="filter-menu-button"]')
      .contains(dropDownText)
      .parent();

  it("nested Commodity filter sends correct data to API", () => {
    cy.visit("/analysis");

    //Get the count of articles
    //Get the count of articles before we filter
    cy.get('[data-testid="article-count"]').then(($numberOfArticles) => {
      const numberOfArticlesBefore = $numberOfArticles.text();

      //Click Aluminium
      filterDropdownWithEntry("Commodities", "Aluminium");

      const secondLevelList =
        '[data-testid="filter-item-aluminium"] .filter-select-list--level-2';
      const thirdLevelList =
        '[data-testid="filter-item-aluminium"] .filter-select-list--level-3';

      //Validate that we have 2 further levels under Commodity Aluminium
      cy.get(secondLevelList)
        .first()
        .should("contain.text", "Aluminium Products");
      cy.get(thirdLevelList)
        .first()
        .should("contain.text", "Beverage Can Sheet");
      cy.get(secondLevelList).first().should("not.contain.text", "Cobalt");
      cy.get(thirdLevelList).first().should("not.contain.text", "Bauxite");

      //Check number of articles has reduced
      validateNumberOfArticlesDecreased(numberOfArticlesBefore);
    });
  });

  it("nested Topic filter sends correct data to API", () => {
    cy.visit("/analysis");

    //Get the count of articles
    //Get the count of articles before we filter
    cy.get('[data-testid="article-count"]').then(($numberOfArticles) => {
      const numberOfArticlesBefore = $numberOfArticles.text();

      //Click Aluminium
      filterDropdownWithEntry("Topic", "Corporate");

      const secondLevelList = cy
        .get(
          '[data-testid="filter-item-corporate"] .filter-select-list--level-2',
        )
        .first();

      //Validate that we have a further levels under Topic Corporate
      secondLevelList.should("contain.text", "Capex");
      secondLevelList.should("not.contain.text", "Construction");

      //Check number of articles has reduced
      validateNumberOfArticlesDecreased(numberOfArticlesBefore);
    });
  });

  it("check number and order of filters is correct", () => {
    cy.visit("/analysis");
    cy.get(".chw-filterbar-widgets__body")
      .children(".chw-filter-widget")
      .should("have.length", 5)
      .first()
      .should("contain.text", "Type")
      .next()
      .should("contain.text", "Commodities")
      .next()
      .should("contain.text", "Topic")
      .next()
      .should("contain.text", "Location")
      .next()
      .should("contain.text", "Published");
  });

  it("sends filter options to API", () => {
    cy.visit("/analysis");
    //Check Topic filter is there
    filterDropdownWithEntry("Topic", "Agriculture");

    //check Commodities filter is there
    filterDropdownWithEntry("Commodities", "Aluminium");

    //Check Location filter is there
    filterDropdownWithEntry("Location", "Africa");

    //Check Type filter is there
    filterDropdownWithEntry("Type", "Analysis");
  });

  it("sends date filter to API", () => {
    cy.visit("/analysis");

    filterDropdownWithText("Published").click();

    //Select first date field on the Start dropdown
    //use last to select last dropdown and last day
    cy.get("#date-picker-published-start").first().click();
    cy.get(".react-datepicker__day--001").first().click();

    cy.get('[data-testid="tag-button"]').should("exist");
  });
});
