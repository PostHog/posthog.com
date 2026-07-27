---
title: Linking ServiceNow as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ServiceNow
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The ServiceNow connector syncs your ITSM data into the PostHog data warehouse, including incidents, problems, change requests, users, configuration items, and more.

## Available tables

| Table name          | ServiceNow table |
| ------------------- | ---------------- |
| incidents           | `incident`       |
| problems            | `problem`        |
| change_requests     | `change_request` |
| change_tasks        | `change_task`    |
| tasks               | `task`           |
| catalog_requests    | `sc_request`     |
| requested_items     | `sc_req_item`    |
| catalog_tasks       | `sc_task`        |
| users               | `sys_user`       |
| user_groups         | `sys_user_group` |
| configuration_items | `cmdb_ci`        |
| knowledge_articles  | `kb_knowledge`   |
| assets              | `alm_asset`      |

All tables support incremental sync using `sys_updated_on` (catches both inserts and updates) or `sys_created_on` (append-only style syncs).

## Linking ServiceNow

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and the sources tab in PostHog.
2. Click **New source** and select ServiceNow.
3. Provide your ServiceNow instance URL (e.g., `https://your-instance.service-now.com`).
4. Choose your authentication method:
   - **Username and password** – enter your ServiceNow username and password.
   - **API key** – enter your ServiceNow API key.
5. _Optional:_ Add a prefix to your table names.
6. Click **Next**.

The data warehouse then starts syncing your ServiceNow data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Authentication

ServiceNow supports two authentication methods:

- **Username and password** – uses HTTP basic authentication against the ServiceNow Table API.
- **API key** – uses the `x-sn-apikey` header for token-based authentication.

The account or API key needs **read** access to the tables you want to sync. This typically means the `rest_api_explorer` role or equivalent table ACLs on your ServiceNow instance.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
