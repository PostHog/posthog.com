---
category: Dashboards
report:
  title: Pipeline dashboard has no tile for signals dropped before grouping
  source: Scout · Self-driving dashboards (custom)
  body: >-
    The dashboards scout compared the Signals pipeline dashboard against the data it could plot. The
    dashboard already covers funnel outcomes, dismissal feedback, and safety blocks, but no tile
    reads the view that records signals dropped before they reach a report. A drop in one source
    could grow for days before anyone noticed.
  suggestedAction: >-
    Add a daily trend of dropped signals, broken down by source and error type, to the pipeline
    dashboard.
inboxExample:
  reportId: 01a09407-1f30-79e3-a3b3-b4c5ea21d61a
  publishedAt: 2026-09-26
  outcome: >-
    Two tiles were added to the dashboard: a daily trend of drops by source, and a table of drop
    classes. Building them also corrected the report. Its one-day spike came from summing a lifetime
    counter inside a date window, so the new trend reads the event series instead.
  resolution:
    label: Dashboard updated
    resolvedAt: 2026-09-14
---
