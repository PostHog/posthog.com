---
title: Linking Amplitude as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Amplitude
---

The Amplitude connector syncs your raw events, cohorts, annotations, event and property definitions, and retention, user composition, and revenue LTV charts into PostHog. It authenticates against Amplitude's Export API, Cohorts API, Annotations API, Taxonomy API, and Dashboard REST API using your project's API key and secret key.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Amplitude.
3. You need an API key and secret key from Amplitude. In Amplitude, go to **Settings → Organization settings → Projects** and open the project you want to sync. Copy the project's **API key** and **secret key**. Then choose your **Region** — **US (amplitude.com)** or **EU (analytics.eu.amplitude.com)** — to match where your Amplitude project is hosted.
4. Back in PostHog, enter the `API key`, `Secret key`, and `Region`, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Amplitude data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `events` | Raw events from Amplitude's Export API (only the last 30 days are pulled on the initial sync) | Incremental |
| `cohorts` | Behavioral cohorts from the Cohorts API | Full refresh |
| `annotations` | Dashboard annotations from the Annotations API | Full refresh |
| `retention` | Daily retention of new users who return with any event, from the Dashboard REST API (last 90 days) | Full refresh |
| `composition` | Unique users per value of each built-in user property, such as platform, country, and version, from the Dashboard REST API (last 90 days) | Full refresh |
| `revenue_ltv` | Daily lifetime value of new users for each revenue metric (ARPU, ARPPU, total revenue, and paying users), from the Dashboard REST API (last 90 days) | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

The events stream uses Amplitude's Export API, which enforces a roughly 2-hour data latency — events uploaded to Amplitude within the last couple of hours may not yet be available to sync. The initial sync only pulls the last 30 days of events; subsequent incremental syncs fetch newer data using server upload time as the cursor.

The `retention`, `composition`, and `revenue_ltv` tables cover the last 90 days. Their values keep changing until a cohort matures, so each sync replaces the whole table with the latest 90-day window. The `composition` table includes only Amplitude's built-in user properties, not custom properties.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
