---
category: "Error tracking"
report:
  title: "A missing pull request diff crashes the whole inbox report page"
  source: "Error tracking"
  body: >-
    Error tracking caught a crash when an inbox report tried to show a pull request diff.
    The file summary called a string method before it checked whether the response contained a diff.
    That exception replaced the whole report page.
  suggestedAction: >-
    Check the diff before reading it, and keep invalid responses from crashing the report.
    Add a regression test for a response with no diff field.
inboxExample:
  reportId: 01a1ae22-7d91-7e19-b257-3d66069b179b
  publishedAt: 2026-11-06
  outcome: >-
    The merged fix rejects invalid diff responses and shows the existing load error.
    Regression tests cover missing, null, and non-string values; they fail before the fix and pass with it.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/130583
    title: "fix(signals): handle missing pull request diff data"
    mergedAt: 2026-11-06
---
