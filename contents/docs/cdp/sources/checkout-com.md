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

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Checkout.com connector syncs your payments, payment actions, customers, instruments, and disputes into the PostHog data warehouse. It also syncs your financial reporting data, where each report type your account generates becomes its own table.

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

| Table                           | Checkout.com scope |
| ------------------------------- | ------------------ |
| `payments`                      | `payments`         |
| `payment_actions`               | `gateway`          |
| `customers` and `instruments`   | `vault`            |
| `disputes`                      | `disputes`         |
| `reports` and each report table | `reports`          |

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

### Payment tables

Checkout.com has no endpoint that lists every payment, so `payments` comes from the payments search API. `payment_actions`, `customers`, and `instruments` have no list endpoint at all. PostHog reads them one record at a time from the ids that the synced payments refer to. These tables therefore hold only the records a synced payment points to, not your full customer or instrument list. Payment methods that Checkout.com does not store in the vault, such as single-use tokens, have no endpoint to read and are skipped.

Payments search covers about the last 90 days. Set a **Start date** to reach further back. The endpoint serves older payments, and PostHog does not move the date you give it forward.

A large backfill can use up the API budget that PostHog allows a single sync run. The sync then stops with an error, keeps every window it finished, and continues from there on the next run. Repeated runs work through the full range.

### Report tables

Financial reporting data – financial actions, payouts, and balances – comes from the report files your account generates, not from an API you can query directly. Each report type becomes its own table, named after the type. The `FinancialActions` report type becomes `financial_actions_report`, for example.

Every report row carries the report and file it came from in its `report_id`, `report_created_on`, `report_from`, `report_to`, `report_entity_id`, `file_id`, and `file_row_index` columns. The remaining columns come from the report template, which you configure in Checkout.com.

If no report tables appear, set up scheduled reports in your Checkout.com dashboard first. PostHog finds the report tables from the reports your account has already generated, so an account with no reports has none to find. PostHog reads CSV report files only, and skips files in other formats.
