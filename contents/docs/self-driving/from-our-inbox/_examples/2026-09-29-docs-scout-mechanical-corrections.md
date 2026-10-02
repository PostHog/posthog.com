---
category: Scouts
report:
  title: The docs scout asks for a decision when the exact correction is already known
  source: Scout · Posthog docs freshness (custom)
  body: >-
    The docs scout finds pages that still call a released feature alpha.
    It verifies the release in product code and identifies the exact text to change.
    Its instructions still classify these mechanical corrections as needing human input,
    so a ready-to-write fix waits for a decision that the evidence already answers.
  suggestedAction: >-
    Mark a correction ready when a merged release change, the current page, and the exact
    edit establish what to do. Ask for human input when a product or editorial decision remains.
inboxExample:
  reportId: 01a0e7f8-82f3-7e50-8356-63bbfdf65db0
  publishedAt: 2026-09-29
  outcome: >-
    The scout's revised instructions were published and verified.
    They distinguish mechanical corrections from product decisions while keeping the
    checks that require proof of general availability.
  resolution:
    label: Scout updated
    resolvedAt: 2026-09-28
---
