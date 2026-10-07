---
title: Linking Xsolla as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Xsolla
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Xsolla connector syncs your payment and subscription data into PostHog, including transactions, subscriptions, payouts, reports, promotions, projects, and per-project subscription details.

## Prerequisites

You need an Xsolla merchant account with:

- **Merchant ID** – Find it in [Publisher Account](https://publisher.xsolla.com/) under **Company settings > Company**.
- **Company API key** – Create one in [Publisher Account](https://publisher.xsolla.com/) under **Company settings > API keys**. Use a **company** API key, not a project API key, because project keys cannot read merchant-level reports.

## Adding a data source

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and then click **Link** next to Xsolla.
3. Enter your **Merchant ID** (a numeric value, e.g. `123456`).
4. Enter your **API key** (the company API key from Publisher Account).
5. Click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

PostHog validates your credentials by calling the Xsolla API. If validation fails, check that the merchant ID is numeric and that you're using a company API key.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

### Merchant-scoped tables

These tables read data at the merchant level:

| Table           | Description                                            | Sync                                         |
| --------------- | ------------------------------------------------------ | -------------------------------------------- |
| `transactions`  | Payments made in your games, including incomplete ones | Full refresh or incremental on `create_date` |
| `subscriptions` | Subscriptions across all projects                      | Full refresh                                 |
| `payouts`       | Payouts from Xsolla to the merchant                    | Full refresh                                 |
| `reports`       | Monthly financial reports                              | Full refresh                                 |
| `promotions`    | Promotions configured for the merchant's projects      | Full refresh                                 |
| `projects`      | Projects in the merchant's Publisher Account           | Full refresh                                 |

### Project-scoped tables

These tables are read once per project that the merchant owns. Each row includes a `project_id` column, and the primary key is `(project_id, id)` because the Xsolla API does not guarantee globally unique IDs across projects.

| Table                   | Description                            | Sync         |
| ----------------------- | -------------------------------------- | ------------ |
| `subscription_payments` | Subscription charges for each project  | Full refresh |
| `subscription_plans`    | Subscription plans for each project    | Full refresh |
| `subscription_products` | Subscription products for each project | Full refresh |

## Sync details

- **Incremental sync** – Only the `transactions` table supports incremental syncing, using the `create_date` field. Incremental syncs start 7 days before the last watermark to catch status changes on recent transactions, such as refunds. All other tables use full refresh.

- **Windowed reads** – The `transactions` table is read in 7-day windows. The `payouts` and `reports` tables are read in 92-day windows, because Xsolla rejects report periods longer than 92 days.

- **Resumable syncs** – If a sync is interrupted, it resumes from the last completed window, project, and page offset on the next run.

- **Project fan-out** – For project-scoped tables (`subscription_payments`, `subscription_plans`, `subscription_products`), PostHog first lists the merchant's projects, then reads each project in turn.
