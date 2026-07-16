---
title: Linking EZOfficeInventory as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: EZOfficeInventory
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The EZOfficeInventory connector syncs your asset and inventory management data into PostHog, so you can analyze your equipment and stock alongside your product data.

## Prerequisites

You need an EZOfficeInventory account with API access enabled under **Settings → Integrations → API Integration**, so you can generate an access token.

## Adding a data source

<SourceSetupIntro />

When linking EZOfficeInventory, you'll need:

- **Subdomain** – the `<subdomain>` part of your `<subdomain>.ezofficeinventory.com` account URL.
- **Access token** – enable API access in **Settings → Integrations → API Integration** and generate a token there.

## Sync modes

<SyncModes />

All EZOfficeInventory tables sync via full refresh. The API exposes no general server-side `updated_after` cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your access token is invalid or expired, generate a new token and reconnect.
- If your access token does not have the required permissions, or API access is disabled for the account, check the token's permissions and confirm API access is enabled in Settings.

<TroubleshootingLink />
