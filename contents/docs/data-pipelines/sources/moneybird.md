---
title: Linking Moneybird as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Moneybird
---

Moneybird is an accounting platform popular in the Netherlands and Belgium. The Moneybird connector syncs your accounting data — contacts, invoices, bank transactions, and more — into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Moneybird.
3. Enter your Moneybird **API token** and **Administration ID**. To get these:
   - Create a personal API token at [moneybird.com/user/applications/new](https://moneybird.com/user/applications/new). Select the scopes for the tables you want to sync: `sales_invoices`, `documents`, `estimates`, `bank`, `time_entries`, and `settings`.
   - Your Administration ID is the number after `moneybird.com/` in the address bar when you open your administration.
4. Click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Moneybird data in PostHog.

## Available tables

| Table                       | Description                                                                     | Sync method  |
| --------------------------- | ------------------------------------------------------------------------------- | ------------ |
| `contacts`                  | Customers, suppliers, and other business relations, including archived contacts | Incremental  |
| `sales_invoices`            | Invoices sent to customers for delivered products or services                   | Incremental  |
| `estimates`                 | Estimates (quotes) proposed to clients                                          | Full refresh |
| `external_sales_invoices`   | Sales invoices created in other systems and imported into Moneybird             | Full refresh |
| `recurring_sales_invoices`  | Templates for automatically recurring sales invoices                            | Incremental  |
| `purchase_invoices`         | Invoices received from suppliers                                                | Incremental  |
| `receipts`                  | Receipts that prove the payment of expenses                                     | Incremental  |
| `general_journal_documents` | Manual bookkeeping entries for corrections or adjustments                       | Incremental  |
| `general_documents`         | Financial documents that are not invoices, receipts, or estimates               | Incremental  |
| `financial_accounts`        | Bank accounts, credit cards, and other accounts that hold money                 | Full refresh |
| `financial_mutations`       | Transactions on financial accounts, such as bank transactions                   | Incremental  |
| `ledger_accounts`           | Categories of bookkeeping: revenue, expenses, assets, and liabilities           | Full refresh |
| `tax_rates`                 | VAT rates that apply to products and services                                   | Full refresh |
| `products`                  | Goods and services for invoices and estimates, including deactivated products   | Full refresh |
| `projects`                  | Projects that group time entries and financial data                             | Full refresh |
| `time_entries`              | Time spent on work for contacts and projects                                    | Full refresh |
| `subscription_templates`    | Templates that set products and prices for subscriptions                        | Full refresh |
| `users`                     | Users of the administration, including inactive users and accountants           | Full refresh |
| `workflows`                 | Workflows for sending, reminding, and collecting invoices and estimates         | Full refresh |
| `custom_fields`             | Custom fields added to sales invoices, contacts, and identities                 | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
