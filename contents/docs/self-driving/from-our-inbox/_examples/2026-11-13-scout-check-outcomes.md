---
category: "Dashboards"
report:
  title: "Scout checks record run, skip, and error outcomes, but the dashboard omits them"
  source: "Scout · Self driving dashboards scout (custom)"
  body: >-
    A dashboard scout found that checks before scheduled runs recorded whether to run, skip, or report an error.
    The monitoring dashboard showed scout runs and reports, but it had no chart for those decisions.
    The recorded outcomes already contained the data needed to fill that gap.
  suggestedAction: >-
    Add a daily chart that separates run, skip, and error outcomes.
inboxExample:
  reportId: 01a13ffa-caf5-7c03-b704-d1b67e1b9c24
  publishedAt: 2026-11-13
  outcome: >-
    The team added the chart to its scout dashboard and checked the saved query.
    It shows each outcome separately, excludes development traffic, and uses complete days.
  resolution:
    label: "Dashboard updated"
    resolvedAt: 2026-10-15
---
