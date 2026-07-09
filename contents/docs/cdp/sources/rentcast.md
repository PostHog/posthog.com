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
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The RentCast connector pulls US real estate data — property records, active sale listings, and long-term rental listings — into the PostHog Data warehouse, so you can analyze it alongside your product data.

## Prerequisites

You need a RentCast account with an API key. RentCast is a property-lookup API billed per request.

## Adding a data source

<SourceSetupIntro />

When linking RentCast, you'll need:

- **API key** – create a key under **API dashboard** in [RentCast](https://app.rentcast.io/app/api). The key grants read access to property records and active sale and rental listings.

## Sync modes

<SyncModes />

This source is full refresh only. RentCast does not expose a server-side timestamp filter, so incremental sync is not available.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see a **401 Unauthorized** error, your RentCast API key is invalid or has been revoked. Generate a new key in the [RentCast API dashboard](https://app.rentcast.io/app/api), then reconnect.
- If you see a **403 Forbidden** error, your API key does not have access to the requested data. Check the key's plan and permissions, then reconnect.
- RentCast enforces per-minute rate limits. If syncs are slow or temporarily failing, this is likely due to rate limiting — the connector retries automatically.

<TroubleshootingLink />
