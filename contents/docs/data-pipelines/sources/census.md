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

The Census (Fivetran) connector syncs your reverse-ETL workspace metadata into PostHog, including syncs, sync runs, sources, destinations, and datasets. New sources use the Fivetran Activations API V2, which requires an Activations personal access token.

<CalloutBox icon="IconWarning" title="Activations API V1 retiring on January 15, 2027" type="caution">

Fivetran is retiring the Activations API V1 on January 15, 2027. Existing V1 sources continue to work until then, but you should migrate to V2 before the sunset. To migrate, create an Activations personal access token in your Fivetran user settings and set up a new Census source in PostHog with it.

</CalloutBox>

## Adding a data source

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.

2. Click **+ New source** and select **Census (Fivetran)** by clicking the **Link** button.

3. Select your **Workspace region** from the dropdown:

| Label | Connects to            |
| ----- | ---------------------- |
| US    | `app.getcensus.com`    |
| EU    | `app-eu.getcensus.com` |

4. Enter your **API access token**. New sources require an Activations personal access token (see [Getting your API access token](#getting-your-api-access-token) below).

5. Click **Next**.

6. Select the tables you want to import, set the sync method and frequency, then click **Import**.

The data warehouse then starts syncing your Census data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Getting your API access token

New Census sources use the Activations API V2, which requires an Activations personal access token:

1. Log in to your Fivetran account.

2. Go to your Activations **User settings** > **Personal access tokens**.

3. Create a new personal access token.

4. Copy the token – you'll need it when linking the source in PostHog.

Activations personal access tokens are separate from Fivetran API keys and Fivetran personal access tokens.

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
| `datasets`     | Full refresh |
| `workspaces`   | Full refresh |

**Full refresh** syncs reload all data on each run.

## Available tables

| Table          | Description                                                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `syncs`        | Census sync configurations that move data from a source model to a destination object, including schedule, field mappings, and alerting. |
| `sync_runs`    | Execution records of Census syncs, including status, timing, and per-run record counts.                                                  |
| `sources`      | Data sources connected to Census – warehouses or databases that Census reads from.                                                       |
| `destinations` | Destinations connected to Census – SaaS tools or warehouses that Census writes to.                                                       |
| `datasets`     | Datasets configured in Census.                                                                                                           |
| `workspaces`   | Workspaces in your Census organization. Only available on legacy V1 sources – V2 does not include this table.                            |

<CalloutBox icon="IconInfo" title="Sensitive fields are stripped" type="fyi">

The `connection_details` field is automatically removed from the `sources` and `destinations` tables. This field contains warehouse account identifiers (account name, user, warehouse name) that shouldn't be accessible to all project members.

On V2 sources, the `notification_emails` and `storage_backend` fields are also removed from the `sources` table.

</CalloutBox>
