---
title: Linking Culture Amp as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CultureAmp
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Sync your Culture Amp employee experience data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Culture Amp.
3. In Culture Amp, go to **Settings** > **Integrations** > **Culture Amp API** (requires admin access) and create API credentials. Note down the **Client ID**, **Client secret**, and **Account ID** (the entity ID shown alongside your credentials). Grant the following read permissions:
   - `employees-read`
   - `employee-demographics-read`
   - `performance-evaluations-read`
4. Back in PostHog, enter the Client ID, Client secret, and Account ID, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Culture Amp data in PostHog.

## Available tables

| Table                   | Description                                               | Sync method                  |
| ----------------------- | --------------------------------------------------------- | ---------------------------- |
| `employees`             | Employee profiles                                         | Full refresh                 |
| `employee_demographics` | Employee demographic data (name/value pairs per employee) | Full refresh                 |
| `performance_cycles`    | Performance evaluation cycles                             | Full refresh and incremental |
| `manager_reviews`       | Manager review data                                       | Full refresh and incremental |

**Incremental** tables sync only new or updated records on each run using the `processedAt` field. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
