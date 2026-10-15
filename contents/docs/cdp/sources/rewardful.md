---
title: Linking Rewardful as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Rewardful
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Rewardful connector syncs your affiliate program data into the PostHog data warehouse: affiliates, referrals, commissions, payouts, campaigns, links and coupons. Use it to tie affiliate revenue to product usage.

## Prerequisites

You need a Rewardful account with access to **Company settings**, where the API secret is shown.

## Adding a data source

<SourceSetupIntro />

This source needs one credential:

- **API secret** – In Rewardful, open **Company settings** and copy the **API secret**. The secret gives full read access to your Rewardful account.

## Sync modes

<SyncModes />

The `referrals` table supports incremental sync on `updated_at`, because Rewardful can filter referrals by their last update. The other tables have no server-side date filter, so they use full refresh.

Rewardful doesn't have a customers endpoint. Customer details appear on each referral in the `customer` column.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### The source fails with a 401 error

Rewardful rejected the API secret. Copy the secret again from **Company settings** and update the source.

<TroubleshootingLink />
