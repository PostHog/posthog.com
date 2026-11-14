---
category: "Frontend performance"
report:
  title: "Each failed chat turn copies the remaining messages on every render"
  source: "Scout · React performance (custom)"
  body: >-
    A custom scout found repeated work in the legacy AI chat renderer.
    For each error message, it copied the remaining messages and searched for a newer error.
    Long conversations with many failed attempts therefore copied the same messages repeatedly, including during streaming updates.
  suggestedAction: >-
    Find the newest error once when the message list changes.
    Use that position to hide older errors without copying the remaining messages for each one.
inboxExample:
  reportId: d56a2248-f9b5-4a17-96e4-3593b3ed537b
  publishedAt: 2026-10-25
  outcome: >-
    The merged change caches the newest error's position and replaces the repeated copies with an index comparison.
    It preserves the rule that only the newest error appears.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/123066
    title: "perf(max): avoid quadratic error filtering in the legacy thread"
    mergedAt: 2026-10-24
---
