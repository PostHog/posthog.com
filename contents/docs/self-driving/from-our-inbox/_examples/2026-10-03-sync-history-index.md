---
category: Database performance
report:
  title: The sync history query sorts every past job to show the newest ones
  source: pganalyze
  body: >-
    A slow-query signal led the investigation to the data warehouse source's Syncs tab.
    The query reads and sorts the source's full job history before returning the newest jobs.
    None of the existing indexes matches both the source filter and the time order.
    The tab repeats this query while it stays open, so the work grows as sync history builds.
  suggestedAction: >-
    Add an index on the source and descending creation time so the database can read recent jobs in order.
inboxExample:
  reportId: 01a05cb0-6d6a-719c-a8c2-a187c962d879
  publishedAt: 2026-10-03
  outcome: >-
    An engineer started the fix from the inbox, and the merged pull request added the matching index.
    Local checks confirmed that the migration creates the index and that the source jobs API tests pass.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/92370
    title: "perf(warehouse-sources): index the source job history read"
    mergedAt: 2026-10-02
---
