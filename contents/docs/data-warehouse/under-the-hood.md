---
title: Under the hood
sidebar: Docs
---

There are two types of data sources we are able to connect data from—integrations we've built and custom sources you can link.

## Connectors

Connectors use a combination of [Temporal](https://temporal.io/) and the open source data loading tool, [dlt](https://dlthub.com/) to sync data from your source to PostHog's storage in S3. You can think of this as a complete extract and load tool where you simply provide the credentials and we will take care of the rest of the data flow.

## Custom sources

The second option are custom sources. With custom sources, each table in the warehouse is backed by one or more files in your object storage system (i.e. S3, GCS). We never "ingest" your data into our systems. Instead, on every query, we'll read directly from your object storage system. This means you can store and query as much data as you want.

This also means data freshness is determined by you. Data is as up-to-date as you set it up to be.