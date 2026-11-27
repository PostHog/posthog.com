---
title: MotherDuck destination
sidebar: Docs
showTitle: true
---

The MotherDuck destination writes tables imported from [warehouse sources](/docs/data-pipelines/sources) to your MotherDuck database on the source's sync schedule.

This destination is available only for projects where MotherDuck destinations are enabled. If MotherDuck is missing from the destination picker, contact support through the app.

To import data from MotherDuck into PostHog, use the [MotherDuck source](/docs/data-pipelines/sources/motherduck) instead.

## Prerequisites

- A MotherDuck database owned by your account. A shared, read-only database cannot receive writes.
- A read-write access token from your MotherDuck account settings.
- Permission to create schemas and tables, write rows, and replace tables in the destination schema. PostHog tests the connection by creating and dropping a temporary table.

## Set up the destination

1. Open your source in PostHog and select its **Destinations** tab. You can also choose destinations when you create a source.
2. Click **New destination** and select **MotherDuck** as the type.
3. Enter a **Name** to identify the destination.
4. Select a MotherDuck **Connection**, or create one. In **Configure MotherDuck connection**, enter a connection **Name** and your **Access token**, then click **Save**. PostHog stores the token encrypted and can reuse the connection across destinations.
5. Enter the **Database** name. The database must already exist in your MotherDuck account.
6. Enter the **Schema**, which defaults to `main`. PostHog creates the schema if it does not exist.
7. Click **Add destination**. On an existing source, select the destination and click **Save destinations** to apply it.

> Adding a destination to a source that has already synced starts a full resync of its tables. All destinations that receive rows during that resync are billed for those rows, including destinations that already have the data. Check the row counts before saving. See [ELT destinations](/docs/data-pipelines/destinations/elt-destinations#setting-a-destination).

The source's destination selection applies to all its tables unless a table has its own destination selection. Keep the PostHog warehouse selected if you also want the data written there.

The connection, database, and schema are fixed after you create a destination. To write to a different location, create another destination.

## Sync behavior

The destination follows the source table's sync mode:

- **Full refresh**: PostHog writes to a staging table, then replaces the destination table when the run finishes. The previous data remains available until the replacement is ready.
- **Incremental sync**: PostHog merges rows using the source table's primary keys. Tables configured to append data append rows instead.

PostHog can add new columns as the source schema grows. Check the [sync monitoring guide](/docs/data-pipelines/destinations/monitoring) for delivery status and rows written.

## Troubleshooting

- **Invalid or expired token**: Create a new access token in MotherDuck and update the connection.
- **Database not found**: Check that the database exists and is accessible to the account that owns the token.
- **Read-only or permission error**: Use a read-write token and a database you own, rather than a shared database. Check that the token can create and write tables in the selected schema.
- **Compute limit reached**: Check your MotherDuck plan's compute allowance. Wait for it to reset or increase the allowance, then run the sync again.
