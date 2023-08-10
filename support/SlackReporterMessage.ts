import type { FullResult, TestCase } from "@playwright/test/reporter";
import {
  ChatPostMessageArguments,
  SectionBlock,
  KnownBlock,
  Block,
} from "@slack/web-api";
import path from "node:path";

export function createTestFailureBlock(test: TestCase): (Block | KnownBlock)[] {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",

        // We splice off 3 elements, which is the root dir, the project, and t he filename
        text: `${test
          .titlePath()
          .splice(3)
          .map((title) => `*${title}*`)
          .join(" › ")}`,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `${path.basename(test.location.file)}:${test.location.line}`,
        },
        {
          type: "mrkdwn",
          text: `<https://crutestreports.z6.web.core.windows.net/playwright/index.html#?testId=${test.id}|See test result>`,
        },
      ],
    },
  ];
}

export function createMessageBlock(
  result: FullResult,
  tests: TestCase[]
): Partial<ChatPostMessageArguments> {
  const passing = tests.filter((r) => r.ok());
  const failing = tests.filter((r) => !r.ok());

  const admonitions = { passed: ":checkmark:", failed: ":warning:" };
  const admonition = admonitions[result.status];

  const blocks: (Block | KnownBlock)[] = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Test Run ${result.status}* on *dev* ${admonition}`,
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: "View",
          emoji: true,
        },
        url: process.env.BUILD_ID,
      },
      fields: [
        {
          type: "mrkdwn",
          text: "*Tests Failing*",
        },
        {
          type: "mrkdwn",
          text: `*Tests Passing*`,
        },
        {
          type: "mrkdwn",
          text: `${failing.length}`,
        },
        {
          type: "mrkdwn",
          text: `${passing.length}`,
        },
      ],
    },
    {
      type: "divider",
    },
  ];

  if (failing.length > 0) {
    const topFailing = failing
      .slice(0, 3)
      .flatMap((test) => createTestFailureBlock(test));

    const failureSummary: (Block | KnownBlock)[] = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Top 3 failing tests.*",
        },
      },
      ...topFailing,
    ];

    blocks.push(...failureSummary);
  }

  blocks.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: "*<https://crutestreports.z6.web.core.windows.net/playwright/index.html|See more test results>*",
    },
  });

  return {
    blocks,
  };
}
