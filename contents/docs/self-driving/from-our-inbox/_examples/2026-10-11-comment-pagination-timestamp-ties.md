---
category: Code health
report:
  title: Comments with matching timestamps can disappear or repeat across pages
  source: Scout · Api quality scout (custom)
  body: >-
    A custom scout found that the comments API sorts comments only by creation time.
    Comments with the same timestamp have no fixed order across pages.
    A regression test reproduced missing and repeated comments when a timestamp group crossed a page boundary.
  suggestedAction: >-
    Use the unique comment ID to break timestamp ties.
    Add a regression test that follows every page of the comments list and a comment thread.
inboxExample:
  reportId: 01a0b450-d873-74e0-b6b4-925ee126d1ae
  publishedAt: 2026-10-11
  outcome: >-
    Self-driving opened a pull request that added the ID tie-breaker and regression tests for both endpoints.
    The tests check the complete comment sequence, and the pull request merged.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/102909
    title: "fix(comments): break created_at ties in the comments cursor"
    mergedAt: 2026-10-10
---
