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

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Greenhouse Harvest API key to automatically pull your Greenhouse recruiting data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Greenhouse.
3. In Greenhouse, create a Harvest API key under **Configure → Dev Center → API Credential Management**. Grant the key read (`GET`) access to the resources you want to sync — for example Candidates, Applications, Jobs, Job Posts, Offers, Scorecards, Scheduled Interviews, and Users.
4. Back in PostHog, paste the key into the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Greenhouse data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `candidates` | Candidates in your Greenhouse account | Incremental |
| `applications` | Candidate applications | Incremental |
| `jobs` | Jobs | Incremental |
| `job_posts` | Job posts | Incremental |
| `offers` | Offers | Incremental |
| `scorecards` | Interview scorecards | Incremental |
| `scheduled_interviews` | Scheduled interviews | Incremental |
| `users` | Greenhouse users | Incremental |
| `departments` | Departments | Full refresh |
| `offices` | Offices | Full refresh |
| `sources` | Candidate sources | Full refresh |
| `rejection_reasons` | Rejection reasons | Full refresh |
| `close_reasons` | Close reasons | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
