---
title: Linking VWO as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: VWO
---

The VWO connector syncs your A/B testing and experimentation data — campaigns, feature flags, goals, variations, and more — into the PostHog data warehouse. [VWO](https://vwo.com/) (Visual Website Optimizer) by Wingify is a conversion optimization platform for running experiments and personalizing experiences.

## Prerequisites

You need:

- A VWO account with API access
- An API token with **Browse** permissions
- Your numeric workspace ID

## Creating an API token

1. Sign in to VWO at [app.wingify.com](https://app.wingify.com).
2. Go to **Developers** > **Tokens** or visit [app.wingify.com/#/developers/tokens](https://app.wingify.com/#/developers/tokens).
3. Click **Create Token** and give it a descriptive name.
4. Select **Browse** permissions for the workspace and tables you want to import.
5. Copy the token value.

## Finding your workspace ID

Your workspace ID is the numeric identifier for the VWO workspace you want to import. Find it in your VWO account settings.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to VWO.
3. Enter your **API token** and **Workspace ID**.
4. Click **Next**.
5. Select the tables you want to sync and configure sync frequency.
6. Click **Import**.

Once the syncs are complete, you can start using VWO data in PostHog.

## Available tables

| Table               | Description                                                   | Sync method  |
| ------------------- | ------------------------------------------------------------- | ------------ |
| `accounts`          | The VWO workspace selected for this connection                | Full refresh |
| `campaigns`         | Experiments and campaigns in the workspace                    | Full refresh |
| `campaign_sections` | Page sections used by campaigns, with their nested variations | Full refresh |
| `feature_flags`     | Feature flags including variables and variations              | Full refresh |
| `goals`             | Conversion goals configured for campaigns                     | Full refresh |
| `metric_reports`    | Insights metric reports including goals and time intervals    | Full refresh |
| `variations`        | Variations configured for campaigns                           | Full refresh |
| `websites`          | Websites registered in the workspace                          | Full refresh |

**Full refresh** tables reload all data on each sync.

## Sync limitations

All VWO tables are full refresh only. The VWO API doesn't expose server-side timestamp filters, so each sync reloads the full collection. Each connection imports data from one workspace.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
