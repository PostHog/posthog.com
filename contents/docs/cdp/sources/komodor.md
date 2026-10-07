---
title: Linking Komodor as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Komodor
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Connect your Komodor account to sync Kubernetes services, jobs, clusters, and monitors into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Komodor.
3. In Komodor, go to **User settings > API Keys** and create a new API key. Grant read access for the tables you want to sync.
4. Back in PostHog, select your **region** (US or EU), enter your **API key**, then click **Next**.
5. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using Komodor data in PostHog.

## Available tables

| Table      | Description                                                                       | Sync method  |
| ---------- | --------------------------------------------------------------------------------- | ------------ |
| `services` | Kubernetes services with their health status, latest deployment, and latest issue | Full refresh |
| `jobs`     | Kubernetes jobs and cron jobs with their status and issue details                 | Full refresh |
| `clusters` | Kubernetes clusters connected to Komodor                                          | Full refresh |
| `monitors` | Monitor configurations used to detect failures in Kubernetes infrastructure       | Full refresh |

All tables use **full refresh**, meaning all data is reloaded on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
