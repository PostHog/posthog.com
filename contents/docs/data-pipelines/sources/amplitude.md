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

The Amplitude connector syncs your raw events, cohorts, annotations, retention data, user composition, revenue LTV, lookup table definitions, experiments, flags, and deployments into PostHog. It authenticates using your project's API key and secret key. To sync experiments, flags, and deployments, you also need a Management API key.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Amplitude.
3. You need an API key and secret key from Amplitude. In Amplitude, go to **Settings → Organization settings → Projects** and open the project you want to sync. Copy the project's **API key** and **secret key**. Then choose your **Region** — **US (amplitude.com)** or **EU (analytics.eu.amplitude.com)** — to match where your Amplitude project is hosted.
4. _(Optional)_ To sync experiments, flags, and deployments, add a **Management API key**. In Amplitude, go to **Experiment → Management API** and create a key.
5. Back in PostHog, enter the `API key`, `Secret key`, `Region`, and optionally the `Management API key`, then click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Amplitude data in PostHog.

## Available tables

| Table           | Description                                                                                                                                 | Sync method  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `events`        | Raw events from Amplitude's Export API (only the last 30 days are pulled on the initial sync)                                               | Incremental  |
| `cohorts`       | Behavioral cohorts from the Cohorts API                                                                                                     | Full refresh |
| `annotations`   | Dashboard annotations from the Annotations API                                                                                              | Full refresh |
| `retention`     | Daily N-day retention of new users who return with any event, from the Dashboard REST API. Covers the last 90 days.                         | Full refresh |
| `composition`   | Unique users per value of built-in user properties (e.g. platform, country, version), from the Dashboard REST API. Covers the last 90 days. | Full refresh |
| `revenue_ltv`   | Lifetime value of new users per cohort date, from the Dashboard REST API. Covers the last 90 days.                                          | Full refresh |
| `lookup_tables` | Lookup table definitions. Requires a Growth or Enterprise plan with the Govern add-on.                                                      | Full refresh |
| `experiments`   | Experiments, including archived ones. Requires a Management API key.                                                                        | Full refresh |
| `flags`         | Feature flags, including archived ones. Requires a Management API key.                                                                      | Full refresh |
| `deployments`   | Deployments that flags and experiments are assigned to. Requires a Management API key.                                                      | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

Tables that require a Management API key show a permission message in the schema picker if the key isn't provided.

## Sync limitations

The events stream uses Amplitude's Export API, which enforces a roughly 2-hour data latency — events uploaded to Amplitude within the last couple of hours may not yet be available to sync. The initial sync only pulls the last 30 days of events; subsequent incremental syncs fetch newer data using server upload time as the cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
