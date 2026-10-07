---
title: Linking Lodgify as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Lodgify
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Lodgify connector syncs properties, bookings, and rooms from your Lodgify vacation rental account into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

A Lodgify account with API access enabled. You need an API key from your Lodgify dashboard – read access is enough for syncing data.

## Adding a data source

<SourceSetupIntro />

Enter your Lodgify API key to connect your account.

To generate an API key:

1. Log in to your Lodgify dashboard.
2. Go to **Settings** > **Public API**.
3. Copy the API key.

Back in PostHog, paste the API key and click **Next**. Select the tables you want to sync, choose a sync method and frequency, then click **Import**.

## Sync modes

<SyncModes />

The `properties` and `bookings` tables support incremental syncing using `updated_at` as the replication key. The `rooms` table only supports full refresh because the Lodgify API does not provide a time-based filter for rooms.

To remove deleted properties from an incrementally synced table, run a full refresh sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is incorrect or has been revoked. Copy a new key from **Settings** > **Public API** in your Lodgify dashboard, then reconnect the source.

- If the connection fails with a permission error, your Lodgify account may not have API access enabled. Check your account's API access settings and reconnect.

<TroubleshootingLink />
