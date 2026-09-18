---
title: Linking Maxio as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Maxio
beta: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Maxio connector syncs your Maxio Advanced Billing (formerly Chargify) data into PostHog – customers, subscriptions, invoices, products, components, coupons, and billing events – so you can analyze revenue and billing activity alongside your product data.

## Prerequisites

You need admin access to your Maxio Advanced Billing site to create an API key. API keys are site-scoped with full access. You also need to know which hosting region your site is on (US or EU).

## Adding a data source

<SourceSetupIntro />

When linking Maxio, you'll need:

- **Site subdomain** – the subdomain of your Maxio site, e.g. `acme` for `acme.chargify.com`. You can find it in your site's URL.
- **API key** – generate one in your Maxio dashboard under **Config** > **Integrations** > **API keys**.
- **Hosting region** – US (`chargify.com`) or EU (`ebilling.maxio.com`), chosen when your account was provisioned.

## Sync modes

<SyncModes />

Subscriptions, invoices, customers, and events support incremental sync. All other tables use full refresh.

Incremental runs on subscriptions, invoices, and customers re-read a trailing day of updates to account for your site's timezone. Duplicate rows are merged away by primary key. Events use an integer cursor (`since_id`) which is exact and doesn't need a lookback window.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If validation fails with "Maxio site not found", double-check the subdomain (the label only, not the full URL) and that the hosting region matches where your site lives.
- If you see a 401 error, generate a new API key in your Maxio dashboard and reconnect.
- If you see a 403 error, the API key doesn't have access to the requested resource. Check key permissions in your Maxio site.

<TroubleshootingLink />
