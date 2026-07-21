---
title: Linking pganalyze as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PgAnalyze
---

The pganalyze connector syncs Postgres performance findings – such as missing index recommendations, slow queries, vacuum issues, and server metadata – into PostHog.

To link pganalyze:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to pganalyze.

3. Enter your pganalyze API key. You can generate a read-only key from your [pganalyze API keys settings](https://app.pganalyze.com/settings/api-keys).

4. Enter your organization slug. This is the slug visible in your pganalyze URL (e.g., `https://app.pganalyze.com/organizations/your-org-slug`).

5. _Optional:_ If you're using a self-hosted pganalyze Enterprise Server, enter your custom API URL. Cloud users can leave this blank.

6. Select the tables you want to sync and modify the method and frequency as needed. Once done, click **Import**.

Once the syncs are complete, you can query pganalyze data in PostHog.

## Available tables

| Table   | Description                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------- |
| servers | Metadata about your monitored Postgres servers                                                          |
| issues  | Database performance findings such as missing indexes, vacuum problems, slow queries, and schema issues |

The **issues** table supports incremental syncing using the `synced_at` field. The **servers** table uses full refresh syncing since it contains dimensional data that changes infrequently.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
