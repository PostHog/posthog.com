---
title: Linking Squarespace as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Squarespace
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Squarespace connector syncs your Commerce data – orders, transactions, products, inventory, store pages, and profiles – into the PostHog Data warehouse, so you can analyze your store alongside your product data.

## Prerequisites

You need a Squarespace site where you can create a Developer API key. The Commerce APIs (orders, inventory) require the merchant to be on a Commerce plan.

## Adding a data source

<SourceSetupIntro />

When linking Squarespace, you'll need:

- **API key** – create one in your Squarespace site under **Settings → Advanced → Developer API Keys**, granting read access to the data you want to sync: Orders (orders, transactions), Products (products, inventory, store pages), and Profiles (profiles).

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new API key in your Squarespace developer settings, then reconnect.
- If you see a permissions error, the key or the site's plan is missing access needed to sync this data. Grant the relevant permission, and ensure the site is on a Commerce plan for orders and inventory, then reconnect.

<TroubleshootingLink />
