---
title: Under the hood
sidebar: Docs
---

## Custom sources

With custom sources, each table in the warehouse is backed by one or more files in your object storage system (i.e. S3, GCS). We never "ingest" your data into our systems. Instead, on every query, we'll read directly from your object storage system. This means you can store and query as much data as you want.

This also means data freshness is determined by you. Data is as up-to-date as you set it up to be.

## Connectors

Connectors use a combination of Temporal and [dlt](https://dlthub.com/) to sync data from your source to PostHog's storage in S3.  