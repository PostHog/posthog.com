---
title: "Events data retention is changing for new paid plans"
date: 2026-11-01
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: PostHog news
---

From November 1, 2026, new paid plans on PostHog Cloud will have a 2-year events data retention policy, instead of 7. The free plan will stay at 1 year. Organizations already on a paid plan keep 7 years.

## What changes

**Existing pay-as-you-go organizations:** Your retention won't change unless you downgrade to the free plan. If you later restart pay-as-you-go, you'll move to the 2-year default.

**Existing free organizations:** You'll keep 1-year retention. If you upgrade to pay-as-you-go on or after November 1, you'll move to the 2-year default.

**New organizations (created on or after November 1):** Free plans get 1 year, and pay-as-you-go plans get 2 years.

## What happens after the retention window?

On the free plan, events older than 1 year are hidden first and deleted later:

- For the first 3 months after this starts, nothing is deleted. If you upgrade to pay-as-you-go during that time, you get back all your events from the last 2 years.
- After that, events are deleted once they're more than 15 months old, which is 3 months after they pass the 1-year window. Upgrading still brings back hidden events that haven't been deleted yet.

On paid plans, events are deleted once they're older than your window (2 or 7 years).

You can't shorten your window to remove data. To remove events, use the [data deletion tools](/docs/privacy/data-storage#data-deletion). For more details, see the [events data retention docs](/docs/data/events-retention).

## If you need a longer window

We're working on a way to offer longer retention. To keep events for longer than any window, send them to your own warehouse with a [batch export](/docs/cdp/batch-exports).
