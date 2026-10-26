---
title: Linking RentCast as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: RentCast
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The RentCast connector pulls US real estate data — property records, active sale listings, long-term rental listings, and ZIP-level market statistics — into the PostHog Data warehouse, so you can analyze it alongside your product data.

## Prerequisites

You need a RentCast account with an API key. RentCast is a property-lookup API billed per request.

## Adding a data source

<SourceSetupIntro />

When linking RentCast, you'll need:

- **API key** – create a key under **API dashboard** in [RentCast](https://app.rentcast.io/app/api). The key grants read access to property records, active sale and rental listings, and market statistics.
- **ZIP codes for market statistics** _(optional)_ – a comma-separated list of 5-digit US ZIP codes (e.g. `29611, 78701`). Only needed if you want to sync the `markets` table. Each ZIP code uses one RentCast API request per sync.

## Sync modes

<SyncModes />

This source is full refresh only. RentCast does not expose a server-side timestamp filter, so incremental sync is not available.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
<SourceTables />

## Markets table

The `markets` table provides sale and rental statistics for the ZIP codes you configure. Unlike the other tables, it requires at least one ZIP code to sync — if no ZIP codes are set, the table is disabled by default.

Each ZIP code makes one API request per sync. If RentCast has no data for a particular ZIP code, that ZIP code is skipped and the sync continues.

## Troubleshooting

- If you see a **401 Unauthorized** error, your RentCast API key is invalid or has been revoked. Generate a new key in the [RentCast API dashboard](https://app.rentcast.io/app/api), then reconnect.
- If you see a **403 Forbidden** error, your API key does not have access to the requested data. Check the key's plan and permissions, then reconnect.
- RentCast enforces per-minute rate limits. If syncs are slow or temporarily failing, this is likely due to rate limiting — the connector retries automatically.
- If you see **"The RentCast markets table needs at least one ZIP code"**, add at least one 5-digit US ZIP code to the source settings.
- If you see **"RentCast ZIP codes must be 5-digit US ZIP codes"**, check that each ZIP code is exactly 5 digits and entries are comma-separated.

<TroubleshootingLink />
