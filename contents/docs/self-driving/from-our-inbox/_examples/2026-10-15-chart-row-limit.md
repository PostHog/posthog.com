---
category: "Scouts"
report:
  title: "A chart hides its newest dates even though the source data is current"
  source: "Scout · Scouts dashboard (custom)"
  body: >-
    A saved chart stops before the end of its date range.
    A dashboard scout runs the same query with a larger row limit and finds the missing recent dates.
    The query returns older dates first, so its default row limit excludes the newest results.
  suggestedAction: >-
    Add an explicit row limit with room for the full date range.
    Run the saved chart again and verify that recent dates appear.
inboxExample:
  reportId: 01a13410-9597-7695-a085-b89d09c446af
  publishedAt: 2026-10-15
  outcome: >-
    The scout updated the saved query and verified that recent dates returned.
    A follow-up change added more room, excluded incomplete days and small samples, and verified the latest complete day.
  resolution:
    label: "Insight updated"
    resolvedAt: 2026-10-14
---
