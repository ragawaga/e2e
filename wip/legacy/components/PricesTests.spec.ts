import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../auth";

describe("Prices Tests", function () {
  it("Prices button exists", () => {
    cy.visit("/analysis");
    cy.get(".header nav").contains("Prices");
  });

  it("Navigate to price page", () => {
    const navTo = `/prices/aluminium`;
    cy.visit(navTo);
    cy.url().should("contain", navTo);

    cy.get('[data-testid="chw-pagebanner"] h1').contains("Aluminium");
  });

  it("Can click ranges changes state", () => {
    const navTo = `/prices/aluminium`;
    cy.visit(navTo);

    const weekly = '[data-testid="tab-weekly"]';
    const monthly = '[data-testid="tab-monthly"]';

    cy.get(weekly).click();
    cy.get(weekly).should("have.attr", "aria-selected", "true");
    cy.get(monthly).should("have.attr", "aria-selected", "false");

    cy.get(monthly).click();
    cy.get(weekly).should("have.attr", "aria-selected", "false");
    cy.get(monthly).should("have.attr", "aria-selected", "true");
  });

  it("Prices table and download button exists on Weekly and Monthly", () => {
    const navToWeekly = `/prices/aluminium?tab=weekly`;
    cy.visit(navToWeekly);

    cy.get('[data-testid="prices-table"]').should("not.be.empty");
    cy.get('[data-testid="prices-download-button"]').should("exist");

    const navToMonthly = `/prices/aluminium?tab=monthly`;
    cy.visit(navToMonthly);

    cy.get('[data-testid="prices-table"]').should("not.be.empty");
    cy.get('[data-testid="prices-download-button"]').should("exist");
  });

  it("Fertilizer Week Prices has nutrient filter", () => {
    const navTo = `prices/fertilizer-week-base?tab=weekly-prices`;
    cy.visit(navTo);

    // Spy on API request with alias getPrices
    cy.intercept(
      "GET",
      "https://dev-cru-fe-api.azurewebsites.net/api/Prices*",
    ).as("getPrices");

    cy.get('[data-testid="chw-pagebanner"] h1').contains("Fertilizer Week");

    // Select Urea to filter page content
    cy.get('[data-testid="select-prices-nutrient-select"]').select("Urea");

    cy.wait("@getPrices"); // <--- wait for getPrices to finish

    // Confirm that the title has been replaced with Urea
    cy.get('[data-testid="chw-pagebanner"] h1').contains("Urea");
  });
});
