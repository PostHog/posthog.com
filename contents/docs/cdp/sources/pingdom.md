---
title: Linking Pingdom as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Pingdom
---

The Pingdom connector syncs your uptime monitoring data into PostHog, including checks, probes, maintenance windows, and alerts.

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in alpha. Endpoint behavior was verified against Pingdom's public API 3.1 documentation but hasn't been tested against every edge case in production. If you run into issues, please let us know.

</CalloutBox>

## Creating a Pingdom API token

Pingdom uses Bearer token authentication. A read-only token is sufficient for syncing data into PostHog.

1. Log in to [My Pingdom](https://my.pingdom.com/app/api-tokens).
2. Go to **Settings** > **Pingdom API**.
3. Click **Add API token**, give it a name, and select read access.
4. Copy the token.

For more details, see [Pingdom's API documentation](https://docs.pingdom.com/api/).

## Linking Pingdom

1. Go to the [Data pipeline sources page](https://app.posthog.com/data-management/sources) in PostHog.
2. Click **+ New source** and then click **Link** next to Pingdom.
3. Paste your Pingdom **API token**.
4. Click **Next**, choose the tables you want to sync, and then click **Import**.

Once the sync completes, you can query your Pingdom data directly in PostHog.

## Configuration

<SourceParameters />

## Sync modes

Pingdom tables use different sync strategies depending on whether the Pingdom API supports filtering by time:

- **Full refresh** - The `checks`, `probes`, and `maintenance` tables are re-downloaded on every sync. These are small dimension tables and the Pingdom API doesn't expose an "updated since" filter for them.
- **Incremental** - The `alerts` table supports incremental syncing. PostHog uses the `from` UNIX timestamp filter on the `/actions` endpoint to only fetch alerts newer than the last sync.

## Available datasets and endpoints

| Dataset       | Endpoint path  | Sync mode    | Primary key                        |
| ------------- | -------------- | ------------ | ---------------------------------- |
| `checks`      | `/checks`      | Full refresh | `id`                               |
| `probes`      | `/probes`      | Full refresh | `id`                               |
| `maintenance` | `/maintenance` | Full refresh | `id`                               |
| `alerts`      | `/actions`     | Incremental  | `checkid`, `time`, `userid`, `via` |

All endpoints use the Pingdom API 3.1 (`api.pingdom.com/api/3.1`).

The `alerts` table uses a composite primary key because individual alert rows don't have a unique identifier. Duplicate rows with the same key combination are tolerated by the pipeline.
