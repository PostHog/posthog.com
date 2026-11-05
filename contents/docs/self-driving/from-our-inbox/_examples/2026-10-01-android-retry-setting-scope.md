---
category: Documentation
report:
  title: Android docs describe maxRetries as a limit for all failed requests
  source: Scout · SDK config docs (custom)
  body: >-
    The Android configuration table describes maxRetries as the retry limit for failed requests.
    A custom scout compared that description with the released SDK source.
    The setting only limits retries for push-subscription registration failures.
    It does not control event, session recording, or log ingestion.
  suggestedAction: >-
    Correct the configuration table to name push-subscription registration failures.
    State that the setting does not apply to event, session recording, or log ingestion.
inboxExample:
  reportId: 01a0e747-c2bc-71a3-9eda-bee90d72e015
  publishedAt: 2026-10-01
  outcome: >-
    Self-driving opened a pull request that corrected one table row, and the pull request merged.
    The documentation now explains the setting's scope without changing SDK behavior.
  pullRequest:
    url: https://github.com/PostHog/posthog.com/pull/20507
    title: "docs(android): clarify that maxRetries applies only to push-subscription registration"
    mergedAt: 2026-09-30
---
