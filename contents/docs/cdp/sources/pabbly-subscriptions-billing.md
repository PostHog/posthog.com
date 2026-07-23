---
title: Linking Pabbly Subscription Billing as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PabblySubscriptionsBilling
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Pabbly Subscription Billing connector syncs your customers, subscriptions, products, invoices, transactions, refunds, and related billing data into the PostHog Data Warehouse, so you can analyze your recurring revenue alongside your product data.

## Prerequisites

You need a Pabbly Subscription Billing account with access to its API settings. The API key and secret key grant read access to every record in the account.

## Adding a data source

<SourceSetupIntro />

When linking Pabbly Subscription Billing, you'll need:

- **API key** and **Secret key** – generate both under **Settings → API Settings** in your [Pabbly Subscription Billing](https://payments.pabbly.com) account.

## Sync modes

<SyncModes />

Pabbly Subscription Billing exposes no server-side change filter, so every table syncs via full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key or secret key is invalid or has been regenerated. Generate new keys under **Settings → API Settings** in Pabbly Subscription Billing, then reconnect.
- Pabbly Subscription Billing limits accounts to 10,000 API requests per day. Very large accounts syncing many tables on a frequent schedule can hit this quota; if syncs start failing late in the day, reduce the sync frequency or the number of synced tables.

<TroubleshootingLink />
