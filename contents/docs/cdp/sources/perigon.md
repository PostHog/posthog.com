---
title: Linking Perigon as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Perigon
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Perigon connector syncs news articles, story clusters, journalists, media sources, people, companies, and topics from the [Perigon](https://www.perigon.io/) news intelligence API, so you can analyze news coverage and media data alongside your product data.

## Prerequisites

You need a Perigon account with API access. The datasets you can sync depend on your Perigon plan, and tables outside your plan fail with a permission error.

## Adding a data source

<SourceSetupIntro />

When linking Perigon, you'll need:

- **API key** – find it on your [Perigon account dashboard](https://www.perigon.io/) after signing up and verifying your email.

## Sync modes

<SyncModes />

Articles and story clusters support incremental sync using Perigon's server-side date filters: articles sync by publication date (`pubDate`), and stories sync by last-update time (`updatedAt`), which also picks up clusters that received new articles. The reference tables (journalists, sources, people, companies, topics) sync as full refresh.

Perigon caps each search at 10,000 results. Incremental syncs on articles and stories catch up across runs because each sync continues from the last synced timestamp, but a single full refresh returns at most 10,000 rows per table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Your Perigon API key is invalid or has been revoked**: generate a new key on your Perigon account dashboard, then reconnect the source.
- **Your Perigon plan does not include access to this dataset**: deselect the failing table in the source's schema settings, or upgrade your Perigon plan.

<TroubleshootingLink />
