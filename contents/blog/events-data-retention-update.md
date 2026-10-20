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

**New organizations (created on or after November 1):** Free plans get 1 year, and pay-as-you-go plans get 2 years. We're working on a way to offer longer retention. Until then, if you're on a paid platform package (Boost, Scale, or Enterprise) and need more than 2 years, contact our support team.

## If you need a longer window

To keep events for longer than any window, send them to your own warehouse with a [batch export](/docs/cdp/batch-exports).

## How to check your window

PostHog shows a warning on any insight whose date range reaches past your retention window. The [events data retention docs](/docs/data/events-retention) explain how retention works and how to read your window through the API.

Questions about your organization's window? [Contact support](/questions).
