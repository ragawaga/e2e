import type {
  FullResult,
  Reporter,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";

import { WebClient } from "@slack/web-api";
import { createMessageBlock } from "./SlackReporterMessage";

export type SlackReporterOptions = {
  token?: string;
  channel?: string;
};

class SlackReporter implements Reporter {
  private readonly client: WebClient;
  private readonly tests: Record<string, TestCase> = {};
  private readonly channel?: string;

  constructor(options: SlackReporterOptions = {}) {
    this.client = new WebClient(options.token);
    this.channel = options.channel;
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    this.tests[test.id] = test;
  }

  async onEnd(result: FullResult) {
    if (!this.channel) {
      return;
    }

    this.client.chat.postMessage({
      text: "Test run completed",
      channel: this.channel,
      ...createMessageBlock(result, Object.values(this.tests)),
    });
  }
}

export default SlackReporter;
