---
category: Scouts
report:
  title: Logs scout watches the wrong service for most PostHog AI logs
  source: Scout · Self-driving logs (custom)
  body: >-
    While checking its own coverage, the logs scout found that almost all PostHog AI log lines come
    from a background worker service, not the web service its instructions tell it to read. Its
    main query only reads the web service, so it cannot see new log patterns or rate changes where
    most of the traffic actually lands. The web service still writes some scoped error lines, so it
    stays useful too.
  suggestedAction: >-
    Add the worker service to the scout's service map and its main query, and keep the web service
    alongside it.
inboxExample:
  reportId: 01a0cf42-73fe-758e-bd9f-ccc0282057c5
  publishedAt: 2026-09-26
  outcome: >-
    The scout's instructions were updated and published as a new version. The next check ran the
    main query against both services and confirmed it now sees the worker's logs. Scouts are
    skills, so fixing this one took an edit, not a deploy.
  resolution:
    label: Scout updated
    resolvedAt: 2026-09-23
---
