---
title: Linking Unleash as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Unleash
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Unleash connector syncs features, projects, environments, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Unleash instance URL and an Admin API token to sync your feature flags, projects, environments, strategies, segments, and other configuration data.

The instance URL is where you open the Unleash UI - for Unleash cloud it includes your instance name (e.g. `https://us.app.unleash-hosted.com/your-instance`); for self-hosted it's your server's URL. The token is a personal access token or, on Enterprise, a [service account token](https://docs.getunleash.io/reference/service-accounts); it inherits the owner's permissions, and the `users` table additionally requires the Admin root role. The `features`, `feature_strategies`, and `feature_metrics` tables use the flag search API, which requires Unleash 5.12 or newer.

You'll be asked for:

- **Instance URL**: for example `https://us.app.unleash-hosted.com/your-instance`.
- **API token**

## Sync modes

<SyncModes />

The `events` audit log supports incremental sync on `createdAt`, and `feature_metrics` supports incremental sync on `timestamp`. Both also support full refresh, but not append-only sync. All other tables, including `feature_strategies`, are full refresh only.

The `feature_strategies` table contains one row per strategy per feature environment. The `feature_metrics` table contains hourly evaluation counts per feature, SDK application, and environment. Unleash retains raw metrics for 48 hours. Sync metrics incrementally at least every 48 hours to keep the history; each run reads the available window again and merges updated counts.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
