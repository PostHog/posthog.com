---
title: "The power of HogQL’s sum() aggregation"
date: 2023-06-06
author: ["ian-vanagas"]
showTitle: true
sidebar: Docs
featuredImage: ../images/tutorials/banners/tutorial-8.png
tags: ['hogql', 'trends', 'insights']
---

HogQL enables custom series aggregations. This enables you to customize the data filtered, visualized, and broken down in your insights. One of the most powerful aggregations is `sum()`, which we will showcase in this tutorial.

## The basics of sum()

Sum is simple, it calculates the sum of the numbers it is provided. In its most basic form, we can use this to sum event properties (or nested one). For example, to sum your revenue, chose your payment event, then sum the amount paid property. The HogQL expression for this is `sum(properties.amount_paid)`

![Sum](../images/tutorials/hogql-sum-aggregation/sum.png)

> **Note:** sum only works for numbers, you can use `toInt()` to convert any strings to numbers.

## Basic conditional sum

Sum gets more interesting when we use it with conditions. A way to think about this is that "Total count" (or`count()` in HogQL) is just `sumIf(1, true)`. 

From this, we can create sums that meet certain conditions. For example, if we wanted a count of events during the current month, we could do:

```
sumIf(
	1, 
	toStartOfMonth(timestamp) = toStartOfMonth(now())
)
```

This lets us sum occurrences of properties, properties that match criteria, and more.

## Scoring criteria

A more creative way to use `sumIf()`  is to give different weights to different values. 

For example, if you wanted to rank sign up events based on specific criteria, you could use a chain of  `sumIf` and different values for different properties. For example, we can sum the `user signed up` event, and give:

- 10 points for `is_organization_first_user`
- 5 for `realm = ‘cloud’`
- -1 if `team_member_count_all > 1`

As a HogQL expression, this looks like:

```
sumIf(
	10, 
	properties.is_organization_first_user
) + sumIf(
	5,
	properties.realm = 'cloud'
) + sumIf(
	-1,
	properties.team_member_count_all > 1
)
```

When we breakdown by `person_id`, this gives us a list of users with the highest scores, and we can customize our score this as our definition of "high-potential user" changes.

![Score](../images/tutorials/hogql-sum-aggregation/score.png)

> **Note:** person properties can’t be used with HogQL expression series, only event properties.

## Sum to percentages

Sum provides more options for percentages, because we can access both the total sum and a subset in the same series. This enables us to create percentage series.

For example, if you wanted to compare the percentages of Chrome vs Safari, you can create a series where your divide the Safari pageviews by the total Safari and Chrome pageviews. 

```
sumIf(
	1,
	properties.$browser = 'Safari'
) / sumIf(
	1,
	properties.$browser = 'Safari' or properties.$browser = 'Chrome'
)
```

Next, create another series for Chrome pageviews divided by the total Safari and Chrome pageviews.

```
sumIf(
	1,
	properties.$browser = 'Chrome'
) / sumIf(
	1,
	properties.$browser = 'Safari' or properties.$browser = 'Chrome'
)
```

Finally, chose the time series bar, and set the Y-axis to "Percent (0-1)."

**Want to add a gif, but [blocked by this issue.](https://posthog.slack.com/archives/C045L1VEG87/p1686066149103449)**

## Calculating net promoter score (NPS)

A similar use case for `sumIf()` is calculating your NPS score. NPS asks how likely would you recommend a product to a friend or colleague on a scale of 1-10. 9s and 10s are promoters, 7s and 8s are passives, and 6s and below are detractors. To calculate your NPS score, subtract your detractors percentage from your promoters percentage.

To do this in a HogQL expression, use `sumIf` to check your score, add 1 for promoters, 0 for passives, and -1 for detractors. Divide each by the total number of responses (`properties.score is not null`) to get your score.

```
sumIf(
	1,
	properties.score == 10 or
	properties.score == 9
) / sumIf(
	1,
	properties.score is not null
) + sumIf(
	0,
	properties.score == 8 or
	properties.score == 7
) / sumIf(
	1,
	properties.score is not null
) + sumIf(
	-1,
	properties.score <= 6
) / sumIf(
	1,
	properties.score is not null
)
```

This gives us a trend of our NPS score over time, which we can breakdown using different date ranges.

## Further reading

- [Using HogQL for advanced time and date filters](/tutorials/hogql-date-time-filters)
- [Using HogQL for advanced breakdowns](/tutorials/hogql-breakdowns)
- [Calculating average session duration, time on site, and other session-based metrics](/tutorials/session-metrics)