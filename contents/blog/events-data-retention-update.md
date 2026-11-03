---
title: "Events data retention is changing for new paid plans"
date: 2026-11-05
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: PostHog news
---

From November 5, 2026, new paid plans on PostHog Cloud will have a 2-year events data retention policy, instead of our previous default of 7 years. 

You can extend your data retention by upgrading your platform package: 3 years on Boost, 5 years on Scale, and 7 years on Enterprise. The free plan will stay at 1 year. 

Organizations already on a paid plan keep 7 years.

The table below shows the our old retention policies broken down by package:

[PLEASE ADD TABLE HERE]

## How does this impact existing customers?

**Existing paid organizations:** You keep 7 years while you stay on your current plan and platform package, or move to an upgraded package. If you downgrade to the free plan, or downgrade your platform package, you'll move to the new retention for your plan.

**Existing free organizations:** You'll keep 1-year retention. If you upgrade to pay-as-you-go on or after November 5, you'll move to the 2-year default, or longer with a platform package.

## What happens to my data after the retention window expires?

On the free plan, events older than 1 year are hidden first and deleted later.

For the first 3 months after this starts, nothing is deleted. If you upgrade to pay-as-you-go during that time, you get back all your events from the last 2 years.

After that, events are deleted once they're more than 15 months old, which is 3 months after they pass the 1-year window. Upgrading still brings back hidden events that haven't been deleted yet.

On paid plans, events are deleted once they're older than your plan's window of 2, 3, 5, or 7 years.

A shorter window in organization settings also deletes events once they're older than it. To remove events right away, use the [data deletion tools](/docs/privacy/data-storage#data-deletion). For more details, see the [events data retention docs](/docs/data/events-retention).

## How can I extend my data retention in PostHog?

To retain your data for longer, add a [platform package](/platform-packages): Boost gives 3 years, Scale 5 years, and Enterprise 7 years. 

Your organization gets the longest window your plan allows. To use a shorter window for every project in it, change it in your organization settings.

## Can I export data out of PostHog?
Yes, if you'd prefer not to upgrade your package, or you need to keep data for longer than 7 years, you can send it to your own data warehouse with a [batch export](/docs/cdp/batch-exports).
