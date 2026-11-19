---
title: Linking Lob as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Lob
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

[Lob](https://www.lob.com) is an API for printing and mailing physical mail, such as letters, postcards, and checks. Linking Lob as a source pulls your mailpieces (letters, postcards, self mailers, snap packs, booklets, and checks), campaigns, audience uploads, QR code scan analytics, and supporting resources (addresses, bank accounts, billing groups, templates, template versions, cards, and card orders) into your PostHog data warehouse, where you can join it with your product data.

## Prerequisites

Before connecting Lob, you need:

- A [Lob account](https://dashboard.lob.com).
- A **secret** API key from your [Lob dashboard](https://dashboard.lob.com/settings/api-keys). Secret keys start with `live_` or `test_`. Publishable keys can only access address verification, so they can't be used to sync data.

## Adding a data source

<SourceSetupIntro />

When configuring the source, provide:

- **Secret API key** - your Lob secret API key from the [dashboard](https://dashboard.lob.com/settings/api-keys).

Test and live keys return different data, so connect with the key for the environment whose data you want to sync.

## Sync modes

<SyncModes />

The mailpiece tables (`letters`, `postcards`, `self_mailers`, `snap_packs`, `booklets`, `checks`) and `billing_groups` support incremental sync on `date_created`. After the first backfill, each run only requests records created after the latest synced `date_created`. All other tables are full refresh, because the Lob API doesn't let PostHog sort or filter them by creation date.

The `card_orders` and `template_versions` tables are fetched for each card and each template. A `card_id` or `template_id` column links each row to its parent card or template. The `uploads` table uses camelCase column names (such as `dateCreated` and `campaignId`), unlike the other Lob tables.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid or revoked API key** - Lob rejected the key. Create a new secret API key in your Lob dashboard, then reconnect.
- **No access to a resource** - your key can't read one of the selected tables. The source still connects, and the other tables sync. Check that you use a secret key with the required permissions, or deselect the table.

<TroubleshootingLink />
