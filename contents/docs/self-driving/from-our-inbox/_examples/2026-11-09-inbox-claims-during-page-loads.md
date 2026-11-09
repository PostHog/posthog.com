---
category: Code health
report:
  title: A delayed inbox page replaces a new claim with an old assignee
  source: Scout · Inbox validation
  body: >-
    A follow-up scout tested whether report claims stayed current while the inbox loaded another page.
    It held the page response, claimed an existing report, and then released the response.
    The new claim disappeared because the loader restored an older copy of the list.
  suggestedAction: >-
    Keep the latest rows when the next page arrives.
    Add regression tests for claims, releases, and removed rows during pending requests.
inboxExample:
  reportId: 232f46f3-8d73-42ad-aeaa-89ce84ffbd9f
  publishedAt: 2026-11-09
  outcome: >-
    The merged fix appends the latest rows and preserves changes made while requests are pending.
    A follow-up check passed the regression tests for claims, releases, and removals during page loads.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/130402
    title: "fix(signals): preserve inbox claims during page loads"
    mergedAt: 2026-11-06
---
