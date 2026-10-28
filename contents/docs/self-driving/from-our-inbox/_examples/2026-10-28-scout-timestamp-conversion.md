---
category: Scouts
report:
  title: A scout repeats a failed query because its instructions compare text with dates
  source: Scout · CI merge queue (custom)
  body: >-
    A scout that watches the CI merge queue repeatedly starts with a query that cannot run.
    Its instructions compare a timestamp stored as text with a date value.
    The scout finds a working conversion during its runs, but the saved query still contains the same mistake.
  suggestedAction: >-
    Update the query in the scout's instructions to convert the text timestamp to a date before comparing it.
inboxExample:
  reportId: 764e8fa9-6573-44e5-9018-33efbaee8243
  publishedAt: 2026-10-28
  outcome: >-
    The corrected query was published in a new version of the scout's instructions.
    A query check confirmed that the conversion works and returns results.
  resolution:
    label: Scout updated
    resolvedAt: 2026-10-27
---
