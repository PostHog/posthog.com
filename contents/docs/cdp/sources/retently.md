---
title: Linking Retently as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Retently
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Retently connector syncs your customer feedback data – survey responses, customers, companies, campaigns, templates, sent surveys, and campaign reports – into the PostHog Data warehouse, so you can analyze NPS, CSAT, and CES results alongside your product data.

## Prerequisites

You need a Retently account with access to the API settings. A key with **read** permission is sufficient – this source only performs GET requests.

## Adding a data source

<SourceSetupIntro />

When linking Retently, you'll need:

- **API key** – create one under **Settings → Integrations → API** in [Retently](https://app.retently.com). PostHog sends it in the `X-Api-Key` header.

## Sync modes

<SyncModes />

The `feedback` table supports incremental sync on the response creation date. Retently's other endpoints don't expose a reliable server-side "updated since" filter, so the remaining tables are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key may be invalid or revoked. Generate a new key under **Settings → Integrations → API** in Retently, then reconnect.
- Retently rate-limits API requests to roughly 150 per minute. Syncs back off and retry automatically, but very large accounts may take a while on the first sync.

<TroubleshootingLink />
