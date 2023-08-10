import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../tests/auth";

describe("Article Stream", () => {
  beforeEach(() => {});

  it("shows a listing of articles to logged in users", () => {
    cy.visit("/analysis");
    //Adding these checks in as they were missing - there are no test-dataid attributes so these
    //need addressed in next sprints ticket to retrospectively fix

    //Check the article counter appears
    cy.get('[data-testid="number-of-articles"]').should("be.visible");

    //Check the stream - check at least one and no more than 20 articles are listed
    cy.get(":nth-child(1) > .chw-article-item__heading > a").should(
      "be.visible",
    );
    cy.get(":nth-child(21) > .chw-article-item__heading > a").should(
      "not.exist",
    );
    cy.screenshot();
  });

  it("article result listing clicks through to the article view", () => {
    cy.visit("/analysis");
    cy.get('[data-testid="article-item-heading-link"]').first().click();
    cy.url().should("include", "/article/"); // => true
    cy.screenshot();
  });

  it("pagination changes the article list", () => {
    checkPagination("/analysis");
  });

  it("featured analysis exists on the page", function () {
    cy.visit("/");

    //Check the featured article header is there
    cy.get('[data-testid="featured-title-header"]').should("exist");
    cy.get('[data-testid="featured-title-header"]').should(
      "contain.text",
      "Featured Analysis",
    );

    //Check there is at least one featured article in the listing, but that there are no more than 10
    cy.get('[data-testid="featured-card-0"]').should("exist");
    cy.get('[data-testid="featured-card-10"]').should("not.exist");
  });

  it("shows platform priority tags on the listings", () => {
    cy.visit("/analysis");

    //Check the stream listings for platform priority tags
    cy.get(":nth-child(1) > .chw-article-item__platform-tags").should(
      "not.be.empty",
    );
    cy.get(':nth-child(1) > [data-testid="platform-tags"]').should(
      "not.be.empty",
    );

    //Check platform priority tags visible on Featured Articles
    cy.get(".featured-articles")
      .children()
      .get('[data-testid="platform-tags"]')
      .first()
      .should("exist");
  });

  it("can recall the Welcome product tour", () => {
    const tourModal = "[role='alertdialog']";
    let totalSteps = "0";

    cy.visit("/analysis");

    // Product tour should not visible on pageload
    cy.get(tourModal).should("not.exist");

    // Recall the product tour by clicking the button within the user menu
    cy.get("#chw-header-user-moniker .product-tour-button a").click({
      force: true,
    });

    // Product tour should be visible
    cy.get(tourModal).should("be.visible");

    // Displays step count
    cy.get(tourModal)
      .contains("tour - 1 of")
      .then(($stepCount) => {
        // Get the total steps from the steps count text
        totalSteps = $stepCount.text().slice(-1);
      });

    // Assert that all steps are navigable
    for (let step = 1; step < parseInt(totalSteps); step++) {
      cy.get(`${tourModal} button[title="Next"]`).click();
      const newStep = step + 1;
      cy.get(tourModal).contains(`tour - ${newStep} of ${totalSteps}`, {
        matchCase: false,
      });
    }

    // Close the tour modal
    cy.get(`${tourModal} button[title="Skip"]`).first().click();
    cy.get(tourModal).should("not.exist");
  });
});
