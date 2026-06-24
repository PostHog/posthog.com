---
title: Linking CircleCI as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CircleCI
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The CircleCI connector syncs your CI/CD pipeline data – pipelines, workflows, jobs, and projects – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to CircleCI.
3. Next, you need a personal API token from CircleCI. In your [CircleCI user settings](https://app.circleci.com/settings/user/tokens), create a new personal API token and copy it. The token inherits your user permissions and grants read access to your organization's data.
4. You also need your organization slug in the `vcs/org` format. For example, if your organization is on GitHub with the name `your-org`, the slug is `gh/your-org`. For Bitbucket, use `bb/your-org`. You can find it under **Organization settings** in CircleCI.
5. Back in PostHog, enter the personal API token and organization slug, then click **Next**.
6. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using CircleCI data in PostHog.

## Available tables

| Table       | Description                             | Sync method  |
| ----------- | --------------------------------------- | ------------ |
| `pipelines` | CI/CD pipelines in your organization    | Full refresh |
| `workflows` | Workflows within pipelines              | Full refresh |
| `jobs`      | Individual jobs within workflows        | Full refresh |
| `projects`  | Projects associated with your pipelines | Full refresh |

**Full refresh** tables reload all data on each sync. CircleCI's API does not support incremental syncing.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
