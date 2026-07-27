---
title: Linking PagerDuty as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PagerDuty
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The PagerDuty connector pulls your PagerDuty incident and on-call data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to PagerDuty.
3. You need a PagerDuty REST API key. In your PagerDuty account, go to **Integrations → API Access Keys** and create a key, selecting the **Read-only** option — that's all this source needs.
4. Back in PostHog, enter the key in the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using PagerDuty data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `incidents` | Incidents in your account | Incremental |
| `log_entries` | Log entries recording activity on incidents | Full refresh |
| `services` | Services that incidents are raised against | Full refresh |
| `users` | PagerDuty users | Full refresh |
| `teams` | Teams in your account | Full refresh |
| `escalation_policies` | Escalation policies | Full refresh |
| `schedules` | On-call schedules | Full refresh |
| `priorities` | Incident priorities | Full refresh |
| `vendors` | Integration vendors | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Incremental sync on `incidents` filters on `created_at`, so it only picks up newly created incidents. Status changes to incidents created before the cursor are not re-fetched.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
