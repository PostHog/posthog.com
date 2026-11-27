---
title: Linking Apollo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Apollo
---

The Apollo connector syncs your Apollo CRM data – contacts, accounts, opportunities, emails, phone calls, tasks, sequences, users, pipeline stages, conversations, lists, and custom fields – into PostHog, so you can analyze your sales and outreach data alongside your product data.

Contacts and accounts support incremental sync using the `updated_at` field, so only new or changed records are fetched after the first sync. All other tables perform a full refresh on each sync.

## How to link Apollo

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Apollo.

3. You need an API key from Apollo. In Apollo, go to **Settings** > **Integrations** > **API** and create a new API key. API access requires a paid Apollo plan.

4. Back in PostHog, paste your API key in the **API key** field and click **Next**.

5. On the next page, set up the schemas you want to sync and modify the method and frequency as needed. Once done, click **Import**.

Once the syncs are complete, you can start using Apollo data in PostHog.

## 50,000 record limit

Apollo caps search results at 50,000 records per stream (100 records × 500 pages). If a synced object has more than 50,000 records, older records beyond this limit aren't retrieved.

For contacts and accounts using incremental sync, this cap is unlikely to cause issues because only new or changed records are fetched on subsequent syncs. It's most relevant on the very first full sync of a large dataset.

If the cap is reached during a sync, PostHog logs an error so the truncation is never silent.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
