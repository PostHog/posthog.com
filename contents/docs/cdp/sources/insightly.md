---
title: Linking Insightly as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Insightly
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Insightly connector syncs contacts, organisations, opportunities, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Insightly API key to sync your Insightly CRM data.

Find your **API key** and your **API URL** in Insightly under **User Settings** (top-right profile menu). The API URL looks like `https://api.na1.insightly.com/v3.1` - the **pod** is the region token in the middle (`na1`, `eu1`,...). Enter just that token, or paste the full API URL.

The API key inherits your Insightly user's permissions, so make sure your user can access the data you want to sync.

You'll be asked for:

- **Pod (instance)**: for example `na1`.
- **API key**

## Sync modes

<SyncModes />

Some Insightly tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
