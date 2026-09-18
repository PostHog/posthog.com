---
title: Linking CloudZero as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CloudZero
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

> **Note:** This source is in **alpha**. It's fully functional but has not yet been tested against a wide range of CloudZero accounts.

The CloudZero connector syncs your cloud cost intelligence data – costs and dimensions – into PostHog, so you can analyze cloud spend alongside your product data.

## Prerequisites

You need a [CloudZero](https://www.cloudzero.com/) account and an API key with the following scopes:

- `billing:read_costs`
- `billing:read_dimensions`

To create an API key, go to **Settings > API Keys** in your CloudZero dashboard.

## Adding a data source

<SourceSetupIntro />

When linking CloudZero, you'll need:

- **API key** – a CloudZero API key with the `billing:read_costs` and `billing:read_dimensions` scopes. Create one under **Settings > API Keys** in your CloudZero dashboard.
- **Granularity** – how to bucket cost data. Options: `hourly`, `daily` (default), `weekly`, `monthly`, `yearly`.
- **Cost type** – which cost metric to sync. Options: `billed_cost`, `discounted_cost`, `amortized_cost`, `discounted_amortized_cost`, `real_cost` (default), `on_demand_cost`, `invoiced_amortized_cost`, `usage_amount`.
- **Group costs by dimensions** (optional) – a comma-separated list of CloudZero dimension IDs to break costs down by (e.g. `service,account`). When set, each unique combination of dimensions produces its own row. You can find available dimension IDs by syncing the **Dimensions** table.

## Sync modes

<SyncModes />

The **Costs** table supports incremental sync using the `usage_date` field. A built-in 7-day lookback window automatically re-syncs recent data on each run to capture any cost restatements CloudZero applies after the fact.

The **Dimensions** table only supports full table refresh because the CloudZero API does not expose a reliable timestamp filter for dimensions.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### Sync failing with a 403 or "Unauthorized" error

Your API key is invalid or missing the required scopes. Verify the key in **Settings > API Keys** in your CloudZero dashboard and confirm it has the `billing:read_costs` and `billing:read_dimensions` scopes.

### Sync failing with a 410 "Gone" error

CloudZero caches paginated query results for 24 hours. If a sync takes longer than that, the cache expires and you'll see a 410 error. Retry the sync to start a fresh query.

<TroubleshootingLink />
