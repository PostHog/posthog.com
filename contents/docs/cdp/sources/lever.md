---
title: Linking Lever as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Lever
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Lever connector automatically pulls your Lever recruiting data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Lever.
3. You need a Lever API key. In your Lever account, go to **Settings → Integrations and API → API Credentials** and generate an API key. The key has full read access to your account's data, so no individual scopes need to be granted.
4. Back in PostHog, enter the key in the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Lever data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `opportunities` | Candidates and their opportunities in your pipeline | Incremental |
| `postings` | Job postings | Full refresh |
| `users` | Lever users in your account | Full refresh |
| `requisitions` | Hiring requisitions | Full refresh |
| `archive_reasons` | Reasons used when archiving opportunities | Full refresh |
| `stages` | Pipeline stages | Full refresh |
| `sources` | Candidate sources | Full refresh |
| `tags` | Tags applied to opportunities | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
