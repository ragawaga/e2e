import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../auth";

describe("Notification Screen", function () {
  const notificationUrl = "/notifications";

  it("filter notifications with start and end data ", function () {
    cy.visit(notificationUrl);
    cy.get("h1").should("exist");
    // click on the publish button
    cy.get('[data-testid="chw-filter-widget-published"]').should("exist");
    cy.get('[data-testid="chw-filter-widget-published"]').click();
    //enter start and end date for the notifications to get filtered
    const date = new Date();
    const getYear = date.toLocaleString("default", { year: "numeric" });
    const getMonth = date.toLocaleString("default", { month: "2-digit" });
    const getDay = date.toLocaleString("default", { day: "2-digit" });
    const dateFormat = getYear + "-" + getMonth + "-" + getDay;
    cy.get('input[id="date-picker-published-start"]').type(dateFormat);
    cy.get('*[class^="chw-app-spinner-overlay"]', { timeout: 20_000 }).should(
      "not.exist",
    );
    cy.get('*[class^="chw-error-description richtext"]', {
      timeout: 5_000,
    }).should("not.exist");
  });
});
