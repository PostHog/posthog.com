---
title: Linking Maxio as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Maxio
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Maxio connector syncs your Maxio Advanced Billing data into the PostHog Data warehouse: customers, subscriptions, invoices, products, components, coupons, payment profiles, credit notes, and billing events. Use it to analyze subscription revenue and billing activity alongside your product data.

## Prerequisites

You need a Maxio Advanced Billing site and an API key. Generate a key under **Config → Integrations → API keys** in your Maxio site.

## Adding a data source

<SourceSetupIntro />

When linking Maxio, you'll need:

- **Site subdomain** – the subdomain of your Maxio site, e.g. `acme` for `acme.chargify.com`.
- **API key** – create one under **Config → Integrations → API keys** in your Maxio site.
- **Hosting region** – the region your Maxio site is hosted in: US (`chargify.com`) or EU (`ebilling.maxio.com`). Choosing the wrong region causes authentication errors.

## Sync modes

<SyncModes />

The `customers`, `subscriptions`, `invoices`, and `events` tables support incremental sync on their creation, update, or event timestamps. The `products`, `product_families`, `coupons`, `components`, `payment_profiles`, and `credit_notes` tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or revoked, the site subdomain is wrong, or the selected region doesn't match your site. Check all three, then reconnect.

<TroubleshootingLink />
