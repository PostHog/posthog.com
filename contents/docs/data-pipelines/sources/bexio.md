---
title: Linking Bexio as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Bexio
---

The Bexio connector syncs your Bexio business management and accounting data into PostHog, including contacts, invoices, quotes, orders, bills, expenses, projects, timesheets, journal entries, and the chart of accounts.

## Prerequisites

You need a Bexio account and a personal access token.

Create a personal access token in the [bexio developer portal](https://developer.bexio.com/pat). A personal access token has access to every default scope, so no additional permissions are needed.

<CalloutBox type="warning" title="Tokens expire after 60 days">

Bexio personal access tokens expire after 60 days. Create a new token and update your source before the old one expires, or syncs will fail with a 401 error.

</CalloutBox>

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Bexio.
3. Paste your **Personal access token** from the bexio developer portal and click **Next**.
4. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Bexio data in PostHog.

## Sync modes

Bexio tables sync in one of two modes depending on whether the Bexio API supports filtering by last update:

- **Incremental sync** – Only syncs records where `updated_at` is on or after the last sync. This is faster and cheaper for large tables. Available for contacts, contact relations, invoices, quotes, and orders.
- **Full refresh** – Reloads all data on each sync. Used for tables where the Bexio API has no server-side change filter.

## Available tables

| Table               | Description                                       | Sync method  |
| ------------------- | ------------------------------------------------- | ------------ |
| `contacts`          | Companies and people in the address book          | Incremental  |
| `contact_groups`    | Groups used to categorize contacts                | Full refresh |
| `contact_relations` | Links between two contacts                        | Incremental  |
| `invoices`          | Sales invoices sent to customers                  | Incremental  |
| `quotes`            | Quotes (offers) sent to customers                 | Incremental  |
| `orders`            | Sales orders confirmed with customers             | Incremental  |
| `deliveries`        | Delivery notes for goods shipped to customers     | Full refresh |
| `purchase_orders`   | Purchase orders sent to suppliers                 | Full refresh |
| `bills`             | Supplier bills recorded in purchases              | Full refresh |
| `expenses`          | Expenses paid directly                            | Full refresh |
| `items`             | Products and services in the item catalog         | Full refresh |
| `projects`          | Projects used to group time, tasks, and documents | Full refresh |
| `timesheets`        | Time entries recorded by users                    | Full refresh |
| `tasks`             | Tasks assigned to users                           | Full refresh |
| `notes`             | Notes recorded on contacts and projects           | Full refresh |
| `accounts`          | Accounts of the chart of accounts                 | Full refresh |
| `account_groups`    | Groups that structure the chart of accounts       | Full refresh |
| `journal_entries`   | Bookings in the general ledger journal            | Full refresh |
| `manual_entries`    | Bookings entered by hand in the accounting module | Full refresh |
| `business_years`    | Business years of the accounting                  | Full refresh |
| `bank_accounts`     | Bank accounts set up in banking                   | Full refresh |
| `currencies`        | Currencies available in the company               | Full refresh |
| `taxes`             | Tax rates set up for sales and purchases          | Full refresh |
| `users`             | Users of the Bexio company                        | Full refresh |

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### Sync failing with 401 Unauthorized

Bexio rejected your personal access token. Tokens expire after 60 days. Create a new token in the [bexio developer portal](https://developer.bexio.com/pat) and update the source.

### Sync failing with 403 Forbidden

Your Bexio user can't read one of the tables you sync. Ask a Bexio admin to give your user access to that data, or turn off the table in PostHog.
