---
title: Under the hood
sidebar: Docs
---

There are three types of data sources you can connect to PostHog—connectors we've built, custom sources you can link, and direct sources you can query in real time.

## Connectors

Connectors use a combination of [Temporal](https://temporal.io/) and the open source data loading tool, [dlt](https://dlthub.com/) to sync data from your source to PostHog's storage in S3. You can think of this as a complete extract and load tool where you simply provide the credentials and we will take care of the rest of the data flow.

## Custom sources

The second option are custom sources. With custom sources, each table in the warehouse is backed by one or more files in your object storage system (i.e. S3, GCS). We never "ingest" your data into our systems. Instead, on every query, we'll read directly from your object storage system. This means you can store and query as much data as you want.

This also means data freshness is determined by you. Data is as up-to-date as you set it up to be.

## Direct sources

Direct sources let you query your database in real time without syncing or copying any data into PostHog. On every query, PostHog connects directly to your database and runs the query live.

This is similar to custom sources in that no data is ingested into PostHog's storage, but instead of reading from object storage files, PostHog connects to your database directly.

Currently, Postgres is the only supported direct source.

> **Note:** Data from direct sources can't be joined with PostHog data.