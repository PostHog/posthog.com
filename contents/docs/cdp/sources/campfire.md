---
title: Linking Campfire as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Campfire
beta: true
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

<AlphaRelease />

The Campfire connector syncs your accounting data from [Campfire](https://www.meetcampfire.com/) into PostHog: general ledger transactions, journal entries, invoices, bills, payments, bank activity, revenue recognition contracts, and company objects like vendors and the chart of accounts. This lets you analyze your financial data alongside your product data.

## Prerequisites

You need an active Campfire account with access to create API users and keys (Settings > API keys).

## Adding a data source

<SourceSetupIntro />

When linking Campfire, you'll need an API key:

1. In Campfire, go to the [API keys page](https://app.meetcampfire.com/v2/settings/api-keys) (**Settings > API keys**).
2. Click **Create User** to create a dedicated API user. A `view only` role is enough, since PostHog only reads data.
3. Click **Create API Key** on the new API user and copy the key. It's only shown once.

## Sync modes

<SyncModes />

Tables where Campfire supports server-side filtering by modification time (like GL transactions, bills, payments, vendors, and contracts) can sync incrementally on `last_modified_at`. The other tables sync with a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If a sync fails with an authentication error, the API key may have been revoked or the API user's role changed. Create a new API key in Campfire and update the source credentials in PostHog.

<TroubleshootingLink />
