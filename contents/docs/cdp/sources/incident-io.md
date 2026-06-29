---
title: Linking incident.io as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: IncidentIo
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The incident.io connector syncs your incident management data – incidents, alerts, escalations, follow-ups, users, schedules, and configuration – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to incident.io.
3. Create an API key in your [incident.io dashboard](https://app.incident.io/settings/api-keys). API keys have per-resource permissions – grant the `view` scope for each resource you want to sync (incidents, follow-ups, alerts, users, and so on).
4. Back in PostHog, paste your API key and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using incident.io data in PostHog.

## Available tables

| Table               | Description                                 | Sync method  |
| ------------------- | ------------------------------------------- | ------------ |
| `incidents`         | Incidents tracked in incident.io            | Incremental  |
| `incident_updates`  | Updates posted to incidents                 | Full refresh |
| `follow_ups`        | Follow-up action items from incidents       | Full refresh |
| `alerts`            | Alerts that triggered incidents             | Full refresh |
| `escalations`       | Escalation events                           | Full refresh |
| `users`             | Users in your incident.io account           | Full refresh |
| `schedules`         | On-call schedules                           | Full refresh |
| `severities`        | Severity levels configured in your account  | Full refresh |
| `incident_roles`    | Roles that can be assigned during incidents | Full refresh |
| `incident_statuses` | Status options for incidents                | Full refresh |
| `incident_types`    | Types of incidents configured               | Full refresh |
| `custom_fields`     | Custom fields configured in your account    | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

Only the `incidents` table supports incremental sync because it's the only endpoint with both server-side timestamp filters and a sortable order. The remaining tables either lack timestamp filters or don't support sorting, so they use full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
