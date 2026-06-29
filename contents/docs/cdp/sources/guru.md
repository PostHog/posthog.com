---
title: Linking Guru as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Guru
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available schemas may change.

</CalloutBox>

The Guru connector can link cards, collections, groups, and members from your [Guru](https://www.getguru.com/) knowledge base to PostHog.

To link Guru:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Guru.

3. Enter your **Username (email)** – this is the email address associated with your Guru account.

4. Next, you need an API token from Guru. In the Guru app, go to **Settings** > **Apps and integrations** > **API access** and generate a user token.

   Use a **user token** rather than a collection token – collection tokens are read-only and scoped to a single collection.

5. Back in PostHog, paste the token in the **API token** field and click **Next**.

6. Set up the schemas you want to sync and modify the method and frequency as needed. Once done, click **Import**.

Once the syncs are complete, you can start using Guru data in PostHog.

## Schemas

The following schemas are available:

| Schema        | Sync mode    | Description               |
| ------------- | ------------ | ------------------------- |
| `cards`       | Incremental  | Guru knowledge base cards |
| `collections` | Full refresh | Card collections          |
| `groups`      | Full refresh | User groups               |
| `members`     | Full refresh | Team members              |

The `cards` schema supports incremental sync using the `lastModified` field, so only cards modified since the last sync are fetched. The other schemas perform a full refresh on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
