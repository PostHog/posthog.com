---
title: Linking Mezmo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Mezmo
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Mezmo connector (formerly LogDNA) syncs your telemetry pipeline configurations, component alerts, and pipeline health data into the PostHog data warehouse, so you can analyze your observability setup alongside your product data.

## Prerequisites

You need a Mezmo account with access to Telemetry Pipelines. You also need permission to create API keys under **Settings > Organization > API Keys**.

Create a service account and generate an **IAM access key** with read access to pipelines and alerts. If you're using an enterprise key, you also need the **delegated account ID** for the target account.

## Adding a data source

<SourceSetupIntro />

When linking Mezmo, you'll need:

- **IAM access key** – create a service account in Mezmo under **Settings > Organization > API Keys**. The key starts with `sts_` and must have read access to pipelines and alerts.

- **Delegated account ID** (optional) – required only for enterprise keys. Enter the account ID you want to query on behalf of.

## Sync modes

<SyncModes />

All Mezmo tables use **full refresh** sync. Each run reloads all data from the Mezmo API. The Mezmo v3 API doesn't support pagination or server-side time filters, so incremental sync isn't available.

## Available tables

| Table             | Description                                                                                           | Sync method  |
| ----------------- | ----------------------------------------------------------------------------------------------------- | ------------ |
| `pipelines`       | Telemetry pipelines in your Mezmo account.                                                            | Full refresh |
| `alerts`          | Alert configurations attached to pipeline components. These are alert definitions, not alert history. | Full refresh |
| `pipeline_health` | Current source health for active, published pipelines over the default 15-minute interval.            | Full refresh |

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If Mezmo rejects your access key, create a new IAM access key under **Settings > Organization > API Keys** and reconnect.
- If you see a permission error, check that your key has read access to pipelines and alerts. For enterprise keys, verify the delegated account ID is correct.

<TroubleshootingLink />
