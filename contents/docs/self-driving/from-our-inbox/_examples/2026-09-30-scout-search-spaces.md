---
category: User experience
report:
  title: Pausing after a space joins words in the Scouts search box
  source: GitHub
  body: >-
    A GitHub issue reported that the Scouts search box removes a trailing space when typing pauses.
    The investigation traced this to the search text being trimmed for the URL, then copied back into the input.
    Typing "checkout ", pausing, and typing "errors" therefore produces "checkouterrors".
  suggestedAction: >-
    Preserve the space when synchronizing the search with the URL.
    Add a regression test that pauses between words and checks the input value.
inboxExample:
  reportId: 01a0ec3c-b163-7a34-8d01-fca28ad85088
  publishedAt: 2026-09-30
  outcome: >-
    The implementation agent changed the URL comparison so whitespace differences no longer overwrite the input.
    Tests for text, numbers, and spaces alone failed before the fix and passed afterward, and the pull request merged.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/108165
    title: "fix(signals): keep trailing spaces in the scouts roster search"
    mergedAt: 2026-09-29
---
