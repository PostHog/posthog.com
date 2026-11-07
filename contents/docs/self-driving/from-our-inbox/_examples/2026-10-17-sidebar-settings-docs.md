---
category: "Documentation"
report:
  title: "The sidebar guide points to settings that no longer exist"
  source: "Scout · Posthog docs freshness scout (custom)"
  body: >-
    The account-settings guide still directs readers to Account > Navigation.
    A docs scout compared the guide with merged product changes and found that
    the settings section had been removed. The replacement controls live in
    the Customize sidebar dialog.
  suggestedAction: >-
    Update the guide to open Customize sidebar from the gear icon on Home.
    Replace the old My Tools instructions with starred-product selection,
    and remove links to the deleted settings.
inboxExample:
  reportId: 01a1432d-2d29-70f7-87e3-2879361a9f9e
  publishedAt: 2026-10-17
  outcome: >-
    A merged documentation change replaces the obsolete instructions with
    the current dialog, starred products, and product suggestions.
    It preserves the supported homepage choices.
  pullRequest:
    url: https://github.com/PostHog/posthog.com/pull/21273
    title: "docs(settings): point navigation docs to the Customize sidebar dialog"
    mergedAt: 2026-10-16
---
