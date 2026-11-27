---
category: Documentation
report:
  title: The Inbox guide omits a Slack priority filter that the product already supports
  source: Scout · Scouts docs (custom)
  body: >-
    The Inbox guide described Slack notifications but did not explain how to filter them by priority.
    A documentation scout compared the guide with the shipped settings control and the notification code.
    The product could already limit the project-wide channel to reports at or above a selected priority.
  suggestedAction: >-
    Document where to set the minimum priority, what happens when it is unset,
    and how the project-wide channel differs from a scout's Slack destination.
inboxExample:
  reportId: b6eea8e6-ea9c-4aed-ba9a-c6753f735c0e
  publishedAt: 2026-11-20
  outcome: >-
    A merged documentation change added the missing paragraph to the Inbox guide.
    It explains the priority threshold, the default behavior, and the setting's scope.
  pullRequest:
    url: https://github.com/PostHog/posthog.com/pull/22119
    title: "docs(inbox): document Slack notification priority filter"
    mergedAt: 2026-11-19
---
