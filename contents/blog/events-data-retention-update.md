---
title: "Updated events data retention for new paid plans"
date: 2026-11-05
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - mike-warren
category: PostHog news
---

Starting November 5, 2026, new paid plans on PostHog Cloud will have a 2-year events data retention period by default, down from 7 years. Existing paid plans keep their 7-year events data retention period unless they downgrade their plan or platform package.

The table below shows how retention is changing by plan:

| Plan | Retention before November 5, 2026 | Retention on or after November 5, 2026 |
| :---- | :---- | :---- |
| Free | 1 year | 1 year |
| Pay-as-you-go | 7 years | Up to 2 years (Default = 2 years) |
| Pay-as-you-go with Boost | 7 years | Up to 3 years (Default = 2 years) |
| Pay-as-you-go with Scale | 7 years | Up to 5 years (Default = 2 years) |
| Pay-as-you-go with Enterprise | 7 years | Up to 7 years (Default = 2 years) |

## Why are we making this change?

Over the past year, many customers have asked us to shorten their events data retention period, and others were surprised to learn we keep events for 7 years. That feedback led us to review our retention policy and compare it with others in our industry. Here's what we found:

- 2 years is the industry standard. Most non-enterprise plans keep event data for 2 years.
- Old data rarely gets queried. The vast majority of queries run on data less than a year old.
- Storing 7 years of data is expensive. We've been paying to store data that most of you weren't using and didn't need us to keep.

For these reasons, we've decided to change our retention periods and give you more control over how long we store your data.

## How does this impact existing customers?

**Existing paid organizations:** You keep 7 year events retention while you stay on your current plan and platform package, or move to an upgraded platform package. If you downgrade to the Free plan, or downgrade your platform package, you'll move to the new default retention period for your plan.

**Existing free organizations:** You'll keep 1-year retention. If you upgrade to pay-as-you-go on or after November 5, you'll get the 2-year default. With a platform package, you get access to longer retention periods.

## What happens to my data after the events data retention period ends?

When an event's `timestamp` goes past your retention period, it is considered expired. Expired events may be deleted at any point, and we can't restore deleted events.

We do not automatically delete events as soon as they expire, so they may be stored longer than your retention period, for two reasons:

- Not all customers are aware that their retention period has ended, and we want to give them time to extend it
- We delete events in batches, so there is a delay between when an event expires and when it is deleted

For more details, see the [events data retention docs](/docs/data/events-retention).

## How can I extend my events data retention period in PostHog?

Add a [platform package](/platform-packages), then increase your events data retention period in your organization or project settings. A data retention period can be set up to 3 years on Boost, 5 years on Scale, and 7 years on Enterprise. Adding a package doesn't automatically extend your data retention period.

For more information on changing your events data retention period, see the [events data retention docs](/docs/data/events-retention).

## Can I export data out of PostHog?

Yes, if you'd prefer not to upgrade your package, or you need to keep data for longer than 7 years, you can send it to your own data warehouse with a [batch export](/docs/cdp/batch-exports).

## Have questions?

For questions about your organization's plan or retention period, [contact our support team](https://app.posthog.com/#panel=support%3Asupport%3Abilling%3A%3Atrue). For general questions, ask in our [community forum](/forum).
