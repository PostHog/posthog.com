---
category: Documentation
report:
  title: The Twilio guide still says alpha after the source becomes generally available
  source: Scout · Posthog docs freshness (custom)
  body: >-
    The Twilio source guide still warns that the source is in alpha.
    A custom scout compared the guide with merged product code.
    The code marks the source as generally available, but the old warning remains in the documentation.
  suggestedAction: >-
    Remove the obsolete alpha callout so the guide matches the source's release status.
inboxExample:
  reportId: 01a0f7d0-9654-77a6-b5d1-e13b87bde38d
  publishedAt: 2026-10-19
  outcome: >-
    Self-driving opened a pull request that removed the alpha callout, and the pull request merged.
    The change corrected the release-status wording without changing source behavior.
  pullRequest:
    url: https://github.com/PostHog/posthog.com/pull/20652
    title: "docs(data-warehouse): remove the alpha callout from the Twilio source page"
    mergedAt: 2026-10-18
---
