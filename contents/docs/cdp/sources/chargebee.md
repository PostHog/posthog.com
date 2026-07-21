---
title: Linking Chargebee as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Chargebee
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Chargebee connector syncs your billing data – customers, subscriptions, invoices, events, and more – into PostHog, so you can analyze revenue and billing activity alongside your product data.

## Prerequisites

You need a Chargebee account and a read-only API key. We recommend creating a dedicated read-only key for this integration.

## Adding a data source

<SourceSetupIntro />

When linking Chargebee, you'll need:

- **API key** – in your Chargebee dashboard, go to **Settings > Configure Chargebee > API keys**, then click **+ Add API Key** and select **Read-Only Key**. Copy the value of the newly created key.
- **Site name (subdomain)** – found in the top-left of your dashboard. It's the same as the subdomain of your dashboard (the part before `.chargebee.com`).

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
