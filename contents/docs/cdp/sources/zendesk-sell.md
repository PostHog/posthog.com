---
title: Linking Zendesk Sell as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ZendeskSell
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Zendesk Sell connector syncs your Sell (formerly Base CRM) data into the PostHog Data warehouse, so you can analyze your sales pipeline alongside your product data.

## Prerequisites

You need a Zendesk Sell account with permission to create a personal access token. A read-only token is sufficient.

## Adding a data source

<SourceSetupIntro />

When linking Zendesk Sell, you'll need:

- **Access token** – create a personal access token under **Settings > Integrations > OAuth > Access Tokens** in Zendesk Sell.

## Sync modes

<SyncModes />

This source is full-refresh only. The Zendesk Sell Core API has no server-side timestamp filter, so every table is fully re-synced on each run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your access token is invalid or has expired. Create a new access token in your Zendesk Sell settings, then reconnect.
- If you see a permissions error, the token is missing the permissions needed to sync this data. Grant read access and reconnect.

<TroubleshootingLink />
