---
title: Linking Notion as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Notion
---

The Notion connector syncs your Notion workspace data into PostHog, including pages, databases, users, blocks, and comments.

## Adding a data source

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select Notion by clicking the **Link** button.
3. Get your integration token:
   - Go to [notion.so/my-integrations](https://www.notion.so/my-integrations) and click **+ New integration**.
   - Give your integration a name and select the workspace you want to sync.
   - Under **Capabilities**, ensure **Read content** is enabled.
   - Copy the **Internal Integration Secret** (starts with `ntn_` or `secret_`).
4. Paste your integration token into PostHog.
5. _Optional:_ Add a prefix to your table names.
6. Click **Next**.

<CalloutBox icon="IconWarning" title="Share pages with your integration" type="action">

Each page and database you want to sync must be explicitly shared with your integration. Open the page in Notion, click the **•••** menu in the top right, select **Connections**, and add your integration. Pages not shared with the integration won't appear in the sync.

</CalloutBox>

The data warehouse then starts syncing your Notion data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Available tables

The Notion source syncs the following tables:

| Table     | Description                                                            |
| --------- | ---------------------------------------------------------------------- |
| pages     | All pages shared with your integration                                 |
| databases | All database objects shared with your integration                      |
| users     | All users in your workspace                                            |
| blocks    | Content blocks within synced pages (paragraphs, headings, lists, etc.) |
| comments  | Comments on synced pages                                               |

## Sync modes

Notion tables support **full refresh only**. Each sync re-downloads all data from Notion. Incremental syncing isn't available because Notion's API only sorts by last edited time but doesn't support server-side filtering by it.

For large workspaces, syncs may take longer due to Notion's rate limits (~3 requests/second). The blocks and comments tables fan out across all synced pages, so workspaces with many deeply nested pages will take the longest.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
