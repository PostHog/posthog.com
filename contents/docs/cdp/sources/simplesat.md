---
title: Linking Simplesat as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Simplesat
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Simplesat connector syncs your customer satisfaction survey data – surveys, questions, answers, and responses – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Simplesat.
3. Next, you need an API key from Simplesat. In your Simplesat account, go to **Settings → API keys** and create or copy your API key. The key must include read scopes for each resource you want to sync — surveys, questions, answers, and responses.
4. Back in PostHog, enter the key in the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using Simplesat data in PostHog.

## Available tables

| Table       | Description                                                                 | Sync method  |
| ----------- | --------------------------------------------------------------------------- | ------------ |
| `surveys`   | Customer satisfaction surveys (CSAT, CES, or NPS) configured in Simplesat   | Full refresh |
| `questions` | Questions belonging to a Simplesat survey                                   | Full refresh |
| `answers`   | Individual answers submitted to survey questions                            | Full refresh |
| `responses` | Complete survey submissions from customers, grouping the individual answers | Full refresh |

**Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
