---
title: Linking TrafficStars as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TrafficStars
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The TrafficStars connector syncs your advertiser data into the PostHog data warehouse: campaigns, creatives and daily campaign statistics. Use it to compare ad spend and conversions with what those users do in your product.

## Prerequisites

You need a TrafficStars advertiser account.

## Adding a data source

<SourceSetupIntro />

This source needs one credential:

- **API key** – In the TrafficStars admin panel, open your [profile page](https://admin.trafficstars.com/profile/) and generate an API key.

## Sync modes

<SyncModes />

- `campaign_statistics_daily` supports incremental sync on `date`. Each sync re-reads the last 7 days to pick up late conversions.
- `campaigns` and `creatives` use full refresh. `campaigns` covers campaigns that are not archived.

The first sync of `campaign_statistics_daily` reads the last 180 days. A full refresh reads again from the day the first sync started, so it keeps every day synced since then.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### The source fails with an authentication error

TrafficStars rejected the API key. Generate a new key on your profile page and update the source.

### The source fails with a 403 error

The API key belongs to an account that can't read advertiser data. Use an API key from an advertiser account.

<TroubleshootingLink />
