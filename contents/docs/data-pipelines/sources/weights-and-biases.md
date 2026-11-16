---
title: Linking Weights & Biases as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: WeightsAndBiases
---

The Weights & Biases connector syncs your ML experiment tracking data into PostHog, including projects, runs, per-step run metric history, sweeps, reports, artifact versions, artifact collections and types, run-to-artifact lineage, and entity members across every project in your entity.

<CalloutBox icon="IconInfo" title="What this source syncs" type="fyi">

The `runs` table includes each run's final summary metrics. The `run_history` table includes the metrics each run logged, with one row per step. This table can be very large.

</CalloutBox>

## Prerequisites

You need a Weights & Biases account and an API key. API keys are personal and grant access to everything your user can see, so consider a service account for team syncs.

## Adding a data source

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.

2. Click **+ New source** and then click **Link** next to Weights & Biases.

3. Get your API key from [wandb.ai/authorize](https://wandb.ai/authorize) and paste it into the **API key** field.

4. Enter the **Entity** whose projects you want to sync. This is your W&B username or team name, the first segment of your project URLs (`wandb.ai/<entity>/<project>`).

5. If you use W&B Dedicated Cloud or a self-managed server, set the **Host** to your deployment's URL (for example `https://acme.wandb.io`). Leave it empty for W&B SaaS cloud.

6. Click **Next**.

7. On the next page, select the tables you want to sync and configure the sync method and frequency. Click **Import**.

Once the sync completes, you can start querying your Weights & Biases data in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync details

- **Incremental sync** – The `runs` table supports incremental syncs on `createdAt` or `heartbeatAt`. PostHog filters server-side, so only matching runs are fetched on each sync. Pick `heartbeatAt` to also pick up state and summary metric changes on recently active runs; a `createdAt` cursor only fetches newly created runs. The `run_history` and `run_artifacts` tables support incremental syncs on `runHeartbeatAt`, the parent run's heartbeat. Each sync reads again the history or artifacts of the runs that were active since the last sync. The other tables are full refresh.
- **JSON columns** – Run `config`, `summaryMetrics`, and `systemMetrics` are JSON-encoded strings, matching what the W&B API returns. The `run_history` `metrics` column is also a JSON-encoded string, keyed by metric name. Parse them in queries with `JSONExtract` functions.
- **Partitioning** – Data is partitioned by month on the `createdAt` field. The `run_history` and `run_artifacts` tables are partitioned on `runCreatedAt`. The `members` table is not partitioned.
- **Members** – Runs, sweeps, and reports identify their user by username, not by user ID. Join them to the `members` table on `username`.
- **Pagination** – Uses cursor pagination. If a sync is interrupted, it resumes from the last successfully synced page.
- **Rate limits** – The W&B API allows roughly 50 requests per minute on free plans and 200 on paid plans. PostHog backs off and retries automatically, but very large entities can take a while to sync.

## Troubleshooting

- **Invalid API key** – The key may have been revoked. Generate a new one at [wandb.ai/authorize](https://wandb.ai/authorize) and update the source credentials.
- **Tables sync but are empty** – Check the entity name. It must match the username or team that owns your projects exactly.
