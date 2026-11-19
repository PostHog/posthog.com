---
title: Linking DoIt as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: DoIt
---

The DoIt connector syncs infrastructure cost reports, budgets, optimization insights, cost anomalies, invoices, billing assets, cost annotations, support tickets, and per-resource insight results into PostHog.

To link DoIt:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to DoIt.

3. Next, you need an API key from DoIt. To start, in your DoIt dashboard open up the [API key page](https://app.doit.com/profile/api), generate a key and note it down - you won't be able to view this key once you leave the page.

4. Back in PostHog, paste the API key in the `API key` field and hit **Next**.

5. On the next page, select the tables and reports you want to sync and modify the method and frequency as needed. Once done, click **Import**. New reports will show up in your schemas list periodically as they're created on DoIt.

Once the syncs are complete, you can start using DoIt data in PostHog.

## Available data

In addition to your saved cost reports, the DoIt connector provides eight fixed tables:

- **Budgets** – Spend limits for a scope of cloud costs over a period, with current utilization, forecast, and risk status.

- **Insights** – Optimization opportunities or risks found in the cloud environment, with aggregate savings and risk counts across affected resources.

- **Anomalies** – Cloud cost anomalies where spend exceeded the expected normal range for a service or SKU.

- **Invoices** – Current or historical DoIt invoices, with totals, outstanding balances, and payment status.

- **Assets** – Cloud billing accounts or licensed subscriptions (e.g. Google Workspace, Microsoft 365) that can be joined to cost data.

- **Annotations** – Notes attached to specific dates in cost reports, such as deployments or pricing changes.

- **SupportTickets** – Support requests opened with DoiT, including severity, status, and resolution details.

- **InsightResourceResults** – Per-resource results behind each optimization insight, showing savings or risk for individual cloud resources. Each row includes `insight_source` and `insight_key` columns that join back to the Insights table.

All eight tables sync as **full refresh** only. Reports can be synced incrementally.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
