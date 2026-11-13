---
title: Linking Wistia as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Wistia
---

The Wistia connector syncs your Wistia video data — media, folders, channels, webinars, and viewer stats — into the PostHog data warehouse.

## Prerequisites

You need a Wistia account with owner access, since only account owners can create API tokens.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Wistia.
3. In your Wistia account, go to the [API page in your account settings](https://account.wistia.com/account/api) and create an API token. Grant the following permissions:
   - **Read all folder and media data** for media, folders, subfolders, captions, channels, and channel episodes
   - **Read all data** for tags and webinars
   - **Read detailed stats** for visitors, events, media stats, and account stats
4. Back in PostHog, enter your API token, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Wistia data in PostHog.

## Available tables

| Table                   | Description                                                                  | Sync method  |
| ----------------------- | ---------------------------------------------------------------------------- | ------------ |
| `medias`                | Videos, audio files, and other media uploaded to the account                 | Full refresh |
| `folders`               | Folders (previously called projects) that organize media                     | Full refresh |
| `subfolders`            | Subfolders inside each folder, used to group media                           | Full refresh |
| `tags`                  | Tags used to label media                                                     | Full refresh |
| `captions`              | Caption tracks of each media, one row per language                           | Full refresh |
| `channels`              | Channels that present media and webinars as a series                         | Full refresh |
| `channel_episodes`      | Episodes within channels, linking a channel to a media or webinar            | Full refresh |
| `webinars`              | Webinars in the account (requires a Wistia plan with webinar support)        | Full refresh |
| `visitors`              | People who loaded or played videos                                           | Full refresh |
| `events`                | Viewing sessions — one row each time a visitor watches a video               | Incremental  |
| `media_stats`           | Lifetime viewing stats per media (one API request per media, off by default) | Full refresh |
| `account_stats_by_date` | Account-wide viewing stats, one row per day                                  | Incremental  |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Tables off by default

The following tables are disabled by default and can be turned on when creating or editing your source:

- **`webinars`** — Requires a Wistia plan that includes webinars. If your plan doesn't support them, syncing this table returns a 403 permission error.
- **`media_stats`** — Makes one API request for every media file in your account. Disabled by default to avoid high API usage on accounts with many videos.

## Sync limitations

- Wistia retains viewing events for 2 years. The `events` table cannot sync data older than that.
- The `events` and `account_stats_by_date` incremental filters work at the day level. Rows from the watermark day are re-read on each sync and merged to avoid duplicates.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Authorization error (401):** Your API token is invalid, has been revoked, or doesn't have the permission this table needs. Create a new token or update its permissions in your [Wistia account settings](https://account.wistia.com/account/api), then reconnect.
- **Forbidden error (403):** Your Wistia plan doesn't include the data in this table (for example, webinars). Turn off the table or upgrade your Wistia plan.
