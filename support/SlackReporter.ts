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

  async onEnd(result: FullResult) {
    if (!this.channel) {
      return;
    }

    console.log(`Sending notification to ${this.channel}`);

    const messageBody = {
      text: "Test run completed",
      channel: this.channel,
      ...createMessageBlock(result, Object.values(this.tests)),
    };

    // Let's check if the last message in this channel was from us, and we can simply update it instead.
    const self = await this.client.auth.test();
    const history = await this.client.conversations.history({
      channel: "C05MMR1UXND"
    });

    const lastMessage = history.messages?.pop();

    if (lastMessage && lastMessage.bot_id === self.bot_id) {
      console.info("Found existing message, updating in place");

      await this.client.chat.update({
        ts: lastMessage.ts!,
        ...messageBody,
      });
    } else {
      await this.client.chat.postMessage(messageBody);
    }

    if (result.status === "failed" || !this.notifyOnlyOnFailure) {
      for (const user of this.notifiedUsers) {
        const userResponse = await this.client.users.lookupByEmail({
          email: user,
        });

        if (!userResponse.ok) {
          console.log(
            `Skipping notification to user ${user}, unable to lookup e-mail due to '${userResponse.error}'`
          );
          continue;
        }

        await this.client.chat.postEphemeral({
          channel: this.channel,
          text: "New test results are available",
          user: userResponse.user?.id!,
        });
      }
    }
  }
}

export default SlackReporter;
