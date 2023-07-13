---
title: Data warehouse (beta)
sidebar: Docs
showTitle: true
availability:
    free: full
    selfServe: full
    enterprise: full
---

The PostHog data warehouse gives you a place to put all of your most important data, query across these datasets, and combine it with the product analytics data already in PostHog. Powered by Clickhouse, the data warehouse enables you to query across big datasets quickly. 

Data warehouse is currently in **private beta**. This means we're inviting a select number of people to try this product out. If you want to give this a go, click the "Get support" button in the top right, select "Data Warehouse" as the area, and ask to be added to the beta.

## How does it work?

Each table in the warehouse is backed by one or more files in your object storage system (i.e. S3, GCS). We never "ingest" your data into our systems. Instead, on every query, we'll read directly from your object storage system. This means you can query as much data as you want. We'll only charge you for the data we actually query.

> Data warehouse is free to use while in private beta. After that, you'll be charged for each GB of data read while querying.

To get started, follow the [setup instructions](/docs/data-warehouse/setup).

## Roadmap

We're actively developing the data warehouse. You can follow along and comment on our roadmap [here](https://github.com/orgs/PostHog/projects/84/views/6).
