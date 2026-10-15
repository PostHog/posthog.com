---
title: Linking Amazon Selling Partner as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AmazonSellingPartner
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Amazon Selling Partner connector syncs data from an Amazon seller or vendor account into PostHog through the Selling Partner API (SP-API). Seller accounts get orders, order items, financial transactions, and FBA inventory. Vendor accounts get the Vendor Central retail analytics reports. You can then join your Amazon sales with your product data.

## Prerequisites

- An Amazon seller account in Seller Central, or a vendor account in Vendor Central.
- An SP-API application registered in the Solution Provider Portal. A private application for your own account is enough.
- The application needs these roles:
  - **Inventory and Order Tracking** for `orders` and `order_items`
  - **Finance and Accounting** for `transactions`
  - **Amazon Fulfillment** for `inventory_summaries`
  - **Brand Analytics** for the `vendor_` tables
- A refresh token from authorizing the application for your account.

## Adding a data source

<SourceSetupIntro />

When linking Amazon Selling Partner, you'll need:

- **Region** – the SP-API region of your marketplaces. North America covers the US, Canada, Mexico, and Brazil. Europe covers the UK, the EU, India, Turkey, the UAE, Saudi Arabia, and Egypt. Far East covers Japan, Australia, and Singapore.
- **LWA client ID** and **LWA client secret** – the Login with Amazon credentials of your application. Find them under **Develop apps** in Seller Central, then **View** next to **LWA credentials**.
- **Refresh token** – created when you authorize the application. For a private application, click **Authorize** next to the app under **Develop apps** in Seller Central.
- **Marketplace IDs** – a comma-separated list of [marketplace IDs](https://developer-docs.amazon.com/sp-api/docs/marketplace-ids) to sync, for example `ATVPDKIKX0DER` for the US. Vendor reports need them. Sellers can leave the field blank to sync every marketplace they sell in.

PostHog checks the credentials when you link the source. The table list then marks the tables your account can't sync, for example the seller tables on a vendor account.

## Sync modes

<SyncModes />

- `orders` and `order_items` sync incrementally on `lastUpdatedTime`, so each run picks up new orders and orders that changed.
- `transactions` syncs incrementally on `postedDate`. Amazon can post a financial event up to 48 hours late, so each incremental run reads the last three days again. Amazon releases deferred transactions without changing their `postedDate`, so each run also reads the transactions released in the last 60 days.
- `inventory_summaries` is a full refresh, so every sync replaces it with the current stock of each SKU.

Amazon keeps order data for two years, except in Japan, Australia, and Singapore. A first sync reads as far back as Amazon allows.

Vendor reports come from the Reports API. Amazon builds each report on request, so a sync waits a few minutes per report.

- `vendor_sales`, `vendor_inventory`, and `vendor_net_pure_product_margin` hold one row per ASIN and day, and sync incrementally on `startDate`. A first sync reads the last four years, 15 days per report. Amazon publishes a day's data about three days after it closes.
- `vendor_real_time_sales` holds ordered units and revenue per ASIN and hour, and syncs incrementally on `startTime`. Amazon keeps the last 30 days.
- `vendor_forecasts` holds the latest weekly demand forecast per ASIN. Amazon keeps only the latest forecast, so each sync replaces the table.

The sales, inventory, and forecast reports use the manufacturing view and the retail program.

Buyer and shipping address details are not synced. They contain personal information and need restricted roles.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Amazon rejected the refresh token** – the token was revoked, or the application was re-authorized and a new token replaced it. Authorize the application again and update the refresh token in the source.
- **Amazon refused access to a table** – the application lacks the role the table needs. Add the role in the Solution Provider Portal, authorize the application again, and update the refresh token.
- **A vendor report fails** – Amazon fails a report for a period it has not published yet. The next sync asks again.
- **Slow first sync** – after a burst of 20 requests, Amazon allows about one orders request every three minutes. Each request returns up to 100 orders, so a large seller account can take hours to sync the first time.

<TroubleshootingLink />
