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

The New York Times connector syncs New York Times content – article search results, most popular articles, and top stories – into PostHog.

## Prerequisites

You need a free New York Times developer account with a registered app. When registering your app, enable the APIs you want to sync (Article Search, Most Popular, Top Stories) to receive an API key. Note that NYT enforces tight rate limits (approximately 10 requests/minute, 4,000/day), so syncs – especially Article Search – are intentionally throttled.

## Adding a data source

<SourceSetupIntro />

When linking New York Times, you'll need:

- **API key** – create a free developer account and register an app at the [NYT Developer Network](https://developer.nytimes.com/), then enable the APIs you want to sync (Article Search, Most Popular, Top Stories) on your app to get an API key.
- **Article Search query (optional)** – the keyword search that drives the `article_search` table, for example `climate`.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If a table returns no data, confirm the corresponding API (Article Search, Most Popular, or Top Stories) is enabled on your registered app, then reconnect.
- If syncs stall or fail with rate-limit errors, wait for the NYT quota to reset – NYT limits you to roughly 10 requests/minute and 4,000/day.

<TroubleshootingLink />
