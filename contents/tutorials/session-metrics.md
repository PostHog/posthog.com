---
title: >-
  Calculating average session duration, time on site, and other session-based
  metrics
sidebar: Docs
showTitle: true
author:
  - ian-vanagas
date: 2024-11-26
featuredVideo: 'https://www.youtube-nocookie.com/embed/CVu6ObmOR8Q'
tags:
  - trends
  - sessions
  - product analytics
---

A session is a set of events grouped to capture a "single use" of your product. If you use the [snippet](/docs/getting-started/install?tab=snippet), [JavaScript Web SDK](/docs/libraries/js), or [mobile SDKs](/docs/libraries/ios), PostHog automatically groups events into sessions. We then provide multiple ways to analyze these sessions to get a fuller picture of how users are using your product, where they are spending their time, and more.

## Analyzing sessions with web analytics

The easiest way to analyze session metrics is with [web analytics](https://us.posthog.com/web). The [web analytics dashboard](/docs/web-analytics/dashboard) shows you session metrics like:

- Unique session count
- Average session duration
- Bounce rate

You can use filters to get metrics for sessions that match the filters. For example, sessions that visit a specific page or come from a specific referrer.

## Analyzing sessions with product analytics

Beyond the overview web analytics provides, PostHog's [product analytics](/docs/product-analytics/trends/overview) gives you more flexibility to calculate and visualize session metrics. PostHog includes many session properties you might find useful in your analysis like entry and exit URLs, UTMs, pageview count, autocapture count, screen count, web vital LCP score, and more.

### Time on site

Time on site is another name for session duration. Although you can get this web analytics, you can visualize it in a [trend](/docs/product-analytics/trends/overview).

To do this, first, [create a new insight](https://us.posthog.com/insights/new). Once created, choose pageview as your event, aggregate by property value average of session duration.

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_11_26_at_11_21_06_2x_eb4a013399.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_11_26_at_11_21_20_2x_90e1bd3357.png"
    alt="Time on site" 
    classes="rounded"
/>

To create a trend of average session duration over time, choose your date range and set the Y-axis unit to `Duration (s)`.

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_11_26_at_11_26_55_2x_fab4ab06b6.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_11_26_at_11_26_35_2x_1f5e69c603.png"
    alt="Time on site trend" 
    classes="rounded"
/>

> **Calculating time on page**: Calculating time on page is similar to calculating time on site, but it uses the **previous pageview duration** and **previous pageview pathname** properties. You can learn about this in our [how to calculate time on page](/tutorials/time-on-page) tutorial.

### Average pages per session

Another metric we can calculate with product analytics is the average number of pages per session.

To do this, set up two trend series, one for total pageview count and a second for pageview unique sessions. You can then use the `A/B` formula to calculate the number of pages per session.

> **Tip:** Be sure to set the Y-axis unit in your chart back to `None`.

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_11_26_at_11_35_08_2x_20bea3290f.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_11_26_at_11_35_47_2x_8f91b16f3c.png"
    alt="Pages per session" 
    classes="rounded"
/>

You can filter these series to provide details on sections and funnels on your site. Clicking on the charts will provide a list of the users included in that data. If there is a [session replay](/docs/session-replay) available for that user session, there will be a link for you to go watch it.

## Analyzing sessions with SQL

If trends don't give you the details you need, you can access the raw session data with SQL. It is located in the `sessions` table.

For example, to get the average number of unique URLs per session, you can create a new SQL insight and run the following query:

```sql
select avg($num_uniq_urls) from sessions
```

### Connecting sessions to other data

A big use case for this is combining session data with other event data. Because events have `$session_id` property, we can use a `JOIN` to combine session data with event data.

For example, to get the non-pageview events for sessions with over 5 pageviews, you can run the following query:

```sql
SELECT 
    e.event,
    e.properties.$session_id,
    s.$pageview_count
FROM 
    events e
JOIN 
    sessions s
ON 
    e.properties.$session_id = s.session_id
WHERE 
    s.$pageview_count > 5
    AND e.event != '$pageview'
```

<NewsletterForm />