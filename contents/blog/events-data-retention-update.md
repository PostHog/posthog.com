---
title: "Events data retention is changing for new organizations"
date: 2026-11-01
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: PostHog news
---

From November 1, 2026, a new organization on PostHog Cloud keeps its events for 2 years on paid plans and 1 year on the free plan. Organizations created before that date keep their current window: 7 years on paid plans.

## What changes

- Paid plans for new organizations retain events for 2 years instead of 7.
- The free plan stays at 1 year.
- Organizations created before November 1, 2026 keep 7 years for as long as they stay on a paid plan.

## Why

Storing every event for 7 years costs more than the events earn once they are more than a couple of years old, and very few queries reach that far back. A 2-year window covers year-over-year comparisons and keeps event pricing where it is.

## If you need a longer window

- On a platform package (Boost, Scale, or Enterprise), ask support for a longer window, up to 7 years.
- To keep events for longer than any window, send them to your own warehouse with a [batch export](/docs/cdp/batch-exports).

## How to check your window

PostHog shows a warning on any insight whose date range reaches past your retention window. The [events data retention docs](/docs/data/events-retention) explain how retention works and how to read your window through the API.

Questions about your organization's window? [Contact support](/questions).
