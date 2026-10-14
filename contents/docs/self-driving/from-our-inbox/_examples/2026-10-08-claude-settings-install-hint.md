---
category: "Error tracking"
report:
  title: "Invalid Claude Code settings produce an exception without a useful next step"
  source: "Error tracking"
  body: >-
    Invalid JSON in `~/.claude/settings.json` stops the PostHog Claude Code plugin from installing.
    The wizard shows the command's error text without explaining what to fix.
    Error tracking and a code review also show that changing command text creates separate issues for the same failure.
  suggestedAction: >-
    Tell users to fix the JSON in their local settings file and retry.
    Treat this known local problem as an expected failure, and use a stable message for unexpected failures.
inboxExample:
  reportId: 01a0dc6d-095c-7a8c-a1ba-59321067727b
  publishedAt: 2026-10-08
  outcome: >-
    The merged change adds a repair hint for invalid user settings and keeps unexpected failures in error tracking under stable messages.
    Tests cover the hint and confirm that invalid project settings still produce an exception.
  pullRequest:
    url: https://github.com/PostHog/wizard/pull/1366
    title: "fix(mcp): show a hint for invalid Claude Code settings JSON on plugin install"
    mergedAt: 2026-10-07
---
