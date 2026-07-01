---
title: Linking Confluence as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Confluence
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Confluence connector pulls your Atlassian Confluence Cloud content — spaces, pages, blog posts, attachments, and more — into the PostHog data warehouse. Only Confluence Cloud sites (`your-domain.atlassian.net`) are supported.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Confluence.
3. You need your Confluence Cloud subdomain, account email, and an API token. Create an API token from your [Atlassian account settings](https://id.atlassian.com/manage-profile/security/api-tokens). Your **Subdomain** is the `your-domain` part of `your-domain.atlassian.net`. Use the **Email** address tied to the Atlassian account that owns the token.
4. Back in PostHog, enter the `Subdomain`, `Email`, and `API token`, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Confluence data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `spaces` | Confluence spaces | Full refresh |
| `pages` | Pages across your site | Full refresh |
| `blogposts` | Blog posts | Full refresh |
| `attachments` | Attachments | Full refresh |
| `tasks` | Tasks | Full refresh |
| `labels` | Labels | Full refresh |
| `footer_comments` | Footer comments | Full refresh |
| `inline_comments` | Inline comments | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

All Confluence tables are full refresh only. The Confluence Cloud v2 list endpoints do not expose a server-side timestamp filter, so each sync reloads the full collection.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
