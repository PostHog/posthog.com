---
title: Linking PersistIQ as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PersistIq
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The PersistIQ connector syncs your sales engagement data – leads, users, and campaigns – into the PostHog Data warehouse, so you can analyze your outbound sales activity alongside your product data.

## Prerequisites

You need a PersistIQ account with access to the API. You'll need to generate an API key to connect.

## Adding a data source

<SourceSetupIntro />

When linking PersistIQ, you'll need:

- **API key** – in your PersistIQ dashboard, go to **Profile → Integrations → PersistIQ API** to find or create your API key. The key grants read access to your leads, users, and campaigns.

## Sync modes

<SyncModes />

This source is full-refresh only. The PersistIQ API has no server-side timestamp filter, so every table is fully re-synced on each run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your PersistIQ API key is invalid or has been revoked. Generate a new key under **Profile → Integrations → PersistIQ API** in your PersistIQ dashboard, then reconnect.
- If you see a permission error, your API key doesn't have access to the requested data. Check the key's permissions, then reconnect.

<TroubleshootingLink />
