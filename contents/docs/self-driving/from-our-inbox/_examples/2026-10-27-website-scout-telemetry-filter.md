---
category: Scouts
report:
  title: A broken-link scout keeps reviewing a telemetry endpoint as a missing page
  source: Scout · Website 404s (custom)
  body: >-
    The website scout repeatedly found requests to a telemetry endpoint among its broken-page candidates.
    The endpoint had no verified link from a website page.
    Its query already excluded similar requests sent to the wrong host, but the list omitted this exact path.
  suggestedAction: >-
    Add the exact endpoint path to the scout's existing exclusion list.
    Keep other paths visible so the scout can still find broken pages.
inboxExample:
  reportId: 436ca882-1ad8-49a8-bad7-0e819386201f
  publishedAt: 2026-10-27
  outcome: >-
    The owner approved the change, and an agent published the revised scout instructions.
    A check of the published query confirmed the exact-path exclusion without a broader path rule.
  resolution:
    label: Scout updated
    resolvedAt: 2026-10-26
---
