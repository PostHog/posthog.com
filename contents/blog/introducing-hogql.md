---
date: 2023-03-02
title: "Introducing HogQL for PostHog"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: PostHog news
author:
  - joe-martin
tags:
  - Product updates
  - Release notes
featuredImage: ../images/blog/posthog-array-blog.png
featuredImageType: full
---

Today, we're excited to announce a new major PostHog feature which we're making available to all users as a public beta on PostHog Cloud. It's called HogQL and it's a new query language which makes it easier to interrogate your data directly, for all those edge cases where pre-existing insights just don't fit the bill.

Speaking of bills, HogQL is free for all users while it's in public beta - all we ask is that you share any feedback you have with it either via the PostHog Slack, or by [filing an issue on our repo](https://github.com/PostHog/). 

HogQL is basically our take on SQL (technically, a transition layer over ClickHouse SQL) and we've created it to empower a wide range of users, from technical product managers who need multi-property breakdowns, to engineers and analysts who need to dissect data in more nuanced ways. It's designed to be as intuitive and user-friendly as possible for teams who are familiar with SQL, but offers a few extra advantages and features.

![HogQL trends breakdown filter](../images/features/hogql/trends-breakdown.png)

Unique features to HogQL include simplified access to event and person properties, as well as the ability to run subqueries and database joins. You can also use aggregations such as `count`, `min`, `minIf`, `max`, `maxIf`, `sum`, `sumIf`, `avg`, `any`, and `anyIf`.

We recommend checking the docs for a more detailed [explanation of supported ClickHouse SQL functions which are supported in HogQL](/manual/hogql) - or here's an example query which calculates which countries prefer pineapple on pizza based on responses on [our 404 page](/joeisthebest).

```HogQL
{
  "kind": "DataTableNode",
  "full": true,
  "source": {
    "kind": "EventsQuery",
    "select": [
      "properties.$geoip_country_name",
      "if(countIf(properties.does_pineapple_go_on_pizza == 'false') > countIf(properties.does_pineapple_go_on_pizza == 'true'), '🍅 Does not belong on pizza', if(countIf(properties.does_pineapple_go_on_pizza == 'false') == countIf(properties.does_pineapple_go_on_pizza == 'true'), '🥦 It is a tie' , '🍍 Belongs on pizza')) -- Result",
      "concat(repeat('🍍', countIf(properties.does_pineapple_go_on_pizza == 'true')),repeat('🍅', countIf(properties.does_pineapple_go_on_pizza == 'false'))) -- Answers",
      "count() -- Number of answers",
      "concat(toString(round(countIf(properties.does_pineapple_go_on_pizza == 'true') / count() * 1000) / 10), '%') -- Percentage pineapple"
    ],
    "after": "-365d",
    "limit": 100,
    "event": "pineapple_on_pizza_survey",
    "orderBy": [
      "-count() # Number of answers"
    ],
    "before": ""
  },
  "propertiesViaUrl": true
}
```

## The PostHog event explorer 

In addition to introducing HogQL, we've also upgraded the event explorer to give you more ways to filter events and analyze your data - including by using HogQL.

Here, you can see us running the query above to generate results with the event explorer. 

![HogQL animated example](../images/features/hogql/hogql.gif)

## The history and future of HogQL

We originally started thinking about HogQL back in January, while thinking about [a concept for universal search within PostHog](https://github.com/PostHog/posthog/issues/7963). Over time, that plan evolved into creating [new ways for users to explore data](https://github.com/PostHog/meta/issues/86) via direct queries. We wanted users to be able to run formulas powered by HogQL in what was then called the Live Events view, but is now the Event Explorer. 

However, while this work was underway we realized we could potentially take it a step further and build full SQL support directly into PostHog as a new insight type. You'd simply write a new SQL query in PostHog, press 'Run' and get a table with your desired results. 

We're still actively developing these ideas, as well as the implementation of HogQL within PostHog. If you have any feedback, we'd love to here from you in [the PostHog Slack group](/slack).

<ArrayCTA />
