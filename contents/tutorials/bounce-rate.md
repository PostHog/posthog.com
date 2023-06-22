---
title:  How to calculate bounce rate
date: 2023-06-21
author: ["ian-vanagas"]
showTitle: true
sidebar: Docs
featuredImage: ../images/tutorials/banners/tutorial-15.png
tags: ['insights', 'hogql']
---

Bounce rate is the percentage of users who leave your page immediately after visiting. It is a popular marketing metric showing the relevance and engagement of content for site visitors.  

This tutorial shows you how to calculate bounce rate in PostHog. To get started, you need to install the [snippet](/docs/getting-started/install?tab=snippet) or [JavaScript SDK](/docs/libraries/js) and enable "record user sessions"  in [project settings](https://app.posthog.com/project/settings).

> **How does Google Analytics 4 [calculate the bounce rate](https://support.google.com/analytics/answer/12195621?hl=en)?** It is the percentage of sessions that **do not** last longer than 10 seconds, have a conversion event, or at least 2 pageviews or screenviews.

## Calculating bounce rate with SQL insights

To calculate bounce rate, we need data from `raw_session_replay_events`, which we can access with [SQL insights](/docs/product-analytics/hogql#sql-insights). To create a new SQL insight, go to the insight tab, click [new insight](https://app.posthog.com/insights/new), then go to the SQL tab. This is where we write our SQL statement.

We count a bounce as a session where the user is active for less than 10 seconds. To do this in SQL, we get a count of sessions (using `session_id`) where `active_milliseconds` is less than `10000` and divide by the total session count, then multiply by `100`. Together, this looks like this:

```sql
select (
	count(
		multiIf(active_milliseconds < 10000, session_id, NULL)
	) / count(session_id)
) * 100 as bounce_rate
from raw_session_replay_events
```

This gives us a bounce rate percentage insight we can save, update, and add to dashboards.

![Bounce rate](../images/tutorials/bounce-rate/bounce-rate.mp4)

> **Why not use single page visits divided by total visits?** The `raw_session_replay_events` data does not include the frequency of events and the `events` data does not include session details, making calculating sessions with a single `$pageview` event not possible (at the moment).

## Using different bounce criteria

Although we used active time as our criteria for bounce rate, PostHog has other options. They include using `click_count`, `keypress_count`, or `mouse_activity_count`. We can find these  in the [database data management](https://app.posthog.com/data-management/database) tab under the `raw_session_replay_events` table.

Using different bounce criteria is as simple as changing `active_milliseconds < 10000` to the new criteria. For example, if we wanted to count bounce rate as the percentage of sessions with fewer than 3 clicks, we can use `click_count < 3` like this

```sql
select (
	count(
		multiIf(click_count < 3, session_id, NULL)
	) / count(session_id)
) * 100 as bounce_rate
from raw_session_replay_events
```

We can add more critera to our `multiIf` statement as well. For example, if we wanted to count bounce rate as the percentage of sessions with fewer than 3 clicks and 2 keypresses, we can use `click_count < 3 and keypress_count < 2` like this

```sql
select (
	count(
		multiIf(click_count < 3 and keypress_count < 2, session_id, NULL)
	) / count(session_id)
) * 100 as bounce_rate
from raw_session_replay_events
```

## Further reading

- [Calculating average session duration, time on site, and other session-based metrics](/tutorials/session-metrics)
- [Using HogQL for advanced time and date filters](/tutorials/hogql-date-time-filters)
- [Using HogQL for advanced breakdowns](/tutorials/hogql-breakdowns)