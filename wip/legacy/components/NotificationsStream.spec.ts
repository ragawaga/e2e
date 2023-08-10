import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../tests/auth";


describe("Notifications Stream", () => {
  const notifications_page = "/notifications";

  function filterDropdownWithEntry(
    dropDownText: string,
    checkBoxLabel: string,
  ) {
    const checkBoxId = '[data-testid="' + checkBoxLabel + '"]';

    cy.visit(notifications_page);

    cy.get('[data-testid="filter-menu-button"]')
      .contains(dropDownText)
      .parent()
      .click();

    cy.get(".chw-fw-checkbox__label").should("contain.text", checkBoxLabel);
    cy.get(checkBoxId).check({ force: true });

    //Wait until the article list is re-loaded before we read the new count, otherwise it just says 0
    cy.get(":nth-child(1) > .chw-article-item__heading > a").should(
      "be.visible",
    );

    //Check the platform priority tags contains the checkBoxLabel i.e. the Type
    cy.get(':nth-child(1) > [data-testid="platform-tags"]').should(
      "contain",
      checkBoxLabel,
    );
  }

  const filterDropdownWithText = (dropDownText: string) =>
    cy
      .get('[data-testid="filter-menu-button"]')
      .contains(dropDownText)
      .parent();

  it("shows the notifications panel to logged in users", () => {
    cy.visit("/");
    const notificationsPanel = () =>
      cy.get('[data-testid="notifications-panel"]');
    notificationsPanel().should("exist");
    cy.get('[data-testid="notifications-list"')
      .children()
      .should("have.length", 3);
    const allNotificationsLink = () => cy.get(".notifications-menu__cta > a");
    allNotificationsLink().should("exist");
  });

  it("shows a listing of notifications to logged in users", () => {
    cy.visit(notifications_page);

    //Check the heading appears
    cy.get('[data-testid="chw-pagebanner"] h1').should(
      "contain.text",
      "Notifications",
    );

    //Check the stream - check at least one and no more than 20 notifications are listed
    cy.get(":nth-child(1) > .chw-article-item__heading > a").should(
      "be.visible",
    );
    cy.get(":nth-child(21) > .chw-article-item__heading > a").should(
      "not.exist",
    );

    //Check the stream listings for platform priority tags
    cy.get(":nth-child(1) > .chw-article-item__platform-tags").should(
      "not.be.empty",
    );
    cy.get(':nth-child(1) > [data-testid="platform-tags"]').should(
      "not.be.empty",
    );
    cy.screenshot();
  });

  it("check number and order of filters is correct", () => {
    cy.visit(notifications_page);
    cy.get(".chw-filterbar-widgets__body")
      .children(".chw-filter-widget")
      .should("have.length", 2)
      .first()
      .should("contain.text", "Type")
      .next()
      .should("contain.text", "Published");
  });

  it("sends filter options to API", () => {
    cy.visit(notifications_page);
    //Check Type filter is there and contains Notification
    filterDropdownWithEntry("Type", "Notification");

    //Check Type filter is there and contains Price Notice
    filterDropdownWithEntry("Type", "Price Notice");

    //Check Type filter is there and contains Platform Updates
    filterDropdownWithEntry("Type", "Platform Update");

    //Check Type filter is there and contains Service Updates
    filterDropdownWithEntry("Type", "Service Update");

    //Check Type filter is there and contains Webinar
    filterDropdownWithEntry("Type", "Webinar");
  });

  it("sends date filter to API", () => {
    cy.visit(notifications_page);

    filterDropdownWithText("Published").click();

    //Select first date field on the Start dropdown
    //use last to select last dropdown and last day
    cy.get("#date-picker-published-start").first().click();
    cy.get(".react-datepicker__day--001").first().click();

    cy.get('[data-testid="tag-button"]').should("exist");
  });

  it("pagination changes the notifications list", () => {
    checkPagination(notifications_page);
  });
});
