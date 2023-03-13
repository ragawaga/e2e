import { expect, test } from "@playwright/test";
import { asAuthenticatedUser } from "../auth";

test.describe("a logged in user with full permissions", () => {
  asAuthenticatedUser();
});
