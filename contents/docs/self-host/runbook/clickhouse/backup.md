---
title: Backup
sidebar: Docs
showTitle: true
---

A critical requirement in order to generate a consistent backup is to "freeze" the dataset while the operation is in process. As with all database systems, consistent backups depend on the system to be in a "quiesced" state.

ClickHouse offers native ["table freeze" support](https://clickhouse.com/docs/en/sql-reference/statements/alter/partition/#alter_freeze-partition) for backup and migration operations without having to halt the database entirely. This is a **no-downtime** operation.

Specifically to PostHog, we should back up all the tables using the [`MergeTree` family type engine](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/mergetree/). To identify which tables you should back up, run the following command:

```shell
clickhouse-client --query "SELECT name FROM system.tables WHERE database = 'posthog' AND engine LIKE '%MergeTree'"
```

As of today, you should get an list of tables like:
```
cohortpeople
events
events_dead_letter_queue
infi_clickhouse_orm_migrations
person
person_distinct_id
person_distinct_id_backup
person_static_cohort
plugin_log_entries
session_recording_events
```

#### Manual backup
To perform a manual backup, we will ask ClickHouse to freeze our tables, creating hard links to the table data. Hard links are placed in the directory `/var/lib/clickhouse/shadow/N/` where `N` is the incremental number of the backup. The query creates the backup almost instantly, but first it will wait for the current queries to the corresponding table to finish running. After we created the backup, we can copy the data from `/var/lib/clickhouse/shadow/` to a remote server or object store service and delete it from the local server.

In this specific example, we will backup the table `events`.

1. Verify if the ClickHouse `shadow` directory is empty or does not exist (yet):
 ```shell
 ls -lah /var/lib/clickhouse/shadow/
 ```

1. Ask ClickHouse to freeze the table `events` and backup its dataset:
 ```shell
 clickhouse-client --database "posthog" --query "ALTER TABLE events FREEZE"
 ```

1. The `ALTER TABLE events FREEZE` query copies only the table data but not the table metadata. If you want to back that up, you can run:
 ```shell
 clickhouse-client --database "posthog" --query="SHOW CREATE TABLE events" --format="TabSeparatedRaw" | tee $TARGET_BACKUP_LOCATION/events.sql
 ```

1. We can now copy our table data and metadata to a remote server or object store service. Example:
 ```shell
 cp -r /var/lib/clickhouse/shadow/ $TARGET_BACKUP_LOCATION
 ```

1. Finally, let’s clear the content of the `shadow` directory:
 ```shell
 rm -rf /var/lib/clickhouse/shadow/*
 ```

> Note: ClickHouse uses filesystem hard links to achieve instantaneous backups with no downtime (or locking). We can further leverage these hard links for efficient backup storage. On filesystems that support hard links (such as local filesystems or NFS), use `cp` with the `-l` flag (or rsync with the `–hard-links` and `–numeric-ids` flags) to avoid copying data.
>
> When hard links are used, storage on disk is much more efficient. Because they rely on hard links, each backup is effectively a "full" backup, even though we avoided the duplicate use of disk space.

You can find more information about the [`ALTER FREEZE` operation](https://clickhouse.com/docs/en/sql-reference/statements/alter/partition/#alter_freeze-partition) and more advanced backup use cases in the [official documentation](https://clickhouse.com/docs/en/operations/backup/).

#### Automated backup using `clickhouse-backup`
The [clickhouse-backup](https://github.com/AlexAkulov/clickhouse-backup) tool helps you to automate the manual steps above. It also offers native support for multiple backends and object stores like: local storage, FTP, SFTP, Azure Blob Storage, AWS S3, Google Cloud Storage, ...

Once configured, the tool provides a variety of sub-commands for managing backups. Creating a backup is as easy as running: `clickhouse-backup create`.

For more informations please look at the [official documentation](https://github.com/AlexAkulov/clickhouse-backup).
