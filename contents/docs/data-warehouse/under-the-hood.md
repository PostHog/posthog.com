---
title: Under the hood
sidebar: Docs
---

There are two types of data sources we are able to connect data from—integrations we've built and custom sources you can link.

## Connectors

Connectors use a combination of [Temporal](https://temporal.io/) and the open source data loading tool, [dlt](https://dlthub.com/) to sync data from your source into PostHog. You provide the credentials and we handle the rest of the data flow. Data is stored in PostHog infrastructure; we do not run your queries inside your Snowflake, BigQuery, or Databricks setup.

## Custom sources

The second option are custom sources. With custom sources, each table in the warehouse is backed by one or more files in your object storage system (i.e. S3, GCS). We don't copy that data into PostHog's storage—we read from your object storage when you run a query. **Queries still execute in PostHog** (on our compute); we don't run them inside your warehouse or storage. So you can keep raw data in your infrastructure while PostHog runs SQL over it. That means you can store and query as much data as you want, and data freshness is determined by you—as up-to-date as you set it up to be.
