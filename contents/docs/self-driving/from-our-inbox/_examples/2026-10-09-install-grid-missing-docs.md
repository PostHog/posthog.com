---
category: Documentation
report:
  title: The installation grid links to a TanStack Router page that does not exist
  source: Scout · Website 404s (custom)
  body: >-
    A custom scout traced failed page requests to a TanStack Router tile on the product installation pages.
    The shared grid built a documentation URL from the framework list without checking whether the page existed.
    The framework had a wizard link, but no matching documentation page.
  suggestedAction: >-
    Stop the shared installation grid from linking to the missing page.
    Keep the framework's wizard link available.
inboxExample:
  reportId: 01a068e5-8f9f-72f8-a293-99b879295063
  publishedAt: 2026-10-09
  outcome: >-
    An implementation agent changed the grid to show a tile only when a matching documentation page exists.
    The public pull request merged after browser checks confirmed that the broken tile disappeared and the other links stayed the same.
  pullRequest:
    url: https://github.com/PostHog/posthog.com/pull/19943
    title: "Hide install grid tiles that have no docs page"
    mergedAt: 2026-10-08
---
