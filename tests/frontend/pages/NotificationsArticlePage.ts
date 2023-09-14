import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export const notificationArticleConstants = {
  articleWithAuthorAndTags : 141704,
  articleWithoutAuthor: 150848
};
export function notificationsArticlePageModel(page: Page) {
  const screen = createComponentLocators(page, {
    content: { testId: "article-content" },
    authors: { testId: "author-container" },
    authorImages: { testId: "author-image" },
    relatedArticles: { testId: "related-articles-row" },
    platformPriorityTags: { testId: "platform-tags" },
    topicTags: { testId: "topic-tags" },
    featuredArticles: ".featured-article-card",
    attachments: ".attachment-card",
    articleDate: { testId: "article-date" },
  });

  return {
    async load(id: number) {
      await page.goto(`/notifications/article/${id}/`);
    },
    ...screen,
  };
}
