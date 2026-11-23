---
title: Linking Checkout.com as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CheckoutCom
---

The Checkout.com connector syncs your payments, payment actions, financial actions, customers, instruments, and disputes into the PostHog data warehouse. It also syncs your financial reporting data, where each report type your account generates becomes its own table.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Checkout.com.
3. Create an access key in the [Checkout.com dashboard](https://dashboard.checkout.com/) under **Settings > Access keys**, with the scopes for the tables you want to sync. See [required scopes](#required-scopes) below. Note whether your key is for the production or sandbox environment.
4. Back in PostHog, select the **Environment** that matches your access key (Production or Sandbox).
5. Enter your **Access key ID** and **Access key secret**. To sync more history than the default, set a **Start date**. Click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Checkout.com data in PostHog.

## Required scopes

Checkout.com grants scopes per endpoint, so a key that reads one table often cannot read another. Grant only the scopes for the tables you want.

| Table                           | Checkout.com scope                 |
| ------------------------------- | ---------------------------------- |
| `payments`                      | `payments`                         |
| `payment_actions`               | `gateway`                          |
| `financial_actions`             | `payments` and `financial-actions` |
| `customers` and `instruments`    | `vault`                            |
| `disputes`                      | `disputes`                         |
| `reports` and each report table  | `reports`                          |

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

### Payment tables

Checkout.com has no endpoint that lists every payment, so `payments` comes from the payments search API. `payment_actions`, `customers`, and `instruments` have no list endpoint at all. PostHog reads them one record at a time from the ids that the synced payments refer to. These tables therefore hold only the records a synced payment points to, not your full customer or instrument list. Payment methods that Checkout.com does not store in the vault, such as single-use tokens, have no endpoint to read and are skipped.

Payments search covers about the last 90 days. Set a **Start date** to reach further back. The endpoint serves older payments, and PostHog does not move the date you give it forward.

A large backfill can use up the API budget that PostHog allows a single sync run. The sync then stops with an error, keeps every window it finished, and continues from there on the next run. Repeated runs work through the full range.

### Financial actions

The `financial_actions` table reads settlement ledger entries directly from Checkout.com's [financial actions API](https://api-reference.checkout.com/tag/Financial-actions#operation/getFinancialActions). It includes captures, refunds, chargebacks, and fee breakdowns, with one row per action and a nested `breakdown` field. It does not require scheduled reports.

PostHog searches for payments, then fetches each payment's financial actions. The table uses the same 90-day default payment search range and **Start date** setting as the payment tables above.

Incremental syncs use `payment_requested_on`, the parent payment's request time. Actions added after that payment syncs, such as later refunds or chargebacks, need a full refresh to appear. The refresh must cover the original payment's request date. The `financial_actions_report` table syncs by `report_created_on`, so newly generated reports can supply later adjustments without a full refresh.

If the financial actions API is unavailable for your account, sync `financial_actions_report` instead, or contact Checkout.com support about API access.

### Report tables

Report tables read CSV files your account generates for financial actions, payouts, and balances. Each report type becomes its own table, named after the type. The `FinancialActions` report type becomes `financial_actions_report`, for example. This is separate from the direct `financial_actions` API table above and requires the `reports` scope.

Every report row carries the report and file it came from in its `report_id`, `report_created_on`, `report_from`, `report_to`, `report_entity_id`, `file_id`, and `file_row_index` columns. The remaining columns come from the report template, which you configure in Checkout.com.

If no report tables appear, set up scheduled reports in your Checkout.com dashboard first. PostHog finds the report tables from the reports your account has already generated, so an account with no reports has none to find. PostHog reads CSV report files only, and skips files in other formats.
