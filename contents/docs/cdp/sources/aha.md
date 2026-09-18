---
title: Linking Aha! as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Aha
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Aha! connector syncs your product roadmap data into the PostHog Data warehouse, so you can analyze your planning and delivery workflows alongside your product data.

## Prerequisites

You need an Aha! account with permission to create an API key. The key inherits your account permissions, so it can read every record you can see.

## Adding a data source

<SourceSetupIntro />

When linking Aha!, you'll need:

- **Account domain** – the first part of your Aha! account host. For `yourcompany.aha.io`, enter `yourcompany`.
- **API key** – create one under **Settings → Personal → Developer → API keys** in your Aha! account.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new key in your Aha! account settings, then reconnect.
- If you see a permissions error, the key is missing the access needed to sync this data. Check the key's account permissions, then reconnect.

<TroubleshootingLink />
