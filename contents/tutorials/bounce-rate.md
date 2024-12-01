---
title: How to calculate bounce rate
date: 2024-12-01
author:
  - ian-vanagas
  - bijan-boustani
showTitle: true
sidebar: Docs
tags:
  - insights
  - hogql
  - product analytics
  - web analytics
---

Bounce rate is the percentage of users who leave a page immediately after visiting. It is a popular marketing metric showing the relevance and engagement of content for site visitors. This tutorial shows you how to calculate bounce rate in PostHog.

To get started, you need to install the [snippet](/docs/getting-started/install?tab=snippet) or [JavaScript SDK](/docs/libraries/js). And ensure the following settings are enabled in your project settings:

- [Record user sessions](https://app.posthog.com/settings/environment#replay)
- [Enable autocapture for web](https://app.posthog.com/settings/environment-autocapture#autocapture)

## How do we define bounce rate?

Your bounce rate is the percentage of sessions that resulted in a bounce. A bounce is defined as a session where a visitor:

- spent less than 10 seconds on a page
- did not [autocapture](/docs/product-analytics/autocapture) any events
- only had one pageview

> **How does Google Analytics 4 [calculate the bounce rate](https://support.google.com/analytics/answer/12195621?hl=en)?** It is the percentage of sessions that **do not** last longer than 10 seconds, have a conversion event, or have at least 2 pageviews or screenviews.

Since PostHog is open source, we can also look at the [`PostHog/posthog`](https://github.com/PostHog/posthog) repository on GitHub to look up the SQL conditions for a bounce in the [source code](https://github.com/PostHog/posthog/blob/68402d1ae5665298f02c82cc27247660b9647dfa/posthog/hogql_queries/web_analytics/ctes.py#L49).

## Viewing bounce rate with Web analytics

[Web analytics](/web-analytics) makes it easy to see the bounce rate for a given page on your website. Navigate to your web analytics [dashboard](https://app.posthog.com/web), and you'll find the bounce rate listed alongside each page in the paths section.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_paths_light_fb2b05a261.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_paths_dark_0e6cd85638.png"
    alt="Bounce rates"
    classes="rounded"
/>

## Calculating bounce rate with SQL insights

You can also use [SQL insights](/docs/product-analytics/sql) to calculate bounce rate using the `sessions` table. To create a new SQL insight, go to the **Product analytics** tab, click [new insight](https://app.posthog.com/insights/new), then go to the SQL tab. This is where we write our SQL statement.

To use the default bounce criteria from above, we can use `$is_bounce` to see the bounce rate across all sessions. We take the average of all sessions that resulted in a bounce, multiply by 100 to get a percentage, and then round to a single decimal point.

```sql
select
    round(avg(sessions.$is_bounce) * 100, 1) as bounce_rate
from
    sessions
```

For more granular control, we can redefine `is_bounce` with our own criteria.

```sql
select
    round(
        avg(
            case
                when $autocapture_count = 0
                and $pageview_count <= 1
                and $session_duration <= 10000 then 1.0
                else 0.0
            end
        ), 1
    ) * 100 as bounce_rate
from
    sessions
```

We can query the bounce rate across all sessions by...

- Find the number of sessions that bounced.
- Divide that by the total number of sessions (`count(session_id)`)
- Multiply by 100 to view it as a percentage.

We count a bounce as a session where the user is active for less than 10 seconds. To do this in SQL, we use a count of sessions (using `session_id`) where `active_milliseconds` is less than `10000` and divide by the total session count, then multiply by `100`. Together, this looks like this:

```sql
select(
	count(
		multiIf(active_milliseconds < 10000, session_id, NULL)
	) / count(session_id)
) * 100 as bounce_rate
from raw_session_replay_events
-- Last 24 hours
-- 64.47411113984953
```

```sql
select(
    count(
        if($is_bounce = 1, session_id, null)
    ) / count(session_id) * 100 as bounce_rate
) from sessions
-- 11.774369467403112
```

-- (num_autocaptures == 0 AND num_pageviews <= 1 AND duration_s < 10) AS is_bounce

This gives us a bounce rate percentage insight we can save, update, and add to dashboards.

![Bounce rate](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/tutorials/bounce-rate/bounce-rate.mp4)

## Using different bounce criteria

Although we used active time as our criteria for bounce rate, PostHog has other options. They include using `click_count`, `keypress_count`, or `mouse_activity_count`. We can find these in the [database data management](https://app.posthog.com/data-management/database) tab under the `raw_session_replay_events` table.

Using different bounce criteria is as simple as changing `active_milliseconds < 10000` to the new criteria. For example, if we wanted to count bounce rate as the percentage of sessions with fewer than 3 clicks, we can use `click_count < 3` like this

```sql
select (
	count(
		multiIf(click_count < 3, session_id, NULL)
	) / count(session_id)
) * 100 as bounce_rate
from raw_session_replay_events
```

We can add more criteria to our `multiIf` statement as well. For example, if we wanted to count bounce rate as the percentage of sessions with fewer than 3 clicks and 2 keypresses or less than 10 seconds, we can use `click_count < 3 and keypress_count < 2 or active_milliseconds < 10000` like this

```sql
select (
	count(
		multiIf(click_count < 3 and keypress_count < 2 or active_milliseconds < 10000, session_id, NULL)
	) / count(session_id)
) * 100 as bounce_rate
from raw_session_replay_events
```

## Calculating bounce rate for a specific page

We use a more complicated SQL query to get the bounce rate for a specific page. 

1. We get a count of distinct `session_id` values where the `click_count` is 0 and the `active_milliseconds` is 60000. 
2. We divide this the total number of distinct `session_id` values for the page.
3. Use an `INNER JOIN` to add the `events` table to get the `created_at` date and `$properties.current_url` value.
4. Filter for `created_at` dates in the last week with the `$current_url` of a specific URL (in this case, `https://posthog.com/`).

Altogether this looks like this:

```sql
SELECT 
    (COUNT(DISTINCT CASE 
        WHEN (raw_session_replay_events.click_count = 0 AND raw_session_replay_events.active_milliseconds < 60000) 
        THEN raw_session_replay_events.session_id 
        ELSE NULL 
    END) * 100.0) / COUNT(DISTINCT events.properties.$session_id) AS bounce_rate
FROM 
    events
INNER JOIN 
    raw_session_replay_events ON events.properties.$session_id = raw_session_replay_events.session_id
WHERE 
    events.created_at >= now() - INTERVAL 7 DAY 
    AND events.properties.$current_url = 'https://posthog.com/'
```

This gives a bounce rate percentage for our homepage, and you can edit it for any specific page you want.

## Further reading

- [Calculating average session duration, time on site, and other session-based metrics](/tutorials/session-metrics)
- [Using HogQL for advanced time and date filters](/tutorials/hogql-date-time-filters)
- [Using HogQL for advanced breakdowns](/tutorials/hogql-breakdowns)

<NewsletterForm />

$entry_pathname