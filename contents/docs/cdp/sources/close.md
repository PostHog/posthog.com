---
title: Linking Close as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Close
---

The Close connector syncs your sales CRM data – leads, contacts, opportunities, activities, tasks, users, statuses, pipelines, and email templates – into PostHog.

To link Close:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Close.

3. Next, you need an API key from Close. In your Close dashboard, go to **Settings** → **Developer** → **API Keys**. Create a new key – we recommend using a read-only key for this integration. Copy the key value.

4. Back in PostHog, paste the API key in the `API key` field and click **Next**.

5. On the next page, set up the schemas you want to sync and modify the method and frequency as needed. Once done, click **Import**.

Once the syncs are complete, you can start using Close data in PostHog.

## Available tables

| Table                  | Description                                 | Sync method  |
| ---------------------- | ------------------------------------------- | ------------ |
| `leads`                | Sales leads in your Close account           | Full refresh |
| `contacts`             | Contacts associated with leads              | Full refresh |
| `opportunities`        | Sales opportunities (deals)                 | Incremental  |
| `activities`           | Activities like calls, emails, and meetings | Incremental  |
| `tasks`                | Tasks assigned to users                     | Incremental  |
| `users`                | Users in your Close organization            | Full refresh |
| `lead_statuses`        | Available lead status options               | Full refresh |
| `opportunity_statuses` | Available opportunity status options        | Full refresh |
| `pipelines`            | Sales pipelines                             | Full refresh |
| `email_templates`      | Email templates                             | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />
