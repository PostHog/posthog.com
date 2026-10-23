---
title: Linking Deepgram as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Deepgram
beta: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Deepgram connector syncs your [Deepgram](https://deepgram.com) Management API data – projects, members, API keys, balances, invites, and the request log – into PostHog, so you can analyze your speech-to-text usage and spend alongside your product data.

## Prerequisites

You need a Deepgram account with access to the [Deepgram Console](https://console.deepgram.com/). A key with a read-capable scope (e.g. `member`) is sufficient – the source only reads data, it never writes.

## Adding a data source

<SourceSetupIntro />

When linking Deepgram, you'll need:

- **API key** – create one in your [Deepgram Console](https://console.deepgram.com/) under **Settings → API Keys**. A read-capable scope (such as `member`) is enough to read projects, members, keys, balances, invites, and the request log.

## Sync modes

<SyncModes />

The `requests` table (your request log) supports incremental sync on its `created` timestamp, so each run only pulls new requests. All other tables use full refresh – they're small resource inventories that are re-pulled on each sync so they always reflect the current state.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see a 401 error, your API key is invalid or has been revoked. Create a new key in the Deepgram Console under **Settings → API Keys**, then reconnect.
- If a table returns no rows, confirm the key's scope can read that resource – some data (such as balances and invites) is only available to keys with the appropriate account-level permissions.

<TroubleshootingLink />
