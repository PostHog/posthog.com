---
title: Linking bol.com Retailer as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: BolRetailer
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The bol.com Retailer connector syncs your seller data into the PostHog data warehouse: order items, shipments, returns, offers, inventory and invoices. Use it to connect marketplace sales and returns to what those customers do in your product.

## Prerequisites

You need a bol.com seller account with a technical contact set under API settings. bol only gives API access to accounts with a technical contact.

## Adding a data source

<SourceSetupIntro />

This source needs client credentials for the Retailer API:

1. In your bol seller dashboard, open **Settings > Services > API settings**.
2. Fill in the technical contact if it is empty.
3. Under client credentials for the Retailer API, create a set of credentials and reveal the secret.
4. Copy the **Client ID** and **Client secret** into PostHog.

## Sync modes

<SyncModes />

- `order_items` has one row per order line and supports incremental sync on `latestChangedDateTime`. Use incremental sync to keep items older than three months: bol's API only lists the last three months, so a full refresh replaces the table with that window.
- `shipments` supports incremental sync on `shipmentDateTime`. bol lists shipments from the last three months, so keep it on incremental sync to build up older history.
- `offers` supports incremental sync on `lastModifiedDateTime`.
- `returns`, `inventory` and `invoices` use full refresh.
- `invoices` covers the last two years.
- `inventory` covers stock in bol's warehouses (fulfilment by bol), not stock you ship yourself.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### The source fails with an authentication error

bol rejected the client ID or secret. Create new client credentials in API settings and update the source.

### The source fails with a 403 error

bol refused access. Check that your seller account is active and has a technical contact under API settings.

### Syncs take a long time

bol [rate-limits](https://api.bol.com/retailer/public/Retailer-API/ratelimits.html) the order list, and the first sync of `order_items` asks for each of the last 91 days, so it takes several minutes.

<TroubleshootingLink />
