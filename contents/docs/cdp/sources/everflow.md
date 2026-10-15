---
title: Linking Everflow as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Everflow
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Everflow connector syncs your network data into the PostHog data warehouse: offers, partners, advertisers, conversions and daily performance. Use it to compare partner-driven conversions with what those users do in your product.

## Prerequisites

You need access to the Everflow network portal with permission to create API keys. Partner and advertiser portal keys can't read network data.

## Adding a data source

<SourceSetupIntro />

This source needs:

- **Network API key** – In Everflow, open **Control center > Security > API keys** and create a key.
- **Region** – Choose **EU** if your Everflow network runs on the EU platform. Otherwise keep **US**.
- **Reporting currency** – The currency for the `daily_performance` table. It defaults to `USD`.

## Sync modes

<SyncModes />

- `conversions` supports incremental sync on `conversion_unix_timestamp`. Each sync re-reads the last 30 days, because conversion statuses and payouts change after the conversion.
- `daily_performance` supports incremental sync on `date` and also re-reads the last 30 days.
- `offers`, `affiliates` and `advertisers` use full refresh.

Everflow's conversions report only reaches the last 365 days, so the first sync of `conversions` and `daily_performance` starts there.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### The source fails with a 401 or 403 error

A 401 means Everflow rejected the key or the region doesn't match your network. A 403 means the key belongs to a partner or advertiser portal. Create a network API key and update the source.

<TroubleshootingLink />
