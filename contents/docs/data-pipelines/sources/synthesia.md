---
title: Linking Synthesia as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Synthesia
---

Enter your Synthesia credentials to pull your AI video generation data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Synthesia.
3. Go to [Synthesia Studio](https://app.synthesia.io) and navigate to **Developers > API keys**.
4. Create or copy an API key with the **Legacy (v2)** scope.
5. Back in PostHog, enter your API key and click **Next**.
6. Select the tables you want to sync, set the sync frequency, then click **Import**.

<CalloutBox icon="IconWarning" title="Plan and API key requirements" type="caution">

- API access requires a Synthesia **Creator** or **Enterprise** plan.
- The API key must have the **Legacy (v2)** scope enabled.
- Webhook signing secrets are excluded from the import for security.

</CalloutBox>

Once the syncs are complete, you can start using Synthesia data in PostHog.

## Available tables

| Table       | Description                                                                                       | Sync method  |
| ----------- | ------------------------------------------------------------------------------------------------- | ------------ |
| `videos`    | Videos created through the Synthesia API or Studio that the API key can access.                   | Full refresh |
| `templates` | Synthesia and workspace templates available to the API key, including their variables.            | Full refresh |
| `webhooks`  | Active webhook subscriptions for the account that owns the API key. Signing secrets are excluded. | Full refresh |

All tables use **full refresh** sync, reloading all data on each run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
