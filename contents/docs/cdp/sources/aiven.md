---
title: Linking Aiven as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Aiven
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Aiven connector syncs your projects, services, and billing data from [Aiven](https://aiven.io) into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Aiven.
3. You need an API token from Aiven. Go to your [Aiven profile authentication page](https://console.aiven.io/profile/auth) and create a personal token. If you want to sync billing tables (billing groups, invoices, invoice lines) or organization membership tables, your token needs organization-level read access.
4. Back in PostHog, enter the token in the `API token` field and click **Next**.
5. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using Aiven data in PostHog.

## Available tables

| Table                | Description                                                                         | Sync method  |
| -------------------- | ----------------------------------------------------------------------------------- | ------------ |
| `projects`           | Aiven projects — the container that groups services and their billing               | Full refresh |
| `organizations`      | Aiven organizations — the top-level tenant that owns projects and billing           | Full refresh |
| `services`           | Running Aiven managed services (Kafka, PostgreSQL, ClickHouse, OpenSearch, etc.)    | Full refresh |
| `billing_groups`     | Billing groups that aggregate charges for one or more projects                      | Full refresh |
| `invoices`           | Issued invoices for a billing group                                                 | Full refresh |
| `invoice_lines`      | Per-service cost breakdown on invoices, used for BI cost export                     | Full refresh |
| `organization_users` | Members of an Aiven organization                                                    | Full refresh |
| `user_groups`        | User groups within an organization for grouping members and permissions             | Full refresh |
| `clouds`             | Global catalogue of Aiven cloud regions across AWS, GCP, and Azure (off by default) | Full refresh |

**Full refresh** tables reload all data on each sync.

## Sync limitations

All tables use **full refresh** only. The Aiven API does not support pagination or server-side timestamp filters, so incremental syncing is not available.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
