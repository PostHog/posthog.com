---
title: How to calculate bounce rate
date: 2024-12-24
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

Bounce rate is the percentage of users who visit a page and then leave without taking any further actions. It is a popular marketing metric showing the relevance and engagement of content for site visitors. This tutorial shows you how to calculate bounce rate in PostHog.

To get started, you need to install PostHog's [web snippet](/docs/getting-started/install?tab=snippet) or [JavaScript SDK](/docs/libraries/js). Then ensure the following settings are enabled in your project settings:

- [Record user sessions](https://app.posthog.com/settings/environment#replay)
- [Enable autocapture for web](https://app.posthog.com/settings/environment-autocapture#autocapture)

## How do we define bounce rate?

Your bounce rate is the percentage of sessions that resulted in a bounce. We define a bounce as a session where a visitor:

- spent less than 10 seconds on a page
- did not [autocapture](/docs/product-analytics/autocapture) any events
- only had one pageview

> **How does Google Analytics 4 [calculate bounce rate](https://support.google.com/analytics/answer/12195621?hl=en)?** Google Analytics uses a similar definition, where the bounce rate is the percentage of sessions that were "not engaged." An engaged session is defined as a session that lasts longer than 10 seconds, has a conversion event, or has at least 2 screen or pageviews.

## Viewing bounce rate with Web analytics

PostHog's [web analytics](/web-analytics) makes it easy to see the bounce rate for a given page on your website. Navigate to your [web analytics dashboard](https://app.posthog.com/web), and you'll find the bounce rate listed alongside each page in the paths section.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_paths_light_fb2b05a261.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_paths_dark_0e6cd85638.png"
    alt="Bounce rates"
    classes="rounded"
/>

## Calculating bounce rate with SQL insights

You can also use [SQL insights](/docs/product-analytics/sql) to calculate bounce rate using the `sessions` table. To create a new SQL insight, go to the **Product analytics** tab, click [new insight](https://app.posthog.com/insights/new), then go to the **SQL** tab. This is where we write our SQL statements.

We can use `$is_bounce` to find sessions that meet the default bounce criteria mentioned above. The value of `$is_bounce` is either `1` or `0`, so we can take the average for all sessions to get the bounce rate. We multiply by `100` to view it as a percentage and round to a single decimal place.

```sql
SELECT
    round(avg($is_bounce) * 100, 1) AS bounce_rate
FROM
    sessions
```

## Calculating bounce rate for a specific page

To find the bounce rate for sessions that begin on a specific page, add a `where` clause to the query with the `$entry_pathname`. For example, this query will find the bounce rate for sessions that started on the home page:

```sql
SELECT
    round(avg($is_bounce) * 100, 1) AS bounce_rate
FROM
    sessions
WHERE
    $entry_pathname = '/'
```

The query above will only work for sessions that started on the home page. If we want to find the bounce rate for the `/pricing` page (not only for sessions that started on that page), we'll need to join on the `events` table and filter for pageviews that match the URL.

```sql
SELECT
    round(avg($is_bounce) * 100, 1) AS bounce_rate
FROM
    sessions
    INNER JOIN events ON sessions.id = events.properties.$session_id
WHERE
    event = '$pageview'
    AND properties.$current_url LIKE '%/pricing%'
```

## Using different bounce criteria

For more granular control, we can redefine which sessions constitute a bounce with our own criteria. For example, we could find all sessions that had a single pageview and did not capture any events, but disregard the session duration.

```sql
SELECT
    round(
        avg(
            CASE
                WHEN $autocapture_count = 0
                AND $pageview_count = 1 THEN 1.0
                ELSE 0.0
            END
        ) * 100, 1
    ) AS bounce_rate
FROM
    sessions
WHERE
    $entry_pathname = '/pricing'
```

## Calculating bounce rate with raw session replay data

When [session replay is enabled](https://app.posthog.com/settings/environment#replay), we can also calculate the bounce rate using the `raw_session_replay_events` table. This allows us to use different criteria that isn't available in the session data, like `click_count`, `keypress_count`, and `mouse_activity_count`. We can find these in the [database data management](https://app.posthog.com/data-management/database) tab under the `raw_session_replay_events` table.

We can use a `multiIf` statement to check conditions and set new criteria for calculating bounce rate. For example, if we wanted to count bounce rate as the percentage of sessions with fewer than 3 clicks, we can use `click_count < 3` like this:

```sql
SELECT (
	count(
		multiIf(click_count < 3, session_id, NULL)
	) / count(session_id)
) * 100 AS bounce_rate
FROM raw_session_replay_events
```

We can add more criteria to our `multiIf` statement as well. For example, if we wanted to count bounce rate as the percentage of sessions with fewer than 3 clicks and 2 keypresses or less than 10 seconds, we can use `click_count < 3 AND keypress_count < 2 OR active_milliseconds < 10000` like this:

```sql
SELECT (
	count(
		multiIf(click_count < 3 AND keypress_count < 2 OR active_milliseconds < 10000, session_id, NULL)
	) / count(session_id)
) * 100 AS bounce_rate
FROM raw_session_replay_events
```

## Further reading

- [Calculating average session duration, time on site, and other session-based metrics](/tutorials/session-metrics)
- [Using HogQL for advanced time and date filters](/tutorials/hogql-date-time-filters)
- [Using HogQL for advanced breakdowns](/tutorials/hogql-breakdowns)

<NewsletterForm />
