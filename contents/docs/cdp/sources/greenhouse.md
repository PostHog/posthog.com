---
title: Linking Greenhouse as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Greenhouse
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Greenhouse Harvest credentials to automatically pull your Greenhouse recruiting data into the PostHog data warehouse. New sources use Harvest v3 with OAuth authentication by default.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Greenhouse.
3. In Greenhouse, create a **Harvest V3 (OAuth)** credential under **Configure → Dev Center → API Credential Management**. Grant it the list scopes for the resources you want to sync (for example `harvest:candidates:list`). The authorizing user must be a site admin.
4. Back in PostHog, paste the **Client ID** and **Client secret** from the credential into the corresponding fields and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Greenhouse data in PostHog.

### Using Harvest v1 (API key)

<CalloutBox icon="IconWarning" title="Harvest v1 is deprecated" type="warning">

Greenhouse removes the Harvest v1 API on **August 31, 2026**. Existing v1 sources continue to work until then. To migrate, create a Harvest V3 (OAuth) credential in Greenhouse and set up a new source with the client ID and client secret.

</CalloutBox>

Existing sources using Harvest v1 authenticate with an API key instead of OAuth. To create a v1 source, enter your Harvest API key in the **API key (Harvest v1)** field. You can create a Harvest API key in Greenhouse under **Configure → Dev Center → API Credential Management** and grant it read (`GET`) access to the resources you want to sync.

## Available tables

| Table                  | Description                           | Sync method  |
| ---------------------- | ------------------------------------- | ------------ |
| `candidates`           | Candidates in your Greenhouse account | Incremental  |
| `applications`         | Candidate applications                | Incremental  |
| `jobs`                 | Jobs                                  | Incremental  |
| `job_posts`            | Job posts                             | Incremental  |
| `offers`               | Offers                                | Incremental  |
| `scorecards`           | Interview scorecards                  | Incremental  |
| `scheduled_interviews` | Scheduled interviews                  | Incremental  |
| `users`                | Greenhouse users                      | Incremental  |
| `departments`          | Departments                           | Full refresh |
| `offices`              | Offices                               | Full refresh |
| `sources`              | Candidate sources                     | Full refresh |
| `rejection_reasons`    | Rejection reasons                     | Full refresh |
| `close_reasons`        | Close reasons                         | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
