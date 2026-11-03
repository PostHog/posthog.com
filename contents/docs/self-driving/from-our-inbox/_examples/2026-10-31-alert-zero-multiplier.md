---
category: "Code health"
report:
  title: "An alert detector replaces a valid zero setting with its default"
  source: "Scout · Code quality (custom)"
  body: >-
    A code quality scout found that the IQR alert detector treated a zero multiplier as a missing value.
    The fallback replaced zero with the default and widened the alert boundaries.
    A small test case showed that this could hide an anomaly that the chosen setting should detect.
  suggestedAction: >-
    Keep an explicit zero multiplier.
    Use the default only when the value is missing or null, and test all three detector paths.
inboxExample:
  reportId: 99d30f81-8284-4d12-9ed9-0306b2d785e8
  publishedAt: 2026-10-31
  outcome: >-
    The merged fix resolves the multiplier once and uses it for live detection, batch detection, and model fitting.
    Regression tests cover zero, null, and omitted values; the pull request records that the zero case failed before the fix.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/125136
    title: "fix(alerts): preserve a zero iqr multiplier"
    mergedAt: 2026-10-30
---
