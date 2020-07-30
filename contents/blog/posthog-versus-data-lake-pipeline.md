---
date: 2020-07-30
title: PostHog versus data lakes/pipelines and BI tools
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
---

PostHog is a *lot* simpler.

## Options for self-hosted product analytics

| Feature | PostHog | Data pipeline, lake and BI tools |
| --- | --- | --- |
| User data stays on your infrastructure | Yes | Yes |
| No vendor lock in | Yes | Yes |
| Full access to the database | Yes | Yes |
| Full API access | Yes | Yes |
| Minimal configuration | Yes | No |
| No need for SQL  | Yes | No |
| Just 1 tool needed? | Yes | No |
| Automatic event capture | Yes | No |
| Suitable for Product Managers out of box | Yes | No |

## Product analytics without using PostHog

To host your own product analytics stack, you would need to build a data pipeline, which would feed into a data lake. You then need to set up a business intelligence (BI) tool to create useful dashboards.

What would each of these products do?

### Data pipeline

This captures event data from your application or website.

The most popular open source option is [Snowplow](https://github.com/snowplow/snowplow).

### Data lakes

Data lakes let you import any amount of data in real-time, storing it in its original format. They are an inexpensive way to scale a massive amoutn of data. The data can be structured, unstructured, or semi-structured.

The three most popular options are: [Amazon Redshift](https://aws.amazon.com/redshift/features/), [Google BigQuery](https://cloud.google.com/bigquery) and [Snowflake](https://www.snowflake.com/product/).

These do not provide any value on their own. 

### BI tools

These enable your team to create visualizations.

The most popular open source option 

## Product analytics with PostHog

You can immediately start capturing and storing event data, then visualizing user behavior with PostHog.