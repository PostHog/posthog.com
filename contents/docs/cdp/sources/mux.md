---
title: Linking Mux as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Mux
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Mux connector syncs your Mux Video data into the PostHog Data warehouse, so you can analyze your assets, live streams, and uploads alongside your product data.

## Prerequisites

You need a Mux account with admin access so you can create an access token. Tokens are scoped to a single Mux environment.

## Adding a data source

<SourceSetupIntro />

When linking Mux, you'll need:

- **Access Token ID** – create an access token under [Settings → Access Tokens](https://dashboard.mux.com/settings/access-tokens) in your Mux dashboard.
- **Secret Key** – shown alongside the Access Token ID when you create the token. Grant Mux Video (read) for assets, live streams, uploads, playback restrictions, and transcription vocabularies, and Mux System (read) for signing keys.

## Sync modes

<SyncModes />

All Mux tables are full refresh only, since the API exposes no incremental sync filter.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authorization error, your Mux access token is invalid or has been revoked. Create a new access token in your Mux dashboard, then reconnect.
- If you get a permission error, your access token is missing the read permissions needed to sync this data. Grant Mux Video and Mux System read access, then reconnect.

<TroubleshootingLink />
