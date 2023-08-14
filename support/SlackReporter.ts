import type {
  FullResult,
  Reporter,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";

import { ChatPostMessageArguments, WebClient } from "@slack/web-api";
import { createMessageBlock } from "./SlackReporterMessage";
import { Message } from "@slack/web-api/dist/response/ChatPostMessageResponse";

export type SlackReporterOptions = {
  token?: string;
  channel?: string;
  notifiedUsers?: string[];
  notifyOnlyOnFailure?: boolean;
};

class SlackReporter implements Reporter {
  private readonly client: WebClient;
  private readonly tests: Record<string, TestCase> = {};
  private readonly channel?: string;

  private readonly notifiedUsers: string[];
  private readonly notifyOnlyOnFailure: boolean;

  constructor(options: SlackReporterOptions = {}) {
    this.client = new WebClient(options.token);
    this.channel = options.channel;
    this.notifiedUsers = options.notifiedUsers ?? [];
    this.notifyOnlyOnFailure = options.notifyOnlyOnFailure ?? true;
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    this.tests[test.id] = test;
  }

  async createOrUpdateMessage(channel: string, body: Partial<ChatPostMessageArguments>) : Promise<Message> {
    const self = await this.client.auth.test();
    const history = await this.client.conversations.history({
      channel,
    });

    const lastMessage = history.messages
      ?.filter((message) => message.type)
      .shift();

    if (lastMessage && lastMessage.bot_id === self.bot_id) {
      console.info("Found existing message, updating in place");

      const response = await this.client.chat.update({
        channel,
        ts: lastMessage.ts!,
        ...body,
      });

      return response.message!;
    } else {
      const response = await this.client.chat.postMessage({
        channel,
        ...body
      });

      return response.message!;
    }
  }

  async onEnd(result: FullResult) {
    if (!this.channel) {
      return;
    }

    console.log(`Sending notification to ${this.channel}`);

    const messageBody = {
      text: "Test run completed",
      ...createMessageBlock(result, Object.values(this.tests)),
    };

    const message = await this.createOrUpdateMessage(this.channel, messageBody);

    if (result.status === "failed" || !this.notifyOnlyOnFailure) {
      const userIds = this.notifiedUsers.map(async (email: string) => {
        const response = await this.client.users.lookupByEmail({
          email,
        });

        if (!response.ok) {
          console.log(`Failed to resolve user ${email}`);
          return null;
        }

        return `<@${response.user?.id}>`;
      })
      .filter(value => value !== null)
      .join(", ");

      await this.client.chat.postMessage({
        channel: this.channel,
        thread_ts: message.ts,
        text: `New test results are available, notifying ${userIds}`,
      });
    }
  }
}

export default SlackReporter;
