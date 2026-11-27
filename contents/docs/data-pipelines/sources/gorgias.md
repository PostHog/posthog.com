---
title: Linking Gorgias as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Gorgias
---

Enter your Gorgias credentials to pull your helpdesk data – tickets, messages, customers, users, integrations, automation rules, and widgets – into the PostHog Data Warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Gorgias.
3. Next, gather your Gorgias credentials:
   - **Gorgias domain (subdomain)** – your account subdomain, e.g. `your-company` for `your-company.gorgias.com`.
   - **Account email** – the email of the account that owns the API key.
   - **API key** – create one in your Gorgias account under **Settings → REST API**.

   This source authenticates with HTTP Basic Auth (email plus API key) and requires read access to the endpoints you want to sync.

4. Back in PostHog, enter the credentials and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Gorgias data in PostHog.

## Available tables

| Table                  | Description                       | Sync method  |
| ---------------------- | --------------------------------- | ------------ |
| `tickets`              | Support tickets                   | Incremental  |
| `messages`             | Messages on tickets               | Incremental  |
| `customers`            | Customers                         | Incremental  |
| `users`                | Helpdesk users (agents)           | Full refresh |
| `satisfaction_surveys` | Customer satisfaction surveys     | Incremental  |
| `tags`                 | Tags                              | Full refresh |
| `views`                | Views                             | Full refresh |
| `view_items`           | Tickets in each saved ticket view | Full refresh |
| `teams`                | Teams                             | Full refresh |
| `macros`               | Macros                            | Incremental  |
| `integrations`         | A channel or app connected to the Gorgias account, such as an email address, a chat, a phone number, or a store | Full refresh |
| `rules`                | An automation rule that runs actions on tickets when events occur | Full refresh |
| `widgets`              | A helpdesk sidebar widget that shows data from an integration or app next to a ticket or customer | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

The `tickets`, `customers`, and `macros` tables support incremental sync on `updated_datetime`. The `messages` and `satisfaction_surveys` tables use `created_datetime`. The other tables listed above use full refresh.

The `integrations` table omits `http.headers` and `http.oauth2` because they can contain credentials.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
