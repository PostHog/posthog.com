---
title: Linking Cloudbeds as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Cloudbeds
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Cloudbeds connector syncs hotels, reservations, guests, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Cloudbeds API key to pull your properties, reservations, guests, rooms, room types, and transactions.

You can create an API key under **Settings → API credentials** in [Cloudbeds](https://hotels.cloudbeds.com). Note that Cloudbeds API keys expire after 30 days of inactivity, so a key that has not been used recently may need to be regenerated.

If your account manages multiple properties, enter the ID of the property you want to sync - group-level credentials require it to scope reads to a single property.

You'll be asked for:

- **API key**

## Sync modes

<SyncModes />

All Cloudbeds tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
