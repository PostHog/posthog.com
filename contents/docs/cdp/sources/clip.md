---
title: Linking Clip as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Clip
---

The Clip connector syncs your [Clip (PayClip)](https://clip.mx/) payment data into the PostHog data warehouse, including transactions, settlements, and settlement payments.

## Prerequisites

You need:

- A Clip merchant account
- An API key and secret key from the [Clip developer dashboard](https://dashboard.clip.mx/dashboard)
- Deposits API access if you want to sync settlement data (not available for Cuenta Digital accounts)

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Clip.
3. Get your API key and secret key from the [Clip developer dashboard](https://dashboard.clip.mx/dashboard).
4. Back in PostHog, enter your **API key**, **Secret key**, and a **Start date** (format: `YYYY-MM-DD`) to begin syncing transactions from, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Clip data in PostHog.

## Available tables

| Table                 | Description                                                                       | Sync method                                   |
| --------------------- | --------------------------------------------------------------------------------- | --------------------------------------------- |
| `transactions`        | Clip card transactions within the selected date range                             | Incremental (by `created_at`) or full refresh |
| `settlements`         | Deposits from the last 90 days, with amounts, fees, taxes, and transaction counts | Full refresh                                  |
| `settlement_payments` | Payments included in each deposit from the last 90 days                           | Full refresh                                  |

**Incremental** syncs capture new records using the `created_at` field. Use a **full refresh** to capture changes to existing transactions such as status updates.

**Full refresh** tables reload all data on each sync.

### Transactions

| Column       | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| `receipt_no` | Receipt number that identifies the transaction               |
| `created_at` | Date and time when Clip created the transaction              |
| `status`     | Transaction status, such as Paid or Cancelled                |
| `amount`     | Transaction amount before the tip                            |
| `tip`        | Tip amount for the transaction                               |
| `total`      | Total transaction amount                                     |
| `currency`   | Currency of the transaction                                  |
| `user_email` | Email address of the Clip user who processed the transaction |

### Settlements

| Column                 | Description                            |
| ---------------------- | -------------------------------------- |
| `settlement_report_id` | Identifier of the deposit report       |
| `disbursement_date`    | Date when Clip disbursed the deposit   |
| `gross_amount`         | Gross amount of the deposit            |
| `total_fee`            | Total fees for the deposit             |
| `total_tax`            | Total tax for the deposit              |
| `total_retention`      | Total amount retained from the deposit |
| `disbursed_net_amount` | Net amount disbursed to the merchant   |
| `total_transactions`   | Number of transactions in the deposit  |

### Settlement payments

| Column                 | Description                                |
| ---------------------- | ------------------------------------------ |
| `settlement_report_id` | Identifier of the parent deposit report    |
| `receipt_no`           | Receipt number that identifies the payment |
| `payment_date`         | Date of the payment                        |
| `amount`               | Payment amount before the tip              |
| `tip`                  | Tip amount for the payment                 |
| `settled_amount`       | Payment amount after retention             |
| `total_retention`      | Total amount retained from the payment     |

## Sync behavior

- **Transactions** sync from the configured start date using date windows of at most 30 days per request.
- **Settlements** and **settlement payments** sync the last 90 calendar days of data, bounded by the configured start date.
- Settlement tables start disabled by default because they require deposits API access.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### Authentication errors

If you see "Clip rejected your credentials", double-check your API key and secret key in the [Clip developer dashboard](https://dashboard.clip.mx/dashboard).

### Permission errors on settlement tables

If settlement syncs fail with a permission error, your Clip account may not have access to the deposits API. Accounts with Cuenta Digital can't use the deposits API – only the `transactions` table is available for those accounts.

For more help, see the [data warehouse troubleshooting guide](/docs/data-warehouse/troubleshooting).
