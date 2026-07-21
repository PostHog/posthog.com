---
title: Linking Ortto as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Ortto
---

The Ortto connector syncs your marketing data into PostHog, including people, accounts, audiences, tags, and custom field definitions.

> **Note:** This source is currently in **alpha**. Behavior may change as it matures.

## Adding a data source

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and the **Sources** tab in PostHog.
2. Click **+ New source** and select **Ortto**.
3. Enter your Ortto API key. You can create one in Ortto under **Settings** > **API keys**.
4. Select the **region** your Ortto instance lives in: **Global**, **Australia**, or **Europe**. Your API key only works with its associated region.
5. _Optional:_ Add a prefix to your table names.
6. Select the tables you want to import.
7. Click **Import**.

The data warehouse then starts syncing your Ortto data. You can see details, progress, and rows synced in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Available tables

| Table                 | Sync mode    | Description                                     |
| --------------------- | ------------ | ----------------------------------------------- |
| people                | Full refresh | Contact records with built-in and custom fields |
| accounts              | Full refresh | Organization and account records                |
| audiences             | Full refresh | Audience segments                               |
| tags                  | Full refresh | Tags                                            |
| person_custom_fields  | Full refresh | Custom field definitions for people             |
| account_custom_fields | Full refresh | Custom field definitions for accounts           |

## Sync modes

All Ortto tables use **full refresh** syncing. Ortto's API doesn't support server-side filtering by timestamp, so every table is fully re-imported on each sync.

If a sync is interrupted, it resumes from where it left off rather than restarting from the beginning.

## Custom fields

Custom fields for people and accounts are automatically discovered at runtime. The connector fetches custom field definitions from Ortto and includes them alongside built-in fields without any additional configuration.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
