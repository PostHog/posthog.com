---
category: "Error tracking"
report:
  title: "Leaving Ask AI during startup shows an error for a canceled request"
  source: "Error tracking"
  body: >-
    Leaving an inbox report while Ask AI started could show "signal is aborted without reason."
    Error tracking pointed to the request startup code.
    The report traced the message to a canceled request that the error handler treated as a failure.
  suggestedAction: >-
    Recognize canceled requests before showing an error message or recording a failed action.
    Keep the existing request cleanup.
inboxExample:
  reportId: 01a2038e-530a-71f0-8ccf-2707dabfe1a5
  publishedAt: 2026-11-27
  outcome: >-
    The merged fix checks for canceled requests and disposed submissions before reporting a failure.
    Regression tests cover leaving during task creation and startup, with no error toast or failed-action event.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/142776
    title: "fix(signals): treat an aborted Ask AI kickoff as a cancel"
    mergedAt: 2026-11-26
---
