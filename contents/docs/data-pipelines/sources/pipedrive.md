---
title: Linking Pipedrive as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Pipedrive
---

The Pipedrive connector syncs your CRM data – deals, persons, organizations, products, pipelines, stages, activities, notes, leads, users, field metadata, mailbox data, and projects – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Pipedrive.

3. Enter your **Company domain**. This is the subdomain of your Pipedrive account URL. For example, if your Pipedrive URL is `https://mycompany.pipedrive.com`, enter `mycompany`. You can also paste the full URL – PostHog normalizes it automatically.

4. Next, you need an API token from Pipedrive. In your Pipedrive account, go to **Settings** > **Personal preferences** > **API**. Copy your personal API token. The token inherits your user's permissions, so make sure your user can access the data you want to sync.

5. Back in PostHog, paste the API token in the **API token** field and click **Next**.

6. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using Pipedrive data in PostHog.

## Available tables

| Table                 | Description                                          | Sync method  |
| --------------------- | ---------------------------------------------------- | ------------ |
| `deals`               | Sales deals in your Pipedrive account                | Full refresh |
| `persons`             | Contact persons                                      | Full refresh |
| `organizations`       | Organizations linked to deals and persons            | Full refresh |
| `products`            | Products available in your catalog                   | Full refresh |
| `pipelines`           | Sales pipelines                                      | Full refresh |
| `stages`              | Stages within pipelines                              | Full refresh |
| `activities`          | Activities like calls, meetings, and tasks           | Full refresh |
| `notes`               | Notes attached to deals, persons, or organizations   | Full refresh |
| `leads`               | Sales leads                                          | Full refresh |
| `users`               | Users in your Pipedrive account                      | Full refresh |
| `deal_fields`         | Custom field definitions for deals                   | Full refresh |
| `person_fields`       | Custom field definitions for persons                 | Full refresh |
| `organization_fields` | Custom field definitions for organizations           | Full refresh |
| `archived_deals`      | Archived sales deals (excluded from the deals table) | Full refresh |
| `mail_threads`        | Email threads synced to the Pipedrive mailbox        | Full refresh |
| `mail_messages`       | Individual email messages within threads             | Full refresh |
| `projects`            | Projects in Pipedrive Projects                       | Full refresh |
| `archived_projects`   | Archived projects (excluded from the projects table) | Full refresh |
| `project_tasks`       | Tasks within projects                                | Full refresh |
| `project_boards`      | Project boards that organize projects into phases    | Full refresh |
| `project_phases`      | Phases (columns) on project boards                   | Full refresh |

**Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
