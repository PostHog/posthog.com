---
title: Linking Holded as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Holded
---

<CalloutBox type="info" title="Beta">

The Holded source is currently in beta.

</CalloutBox>

The Holded connector syncs invoices, purchases, payments, contacts, products, accounting, CRM, project, and team data from your Holded account into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Holded.

3. Next, you need an API key from Holded. In your Holded dashboard, go to **Settings** > **API** and create a new key. Give it read permission for the tables you want to sync, and the `account:info.read` permission so PostHog can verify the key.

4. Back in PostHog, paste the API key into the **API key** field and click **Next**.

5. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using Holded data in PostHog.

<CalloutBox type="caution" title="API quota">

Holded plans have a monthly API call quota. Each sync reads every selected table in full and uses calls from your quota, so select only the tables you need.

</CalloutBox>

## Available tables

All Holded tables sync via **full table refresh**. The Holded API doesn't filter by modification time, so incremental sync isn't available.

### Sales documents

| Table            | Description          | Sync method  |
| ---------------- | -------------------- | ------------ |
| `invoices`       | Sales invoices       | Full refresh |
| `credit_notes`   | Sales credit notes   | Full refresh |
| `sales_receipts` | Sales receipts       | Full refresh |
| `estimates`      | Estimates and quotes | Full refresh |
| `proformas`      | Proforma invoices    | Full refresh |
| `sales_orders`   | Sales orders         | Full refresh |
| `waybills`       | Delivery waybills    | Full refresh |
| `receipt_notes`  | Receipt notes        | Full refresh |

### Purchase documents

| Table                | Description        | Sync method  |
| -------------------- | ------------------ | ------------ |
| `purchases`          | Purchase invoices  | Full refresh |
| `purchase_refunds`   | Purchase refunds   | Full refresh |
| `purchase_orders`    | Purchase orders    | Full refresh |
| `purchase_shipments` | Purchase shipments | Full refresh |
| `payments`           | Payments           | Full refresh |

### Catalog and contacts

| Table            | Description                                 | Sync method  |
| ---------------- | ------------------------------------------- | ------------ |
| `contacts`       | Contacts (customers and suppliers)          | Full refresh |
| `contact_groups` | Contact groups                              | Full refresh |
| `products`       | Products in the catalog                     | Full refresh |
| `services`       | Services in the catalog (includes archived) | Full refresh |
| `warehouses`     | Warehouses                                  | Full refresh |

### Accounting and treasury

| Table                 | Description                                     | Sync method  |
| --------------------- | ----------------------------------------------- | ------------ |
| `ledger_entries`      | Ledger entries (one row per line)               | Full refresh |
| `accounting_accounts` | Chart of accounts (includes archived and empty) | Full refresh |
| `taxes`               | Tax configurations                              | Full refresh |
| `treasury_accounts`   | Treasury accounts                               | Full refresh |
| `payment_methods`     | Payment methods                                 | Full refresh |

### CRM

| Table     | Description   | Sync method  |
| --------- | ------------- | ------------ |
| `funnels` | Sales funnels | Full refresh |
| `leads`   | CRM leads     | Full refresh |
| `events`  | CRM events    | Full refresh |

### Projects

| Table           | Description               | Sync method  |
| --------------- | ------------------------- | ------------ |
| `projects`      | Projects                  | Full refresh |
| `tasks`         | Project tasks             | Full refresh |
| `project_times` | Time entries for projects | Full refresh |

### Team

| Table            | Description           | Sync method  |
| ---------------- | --------------------- | ------------ |
| `employees`      | Employees             | Full refresh |
| `employee_times` | Employee time entries | Full refresh |

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### Sync failing with an authentication error

If your sync fails with a 401 or 403 error, your API key is invalid, expired, or missing the required permissions. Create a new key in Holded under **Settings** > **API** with read permission for the tables you want to sync and the `account:info.read` permission, then reconnect the source.

### Sync failing for a specific table

If a single table fails with a 403 error, the API key doesn't have read permission for that table. Either update the key's permissions in Holded or deselect the table in PostHog.
