---
title: "Events data retention is changing for new paid plans"
date: 2026-11-05
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: PostHog news
---

From November 5, 2026, new paid plans on PostHog Cloud will have a 2-year events data retention period, instead of our previous default of 7 years. The Free plan stays at 1 year, and organizations already on a paid plan keep 7 years.

The table below shows how retention is changing by plan:

| Plan | Retention before November 5, 2026 | Default retention from November 5, 2026 | Custom retention policy range |  
| :--- | :--- | :--- | :--- |  
| Free | 1 year | 1 year | Not available |  
| Pay-as-you-go | 7 years | 2 years | Up to 2 years |  
| Pay-as-you-go with Boost | 7 years | 2 years | Up to 3 years |  
| Pay-as-you-go with Scale | 7 years | 2 years | Up to 5 years |  
| Pay-as-you-go with Enterprise | 7 years | 2 years | Up to 7 years |

## Why are we making this change?

We've heard from many customers who want to set custom retention periods for compliance, and some have asked why we keep data for 7 years. That led us to take a broader look at our default retention period and the capabilities we offer.

Compliance guidance on events data retention often suggests a period shorter than 7 years, so we want you to think about whether you need 7. A 2-year default fits what we think most customers need, and custom retention policies are there if you need longer.

It also lets us save on storage costs, which helps us keep our prices low for our customers.

## How does this impact existing customers?

**Existing paid organizations:** You keep 7 years while you stay on your current plan and platform package, or move to an upgraded package. If you downgrade to the Free plan, or downgrade your platform package, you'll move to the new default retention period for your plan.

**Existing free organizations:** You'll keep 1-year retention. If you upgrade to pay-as-you-go on or after November 5, you'll get the 2-year default. With a platform package, you can set a custom retention policy to keep events for longer.

## What happens to my data after the retention period ends?

Events older than your retention period are hidden from queries, and may be deleted at any point after the period ends. We may store them longer than your retention period, but that isn't guaranteed.

If you've set up a custom retention policy, we'll delete any events past your retention period during our monthly data cleanup.

To remove events right away, use the [data deletion tools](/docs/privacy/data-storage#data-deletion). For more details, see the [events data retention docs](/docs/data/events-retention). 

## How can I extend my data retention in PostHog?

Add a [platform package](/platform-packages), then set a custom retention policy in your organization or project settings. A policy can be up to 3 years on Boost, 5 years on Scale, and 7 years on Enterprise. Adding a package doesn't extend your retention by itself.

## Can I export data out of PostHog?

Yes, if you'd prefer not to upgrade your package, or you need to keep data for longer than 7 years, you can send it to your own data warehouse with a [batch export](/docs/data-pipelines/batch-exports). 

## Can I set up a custom retention policy for my organization or project?

Yes! We've recently added custom retention policies. See the [events data retention docs](/docs/data/events-retention) for more information on how to set one.
