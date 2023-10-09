import { Page } from "@playwright/test";
import { createComponentLocators } from "../../component";

export const priceDetailConstants = {
  css: {
    article: 'article',
    articleItemDate: '.chw-article-item__date',
    platformTags: '.platform-tags__list-item',
  },
  number: {
    priceAnalysisArticleCount: 5,
    priceNewsArticleCount: 3
  },
  testId: {
    articleItemHeadingLink: 'article-item-heading-link',
    bookmarkWidget: 'bookmark_widget',
    teaser: 'teaser',
  },
  text: {
    anyText: /.+/i,
    analysisPlatformTagValues: /analysis|markets/i,
    emptyStr: '',
    firstRowHeading: 'Latest Prices',
    myCruURL: '/mycru?tab=my-prices',
    newsPlatformTagValues: /news/i,
    price543Title: /Ferromanganese EU MC/,
    price1562Title: /Bare Fibre/,
    true: "true",
  }
}

export function priceDetailPageModel(page: Page) {
  const screen = createComponentLocators(page, {
    pageHeading: { testId: 'chw-pagebanner_background'},
    contentHeading: { testId: "content-heading" },
    myPricesButton: { role: 'link', name: /my prices/i },
    printButton: { role: 'button', name: /print/i },
    pricesCard: { testId: "prices-card" },
    pricesTable: { testId: "prices-table" },
    chartDlMenu: { role: 'button', name: /view chart menu/i },
    downloadXLS: { text: /download xls/i },
    analysisArticles: { testId: "price-detail-Analysis" },
    newsArticles: { testId: "price-detail-News" },
  });

  return {
    async load(id: number) {
      await page.goto(`/price/${id}/`);
    },
    ...screen,
  };
}
