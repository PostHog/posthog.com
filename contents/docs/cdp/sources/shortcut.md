---
title: Linking Shortcut as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Shortcut
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Shortcut connector syncs your Shortcut project management data – stories, epics, iterations, members, and more – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Shortcut.
3. Next, you need an API token from Shortcut. In your Shortcut account, go to **Settings** → **Account** → **API Tokens** (or visit your [API tokens settings](https://app.shortcut.com/settings/account/api-tokens) directly) and generate a token. The token grants access to the entire workspace it belongs to and becomes invalid if you are removed from that workspace.
4. Back in PostHog, enter the token in the `API token` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Shortcut data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `members` | Members of your Shortcut workspace | Full refresh |
| `groups` | Groups (teams) in your workspace | Full refresh |
| `projects` | Projects | Full refresh |
| `workflows` | Workflows and their states | Full refresh |
| `epics` | Epics | Full refresh |
| `iterations` | Iterations | Full refresh |
| `labels` | Labels | Full refresh |
| `categories` | Categories | Full refresh |
| `objectives` | Objectives | Full refresh |
| `custom_fields` | Custom field definitions | Full refresh |
| `files` | Uploaded files | Full refresh |
| `linked_files` | Linked files | Full refresh |
| `repositories` | Connected version control repositories | Full refresh |
| `entity_templates` | Story entity templates | Full refresh |
| `stories` | Stories (work items) | Incremental |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Only the `stories` table supports incremental sync (via the `created_at` or `updated_at` cursor). Every other Shortcut endpoint returns its full collection in a single response with no server-side timestamp filter, so those tables are always synced as a full refresh.

## Configuration

<SourceParameters />
