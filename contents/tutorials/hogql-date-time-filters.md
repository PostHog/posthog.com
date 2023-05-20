---
title: Using HogQL for advanced time and date filters
date: 2023-05-19
author: ["ian-vanagas"]
showTitle: true
sidebar: Docs
featuredImage: ../images/tutorials/banners/tutorial-9.png
tags: ["hogql", "insights"]
---

Because there are infinite ways to break down time, there are infinite ways to filter based on time. HogQL unlocks more of these in PostHog, and in this tutorial, we go through examples of how to use do that.

To add a HogQL filter, create a new insight, open the filter dropdown, click "Add filter" below your data series, select HogQL from the options, write your expression, and click "Add HogQL expression." HogQL filters are available on every type of insight from trends to funnels to lifecycle.

![hogql.mp4](../images/tutorials/hogql-date-time-filters/hogql.mp4)

## Accessing your data’s dates and times

To filter on dates and times, you need access to those values. You can find a full list of events, properties, and types in your [data management tab](https://app.posthog.com/data-management/events), but here is a summary of the important points:

- You can access the time events happened with the `timestamp` property which is automatically set on events.
- Persons have a `created_at` property which you can access with `person.created_at`.
- For custom event or person properties, such as `subscribed_at`, you can access them with `person.properties.subscribed_at`.

> **Note:** you might need to convert strings to date time objects with the `toDateTime()` function or convert date time objects to strings with `toString()`.

The [ClickHouse SQL statements](https://clickhouse.com/docs/en/sql-reference) we built HogQL on also have useful helper functions to know when it comes to using dates. These include:

- `now()`: the current date and time at the moment of query analysis.
- `today()`: the current date at the moment of query analysis.
- `yesterday()`: yesterday’s date at the moment of query analysis.

## Events from a specific time range

To filter for events in a specific time range, you can use `toDateTime()` to create a date time object that we compare with the event `timestamp`. 

For example, if we wanted to filter for events after 9:26 AM on September 16th, 2022, and before 2:34 PM on October 1st, 2022, we can use the expression:

```
toDateTime('2022-09-16 09:26:00') < timestamp 
and timestamp < toDateTime('2022-10-01 14:34:00')
```

> **Note:** by default, PostHog uses `UTC` for our timestamps, so you should keep that in mind and convert times to `UTC` where relevant.

## Using the Unix timestamp

If you have a Unix timestamp to filter by, you can use `toUnixTimestamp` to convert a date time object into a Unix timestamp, or `fromUnixTimestamp` to do the reverse. 

For example, if you wanted to filter for events after the Unix timestamp `1674259200`, you could use the expression:

```
fromUnixTimestamp(1674259200) < timestamp
```

## Older or younger events

If you are looking for events of a certain age, rather than a relation to a certain date, you can use the `dateDiff()` function with the timestamp and current time. 

For example, to get events over 5 days old, use the expression:

```
dateDiff('day', timestamp, now()) > 5
```

You can replace `day` here with `second`, `minute`, `hour`, `week`, `month`, `quarter`, and `year` to get the differences in those values as well.

## Weekly and quarterly reports

Many companies report on a weekly or quarterly basis. For this, standard 7 or 90-day date range filters may include values beyond the days or weeks you want to report. HogQL lets us easily create these reports.

For example, if we wanted events for this quarter, we can use the expression:

```
toStartOfQuarter(timestamp) == toStartOfQuarter(now())
```

We can do the same with the current week with `toStartOfWeek`:

```
toStartOfWeek(timestamp) == toStartOfWeek(now())
```

Alternatively, if you wanted a weekly report for only weekdays, you can use `toDayOfWeek` to filter out Saturday and Sunday with their day’s number:

```
toDayOfWeek(timestamp) != 6 and toDayOfWeek(timestamp) != 7
```

## Analyzing subscribers or trial users

HogQL lets you analyze users based on dates too. This enables you to filter for events based on users in trial or recently subscribed.

For example, you want to events from users in the last 3 days of their trial period and you only have a `trial_started` person property. You can use the `addDays()` function to add 30 days and check if that date is less than or equal to 3 days away from `now()` like this: 

```
dateDiff(
	'day', 
	now(), 
	addDays(toDateTime(person.properties.trial_started), 30)
) <= 3
```

A use case for this is creating an action for pricing pageviews during the last days of the trial, then posting to a webhook  to trigger outreach or creating a cohort for further analysis.

![Action](../images/tutorials/hogql-date-time-filters/action.png)

Another similar example is using HogQL to understand usage in the first two weeks after subscribing. To do this, use `dateDiff()` again but with `'week'`, your signed up property, and `now()` like this:

```
dateDiff('week', toDateTime(person.properties.signed_up_at), now()) <= 2
```

This is useful to learn what features are used immediately after sign up and others that might go undiscovered.

## Further reading

- [Using HogQL for advanced breakdowns](/tutorials/hogql-breakdowns)
- [Running experiments on new users](/tutorials/new-user-experiments)
- [Calculating average session duration, time on site, and other session-based metrics](/tutorials/session-metrics)
