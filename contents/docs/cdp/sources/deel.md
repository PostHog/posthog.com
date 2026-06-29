---
title: Linking Deel as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Deel
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Deel connector automatically pulls your Deel workforce and payroll data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Deel.
3. You need a Deel API token. In your Deel admin console, go to **Settings** and create an organization API token. Enable the read scope for each dataset you want to sync (see [required scopes](#required-scopes) below).
4. Back in PostHog, enter the token in the **API token** field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Deel data in PostHog.

<CalloutBox icon="IconWarning" title="Use organization tokens" type="caution">

Use an **organization API token** rather than a personal API token. Personal tokens expire when the user leaves the organization, which causes syncs to fail.

</CalloutBox>

## Available tables

| Table                 | Description                     | Sync method  |
| --------------------- | ------------------------------- | ------------ |
| `people`              | Employee and contractor records | Full refresh |
| `contracts`           | Contract details for workers    | Full refresh |
| `invoices`            | Invoice records                 | Full refresh |
| `invoice_adjustments` | Adjustments made to invoices    | Full refresh |

**Full refresh** tables sync all records on each run. Deel's API doesn't expose updated-since filters for these resources.

## Required scopes

Deel API tokens are scoped per dataset. Your token needs the read permission for each table you want to sync. If a scope is missing, that specific table fails with a permissions error while other tables continue to sync normally.

| Table                 | Required scope             |
| --------------------- | -------------------------- |
| `people`              | `people:read`              |
| `contracts`           | `contracts:read`           |
| `invoices`            | `invoices:read`            |
| `invoice_adjustments` | `invoice_adjustments:read` |

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
