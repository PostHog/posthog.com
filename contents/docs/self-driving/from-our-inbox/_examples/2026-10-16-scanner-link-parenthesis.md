---
category: Error tracking
report:
  title: A stray closing parenthesis in a scanner link crashes the page
  source: Error tracking
  body: >-
    Error tracking caught a page crash when a Replay Vision scanner link ended with a stray closing parenthesis.
    The investigation found that the scanner ID became part of a URL route pattern.
    The route parser treated the parenthesis as pattern syntax and threw before the page could load.
  suggestedAction: >-
    Use a fixed route pattern and compare the matched scanner ID separately.
    Add a regression test that mounts the scanner logic with a malformed ID.
inboxExample:
  reportId: 01a1418d-cf45-7722-81e8-f0e74bc07b02
  publishedAt: 2026-10-16
  outcome: >-
    The implementation agent changed the route pattern and added a regression test.
    The test failed before the fix and passed afterward, and the pull request merged.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/118221
    title: "fix(replay-vision): stop scanner page crash on malformed id"
    mergedAt: 2026-10-15
---
