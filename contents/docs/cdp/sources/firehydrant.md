---
title: Linking FireHydrant as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: FireHydrant
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The FireHydrant connector syncs your incident management data into the PostHog Data warehouse, so you can analyze your incidents and response workflows alongside your product data.

## Prerequisites

You need a FireHydrant account with permission to create an API key. Bot tokens are recommended for automation that isn't tied to a specific user.

## Adding a data source

<SourceSetupIntro />

When linking FireHydrant, you'll need:

- **API key** – create a bot token or personal API key in your [FireHydrant API keys settings](https://app.firehydrant.io/organizations/api_keys).
- **Region** – pick the region your FireHydrant account is hosted in, either US (`api.firehydrant.io`) or EU (`api.eu.firehydrant.io`).

## Sync modes

<SyncModes />

This source is full-refresh only. FireHydrant has no uniform server-side incremental cursor, so every table is fully re-synced on each run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new API key in your FireHydrant settings, then reconnect.
- If you see a permissions error, the key is missing the permissions needed to sync this data. Grant the required permissions in your FireHydrant settings, then reconnect.

<TroubleshootingLink />
