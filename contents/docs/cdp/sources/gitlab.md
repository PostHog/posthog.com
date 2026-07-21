---
title: Linking GitLab as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GitLab
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Sync issues, merge requests, commits, pipelines, and more from a GitLab project into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to GitLab.
3. Create a personal access token in GitLab under **User settings → Access tokens** with the `read_api` scope. For self-managed GitLab, note your instance URL (for example `https://gitlab.example.com`); for GitLab.com use `https://gitlab.com`. You'll also need the project, given as either a `group/project` path or a numeric project id.
4. Back in PostHog, set the `GitLab instance URL` (leave it as `https://gitlab.com` for GitLab.com), paste your token into the `Personal access token` field, enter the `Project`, and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using GitLab data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `issues` | Issues in the project | Incremental |
| `merge_requests` | Merge requests in the project | Incremental |
| `commits` | Repository commits | Incremental |
| `pipelines` | CI/CD pipelines | Incremental |
| `releases` | Project releases | Full refresh |
| `milestones` | Project milestones | Full refresh |
| `branches` | Repository branches | Full refresh |
| `tags` | Repository tags | Full refresh |
| `labels` | Project labels | Full refresh |
| `members` | Project members | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
