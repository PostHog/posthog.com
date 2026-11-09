---
title: Under the hood
sidebar: Docs
---

PostHog syncs data from sources into its own storage. This includes integrations with tools and databases, and files in object storage.

## Connectors

Connectors use a combination of [Temporal](https://temporal.io/) and the open source data loading tool, [dlt](https://dlthub.com/) to sync data from your source into PostHog. You provide the credentials and we handle the rest of the data flow. Data is stored in PostHog infrastructure; we do not run your queries inside your Snowflake, BigQuery, or Databricks setup.

## Files in object storage

The [Amazon S3](/docs/data-pipelines/sources/s3), [Google Cloud Storage](/docs/data-pipelines/sources/gcs), [Azure Blob Storage](/docs/data-pipelines/sources/azure-blob), and [Cloudflare R2](/docs/data-pipelines/sources/r2) sources import CSV, JSON Lines, and Parquet files, and Delta Lake tables, from your bucket. Like the other connectors, they copy the data into PostHog's storage on the schedule you choose. Incremental syncs read only new and changed files. You can also [upload a file](/docs/data-pipelines/sources/file-upload) to PostHog.

PostHog no longer reads self-managed tables directly from your bucket on each query. PostHog moved existing self-managed tables into sources. Until you turn on syncing for a moved table, it continues to read your bucket directly.
