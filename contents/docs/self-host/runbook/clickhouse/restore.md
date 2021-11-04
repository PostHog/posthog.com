---
title: Restore
sidebar: Docs
showTitle: true
---

A backup is worthless if the restoration process hasn’t been tested. If you backed something up and never tried to restore it, chances are that restore will not work properly when you actually need it or it will take longer than business can tolerate. Perform regular test restores to ensure your data will be there when you need it!

### Manual restore
In this specific example, we will restore the table `events`.

1. Optional: create the table you would like to restore (if it doesn’t exist yet) from its backed up metadata file
    ```shell
    cat events.sql | clickhouse-client --database posthog
    ```

1. Copy the backup data from the `data/posthog/events/` directory inside the backup you want to restore to the `/var/lib/clickhouse/data/posthog/events/detached/` directory
    ```shell
    cp -r $SOURCE_BACKUP_LOCATION/data/posthog/events/* /var/lib/clickhouse/data/posthog/events/detached/
    ```

1. Add the data to the table from the detached directory. It is possible to add data for an entire partition or for a separate part (take a look [here](https://clickhouse.com/docs/en/sql-reference/statements/alter/partition/#alter-how-to-specify-part-expr) for more info)
    ```shell
    clickhouse-client --database posthog --query "ALTER TABLE events ATTACH PARTITION 202111"
    ```

1. Your data should be now available
    ```shell
    clickhouse-client --database posthog --query "SELECT COUNT(1) from events"
    ````

### Automatic restore using `clickhouse-backup`
The tool provides an automatic restore operation that you can invoke by running: `clickhouse-backup restore <BACKUP NAME>`.

For more informations please look at the [official documentation](https://github.com/AlexAkulov/clickhouse-backup).
