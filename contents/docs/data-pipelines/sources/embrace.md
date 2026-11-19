---
title: Linking Embrace as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Embrace
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Embrace connector syncs mobile observability data from [Embrace.io](https://embrace.io/) into the PostHog data warehouse, so you can analyze your mobile app metrics alongside your product data.

## Prerequisites

You need an Embrace account with access to the Metrics API. You'll need:

- **Metrics API token** – found in your Embrace dashboard under **Settings > Organization > API**.
- **App ID** – your Embrace application identifier.

## Adding a data source

<SourceSetupIntro />

When linking Embrace, you'll need:

- **Metrics API token** – get this from your Embrace dashboard under **Settings > Organization > API**.

- **App ID** – your Embrace application identifier.

- **Region** – select your Embrace region:
  - **Default** (`api.embrace.io`)
  - **United States (US1)** (`api-us1.embrace.io`)
  - **European Union (EU1)** (`api-eu1.embrace.io`)

<CalloutBox icon="IconWarning" title="Region selection" type="caution">

If you change your region, you'll need to re-enter your API token. Make sure to select the region that matches your Embrace account.

</CalloutBox>

## Sync modes

<SyncModes />

**Important limitations:**

- Imports cover the **latest 30 days** of hourly metrics only. Older data cannot be recovered by this source.
- Data has a **one-hour delay** from Embrace.
- **Incremental syncs** overlap the previous hour and merge by label hash plus timestamp. This retains older imported rows.
- **Full refresh** replaces the entire table with the latest 30 days of data.

## Available tables

| Table         | Description                                                                                | Sync method                 |
| ------------- | ------------------------------------------------------------------------------------------ | --------------------------- |
| `sessions`    | Hourly counts of session parts. Embrace metric names use "sessions" to mean session parts. | Incremental or full refresh |
| `crashes`     | Hourly crash counts for Android and iOS apps.                                              | Incremental or full refresh |
| `network_4xx` | Hourly counts of network errors with HTTP status codes in the 400 range.                   | Incremental or full refresh |
| `network_5xx` | Hourly counts of network errors with HTTP status codes in the 500 range.                   | Incremental or full refresh |

### Table schema

All tables share the same schema:

| Column      | Description                                                                   |
| ----------- | ----------------------------------------------------------------------------- |
| `series_id` | Stable hash of all metric labels, including the metric name.                  |
| `timestamp` | UTC timestamp of the hourly metric sample.                                    |
| `value`     | Metric value for this hour and label combination. Non-finite values are null. |
| `labels`    | Metric labels, including app ID, app version, OS version, and device model.   |

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Authentication error (401):** Your API token was rejected. Get a new Metrics API token from **Settings > Organization > API** in your Embrace dashboard.
- **Access denied (403):** Check that your Metrics API token, app ID, and region are all correct.
- **Missing data:** This source only imports the latest 30 days of data with a one-hour delay.

<TroubleshootingLink />
