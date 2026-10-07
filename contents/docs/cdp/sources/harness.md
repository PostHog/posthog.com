---
title: Linking Harness as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Harness
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Harness connector syncs your CI/CD pipeline data – pipelines, executions, services, and environments – into the PostHog data warehouse, so you can analyze your deployment activity alongside your product data.

## Prerequisites

You need a [Harness](https://harness.io/) account with API access. Each connection imports data from one account, organization, and project scope.

To create an API key token:

1. In Harness, go to **My Profile** > **My API Keys**.
2. Create an API key and add a token.
3. Grant the token view permission for pipelines, executions, services, and environments in your project.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Harness.
3. Enter your connection details:
   - **API key token** – the token you created in Harness.
   - **Account ID** – your Harness account ID.
   - **Organization ID** – the organization containing your project (defaults to `default`).
   - **Project ID** – the Harness project to import from.
   - **Region** – select the host that matches your Harness account URL. Supported hosts are `app.harness.io`, `app3.harness.io`, `accounts.harness.io`, and `accounts.eu.harness.io`. Self-managed hosts aren't supported.
4. Click **Next**.
5. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using Harness data in PostHog.

## Available tables

| Table          | Description                                                        | Sync method  |
| -------------- | ------------------------------------------------------------------ | ------------ |
| `pipelines`    | Pipeline summaries in the selected Harness project                 | Full refresh |
| `executions`   | Pipeline executions, including status, timing, and stage counts    | Full refresh |
| `services`     | Services configured for deployment in the selected Harness project | Full refresh |
| `environments` | Deployment environments in the selected Harness project            | Full refresh |

**Full refresh** tables reload all data on each sync.

## Sync limitations

All Harness tables use full refresh only. Execution queue-time filters could miss later status changes on older executions, so incremental sync isn't supported.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
