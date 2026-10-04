---
title: Linking Fly.io as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: FlyIo
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Fly.io connector syncs your infrastructure inventory – apps, machines, and volumes – into PostHog. Query your Fly.io fleet alongside product data for auditing, capacity planning, and correlating infrastructure state with user behavior.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Fly.io.
3. Create an organization-scoped API token. You can do this two ways:
   - Run `fly tokens create org` in the [Fly CLI](https://fly.io/docs/flyctl/)
   - Go to the **Tokens** section of your [Fly.io dashboard](https://fly.io/dashboard)

   A read-only org token is sufficient.

4. Back in PostHog, paste your API token and enter your **organization slug**. Use `personal` for your personal org. Run `fly orgs list` to find the slug for other organizations.
5. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using Fly.io data in PostHog.

## Available tables

| Table      | Description                                                                                           | Sync method  |
| ---------- | ----------------------------------------------------------------------------------------------------- | ------------ |
| `apps`     | Apps in the organization. An app is the top-level unit that groups machines, volumes, and networking. | Full refresh |
| `machines` | Machines (Firecracker microVMs) across the organization, one row per machine with its owning app.     | Full refresh |
| `volumes`  | Volumes (persistent storage) across the organization, one row per volume with its owning app.         | Full refresh |

All tables use **full refresh**, meaning they reload all data on each sync. Incremental sync isn't available for Fly.io tables.

> **Note:** The `machines` table includes a `config` column with the machine configuration overview (guest resources, image, and services). Secret-bearing fields – environment variables, secrets, inline file contents, user-defined metadata, and request headers on services and checks – are excluded for security.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
