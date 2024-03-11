---
date: 2023-06-08T00:00:00.000Z
title: 'Introducing HogQL: Direct SQL access for PostHog'
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: PostHog news
author:
  - joe-martin
  - andy-vandervell
tags:
  - Product updates
  - Release notes
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/hog_ql.png
featuredImageType: full
---

Today, we're releasing a major new feature as a public beta: the ability to directly query your PostHog data [using SQL](/blog/sql-for-analytics). We call this [HogQL](/docs/product-analytics/hogql) because... hedgehogs love SQL, probably?

You can use [HogQL expressions](/docs/hogql/expressions) to enhance insights, filter event lists, and write full queries to analyze data in any way you want. 

PostHog's existing insights are already incredibly powerful. HogQL turns insights Super Saiyan.

HogQL is free for all users of PostHog Cloud while in public beta – all we ask is that you [share your feedback with us](http://app.posthog.com/home#supportModal).

## What is HogQL?

It's a translation layer over ClickHouse SQL. It's intuitive for anyone familiar with SQL, but it offers a few advantages and customizations.

Features unique to HogQL include simplified access to event and person properties, like the [autocapture element chain](/tutorials/hogql-autocapture). It also automatically adds joins when you query fields with data on a different table, such as `events.person.properties.$browser`.

You can also use subqueries, joins, table expressions, arrays, lambdas, and a whole host of other neat SQL features, including aggregations. 

See our [HogQL documentation](/docs/product-analytics/hogql) for a full [list of supported ClickHouse SQL functions](/docs/product-analytics/hogql#supported-clickhouse-functions).

> **Not a PostHog user?** [Get started for free](https://app.posthog.com/signup?utm_source=hogql-blog-top) – all users get 1 million events and 15k recordings free every month, **no card required.**

## What can you do with HogQL?

Too much to list in one blog post, but here are a few examples:

### HogQL breakdowns = multiple properties

Want to break down signups by both pricing tier _and_ overall usage? No problem. HogQL does that. With HogQL, you can add as many breakdown properties as you like. Go nuts.

![HogQL breakdowns](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/blog/array/hog_breakdown.mp4)

> **🎓 Related tutorial:** [Using HogQL for advanced breakdowns](/tutorials/hogql-breakdowns)

### HogQL filters

Oh, look. You can use HogQL in filters too. Useful for _filtering_ by multiple properties!

![HogQL filter](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/blog/array/hog_filters.mp4)

> **🎓 Related tutorial** [Using HogQL for advanced time and date filters](/tutorials/hogql-date-time-filters)

### HogQL aggregations

_And_ you can use HogQL to aggregate results in a funnel, too. Is there anything HogQL can't do? Probably, yes, but we'll enjoy finding out for sure. 

![HogQL aggregations](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/blog/array/hog_aggregate.mp4)

> **🎓 Related tutorial** [The power of HogQL’s sum() aggregation](/tutorials/hogql-sum-aggregation)

### Custom SQL insights

Of course, the most powerful way to leverage HogQL within PostHog is via the new [SQL insight type](/docs/product-analytics/sql). This gives you direct SQL access to your data in PostHog, so you can create custom table insights that answer complex questions.

For example, while you can use a retention insight to discover which **features** keep users coming back for more, you could build an SQL insight to find which **users** keep coming back, and identify outliers. 

We're confident SQL insights will unlock deep analysis into how users use your products, and we can't wait to hear [your feedback](http://app.posthog.com/home#supportModal) and see how you use SQL access in PostHog. 

To get a flavor, here's an example query summarizing survey data. It's purpose? Determining which countries prefer pineapple on a pizza. This is serious analysis:[^1]

![PostHog SQL insights](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/blog/array/pineapple_sql.mp4)

```
   select properties.$geoip_country_name,
          countIf(not properties.does_pineapple_go_on_pizza) > countIf(properties.does_pineapple_go_on_pizza)
            ? '🍅 Does not belong on pizza'
            : countIf(not properties.does_pineapple_go_on_pizza) = countIf(properties.does_pineapple_go_on_pizza)
              ? '🥦 It is a tie'
              : '🍍 Belongs on pizza'
          as Result,
          concat(
             repeat('🍍', countIf(properties.does_pineapple_go_on_pizza)),
             repeat('🍅', countIf(not properties.does_pineapple_go_on_pizza))
          ) as Answers,
          count() as `Number of answers`,
          concat(
            toString(round(countIf(properties.does_pineapple_go_on_pizza) / count() * 1000) / 10), '%'
          ) as `Percentage pineapple`
     from events
    where event = 'pineapple_on_pizza_survey'
 group by properties.$geoip_country_name
 order by count() desc
    limit 100
```

## Event explorer + HogQL = 🚀 

There. Is. Mooooorrrre.

As part of our work on HogQL, we've reworked all our insights as JSON objects, which you can customize. Just click the 'View source' button in the top right (see below), and tweak the code directly.

![view source](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/blog/array/view-source.mp4)

You can also create custom table insights directly from Activity (previously "Live Events") and Person & Groups tabs. 

![custom insights](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/blog/array/custom_insights.mp4)

Just hit that 'Open as a new insight' button (see above), tweak the JSON (if you want), and save your table to a dashboard or [notebook](/docs/notebooks).

Moving on... you can also use [HogQL expressions](/docs/hogql/expressions) (e.g. `properties.$screen_width * $properties.screen_height`) and aggregations (e.g. `sum(properties.price)`) as columns. This is helpful not just for generating tables that summarize person and event information, but also for exploring the data in new and totally custom ways. 

You could, for example, use HogQL to run currency conversions and normalize data into a single currency in its own column, or even extrapolate and project revenue, and usage figures, into the future. 

## Why did we build HogQL and what's next?

It started with a small idea and just got bigger.

We originally started thinking about HogQL back in January, while thinking about [a concept for universal search within PostHog](https://github.com/PostHog/posthog/issues/7963). 

Over time, that plan evolved into creating [new ways for users to explore data](https://github.com/PostHog/meta/issues/86) via direct queries. We wanted to enable to run formulas in what was then called the Live Events view, but is now "Activity." 

However, while this work was underway we realized we could potentially take it a step further and build full SQL support directly into PostHog as a new insight type... so we did! It was a short conversation. 

We're still actively developing all these ideas, as well as the implementation of HogQL within PostHog – seriously, check out this [massive mega issue](https://github.com/PostHog/meta/issues/81). This is, as the cliché goes, just the beginning. There's at least 19 more Super Saiyan forms to go... 🔥

Got an opinion on what we should do next? Share it via the [feedback modal in PostHog](https://app.posthog.com/home#supportModal=feedback%3A), or let us know [on Twitter](https://twitter.com/posthog).

> **Not a PostHog user?** [Get started for free](https://app.posthog.com/signup?utm_source=hogql-blog-bottom) – all users get 1 million events and 15k recordings free every month, **no card required.**

[^1]: 68.5% of 🇺🇸 residents think 🍍 belongs on 🍕. People in 🇪🇸 are the greatest 🍍 deniers at 10%. One person in Aruba 🇦🇼 voted, but we're pretty sure that was one of us during our [2023 all-company offsite](/blog/aruba-hackathon). We built some cool hackathon projects there, like our [dashboard template library](/templates), and an open-source tool for [monitoring and managing ClickHouse clusters](https://github.com/PostHog/HouseWatch). You could say it was openly... sourcey. "_Hello, HR? Are bad puns a firing offense?_"
