---
title: Linking Watchmode as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Watchmode
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Watchmode connector syncs streaming availability metadata into the PostHog Data warehouse: the movie and TV title catalog, recent and upcoming streaming releases, and the reference lists of streaming services, regions, networks, and genres. Useful for joining your product data against what's available to watch and where.

## Prerequisites

You need a Watchmode account and an API key. Every plan works, including the free Developer plan, but keep your monthly request quota in mind: each sync makes API requests that count against it, with the `titles` table needing one request per 250 titles.

## Adding a data source

<SourceSetupIntro />

When linking Watchmode, you'll need:

- **API key** – shown on your [Watchmode dashboard](https://api.watchmode.com/) after you sign up for API access.

## Sync modes

<SyncModes />

All Watchmode tables sync as full refresh: the API doesn't offer a change filter suitable for incremental syncs. The `releases` table covers the API's default window of recent and upcoming releases, so schedule regular syncs if you want to keep a longer history.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### My sync fails with an authentication error

Check that the API key is correct and active on your [Watchmode dashboard](https://api.watchmode.com/). If you regenerated the key, update the source with the new value.

### My sync stops partway through

Watchmode rate limits requests per minute and caps total requests per month by plan. Rate limited syncs retry automatically, but if your monthly quota is exhausted, syncs fail until the quota resets or you upgrade your plan.

<TroubleshootingLink />
