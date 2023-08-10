import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../../../tests/auth";

describe("Article Bookmarks", () => {
  const bookmarkWidget = '[data-testid="bookmark_widget"]';

  it("Default Screen after login has bookmarks", () => {
    cy.visit("/");
    const expectedPageSize = 20;
    cy.get(bookmarkWidget).should("have.length", expectedPageSize);
  });

  it("State change bookmark on article listing", () => {
    cy.visit("/");
    cy.get(bookmarkWidget)
      .first()
      .invoke("attr", "data-selected")
      .then((state) => {
        const expected = state === "true" ? "false" : "true";
        cy.get(bookmarkWidget).first().click();
        cy.get(bookmarkWidget)
          .first()
          .invoke("attr", "data-selected")
          .should("eq", expected);
      });
  });
});
