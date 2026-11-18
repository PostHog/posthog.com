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

Sync your Simplecast podcast data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Simplecast.
3. Create an API token on the **Private Apps** page in [Simplecast](https://dashboard.simplecast.com). The token grants read access to the podcasts your account can see.
4. Back in PostHog, enter your API token, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Simplecast data in PostHog.

## Available tables

| Table                           | Description                                                                             | Sync method  |
| ------------------------------- | --------------------------------------------------------------------------------------- | ------------ |
| `podcasts`                      | Podcasts (shows) hosted on Simplecast that your token can access                        | Full refresh |
| `episodes`                      | Episodes of a podcast, in any status                                                    | Full refresh |
| `downloads`                     | Daily download counts per podcast                                                       | Full refresh |
| `listeners`                     | Daily unique listener counts per podcast                                                | Full refresh |
| `episode_downloads`             | All-time download totals per episode                                                    | Full refresh |
| `episode_listeners`             | All-time unique listener totals per episode                                             | Full refresh |
| `seasons`                       | Seasons of a podcast                                                                    | Full refresh |
| `locations`                     | All-time downloads per podcast by listener country                                      | Full refresh |
| `distribution_channels`         | Platforms that Simplecast can distribute podcasts to, such as Apple Podcasts or Spotify | Full refresh |
| `podcast_distribution_channels` | Distribution channels added to a podcast, with the podcast's URL on each platform       | Full refresh |
| `technology_applications`       | All-time downloads per podcast by listening application                                 | Full refresh |
| `technology_browsers`           | All-time downloads per podcast by web browser                                           | Full refresh |
| `technology_devices`            | All-time downloads per podcast by device model                                          | Full refresh |
| `technology_device_class`       | All-time downloads per podcast by device type, such as phone, desktop, or smart speaker | Full refresh |
| `technology_listening_methods`  | All-time downloads per podcast by listening method                                      | Full refresh |
| `technology_network_types`      | All-time downloads per podcast by network type                                          | Full refresh |
| `technology_operating_systems`  | All-time downloads per podcast by operating system                                      | Full refresh |
| `technology_providers`          | All-time downloads per podcast by network provider                                      | Full refresh |
| `technology_web_players`        | All-time downloads per podcast by web player                                            | Full refresh |

**Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
