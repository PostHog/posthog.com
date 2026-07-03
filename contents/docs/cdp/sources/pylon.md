---
title: Linking Pylon as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Pylon
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Pylon connector pulls your customer support data into the PostHog Data warehouse, so you can analyze it alongside your product data.

## Prerequisites

You need a Pylon account with admin access so you can create an API token.

## Adding a data source

<SourceSetupIntro />

When linking Pylon, you'll need:

- **API token** – create an API token from your Pylon dashboard under **Settings > API tokens** (admin only).

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your Pylon API token may be invalid or revoked. Create a new token in Settings > API tokens, then reconnect.
- If you see a permission error, your Pylon API token is missing the permissions needed to sync this data. Recreate the token with the required access, then reconnect.

<TroubleshootingLink />
