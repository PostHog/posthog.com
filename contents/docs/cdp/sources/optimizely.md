---
title: Linking Optimizely as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Optimizely
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Optimizely connector syncs your experimentation configuration data – projects, experiments, audiences, events, pages, and campaigns – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Optimizely.
3. You need a personal access token from Optimizely. In your Optimizely account, go to **Account Settings** > **API Access** and generate a personal access token. Tokens are non-expiring. See the [Optimizely personal access token docs](https://docs.developers.optimizely.com/web-experimentation/docs/personal-access-tokens) for details.
4. Back in PostHog, paste the token into the **Personal access token** field and click **Next**.
5. Select the tables you want to sync, set the sync frequency, then click **Import**.

Project-scoped tables (experiments, audiences, events, pages, campaigns) sync data across all projects the token can access. If a project doesn't support a particular feature surface (for example, campaigns on a non-Web project), that project is skipped automatically.

## Available tables

| Table         | Description                             | Sync method  |
| ------------- | --------------------------------------- | ------------ |
| `projects`    | Top-level Optimizely projects           | Full refresh |
| `experiments` | A/B tests and experiment configurations | Full refresh |
| `audiences`   | Audience targeting definitions          | Full refresh |
| `events`      | Custom conversion event definitions     | Full refresh |
| `pages`       | Page definitions for web experiments    | Full refresh |
| `campaigns`   | Web campaign configurations             | Full refresh |

All tables use **full refresh** sync. Optimizely's REST API v2 doesn't expose updated-since filters, and these are low-volume configuration entities, so a full refresh on each sync is the correct approach. Raw event-level data is only available through Optimizely's separate S3 Enriched Events Export and isn't covered by this connector.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
