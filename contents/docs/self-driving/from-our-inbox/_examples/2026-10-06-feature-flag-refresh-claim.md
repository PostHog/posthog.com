---
category: Documentation
report:
  title: The feature flag guide requires a page refresh that the SDK does not need
  source: Scout · Comparison posthog claims (custom)
  body: >-
    A comparison guide says feature flag changes require a page or app refresh.
    A custom scout checked that claim against the JavaScript and Node SDK documentation.
    The SDKs can fetch updated flags without reloading the page, so the guide overstates the limitation.
  suggestedAction: >-
    Explain that flag changes take effect when the SDK fetches updated values.
    Keep the warning that changes are not instant.
inboxExample:
  reportId: 01a0fd6c-8e62-7352-abf6-a36dcf0b2c44
  publishedAt: 2026-10-06
  outcome: >-
    Self-driving opened a pull request that corrected one limitation bullet, and the pull request merged.
    The guide now describes periodic refresh and manual reloads while keeping the delay caveat.
  pullRequest:
    url: https://github.com/PostHog/posthog.com/pull/20701
    title: "docs(blog): correct the feature flag refresh claim"
    mergedAt: 2026-10-05
---
