---
title: Linking Imagga as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Imagga
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Imagga connector syncs usage, daily usage, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Your Imagga account needs to be able to create API credentials, and those credentials need access to the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Imagga API credentials to pull your account's usage statistics.

Find your API key and secret in the [Imagga dashboard](https://imagga.com/profile/dashboard).

Imagga is an on-demand image-recognition API, so the only account data available to sync is your API consumption (from `GET /usage`): the current billing-period request counters, your monthly limit, and per-day usage.

You'll be asked for:

- **API key**: for example `acc_...`.
- **API secret**

## Sync modes

<SyncModes />

All Imagga tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one in Imagga and reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions in Imagga, then reconnect the source.

<TroubleshootingLink />
