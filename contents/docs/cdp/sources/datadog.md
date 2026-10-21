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

Connect your Datadog account to sync logs, events, monitors, dashboards, and more into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Datadog.
3. Create an **API key** and an **application key** in your [Datadog organization settings](https://app.datadoghq.com/organization-settings/api-keys). Grant the application key read scopes for the data you want to sync, for example `dashboards_read`, `monitors_read`, `incident_read`, `slos_read`, `synthetics_read`, `user_access_read`, `error_tracking_read`, and `apm_read`. Also note your **Datadog site** (for example US1 `datadoghq.com`, US3, US5, EU1 `datadoghq.eu`, AP1, or US1-FED `ddog-gov.com`).
4. Back in PostHog, select your **Datadog site**, enter the **API key** and **Application key**, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Datadog data in PostHog.

## Available tables

| Table                   | Description                                                                               | Sync method  |
| ----------------------- | ----------------------------------------------------------------------------------------- | ------------ |
| `logs`                  | Log events (limited to your account's retention window on initial sync)                   | Incremental  |
| `audit_logs`            | Audit log events (limited to your account's retention window on initial sync)             | Incremental  |
| `events`                | Events (limited to your account's retention window on initial sync)                       | Incremental  |
| `dashboards`            | Dashboards                                                                                | Full refresh |
| `monitors`              | Monitors                                                                                  | Full refresh |
| `users`                 | Users                                                                                     | Full refresh |
| `incidents`             | Incidents                                                                                 | Full refresh |
| `slos`                  | Service level objectives                                                                  | Full refresh |
| `synthetic_tests`       | Synthetic tests                                                                           | Full refresh |
| `downtimes`             | Downtimes                                                                                 | Full refresh |
| `error_tracking_issues` | Error Tracking issues, off by default (requires `error_tracking_read` scope)              | Full refresh |
| `monitor_alerts`        | Firing monitor alerts from the last 7 days, off by default (requires `events_read` scope) | Full refresh |
| `error_spans`           | APM error spans only, off by default (requires `apm_read` scope)                          | Incremental  |
| `error_logs`            | Error-level logs only, off by default (requires `logs_read_data` scope)                   | Incremental  |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Logs, audit logs, events, error spans, error logs, and monitor alerts are governed by your Datadog account's data retention, so the first sync can only reach back as far as your account's retention window allows.

## Inbox signal sources

The `error_tracking_issues`, `monitor_alerts`, `error_spans`, `error_logs`, and `incidents` tables can feed into the [self-driving inbox](/docs/self-driving/inbox/sources) as signal sources. Once synced, these tables surface actionable errors and alerts for investigation alongside other signal sources like Sentry or Rollbar.

To enable Datadog as an inbox signal source, sync the relevant tables and then enable the Datadog source in your inbox settings.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
