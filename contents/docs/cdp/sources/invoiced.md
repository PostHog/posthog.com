---
title: Linking Invoiced as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Invoiced
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Invoiced connector syncs your accounts receivable and billing data into PostHog, so you can analyze your billing alongside your product data.

## Prerequisites

You need an Invoiced account with an API key. The key grants read access to your customers, invoices, payments, credit notes, estimates, subscriptions, and billing catalog.

## Adding a data source

<SourceSetupIntro />

When linking Invoiced, you'll need:

- **API key** – create one under **Settings → Developers → API Keys** in [Invoiced](https://www.invoiced.com).

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
