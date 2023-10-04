import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export function FeedbackPageModel(page: Page) {
  const screen = createComponentLocators(page, {
    feedbackDesktopButton: { testId: "feedback-desktop-button" },
    feedbackRatingGroup: "#feedback-rating-group",
    feedbackTextArea: "#feedback-text-area",
    feedbackTargetGroup: "#feedback-target-group",
    feedbackSubmitButton: { testId: "feedback-submit-button" },
    feedbackFormSubmitResult: { testId: "feedback-form-submit-result" },
    feedbackFormTitle: ".feedback-form-title",
    feedbackFormCloseDesktop: { testId: "feedback-form-close-desktop" }
  });

  return {
    async load() {
      await page.goto(`/analysis`);
    },
    ...screen,
  };
}
