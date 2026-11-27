---
title: Linking Simplecast as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SimpleCast
---

Sync your Simplecast podcast data into the PostHog Data Warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Simplecast.
3. Create an API token on the **Private Apps** page in [Simplecast](https://dashboard.simplecast.com). The token grants read access to the podcasts your account can see.
4. Back in PostHog, enter your API token, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Simplecast data in PostHog.

## Available tables

| Table               | Description                                                      | Sync method  |
| ------------------- | ---------------------------------------------------------------- | ------------ |
| `podcasts`          | Podcasts (shows) hosted on Simplecast that your token can access | Full refresh |
| `episodes`          | Episodes of a podcast, in any status                             | Full refresh |
| `downloads`         | Daily download counts per podcast                                | Full refresh |
| `listeners`         | Daily unique listener counts per podcast                         | Full refresh |
| `episode_downloads` | All-time download totals per episode                             | Full refresh |
| `episode_listeners` | All-time unique listener totals per episode                      | Full refresh |
| `seasons`           | A season of a Simplecast podcast. Join it to episodes on the podcast ID and the season number | Full refresh |
| `locations`         | All-time downloads of a Simplecast podcast by listener country, one row per podcast and country | Full refresh |
| `distribution_channels` | A platform that Simplecast can distribute podcasts to, such as Apple Podcasts or Spotify | Full refresh |
| `podcast_distribution_channels` | A distribution channel that was added to a Simplecast podcast, with the podcast's URL on that platform | Full refresh |
| `technology_applications` | All-time downloads of a Simplecast podcast by listening application, one row per podcast and value | Full refresh |
| `technology_browsers` | All-time downloads of a Simplecast podcast by web browser, one row per podcast and value | Full refresh |
| `technology_devices` | All-time downloads of a Simplecast podcast by device model, one row per podcast and value | Full refresh |
| `technology_device_class` | All-time downloads of a Simplecast podcast by device type (for example phone, desktop, or smart speaker), one row per podcast and value | Full refresh |
| `technology_listening_methods` | All-time downloads of a Simplecast podcast by listening method, one row per podcast and value | Full refresh |
| `technology_network_types` | All-time downloads of a Simplecast podcast by network type, one row per podcast and value | Full refresh |
| `technology_operating_systems` | All-time downloads of a Simplecast podcast by operating system, one row per podcast and value | Full refresh |
| `technology_providers` | All-time downloads of a Simplecast podcast by network provider, one row per podcast and value | Full refresh |
| `technology_web_players` | All-time downloads of a Simplecast podcast by web player, one row per podcast and value | Full refresh |

**Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
