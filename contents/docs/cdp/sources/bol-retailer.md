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

The bol.com Retailer connector syncs your seller data into the PostHog data warehouse: orders, shipments, returns, offers, inventory and invoices.

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

- `orders` supports incremental sync on `latestChangedDateTime`, the newest change across the order's items. Use incremental sync to keep orders older than three months: bol's API only lists the last three months, so a full refresh replaces the table with that window.
- `offers` supports incremental sync on `lastModifiedDateTime`.
- The other tables use full refresh. `shipments` covers the last three months.
- `invoices` covers the last two years. `inventory` covers stock in bol's warehouses (fulfilment by bol), not stock you ship yourself.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### The source fails with an authentication error

bol rejected the client ID or secret. Create new client credentials in API settings and update the source.

### Syncs take a long time

bol limits the order and shipment lists to 25 requests a minute, and each request returns 50 rows. A large seller account takes several minutes per table.

<TroubleshootingLink />
