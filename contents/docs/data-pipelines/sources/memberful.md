---
title: Linking Memberful as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Memberful
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Memberful connector syncs your membership data into the PostHog data warehouse, so you can analyze your members, subscriptions, and orders alongside your product data.

## Prerequisites

You need a Memberful account with permission to create a custom application and API key. A read-only key is sufficient.

## Adding a data source

<SourceSetupIntro />

When linking Memberful, you'll need:

- **Account subdomain** – the part before `.memberful.com` in your Memberful dashboard URL. For example, if your dashboard is at `acme.memberful.com`, enter `acme`. You can also paste the full URL and PostHog will extract the subdomain.

- **API key** – go to **Settings → Custom applications** in your Memberful dashboard, add a custom application with API key access, then copy its API key.

## Sync methods

<SyncModes />

Only the `activities` table supports incremental syncing, using `createdAt` as the replication key. All other tables (members, subscriptions, orders, coupons, plans, and downloads) sync via full table refresh.

The `orders` table is full refresh only because refunds and status changes do not update an order's `createdAt` timestamp. An incremental sync would miss those updates.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been deleted. Create a new API key under **Settings → Custom applications** in Memberful, then reconnect.

- If you see an account not found error, check that your subdomain is correct. Use the part before `.memberful.com`, not the full URL.

<TroubleshootingLink />
