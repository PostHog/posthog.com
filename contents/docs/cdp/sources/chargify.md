---
title: Linking Chargify as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Chargify
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Chargify (Maxio Advanced Billing) connector syncs your billing data into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Chargify (Maxio Advanced Billing) site with an API key and your site subdomain.

## Adding a data source

<SourceSetupIntro />

When linking Chargify, you'll need:

- **API key** – create one under **Settings → Integrations → API Access** in your Chargify site.
- **Site subdomain** – the first part of your site URL. For `acme.chargify.com` the subdomain is `acme`.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
