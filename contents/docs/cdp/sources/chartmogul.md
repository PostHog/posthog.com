---
title: Linking ChartMogul as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ChartMogul
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The ChartMogul connector syncs your subscription analytics data – customers, plans, plan groups, invoices, activities, and data sources – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to ChartMogul.
3. Next, you need an API key from ChartMogul. You can find it in your [ChartMogul admin settings](https://app.chartmogul.com/#/admin/api). Copy the API key value.
4. Back in PostHog, enter the credentials and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using ChartMogul data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `customers` | Customers in your ChartMogul account | Full refresh |
| `plans` | Subscription plans | Full refresh |
| `plan_groups` | Groups of subscription plans | Full refresh |
| `invoices` | Customer invoices | Full refresh |
| `activities` | Subscription activities, synced incrementally on `date` | Incremental |
| `data_sources` | Data sources configured in ChartMogul | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
