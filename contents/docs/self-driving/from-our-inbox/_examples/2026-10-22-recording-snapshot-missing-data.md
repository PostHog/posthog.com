---
category: "Session replay"
report:
  title: "A snapshot without data crashes the session recording player"
  source: "Error tracking"
  body: >-
    Error tracking caught a session recording player crash while the network inspector read a plugin snapshot.
    The investigation found that both network plugin checks read the snapshot's data without checking whether it exists.
    A snapshot without that field throws an exception that reaches the player's error boundary.
  suggestedAction: >-
    Skip plugin snapshots whose data is missing.
    Add regression tests for missing and null data.
inboxExample:
  reportId: 01a1359d-3154-7796-90ad-7e240747a2b8
  publishedAt: 2026-10-22
  outcome: >-
    The implementation agent guarded both plugin checks and added two cases to the existing regression test.
    Both cases failed before the fix and passed afterward, and the pull request merged.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/116295
    title: "fix(replay): skip plugin snapshots without data in network inspector"
    mergedAt: 2026-10-21
---
