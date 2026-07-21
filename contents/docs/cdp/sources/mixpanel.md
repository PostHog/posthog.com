---
title: Linking Mixpanel as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Mixpanel
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Connect your Mixpanel project to pull events, user profiles, cohorts, and annotations into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Mixpanel.
3. Authenticate with a [Mixpanel service account](https://developer.mixpanel.com/reference/service-accounts). In Mixpanel, go to **Organization Settings → Service Accounts → Create Service Account** and grant it access to the project you want to sync. You'll need:
   - **Data residency region** – the region your project lives in (US, EU, or India).
   - **Project ID** – your numeric project ID, found under **Project Settings**.
   - **Service account username** – the username of the service account you created.
   - **Service account secret** – the secret for that service account.
4. Back in PostHog, select the region and enter the credentials, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Mixpanel data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `export` | Raw events from the Mixpanel Raw Event Export API | Incremental |
| `engage` | User profiles from the Engage API | Full refresh |
| `cohorts` | Cohort definitions | Full refresh |
| `annotations` | Project annotations | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Only the `export` table supports incremental syncing, since it is the only endpoint with a genuine server-side time filter. The initial sync of `export` only pulls the last 365 days of events; subsequent incremental syncs advance from the last-seen event time.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
