---
title: Migration guide - 0002_events_sample_by
sidebar: Docs
showTitle: true
---


[`0002_events_sample_by`](https://github.com/PostHog/posthog/blob/master/posthog/async_migrations/migrations/0002_events_sample_by.py) is an async migration added to change the `SAMPLE BY` and `ORDER BY` clauses of our events table in ClickHouse.

There were 2 important reasons for doing this:

1. **Performance:** The new schema leads to a performance (speed) improvement for various PostHog queries
2. **Upgrading ClickHouse:** Changing the schema was necessary to unblock the upgrading of ClickHouse, which is something we aim to complete in PostHog version 1.33.0 and can also bring massive performance improvements.

> Note: During the migration event ingestion from Kafka to ClickHouse will be paused for a brief period. There won't be any data loss as we'll be consuming all the events from Kafka later. However during that brief period you might not see new events appear in the PostHog UI.

## Preparation

1. Make sure you have enough free space in your ClickHouse instance. We certify this via a preflight check before running the migration, but it is good that you're also aware of the requirement.
2. Make sure there's enough disk space in Kafka and verify that the retention policies are reasonable (ClickHouse event ingestion will be paused during the migration and to make sure we don't lose any data we'll want to make sure they won't expire too fast from Kafka).

## Operations

1. Create a new table with the updated schema: `SAMPLE BY cityHash64(distinct_id)` + `ORDER BY (team_id, toDate(timestamp), event, cityHash64(distinct_id), cityHash64(uuid))`
2. Start backfilling the new table (online) with data from older partitions
3. Detach the `events_mv` materialized view so we stop ingesting events from Kafka to ClickHouse. This makes sure we don't lose any events while switching the tables and all the events will be waiting in Kafka. From this point until step 7 we might not see new events in the PostHog UI.
4. Insert the remaining events into the new table
5. Rename the current table to `events_backup_0002_events_sample_by` and rename the new table to `events` (the table we use for querying)
6. Attach the materialized view so we start ingestion again from where we left off before
7. Optimize the table to remove duplicates

## Checks

1. `is_required`: only run this migration on instances with the old schema (new deploys get the new schema by default)
2. `precheck`: make sure there's enough free disk space in ClickHouse to run the migration
3. `healthcheck`: prevent ClickHouse from blowing up for lack of disk space

## After completion

To be extra safe we don't delete `events_backup_0002_events_sample_by` table, but it could take up significant amount of disk space. We suggest deleting it manually after a few hours/days if things look good. To do that [connect to ClickHouse](https://posthog.com/docs/self-host/deploy/troubleshooting) and run `DROP TABLE events_backup_0002_events_sample_by`.

## FAQ

### Will this migration cause any data loss?

No. During the migration event ingestion from Kafka to ClickHouse will be paused for a brief period. There won't be any data loss as we'll be consuming all the events from Kafka later. Furthermore this migration duplicates the events table and keeps the old table as a backup so we can always restore it.


### Will this migration stop ingestion?

Yes, but please note that:
1. There will *not* be any data loss as we'll be consuming all the events from Kafka later.
1. Ingestion is stopped only for a brief period of time, when we are processing the last partition of the old events table and renaming the tables.
1. Ingestion will only be stopped from Kafka to ClickHouse, which is the last step in the ingestion pipeline (see [architecture](https://posthog.com/docs/self-host/architecture)).

### Will I see inconsistent data during the migration?

Yes, for the brief period of time. When event ingestion from Kafka to ClickHouse is stopped we will still process person data. For example we might see a person property that was just set, but we wouldn't see the event that set it yet. Once the migration (or rollback) has finished and we caught up everything will be consistent again.

### The migration errored with "EOF: Unexpected end of line when reading bytes" - what should I do?

Your ClickHouse instance may have run out of memory.

To check this, run:

```
kubectl describe pod chi-posthog-posthog-0-0-0 -n posthog
```

If the output of the above showed the pod was once terminated with the reason `OOMKilled`, then you will have confirmed the diagnosis.

To scale ClickHouse vertically (add more memory), follow [this scaling guide](/docs/self-host/deploy/configuration#scaling-clickhouse-vertically).

### Kafka is crash looping (disk full) - what should I do?

Please see our troubleshooting guide [here](/docs/self-host/deploy/troubleshooting#kafka-crash-looping-disk-full)

