---
title: Linking LogicMonitor as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Logicmonitor
---

Connect your LogicMonitor account to sync alerts, devices, collectors, scheduled downtimes, audit logs, ops notes, and more into the PostHog data warehouse.

## Prerequisites

You need a bearer token from your LogicMonitor portal:

1. In LogicMonitor, go to **Settings** > **Users & Roles** > **API Tokens** > **Bearer**.
2. Create a new bearer token.
3. Give the token's user view permission for the resources you want to sync:

| Table                | Required permission |
| -------------------- | ------------------- |
| `alerts`             | Resources           |
| `devices`            | Resources           |
| `device_groups`      | Resources           |
| `collectors`         | Collectors          |
| `sdts`               | Dashboards          |
| `websites`           | Websites            |
| `collector_groups`   | Settings            |
| `ops_notes`          | Settings            |
| `audit_logs`         | Settings            |
| `device_sdt_history` | Resources           |

You only need to grant permissions for the tables you plan to sync.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to LogicMonitor.
3. Enter your **Portal URL** – this must be an HTTPS URL and a direct subdomain of `logicmonitor.com` (for example `https://example.logicmonitor.com`).
4. Enter your **Bearer token**.
5. Click **Next**.
6. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using LogicMonitor data in PostHog.

## Available tables

| Table                | Description                                                                                               | Sync method  |
| -------------------- | --------------------------------------------------------------------------------------------------------- | ------------ |
| `alerts`             | Alerts for monitored resources, including active and cleared alerts within the account's retention period | Full refresh |
| `devices`            | Monitored device inventory and collector assignments                                                      | Full refresh |
| `device_groups`      | Groups that organize monitored devices                                                                    | Full refresh |
| `collectors`         | Collectors, their availability, and the number of devices they monitor                                    | Full refresh |
| `sdts`               | Scheduled downtime for resources and monitoring components                                                | Full refresh |
| `websites`           | Website monitors and their alert settings                                                                 | Full refresh |
| `audit_logs`         | Audit log entries that record user and API actions in the portal                                          | Incremental  |
| `collector_groups`   | Collector groups that organize collectors and balance monitoring load                                     | Full refresh |
| `device_sdt_history` | Past scheduled downtime periods that suppressed alerts for each device                                    | Full refresh |
| `ops_notes`          | Ops notes that annotate graphs and dashboards with operational events                                     | Full refresh |

**Full refresh** tables reload all data on each sync. **Incremental** tables sync only new data since the last sync.

## Sync limitations

- Most tables use full refresh. Alerts use full refresh because an incremental watermark would miss later acknowledgments and clear events on older alerts. The `audit_logs` table uses incremental sync based on `happenedOn`.
- Inventory syncs exclude certain sensitive fields such as device properties, collector tokens, and collector configuration.
- A sync fails if a one-second time window contains more than 10,000 alerts. Contact support if you need to export dense alert history.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
