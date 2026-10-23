---
title: Linking Printify as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Printify
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Printify connector syncs your print-on-demand data – shops, products, orders, uploads, webhooks, and catalog reference tables – into PostHog.

## Prerequisites

You need a Printify account and a personal access token with the required read scopes. Personal access tokens expire after one year.

## Adding a data source

<SourceSetupIntro />

When linking Printify, you'll need:

- **API token** – generate a personal access token under **My Profile → Connections** in [Printify](https://printify.com). The token needs the `shops.read`, `products.read`, `orders.read`, `uploads.read`, `webhooks.read`, and `catalog.read` scopes.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If requests start failing after up to a year, your personal access token has likely expired. Generate a new token under **My Profile → Connections**, then reconnect.
- If a table fails with a missing scope error, regenerate your token with the `shops.read`, `products.read`, `orders.read`, `uploads.read`, `webhooks.read`, and `catalog.read` scopes, then reconnect.

<TroubleshootingLink />
