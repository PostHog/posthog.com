---
title: Linking AppsFlyer as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AppsFlyer
---

Enter your AppsFlyer credentials to pull aggregate reports, raw data reports, the Master API report, and the SKAN performance report into the PostHog Data Warehouse. Each source connects to a single AppsFlyer app.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to AppsFlyer.
3. In AppsFlyer, go to your **account menu** > **Security center** > **AppsFlyer API tokens** and copy your **API token (V2)**. Your account must have an active Pull API subscription.
4. In AppsFlyer, open **My apps** and copy the **App ID** shown under the app name, for example, `id123456789` for iOS or `com.example.app` for Android.
5. Back in PostHog, enter the **App ID** and **API token (V2)**, then click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using AppsFlyer data in PostHog.

The raw data tables, the `master_report` table, and the `skan_performance_report` table need an AppsFlyer subscription that includes them. The `skan_performance_report` table is for iOS apps only. The Protect360 tables (`blocked_installs`, `blocked_in_app_events`, and `post_attribution_installs`) also need the Protect360 add-on, so they start unselected.

## Sync behavior

Each source connects to a single AppsFlyer app. To import data from multiple apps, create a separate source for each one.

### Aggregate reports

The `daily_report`, `geo_report`, and `partners_report` tables sync incrementally on the `date` field.

- The first sync can pull up to about 1,000 days of history. This is the maximum date range of the AppsFlyer aggregate Pull API.
- AppsFlyer finalizes aggregate data about 48 hours after the UTC day ends. Each incremental sync fetches the last two days again to get late data. Rows with the same primary key are merged.

### Raw data reports

The install, reinstall, in-app event, uninstall, and ad revenue tables sync incrementally on the `event_time` field. This includes their organic and retargeting versions, and the `blocked_installs` and `blocked_in_app_events` tables.

- AppsFlyer limits raw data to the last 90 days, so the first sync reads the last 90 days.
- The connector requests raw data in 7-day windows. Each incremental sync fetches the last 7 days again.
- AppsFlyer returns a maximum of 1,000,000 rows for each request and drops the rest without an error. If a 7-day window has more rows than this, the table is missing rows for that window.

The `post_attribution_installs` table has no incremental field. AppsFlyer adds a row to this report when it detects fraud, which can occur after the install date. Each sync reads the full 90-day window again.

The postback tables (`install_postbacks`, `in_app_event_postbacks`, `retargeting_install_postbacks`, and `retargeting_in_app_event_postbacks`) sync with full refresh only. AppsFlyer can send one install or event to several partners, and it sends a failed postback again, so the same event can have more than one row. Each sync reads the full 90-day window again.

### Master API report

The `master_report` table syncs incrementally on the `install_time` field.

- The first sync pulls up to 365 days of history, in 31-day windows.
- The LTV values in this report change after the install date. Each incremental sync fetches the last 31 days again.

### SKAN performance report

The `skan_performance_report` table contains aggregate SKAdNetwork (SKAN) data for iOS apps. It syncs incrementally on the `date` field.

- The first sync pulls up to 365 days of history, in 30-day windows.
- AppsFlyer finalizes SKAN data 3 days after the UTC day ends, so each sync stops 3 days before the current date.
- SKAN postbacks can arrive up to 45 days after the install date. Each incremental sync fetches the last 45 days again.
- AppsFlyer returns a maximum of 250,000 rows for each request. If a 30-day window has more rows than this, the table is missing rows for that window.

## Troubleshooting

### Daily report API quota exhausted

AppsFlyer limits the number of Pull API reports that you can get each day, for each report and app. The quotas reset at 00:00 UTC. For the limits, see AppsFlyer's [report generation quotas](https://support.appsflyer.com/hc/en-us/articles/207034366-Report-generation-quotas-rate-limitations).

If setup reports that your AppsFlyer account has used up its daily report API quota, try connecting again after the quota resets. This message indicates a quota limit, so changing valid credentials won't resolve it.

AppsFlyer can return HTTP `403` or `429` with `limit reached` in the response body when the quota is exhausted. PostHog retries sync requests that receive these responses. If the sync still fails, run it again after 00:00 UTC.

A sync can also fail with "AppsFlyer rejected the report request." PostHog doesn't retry this error. It can occur when the daily quota for that report is used up. Run the sync again after 00:00 UTC. If it fails again, check that your subscription includes the report.

### Invalid credentials or app access

For other authentication or access errors, check the API token (V2), your access to the app, the App ID from **My apps**, and whether your AppsFlyer subscription includes the report that you sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
