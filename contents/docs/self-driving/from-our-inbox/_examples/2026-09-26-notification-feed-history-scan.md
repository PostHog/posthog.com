---
category: Database performance
report:
  title: Notification bell walks a team's entire audit history to show 10 rows
  source: pganalyze
  body: >-
    pganalyze flags a slow read on the activity log table. The notification feed filters a team's
    whole history by a very selective set of scope and item pairs, then takes the 10 newest rows,
    so the ordered walk reads far down the history before it fills one page. The same request also
    fires several near-identical unbounded reads over the table. Nobody sees an error, just a slow
    bell, and the cost grows with every team's history.
  suggestedAction: >-
    Bound the feed's history window so the existing `(team_id, -created_at)` index can stop the
    walk, and collapse the repeated reads into fewer bounded ones.
inboxExample:
  reportId: 01a0ce3e-0aab-7162-8a0e-5decc6e31e50
  publishedAt: 2026-09-26
  outcome: >-
    The feed now looks back 30 days, and the reads per request dropped from about eight to two.
    The agent also ruled out adding another index, because the index already existed and the
    missing piece was the bound.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/105154
    title: "perf(activity-log): bound the notification feed history window"
    mergedAt: 2026-09-24
---
