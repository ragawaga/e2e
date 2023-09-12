import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export const notificationStreamConstants = {
  pageHeader: "Notifications",
  nextPageButton: 'Next page',
};
export function notificationsStreamPageModel(page: Page) {
  const screen = createComponentLocators(page, {
    content: { testId: "article-content" },
    typeFilter: {role: "button", name: "Type" },
    publishedFilter: {role: "button", name: "Published" },
    notificationType: { testId: "filter-item-notification" },
    platformUpdateType: { testId: "filter-item-platform-update" },
    priceNoticeType: { testId: "filter-item-price-notice" },
    serviceUpdateType: { testId: "filter-item-service-update" },
    webinarType: { testId: "filter-item-webinar" },
    notificationsBell: {testId: "notifications-trigger"},
    notificationsPanel: {testId: "notifications-panel"},
    notificationsPanelList: {testId: "notifications-list"},
    allNotificationsLink: {role: "link", name: "All Notifications" },
    filtersBar: { testId: "filterbar-widgets"},
    teaser: { testId: "teaser"},
    platformPriorityTags: { testId: "platform-tags"},
    articleHeader: { testId: "article-item-heading-link"},
    paginationInfo: {testId: "pagination-page-text"},
    startDate: '#date-picker-published-start',
    endDate: '#date-picker-published-end',
    dateFilterPill: {testId: "tag-button"},
    clearAllButton: {role: "button", name: "Clear All"},    
  });

  return {
    async load() {
      await page.goto(`/notifications/`);
    },
    ...screen,
  };
}
