---
title: Linking Trello as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Trello
---

Enter your Trello API key and token to sync your boards, cards, lists and more into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Trello.
3. Get your API key from [trello.com/power-ups/admin](https://trello.com/power-ups/admin) and generate a token with **read** access for your account.
4. Back in PostHog, paste the values into the `API key` and `API token` fields and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Trello data in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
