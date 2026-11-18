---
title: Linking Kustomer as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Kustomer
---

Enter your Kustomer credentials to pull your customer service data – customers, conversations, companies, users, teams, tags, brands, sub-statuses, satisfaction forms, klasses, kobjects, routing statuses, and audit logs – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Kustomer.
3. Next, gather your Kustomer credentials:
   - **Organization name** – the subdomain from your Kustomer URL, e.g. `myorg` for `myorg.kustomerapp.com`. You can also paste the full URL and PostHog will extract the subdomain automatically.
   - **API key** – create one in Kustomer under **Settings → Security → API Keys**. Grant read roles for the data you want to sync (e.g. `org.user.read`).

   This source authenticates with a Bearer token (API key) and requires read access to the endpoints you want to sync.

4. Back in PostHog, enter the credentials and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Kustomer data in PostHog.

## Available tables

| Table                | Description                                                       | Sync method  |
| -------------------- | ----------------------------------------------------------------- | ------------ |
| `audit_logs`         | Audit log events for organizational changes                       | Full refresh |
| `brands`             | Brands                                                            | Full refresh |
| `companies`          | Companies (business accounts) that customers belong to            | Full refresh |
| `conversations`      | Conversations                                                     | Full refresh |
| `customers`          | Customers                                                         | Full refresh |
| `klasses`            | Klass definitions for custom objects (KObjects)                   | Full refresh |
| `kobjects`           | Custom objects belonging to a Klass (e.g., orders, subscriptions) | Full refresh |
| `routing_statuses`   | Routing status definitions (available, offline, custom away)      | Full refresh |
| `satisfaction_forms` | CSAT survey form definitions                                      | Full refresh |
| `sub_statuses`       | Conversation sub-statuses (finer-grained status states)           | Full refresh |
| `tags`               | Tags                                                              | Full refresh |
| `teams`              | Teams                                                             | Full refresh |
| `users`              | Helpdesk users (agents)                                           | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

All Kustomer tables are full refresh only. Kustomer's GET list endpoints have no server-side timestamp filter, so true incremental sync is not currently possible.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
