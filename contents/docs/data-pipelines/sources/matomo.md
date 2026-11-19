---
title: Linking Matomo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Matomo
---

Connect your Matomo instance to pull web analytics data into the PostHog data warehouse. Works with both Matomo Cloud and self-hosted instances.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Matomo.
3. Enter your **Instance URL** – for example, `https://myorg.matomo.cloud` for Matomo Cloud or your self-hosted URL.
4. Enter your **Site ID** – the numeric ID for the site you want to import. You can find this in your Matomo instance under **Administration > Measurables/Websites > Manage**.
5. Create an API token in Matomo under **Administration > Personal > Security > Auth tokens** and paste it into the **API token** field.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can query your Matomo data in PostHog.

## Available tables

| Table               | Description                                               | Sync method  |
| ------------------- | --------------------------------------------------------- | ------------ |
| `visits`            | Raw visit log with visitor details, actions, and metadata | Incremental  |
| `visits_summary`    | Per-day aggregate visit statistics                        | Incremental  |
| `actions_summary`   | Per-day aggregate action statistics                       | Incremental  |
| `goals_summary`     | Per-day aggregate goal conversion metrics                 | Incremental  |
| `pages`             | Per-day page URL breakdown                                | Incremental  |
| `entry_pages`       | Per-day entry page URL breakdown                          | Incremental  |
| `exit_pages`        | Per-day exit page URL breakdown                           | Incremental  |
| `referrers`         | Per-day referrer breakdown                                | Incremental  |
| `referrer_types`    | Per-day channel type breakdown                            | Incremental  |
| `search_engines`    | Per-day search engine breakdown                           | Incremental  |
| `referrer_websites` | Per-day referring website breakdown                       | Incremental  |
| `social_networks`   | Per-day social network breakdown                          | Incremental  |
| `device_types`      | Per-day device type breakdown                             | Incremental  |
| `browsers`          | Per-day browser breakdown                                 | Incremental  |
| `os_families`       | Per-day operating system family breakdown                 | Incremental  |
| `countries`         | Per-day visitor country breakdown                         | Incremental  |
| `event_categories`  | Per-day event breakdown by category                       | Incremental  |
| `event_actions`     | Per-day event breakdown by action                         | Incremental  |
| `event_names`       | Per-day event breakdown by name                           | Incremental  |
| `campaign_names`    | Per-day campaign name breakdown                           | Incremental  |
| `campaign_sources`  | Per-day campaign source breakdown                         | Incremental  |
| `campaign_mediums`  | Per-day campaign medium breakdown                         | Incremental  |
| `goals`             | Goal definitions lookup table                             | Full refresh |

**Incremental** tables sync only new or updated records on each run.

**Full refresh** tables are re-synced entirely on each run.

> **Note:** The `campaign_names`, `campaign_sources`, and `campaign_mediums` tables require the [MarketingCampaignsReporting plugin](https://plugins.matomo.org/MarketingCampaignsReporting) to be installed on your Matomo instance. If the plugin is not installed, syncs for these tables will fail with an API error.

## Sync details

- The first sync backfills up to 365 days of history for all date-based tables.
- The `visits` table uses `serverTimestamp` as its incremental cursor. Visits newer than one hour are deferred to the next sync to ensure their action lists are complete before storing.
- Aggregate report tables (`visits_summary`, `actions_summary`, `referrers`, `countries`, `pages`, `entry_pages`, `exit_pages`, `goals_summary`, `referrer_types`, `search_engines`, `referrer_websites`, `social_networks`, `device_types`, `browsers`, `os_families`, `event_categories`, `event_actions`, `event_names`, `campaign_names`, `campaign_sources`, `campaign_mediums`) walk one day at a time and re-pull a 3-day trailing window on incremental runs to account for late archiving. Records are merged on `_date` (and `label` where applicable).
- The `goals` table is a small lookup table containing goal definitions. It has no date dimension and is fully refreshed on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
