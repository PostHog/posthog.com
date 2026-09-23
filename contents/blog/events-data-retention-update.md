---
title: "Events data retention is changing for new organizations"
date: 2026-11-01
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: PostHog news
---

From November 1, 2026, paid plans on PostHog Cloud keep events for 2 years instead of 7. The free plan stays at 1 year. Organizations already on a paid plan keep 7 years.

## What changes

- An organization that starts a paid plan on or after November 1, 2026 keeps events for 2 years, even if it was on the free plan before.
- The free plan stays at 1 year.
- An organization already on a paid plan before November 1, 2026 keeps 7 years for as long as it stays on a paid plan.

## If you need a longer window

- On a platform package (Boost, Scale, or Enterprise), ask support for a longer window.
- To keep events for longer than any window, send them to your own warehouse with a [batch export](/docs/cdp/batch-exports).

## How to check your window

PostHog shows a warning on any insight whose date range reaches past your retention window. The [events data retention docs](/docs/data/events-retention) explain how retention works and how to read your window through the API.

Questions about your organization's window? [Contact support](/questions).
