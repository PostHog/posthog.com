---
title: Linking Tavus as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Tavus
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

The Tavus source is currently in alpha. It has been tested against Tavus's API documentation but not yet battle-tested with live production workloads. If you run into issues, please let us know.

</CalloutBox>

The Tavus connector syncs your AI video generation data into PostHog, including videos, replicas (trained digital likenesses), personas (conversational AI configurations), and conversations (real-time CVI sessions).

## Adding a data source

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select Tavus by clicking the **Link** button.
3. Enter your **API key**. See [Getting your API key](#getting-your-api-key) below.
4. Click **Next**.
5. Select the tables you want to import, set the sync method and frequency, then click **Import**.

The data warehouse then starts syncing your Tavus data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Getting your API key

To connect Tavus to PostHog, you need a Tavus API key:

1. Log in to your Tavus account at [platform.tavus.io](https://platform.tavus.io).
2. Navigate to the [API Keys page](https://platform.tavus.io/api-keys).
3. Create a new API key or copy an existing one.
4. Paste the key into PostHog when linking the source.

The API key provides read access to all your Tavus data, including videos, replicas, personas, and conversations.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync modes

All Tavus tables use full refresh sync. Tavus's API doesn't support incremental filtering, so each sync fetches all records.

| Table           | Sync method  |
| --------------- | ------------ |
| `videos`        | Full refresh |
| `replicas`      | Full refresh |
| `personas`      | Full refresh |
| `conversations` | Full refresh |

## Available tables

| Table           | Description                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| `videos`        | Generated talking-head videos produced from a script and a replica            |
| `replicas`      | Trained digital likenesses used to generate personalized videos               |
| `personas`      | Conversational configurations (system prompt, layers, replica) for CVI agents |
| `conversations` | Real-time Conversational Video Interface (CVI) sessions with a replica        |
