---
title: Linking GoLogin as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GoLogin
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The GoLogin connector syncs your browser profile management data into the PostHog data warehouse, so you can analyze your GoLogin profiles, workspaces, and proxy devices alongside your product data.

## Prerequisites

You need a GoLogin account with permission to create an API key.

## Adding a data source

<SourceSetupIntro />

When linking GoLogin, you'll need:

- **API key** – generate a bearer API key in **Settings → API** in your GoLogin account.

## Sync modes

<SyncModes />

GoLogin endpoints do not expose a server-side updated-since filter, so this source uses full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key may be invalid or revoked. Generate a new API key in **Settings → API** in your GoLogin account, then reconnect.
- If you see a permissions error, the API key is missing the access needed to sync this data. Check your account permissions, then reconnect.

<TroubleshootingLink />
