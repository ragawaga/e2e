import type { FullResult, Reporter, TestCase } from "@playwright/test/reporter";

import { ChatPostMessageArguments, WebClient } from "@slack/web-api";
import { createMessageBlock } from "./SlackReporterMessage";

export type SlackReporterOptions = {
  token?: string;
  channel?: string;
  notify?: boolean;
  notifiedUsers?: string[];
  notifyOnlyOnFailure?: boolean;
};

class SlackReporter implements Reporter {
  private readonly client: WebClient;
  private readonly tests: Record<string, TestCase> = {};
  private readonly channel?: string;

  private readonly notify: boolean;
  private readonly notifiedUsers: string[];
  private readonly notifyOnlyOnFailure: boolean;

  constructor(options: SlackReporterOptions = {}) {
    this.client = new WebClient(options.token);
    this.channel = options.channel;
    this.notify = options.notify ?? false;
    this.notifiedUsers = options.notifiedUsers ?? [];
    this.notifyOnlyOnFailure = options.notifyOnlyOnFailure ?? true;
  }

  onTestEnd(test: TestCase): void {
    this.tests[test.id] = test;
  }

  async createOrUpdateMessage(
    channel: string,
    body: Partial<ChatPostMessageArguments>
  ): Promise<string> {
    const self = await this.client.auth.test();
    if (!self.bot_id) {
      throw new Error("Not a bot token");
    }

    const history = await this.client.conversations.history({
      channel,
    });

    const lastMessage = history.messages?.shift();

    if (lastMessage?.bot_id === self.bot_id) {
      console.info("Found existing message, updating in place");

      await this.client.chat.update({
        channel,
        ts: lastMessage.ts!,
        ...body,
      });

      return lastMessage.ts!;
    } else {
      const response = await this.client.chat.postMessage({
        channel,
        ...body,
      });

      if (!response.message) {
        throw new Error("Failed to post Slack message");
      }

      return response.message.ts!;
    }
  }

  async onEnd(result: FullResult) {
    if (!this.channel || !this.notify) {
      return;
    }

    console.log(`Sending notification to ${this.channel}`);

    const messageBody = {
      text: "Test run completed",
      ...createMessageBlock(result, Object.values(this.tests)),
    };

    const message = await this.createOrUpdateMessage(this.channel, messageBody);
    if (!message) {
      console.warn("Slack message had no timestamp");
      return;
    }

    if (result.status === "failed" || !this.notifyOnlyOnFailure) {
      await this.client.chat.postMessage({
        channel: this.channel,
        thread_ts: message,
        reply_broadcast: false,
        text: `New test results are available, notifying ${this.notifiedUsers
          .map((id) => `<@${id}>`)
          .join(", ")}`,
      });
    }
  }
}

export default SlackReporter;
