---
title: Linking RSS.com as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Rss
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The RSS.com connector syncs your podcast hosting data into the PostHog Data warehouse, so you can analyze your podcasts and episodes alongside your product data.

## Prerequisites

You need an RSS.com account on a Network plan – the RSS.com API is only available to Network plan customers. You also need permission to create API keys for your account.

## Adding a data source

<SourceSetupIntro />

When linking RSS.com, you'll need:

- **API key** – create one under **Profile → API Access** in your [RSS.com](https://rss.com) account. RSS.com lets you create up to 10 named API keys.

## Sync modes

<SyncModes />

This source is full refresh only. The RSS.com API has no server-side timestamp filter, so each sync pulls the complete dataset and merges on the primary key.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The episodes table includes a `podcast_id` column so you can join episodes back to the podcasts table.

## Troubleshooting

- If you see an authentication error, your API key may be invalid or revoked. Create a new key under **Profile → API Access** in RSS.com, then reconnect.
- If you see a payment required error, your account is not on an RSS.com Network plan, which the API requires. Upgrade your plan, then reconnect.

<TroubleshootingLink />
