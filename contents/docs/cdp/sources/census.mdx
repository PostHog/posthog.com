---
title: Linking Census as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Census
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

The Census source is currently in alpha. It has been tested against Census's API documentation but not yet battle-tested with live production workloads. If you run into issues, please let us know.

</CalloutBox>

The Census (Fivetran) connector syncs your reverse-ETL workspace metadata into PostHog, including syncs, sync runs, sources, and destinations.

## Adding a data source

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.

2. Click **+ New source** and select **Census (Fivetran)** by clicking the **Link** button.

3. Select your **Workspace region** from the dropdown:

| Label | Connects to            |
| ----- | ---------------------- |
| US    | `app.getcensus.com`    |
| EU    | `app-eu.getcensus.com` |

4. Enter your **API access token**. This comes from your Census workspace settings (see [Getting your API access token](#getting-your-api-access-token) below).

5. Click **Next**.

6. Select the tables you want to import, set the sync method and frequency, then click **Import**.

The data warehouse then starts syncing your Census data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Getting your API access token

To connect Census to PostHog, you need a workspace API access token:

1. Log in to your Census workspace at [app.getcensus.com](https://app.getcensus.com) (or [app-eu.getcensus.com](https://app-eu.getcensus.com) for EU).

2. Go to **Workspace settings** > **API Access**.

3. Click **Create new token** (or use an existing one with appropriate permissions).

4. Copy the token – you'll need it when linking the source in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync modes

All Census tables use full refresh. Census's API does not expose a server-side filter for update time, so incremental syncing is not available.

| Table          | Sync method  |
| -------------- | ------------ |
| `syncs`        | Full refresh |
| `sync_runs`    | Full refresh |
| `sources`      | Full refresh |
| `destinations` | Full refresh |

**Full refresh** syncs reload all data on each run.

## Available tables

| Table          | Description                                                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `syncs`        | Census sync configurations that move data from a source model to a destination object, including schedule, field mappings, and alerting. |
| `sync_runs`    | Execution records of Census syncs, including status, timing, and per-run record counts.                                                  |
| `sources`      | Data sources connected to Census – warehouses or databases that Census reads from.                                                       |
| `destinations` | Destinations connected to Census – SaaS tools or warehouses that Census writes to.                                                       |

<CalloutBox icon="IconInfo" title="Sensitive fields are stripped" type="fyi">

The `connection_details` field is automatically removed from the `sources` and `destinations` tables. This field contains warehouse account identifiers (account name, user, warehouse name) that shouldn't be accessible to all project members.

</CalloutBox>
