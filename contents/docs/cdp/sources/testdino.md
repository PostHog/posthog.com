---
title: Linking TestDino as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TestDino
---

The TestDino connector syncs test runs, manual test suites, and manual test cases from your TestDino project into PostHog.

> **Note:** This source is currently in **alpha**.

## Prerequisites

You need a TestDino account with a personal access token and a project ID. The token must have access to the project you want to sync.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to TestDino.

3. You need a personal access token from TestDino. In your TestDino account, go to **User Settings** > **Personal Access Tokens** and create a new token. Make sure the token has access to your project.

4. Back in PostHog, enter the following:
   - **Personal access token** – paste your token (starts with `td_pat_...`)
   - **Project ID** – your TestDino project ID (e.g., `project_abc123`). Only letters, numbers, underscores, and hyphens are allowed.

5. Click **Next**, select the tables you want to sync, and click **Import**.

Once the syncs are complete, you can start using TestDino data in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync methods

All three tables – `test_runs`, `manual_suites`, and `manual_cases` – use full refresh sync only. Incremental sync isn't available because TestDino's start-time filters can't detect later status changes (e.g., a run that moves from "running" to "passed").

## Limitations

- **Manual cases** – TestDino's API doesn't paginate the manual test cases endpoint. If your project has 1,000 or more manual test cases, the import fails. Disable the `manual_cases` table if this applies to your project.
- **API version** – the connector is pinned to TestDino API v1.

For more details, see the [TestDino API reference](https://docs.testdino.com/api-reference/conventions).
