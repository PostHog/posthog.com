---
title: Linking Lattice as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Lattice
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Sync your Lattice performance management data – including users, departments, goals, feedbacks, review cycles, and updates – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Lattice.
3. You need a Lattice API key. A Lattice admin can generate one under **Admin** > **Settings** > **API Keys**. Lattice may require requesting API access before keys can be generated. The key inherits the creating user's privileges, so ensure that user has access to the data you want to sync.
4. Back in PostHog, select your **Region** (US or EMEA) to match where your Lattice data is hosted.
5. Enter your API key in the **API key** field and click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Lattice data in PostHog.

## Available tables

| Table           | Description                      | Sync method  |
| --------------- | -------------------------------- | ------------ |
| `users`         | Users in your Lattice account    | Full refresh |
| `departments`   | Departments in your organization | Full refresh |
| `goals`         | Goals                            | Full refresh |
| `feedbacks`     | Feedbacks                        | Full refresh |
| `review_cycles` | Review cycles                    | Full refresh |
| `updates`       | Updates                          | Full refresh |

**Full refresh** tables reload all data on each sync. Lattice's API doesn't support server-side filtering by timestamp, so incremental sync isn't available.

## Configuration

<SourceParameters />
