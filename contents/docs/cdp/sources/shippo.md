---
title: Linking Shippo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Shippo
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Shippo connector syncs your shipping data – shipments, purchased labels, orders, addresses, parcels, refunds, customs data, and carrier accounts – into the PostHog Data warehouse, so you can analyze fulfillment and delivery alongside your product data.

## Prerequisites

You need a Shippo account with access to its API settings. Shippo issues separate live (`shippo_live_...`) and test (`shippo_test_...`) API tokens – use the live token to sync your production shipping data.

## Adding a data source

<SourceSetupIntro />

When linking Shippo, you'll need:

- **API token** – find or generate one under **Settings → API** in the [Shippo dashboard](https://apps.goshippo.com/settings/api). The token grants read access to all of your account's shipping data.

## Sync modes

<SyncModes />

The `shipments` table supports incremental syncs on its creation time. Note that the Shippo API doesn't return shipments older than 390 days, which bounds how far back the initial sync can reach. The other tables are synced with a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API token is invalid or has been revoked. Generate a new token under **Settings → API** in the Shippo dashboard, then reconnect.
- Test mode tokens have much lower API rate limits than live tokens, so a large sync using a `shippo_test_` token can take noticeably longer.

<TroubleshootingLink />
