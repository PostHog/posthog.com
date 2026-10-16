---
title: Linking Daisycon as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Daisycon
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Daisycon connector syncs your publisher data into the PostHog data warehouse: transactions, daily statistics, programs and media. Use it to join affiliate commission to the traffic and product usage it drives.

## Prerequisites

You need a Daisycon publisher login with access to the publisher account you want to sync.

## Adding a data source

<SourceSetupIntro />

This source connects with your Daisycon login:

1. Under **Daisycon account**, open **Choose Daisycon connection**, connect a new account, and sign in to Daisycon. Approve the access request.
2. **Publisher** – Pick the publisher account to sync. The list shows the publishers your login could read when you connected it.
3. **Statistics currency** – The currency for the `statistics_daily` table. It defaults to `EUR`.

## Sync modes

<SyncModes />

- `transactions` supports incremental sync on `last_modified`, the newest change time across a transaction's parts. A status change from open to approved or rejected updates it, so the next sync picks the change up.
- `statistics_daily` supports incremental sync on `date`. Each sync re-reads the last 30 days, because daily totals change as advertisers approve or reject transactions.
- `programs` and `media` use full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### The source fails with a 401 error

Daisycon ends the authorization after 30 days without a sync. Reconnect your Daisycon account in the source settings.

### A publisher is missing from the list

The list comes from the moment you connected. If your login got access to a publisher after that, connect your Daisycon account again, then pick the publisher.

<TroubleshootingLink />
