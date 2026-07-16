---
title: Linking Alguna as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Alguna
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Alguna connector syncs your billing and CPQ data – customers, invoices, subscriptions, payments, refunds, plans, products, and billable metrics – into PostHog, so you can join revenue data with product analytics.

## Prerequisites

You need an [Alguna](https://alguna.com) account with access to API credentials. API keys are issued in the Alguna dashboard under **Settings** > **Credentials**.

## Adding a data source

<SourceSetupIntro />

When linking Alguna, you'll need:

- **API key** – create one under **Settings → Credentials** in your [Alguna](https://alguna.com) dashboard. The key has read access to your workspace's billing data.

## Sync modes

<SyncModes />

All Alguna tables sync as full refresh. Billing entities are low volume, so a full reload on each sync stays cheap and always reflects deletions.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
