---
title: Linking GNews as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GNews
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The GNews connector syncs worldwide news articles into PostHog, so you can analyze news content alongside your product data.

## Prerequisites

You need a GNews account with an API key. GNews caps every query at 1000 articles, and free plans return fewer results per request with truncated content.

## Adding a data source

<SourceSetupIntro />

When linking GNews, you'll need:

- **API key** – find it in your [GNews dashboard](https://gnews.io/dashboard).
- **Search query** – drives the `articles` table via keyword search.
- **Category** – drives the `top_headlines` table.
- **Language (optional)** – restrict results to a language code (e.g. `en`).
- **Country (optional)** – restrict results to a country code (e.g. `us`).

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
