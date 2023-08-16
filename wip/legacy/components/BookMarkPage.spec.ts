import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../tests/auth";

describe("Bookmark Screen", () => {
  const bookmarkWidget = '[data-testid="bookmark_widget"]';
  const bookmarkRemoveBtn = '[data-testid="bookmark-remove-button"]';

  it("List Article Screen after login", () => {
    cy.visit("/mycru");
    cy.url().should("contain", "/mycru");
  });

  it("Ensure Bookmark tab exits", () => {
    cy.visit("/mycru");
    const tabText = () => cy.get(".chw-tab-button__title");
    tabText().should("contain.text", "Bookmarks");
  });

  it("Ensure Listing of bookmarks", () => {
    cy.visit("/mycru");
    cy.get(".article-stream-list").then((list) => {
      //ensure that we have bookmarks if there are none;
      const bookmarkWidgets = () => cy.get(bookmarkRemoveBtn);
      if (list.find(bookmarkRemoveBtn).length === 0) {
        cy.visit("/");
        bookmarkWidgets().first().click();
        bookmarkWidgets().last().click();
      }
      cy.visit("/mycru");
      cy.get(bookmarkRemoveBtn).should("exist");
    });
  });

  it("Ensure clicked bookmark is removed from page GT", () => {
    cy.visit("/");
    const bookmark = () => cy.get(bookmarkWidget).first();
    bookmark()
      .invoke("attr", "data-articleid")
      .then((expected) => {
        bookmark();
        bookmark()
          .first()
          .invoke("attr", "data-selected")
          .should("not.eq", expected);
      });
  });
});
