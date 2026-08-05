---
title: Linking Courier as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Courier
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Courier connector syncs your notification data – messages, audit events, audiences, brands, and tenants – into PostHog, so you can analyze notification delivery and engagement alongside your product data.

## Prerequisites

You need a [Courier](https://www.courier.com/) account with access to an API key. Find your API key in the Courier dashboard under **Settings** > **API Keys**. Either the Live or Test key works – the key determines which environment's data is synced.

## Adding a data source

<SourceSetupIntro />

You need your Courier API key. Find it in the Courier dashboard under **Settings** > **API Keys**.

## Sync modes

<SyncModes />

The `Messages` table supports incremental sync on `enqueued` using Courier's server-side `enqueued_after` filter, so ongoing syncs only fetch new messages. Engagement fields that change on existing messages after delivery (like `clicked`, `opened`, and `delivered`) are only refreshed by a full refresh, so consider scheduling periodic full refreshes of `Messages` if you rely on those fields.

The `AuditEvents`, `Audiences`, `Brands`, and `Tenants` tables don't have server-side timestamp filters in Courier's API, so they always sync as a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If the source fails to connect or a sync stops with an authorization error, your API key is likely invalid or revoked – generate a new key in the Courier dashboard under **Settings** > **API Keys** and update the source credentials. If a table is unexpectedly empty, check that you connected the key for the right Courier environment, since each key only sees its own environment's data.

<TroubleshootingLink />
