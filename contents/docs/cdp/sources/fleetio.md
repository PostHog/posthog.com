---
title: Linking Fleetio as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Fleetio
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Fleetio connector syncs your Fleetio fleet management data into PostHog, so you can analyze your vehicles, maintenance, and fleet operations alongside your product data.

## Prerequisites

You need a Fleetio account with access to create an API key.

## Adding a data source

<SourceSetupIntro />

When linking Fleetio, you'll need:

- **API key** – create one under **Account Menu → Account Settings → API Keys** in Fleetio.
- **Account token** – shown on the same page as the API key. It identifies your Fleetio account.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key or account token may be invalid or revoked. Generate a new API key in your Fleetio account settings, then reconnect.
- If you see a permission error, check the key's permissions in your Fleetio account settings, then reconnect.

<TroubleshootingLink />
