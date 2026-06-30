---
title: Linking Jira as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Jira
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Atlassian Jira credentials to pull your Jira data into the PostHog data warehouse. The token authenticates as your Atlassian account, so the data we can sync is limited to the projects and issues that account can see.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Jira.
3. You need three things from Atlassian:
   - **Subdomain** – the `your-domain` portion of your Jira URL (from `your-domain.atlassian.net`).
   - **Email** – the email address of the Atlassian account the token belongs to.
   - **API token** – create one at [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens).
4. Back in PostHog, enter the credentials and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Jira data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `issues` | Issues across the projects your account can access | Incremental |
| `projects` | Projects in your Jira instance | Full refresh |
| `users` | Users in your Jira instance | Full refresh |
| `fields` | Field definitions, including custom fields | Full refresh |
| `issue_types` | Issue type definitions | Full refresh |
| `statuses` | Workflow status definitions | Full refresh |
| `priorities` | Priority definitions | Full refresh |
| `resolutions` | Resolution definitions | Full refresh |
| `dashboards` | Dashboards | Full refresh |
| `filters` | Saved filters | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Only the `issues` table supports incremental syncing, using Jira's server-side `updated` timestamp filter. Per-issue streams such as comments, worklogs, votes, watchers, remote links, and transitions are not synced, as each requires a separate request per issue and does not scale well on large instances.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
