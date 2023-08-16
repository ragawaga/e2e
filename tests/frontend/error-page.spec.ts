import { expect, test } from "@playwright/test";

test.describe("Error pages", () => {
  test("should have the correct messages on them", async ({ page }) => {
    await page.route("**/api/Article/*", async (route, request) => {
      await route.fulfill({
        status: 404,
        headers: {
          "content-type": "application/problem+json",
        },
        body: JSON.stringify({
          type: "https://tools.ietf.org/html/rfc7231#section-6.5.4",
          title: "Not Found",
          status: 404,
        }),
      });
    });

    await page.goto("/analysis/article/1/My-bogus-content");

    const header = page.getByTestId("chw-pagebanner").getByRole("heading");
    const description = page.locator(".chw-error-description > *");

    // TODO: the frontend will retry multiple times for a 404, which can take up to ~10s+
    await expect(header).toHaveText("Page not found", {
      timeout: 15_000,
    });

    await expect(description).toHaveText([
      "404 error",
      "This page is no longer available. It may have been moved, removed, or the link has changed.",
      "Use the global search or the analysis stream to find articles, or the main navigation to locate other content.",
      "Please contact customer.services@crugroup.com if you need further assistance.",
    ]);
  });
});
