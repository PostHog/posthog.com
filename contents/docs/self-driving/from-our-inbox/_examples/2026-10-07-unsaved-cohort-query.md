---
category: Query reliability
report:
  title: Opening a new cohort sends a query before the cohort has an ID
  source: Scout · Query performance (custom)
  body: >-
    A query performance scout found repeated parse errors in cohort table requests.
    The investigation traced the failures to the new-cohort page, which sent a query before the cohort had a numeric ID.
    The query ran even though the table was hidden.
  suggestedAction: >-
    Stop the query while the cohort is unsaved.
    Use the new cohort ID after saving, and add tests for both states.
inboxExample:
  reportId: 01a0d44c-9300-77b5-abd2-83e5f99c6830
  publishedAt: 2026-10-07
  outcome: >-
    The implementation agent prevented the unsaved cohort from loading the query and updated the filter when the cohort was saved.
    Regression tests covered both states, the cohort test suites passed, and the pull request merged.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/106128
    title: "fix(cohorts): stop the new-cohort page sending a query with no cohort id"
    mergedAt: 2026-10-06
---
