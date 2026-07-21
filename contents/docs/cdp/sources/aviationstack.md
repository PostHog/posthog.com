---
title: Linking Aviationstack as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Aviationstack
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The aviationstack connector syncs real-time, scheduled, and historical flight data along with aviation reference tables into PostHog, so you can analyze flight and aviation data alongside your product data.

## Prerequisites

You need an aviationstack account with an active access key. Some tables, such as historical flights and certain filters, require a paid plan.

## Adding a data source

<SourceSetupIntro />

When linking Aviationstack, you'll need:

- **Access key** – find it in your [aviationstack dashboard](https://aviationstack.com/dashboard). Note that aviationstack pricing is a monthly request quota tied to your plan.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is re-synced on each run because aviationstack has no server-side updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your access key is invalid or has been deactivated, generate a new key in your aviationstack dashboard, then reconnect.
- If your plan does not grant access to a table, upgrade your aviationstack plan or deselect the restricted tables, then reconnect.
- If you hit your monthly request quota, upgrade your plan or wait for the quota to reset, then resync.

<TroubleshootingLink />
