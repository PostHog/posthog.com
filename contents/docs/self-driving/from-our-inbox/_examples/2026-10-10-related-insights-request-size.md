---
category: Database performance
report:
  title: The feature flag card fetches a full page of insights to show only five
  source: pganalyze
  body: >-
    A slow-query report prompted an investigation of the related insights card on feature flag pages.
    The card displays five insights, but its request fetches a full page.
    It also sorts by creation time without a matching index.
  suggestedAction: >-
    Check the query plan, reduce unnecessary work, and use the existing index for sorting by last modification.
inboxExample:
  reportId: 01a11269-6575-7a8a-bb46-a9fb99bd3d0d
  publishedAt: 2026-10-10
  outcome: >-
    Self-driving opened a pull request that limits the request to five insights and sorts by last modification, and the pull request merged.
    The change reduces the response size, but the JSON filter remains and production latency was not measured.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/112838
    title: "perf(flags): fetch only the five related insights the flag page shows"
    mergedAt: 2026-10-09
---
