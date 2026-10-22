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
The Amazon Selling Partner connector syncs data from an Amazon seller or vendor account into PostHog through the Selling Partner API (SP-API). Seller accounts get orders, order items, financial transactions, and FBA inventory. Vendor accounts get the Vendor Central retail analytics reports. You can then join your Amazon sales with your product data.

## Prerequisites

- An Amazon seller account on the Professional selling plan, or a vendor account in Vendor Central. Individual seller accounts cannot register SP-API applications.
- An SP-API application. A private application for your own account is enough.
- The application needs these roles:
  - **Inventory and Order Tracking** for `orders` and `order_items`
  - **Finance and Accounting** for `transactions`
  - **Amazon Fulfillment** for `inventory_summaries`
  - **Brand Analytics** for the `vendor_` tables
- A refresh token from authorizing the application for your account.

## Adding a data source

<SourceSetupIntro />

When linking Amazon Selling Partner, you'll need:

- **Region** – the SP-API region of your marketplaces. North America covers the US, Canada, Mexico, and Brazil. Europe covers the UK, the EU, India, Turkey, the UAE, Saudi Arabia, Egypt, and South Africa. Far East covers Japan, Australia, and Singapore.
- **LWA client ID** and **LWA client secret** – the Login with Amazon credentials of your application. In the Solution Provider Portal, open **Develop Apps**, choose **Edit app**, then **View** under **LWA credentials**. In Seller Central the same page is under **Apps and Services**, then **Develop Apps**. In Vendor Central it is under **Integration**, then **API Integration**.
- **Refresh token** – created when you authorize the application. Choose **Authorize app** next to the application in the same place.
- **Marketplace IDs** – a comma-separated list of [marketplace IDs](https://developer-docs.amazon.com/sp-api/docs/marketplace-ids), for example `ATVPDKIKX0DER` for the US. Vendor accounts must set them. For sellers they limit `orders`, `order_items`, and `inventory_summaries`, and sellers can leave the field blank to use every marketplace they sell in. `transactions` always covers every marketplace in the region, because Amazon leaves out US merchant-fulfilled transactions when a marketplace is set.

PostHog checks the credentials when you link the source. The table list then marks the tables your account can't sync, for example the seller tables on a vendor account.

## Sync modes

<SyncModes />

- `orders` and `order_items` sync incrementally on `lastUpdatedTime`, so each run picks up new orders and orders that changed.
- `transactions` syncs incrementally on `postedDate`. Amazon can post a financial event up to 48 hours late, so each incremental run reads the last three days again. Amazon releases deferred transactions without changing their `postedDate`, so each run also reads again the transactions posted in the last 60 days that Amazon has since released. A transaction posted earlier than that and released later keeps its old status until the next full refresh.
- `inventory_summaries` is a full refresh, so every sync replaces it with the current stock of each SKU.

Amazon keeps order data for two years, except in Japan, Australia, and Singapore. A first sync reads as far back as Amazon allows.

### Vendor reports

Vendor reports come from the Reports API. Amazon builds each report on request, so a sync waits a few minutes per report.

- `vendor_sales`, `vendor_inventory`, and `vendor_net_pure_product_margin` hold one row per marketplace, ASIN, and day, and sync incrementally on `startDate`. A first sync reads the last four years, 7 days per report. The newest day in these tables is about four days old, because Amazon publishes a day's data about three days after it closes.
- `vendor_real_time_sales` holds ordered units and revenue per marketplace, ASIN, and hour, and syncs incrementally on `startTime`. Amazon keeps the last 30 days.
- `vendor_forecasts` holds the latest demand forecast, one row per marketplace, ASIN, and forecast week. Amazon keeps only the latest forecast, so each sync replaces the table.

Sales and inventory reports use the manufacturing view. Sales, inventory, and forecast reports cover the retail program only, so sourcing-view and Amazon Fresh data are not synced.

Buyer names, shipping addresses, tax registrations, gift messages, and product customizations are not synced, because they contain personal information.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Amazon rejected the client ID or client secret** – Amazon requires a new LWA client secret every 180 days, and the old one stops working seven days after you rotate it. Copy the current secret from the application's LWA credentials and update the source.
- **Amazon rejected the refresh token** – the authorization was revoked. Authorize the application again and update the refresh token in the source.
- **Amazon refused access to a table** – the application lacks the role the table needs. Add the role in the Solution Provider Portal, authorize the application again, and update the refresh token.
- **A vendor report fails** – the sync error reads "Amazon could not generate the … report" followed by Amazon's details. A report for the last few days can fail because Amazon has not published that period yet. For an older period, the sync asks for the report up to three times. Either way the sync stops at that period and the next sync asks again, so no later data is imported past the gap. If the same error repeats over several syncs, contact support with the details.
- **Slow first sync** – after a burst of 20 requests, Amazon allows about one orders request every three minutes, or about 2,000 orders an hour. `orders` and `order_items` read the same endpoint, so syncing both doubles the time. A first sync of a large account can take a day or more. Vendor reports allow about one new report a minute, so four years of a daily vendor table take several hours per marketplace, longer when several vendor tables sync together.

<TroubleshootingLink />
