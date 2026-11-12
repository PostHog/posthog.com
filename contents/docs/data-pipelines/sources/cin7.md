---
title: Linking Cin7 Core as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Cin7
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Cin7 Core connector syncs your inventory management data – products, stock levels, customers, suppliers, sales, purchases, and more – into PostHog, so you can analyze your inventory and order data alongside your product data.

> **Note:** This source supports Cin7 Core (formerly DEAR Inventory) only. It doesn't support Cin7 Omni.

This source is currently in **beta**.

## Prerequisites

You need a Cin7 Core account with API access enabled. To get your credentials:

1. Log in to Cin7 Core.
2. Go to **Integrations** > **API**.
3. Create an API application if you don't have one.
4. Copy your **Account ID** and **Application key**.

## Adding a data source

<SourceSetupIntro />

When linking Cin7 Core, you'll need:

- **Account ID** - Your Cin7 Core account identifier, found under **Integrations** > **API**.
- **Application key** - Your API application key from Cin7 Core. This is stored securely and never displayed after setup.

## Sync modes

<SyncModes />

Seven tables support incremental sync using `ModifiedSince` or `UpdatedSince` filters, so only changed records are fetched on each run. All other tables use full refresh.

| Incremental tables      | Cursor field      |
| ----------------------- | ----------------- |
| `products`              | `LastModifiedOn`  |
| `customers`             | `LastModifiedOn`  |
| `suppliers`             | `LastModifiedOn`  |
| `sales`                 | `Updated`         |
| `sale_credit_notes`     | `Updated`         |
| `purchases`             | `LastUpdatedDate` |
| `purchase_credit_notes` | `LastUpdatedDate` |

The Cin7 Core API allows 60 calls per minute. PostHog sends at most one request per second to stay within this limit.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Below is a reference of all 21 available tables and their sync methods:

| Table                   | Sync method  | Description                                        |
| ----------------------- | ------------ | -------------------------------------------------- |
| `products`              | Incremental  | Product catalog with SKUs, pricing, and attributes |
| `product_families`      | Full refresh | Product groupings and variant options              |
| `product_availability`  | Full refresh | Stock levels per product, location, bin, and batch |
| `product_categories`    | Full refresh | Product categorization                             |
| `brands`                | Full refresh | Product brands                                     |
| `customers`             | Incremental  | Customer records with billing and contact settings |
| `suppliers`             | Incremental  | Supplier and vendor records                        |
| `sales`                 | Incremental  | Sales orders and transactions                      |
| `sale_credit_notes`     | Incremental  | Credit notes for sales                             |
| `purchases`             | Incremental  | Purchase orders                                    |
| `purchase_credit_notes` | Incremental  | Credit notes for purchases                         |
| `stock_adjustments`     | Full refresh | Inventory adjustment records                       |
| `stock_takes`           | Full refresh | Physical inventory counts                          |
| `stock_transfers`       | Full refresh | Stock movements between locations                  |
| `locations`             | Full refresh | Warehouse and storage locations                    |
| `payment_terms`         | Full refresh | Payment term configurations                        |
| `chart_of_accounts`     | Full refresh | Accounting chart of accounts                       |
| `tax_rules`             | Full refresh | Tax rule configurations                            |
| `units_of_measure`      | Full refresh | Unit of measure definitions                        |
| `carriers`              | Full refresh | Shipping carrier information                       |
| `price_tiers`           | Full refresh | Pricing tier configurations                        |

## Troubleshooting

- If your sync fails with an authentication error, Cin7 Core rejected the account ID or application key. Copy both values from **Integrations** > **API** in Cin7 Core and reconnect the source.
- If your sync fails with a rate limit error, wait a minute and try again. The Cin7 Core API allows 60 calls per minute per application.

<TroubleshootingLink />
