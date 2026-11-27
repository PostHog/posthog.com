---
category: Scouts
report:
  title: An alert scout misses recent checks in a warehouse copy of alert history
  source: Scout · Self-driving alerts (custom)
  body: >-
    An alert scout found that a warehouse copy omitted recent checks that the live alert API returned.
    The copy's latest timestamp looked current, but it did not prove that every alert's history was complete.
    This mismatch changed the evidence used to assess alert accuracy and stalled checks.
  suggestedAction: >-
    Use the warehouse query to find candidates, then verify each candidate with the live alert API.
    Check history for each alert before reporting a stall or changing its settings.
inboxExample:
  reportId: 8c240154-afb4-4d76-a1e9-86b2ff7cb711
  publishedAt: 2026-11-16
  outcome: >-
    An agent published revised scout instructions that require live checks before conclusions or changes.
    The agent checked the source mismatch again and documented why one recent timestamp cannot establish completeness for every alert.
  resolution:
    label: Scout updated
    resolvedAt: 2026-11-15
---
