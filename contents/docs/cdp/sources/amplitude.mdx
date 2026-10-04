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

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Amplitude connector syncs your raw events, cohorts, and annotations into PostHog. It authenticates against Amplitude's Export API, Cohorts API, and Annotations API using your project's API key and secret key.

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

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

The events stream uses Amplitude's Export API, which enforces a roughly 2-hour data latency — events uploaded to Amplitude within the last couple of hours may not yet be available to sync. The initial sync only pulls the last 30 days of events; subsequent incremental syncs fetch newer data using server upload time as the cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
