---
category: Code health
report:
  title: Work column rescans the whole selection for every row it renders
  source: Scout · React performance (custom)
  body: >-
    In the desktop app, `WorkColumn` calls `selectedTaskIds.includes(item.id)` inside the loop that
    renders each row. The selection is a plain array, so every lookup is linear, and a long list
    with many selected items does quadratic work on each render. The selection hook already builds
    a `Set` for filtering, so the fix has a pattern to follow.
  suggestedAction: >-
    Build one memoized `Set` from the selected ids and check each row with `has(item.id)`.
inboxExample:
  reportId: 01a0d1cf-ea2c-7e0f-8483-0be90335ab09
  publishedAt: 2026-09-26
  outcome: >-
    A custom scout that reads the code for React performance problems found this one. An engineer
    started the fix from the inbox, and a five-line change merged the next day.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/105695
    title: "fix(desktop): avoid repeated selection scans in WorkColumn"
    mergedAt: 2026-09-25
---
