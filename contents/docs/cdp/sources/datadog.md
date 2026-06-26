---
title: Linking Datadog as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Datadog
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Connect your Datadog account to sync logs, events, monitors, dashboards, and more into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Datadog.
3. Create an **API key** and an **application key** in your [Datadog organization settings](https://app.datadoghq.com/organization-settings/api-keys). Grant the application key read scopes for the data you want to sync, for example `dashboards_read`, `monitors_read`, `incident_read`, `slos_read`, `synthetics_read`, and `user_access_read`. Also note your **Datadog site** (for example US1 `datadoghq.com`, US3, US5, EU1 `datadoghq.eu`, AP1, or US1-FED `ddog-gov.com`).
4. Back in PostHog, select your **Datadog site**, enter the **API key** and **Application key**, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Datadog data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `logs` | Log events (limited to your account's retention window on initial sync) | Incremental |
| `audit_logs` | Audit log events (limited to your account's retention window on initial sync) | Incremental |
| `events` | Events (limited to your account's retention window on initial sync) | Incremental |
| `dashboards` | Dashboards | Full refresh |
| `monitors` | Monitors | Full refresh |
| `users` | Users | Full refresh |
| `incidents` | Incidents | Full refresh |
| `slos` | Service level objectives | Full refresh |
| `synthetic_tests` | Synthetic tests | Full refresh |
| `downtimes` | Downtimes | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Logs, audit logs, and events read access is governed by your Datadog account's data retention, so the first sync can only reach back as far as your account's retention window allows.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
