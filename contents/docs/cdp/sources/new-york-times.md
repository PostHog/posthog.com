---
title: Linking New York Times as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: NewYorkTimes
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The New York Times connector syncs article search, most popular viewed, most popular emailed, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your New York Times API key to pull New York Times content.

Create a free developer account and register an app at the [NYT Developer Network](https://developer.nytimes.com/), then enable the APIs you want to sync (Article Search, Most Popular, Top Stories) on your app to get an API key.

Note: NYT enforces tight rate limits (≈10 requests/minute, 4,000/day), so syncs - especially Article Search - are intentionally throttled.

You'll be asked for:

- **API key**

## Sync modes

<SyncModes />

Some New York Times tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
