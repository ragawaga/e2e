import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export const ArticleScreenComponent = {
  header: "h1",
  content: { testId: "article-content" },
  authors: { testId: "author-container" },
  authorImages: { testId: "author-image" },
  relatedArticles: { testId: "related-articles-row" },
  platformPriorityTags: { testId: "platform-tags" },
  topicTags: { testId: "topic-tags" },
  featuredArticles: ".featured-article-card",
  attachments: ".attachment-card",
  numberOfArticles: "20"
};

export function articlePageModel(page: Page) {
  const screen = createComponentLocators(page, ArticleScreenComponent);

  return {
    async load(id: number) {
      await page.goto(`/analysis/article/${id}/`);
    },
    ...screen,
  };
}
