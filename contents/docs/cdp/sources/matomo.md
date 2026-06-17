---
title: Linking Matomo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Matomo
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Connect your Matomo instance to pull web analytics data into the PostHog data warehouse. Works with both Matomo Cloud and self-hosted instances.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Matomo.
3. Enter your **Instance URL** – for example, `https://myorg.matomo.cloud` for Matomo Cloud or your self-hosted URL.
4. Enter your **Site ID** – the numeric ID for the site you want to import. You can find this in your Matomo instance under **Administration > Measurables/Websites > Manage**.
5. Create an API token in Matomo under **Administration > Personal > Security > Auth tokens** and paste it into the **API token** field.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can query your Matomo data in PostHog.

## Available tables

| Table             | Description                                               | Sync method |
| ----------------- | --------------------------------------------------------- | ----------- |
| `visits`          | Raw visit log with visitor details, actions, and metadata | Incremental |
| `visits_summary`  | Per-day aggregate visit statistics                        | Incremental |
| `actions_summary` | Per-day aggregate action statistics                       | Incremental |
| `referrers`       | Per-day referrer breakdown                                | Incremental |
| `countries`       | Per-day visitor country breakdown                         | Incremental |

**Incremental** tables sync only new or updated records on each run.

## Sync details

- The first sync backfills up to 365 days of history for all tables.
- The `visits` table uses `serverTimestamp` as its incremental cursor. Visits newer than one hour are deferred to the next sync to ensure their action lists are complete before storing.
- Aggregate report tables (`visits_summary`, `actions_summary`, `referrers`, `countries`) walk one day at a time and re-pull a 3-day trailing window on incremental runs to account for late archiving. Records are merged on `_date` (and `label` where applicable).

## Configuration

<SourceParameters />
