---
category: Signal sources
report:
  title: Each warehouse sync sends the same open pganalyze issues again
  source: GitHub
  body: >-
    A GitHub issue led the investigation to a mismatch between warehouse syncs and signal collection.
    Each sync gives every open pganalyze issue a new sync timestamp.
    The signal collector treats that timestamp as evidence of a new issue, so unchanged issues enter processing again.
  suggestedAction: >-
    Check which issue IDs have already been processed before sending new signals.
    Page through the remaining issues so a large backlog does not hide new work, and keep failed sends eligible for retry.
inboxExample:
  reportId: 01a0ed86-4827-7356-b9c7-5bfbc5f0616a
  publishedAt: 2026-10-02
  outcome: >-
    Self-driving opened a fix, and review added safeguards for paging and retries before the pull request merged.
    Tests cover repeated syncs, new issues, large backlogs, and failed sends using synthetic data.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/108417
    title: "fix(signals): stop pganalyze re-emitting open issues every sync"
    mergedAt: 2026-10-01
---
