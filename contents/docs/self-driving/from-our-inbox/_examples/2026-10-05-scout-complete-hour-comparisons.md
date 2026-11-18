---
category: Scouts
report:
  title: Partial hours make a warehouse check report a false gap
  source: Scout · Self driving dwh (custom)
  body: >-
    A warehouse scout compares run records with completion events to check for missing data.
    Its instructions say to compare complete hours, but the query starts and ends partway through an hour.
    The two sources use different timestamps, so those partial hours create a false gap.
    The scout traced the discrepancy to its own comparison query.
  suggestedAction: >-
    Align both query branches to whole-hour boundaries and exclude recent hours that still need time to settle.
    Publish the corrected query in the scout's instructions.
inboxExample:
  reportId: 01a106f2-fab0-7110-b802-4c003e6ce169
  publishedAt: 2026-10-05
  outcome: >-
    The corrected instructions were published and checked against live data.
    The check no longer included partial hours, and the complete-hour comparison showed only small differences.
    No warehouse view change was needed.
  resolution:
    label: Scout updated
    resolvedAt: 2026-10-04
---
