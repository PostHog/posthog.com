---
title: Linking Elasticsearch as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Elasticsearch
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Elasticsearch connector syncs index data from your Elasticsearch cluster into the PostHog data warehouse. Each non-system index in your cluster becomes a separate table you can query alongside your PostHog data.

## Available tables

Tables are dynamically discovered from your Elasticsearch cluster rather than being predefined. When you connect a cluster, PostHog lists all non-system indices — system indices (those starting with `.` like `.kibana`) are filtered out.

For each index:

- The Elasticsearch `_id` field becomes the primary key
- All fields from `_source` become columns

## Linking Elasticsearch

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and the sources tab in PostHog.
2. Click **New source** and select **Elasticsearch**.
3. Enter your Elasticsearch cluster URL (e.g., `https://my-deployment.es.us-east-1.aws.found.io:9243`). If you omit the scheme, `https://` is used by default.
4. Choose your authentication method:
   - **Username and password** – enter your Elasticsearch username and password.
   - **API key** – enter your Elasticsearch API key.
5. _Optional:_ Add a prefix to your table names.
6. Click **Next**, select the indices to sync, then click **Link**.

The data warehouse then starts syncing your Elasticsearch data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Authentication

Elasticsearch supports two authentication methods:

- **Username and password** – uses HTTP basic authentication against your Elasticsearch cluster.
- **API key** – uses the `Authorization: ApiKey` header for token-based authentication.

The account or API key needs **read** access to the indices you want to sync.

## Sync method

Elasticsearch uses **full refresh** sync only. Each sync re-reads the entire index because generic Elasticsearch indices don't have a reliable timestamp field to use as a cursor for incremental sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
