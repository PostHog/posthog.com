---
title: Linking Qonto as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Qonto
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Qonto connector syncs your business banking data into the PostHog data warehouse, so you can analyze transactions, transfers, and account activity alongside your product data.

[Qonto](https://qonto.com) is a European business finance platform. This source syncs bank accounts, transactions, labels, memberships, and SEPA transfers. The `transactions` and `transfers` tables support incremental sync using the `updated_at` field, so only new or updated rows are fetched after the initial sync.

## Prerequisites

You need a Qonto account with API access. You can find your credentials in the Qonto dashboard under **Integrations and Partnerships** > **API key**. You'll need your **organization login** and **secret key**.

## Adding a data source

<SourceSetupIntro />

When linking Qonto, you'll need:

- **Organization login** – your Qonto organization login, found in your Qonto dashboard under **Integrations and Partnerships** > **API key**.
- **Secret key** – your Qonto API secret key, found on the same page.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your organization login or secret key is invalid or has been revoked. Generate a new API key in your Qonto dashboard under **Integrations and Partnerships** > **API key**, then reconnect.
- If you see a permissions error, the API key does not have permission to read this data. Check the key's permissions in your Qonto dashboard.
- This source only syncs accounts owned by your organization. Connected external accounts are excluded.

<TroubleshootingLink />
