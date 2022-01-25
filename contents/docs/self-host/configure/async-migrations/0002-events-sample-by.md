---
title: Migration guide - 0002_events_sample_by
sidebar: Handbook
showTitle: true
---


[`0002_events_sample_by`](https://github.com/PostHog/posthog/blob/master/posthog/async_migrations/migrations/0002_events_sample_by.py) is an async migration added to change the `SAMPLE BY` and `ORDER BY` clauses of our events table in ClickHouse.

There were 2 important reasons for doing this:

1. **Performance:** The new schema leads to a performance (speed) improvement for various PostHog queries
2. **Upgrading ClickHouse:** Changing the schema was necessary to unblock the upgrading of ClickHouse, which is something we aim to complete in PostHog version 1.33.0 and can also bring massive performance improvements.


## Operations

1. Create a new table with the updated schema: `SAMPLE BY cityHash64(distinct_id)` + `ORDER BY (team_id, toDate(timestamp), event, cityHash64(distinct_id), cityHash64(uuid))`
2. Start backfilling the new table (online) with data from older partitions
3. Detach the `events_mv` materialized view so we stop ingestion
4. Insert the remaining events into the new table
5. Rename the current table to `events_backup_0002_events_sample_by` and rename the new table to `events` (the table we use for querying)
6. Attach the materialized view so we start ingestion again
7. Optimize the table to remove duplicates

## Checks

1. `is_required`: only run this migration on instances with the old schema (new deploys get the new schema by default)
2. `precheck`: make sure there's enough free disk space in ClickHouse to run the migration
3. `healthcheck`: prevent ClickHouse from blowing up for lack of disk space

## FAQ

### Will this migration cause any data loss?

No. This migration duplicates the events table and keeps the old table as a backup so we can always restore it.

### Will this migration stop ingestion?

Yes, for a brief period of time. We will only stop ingestion when we are processing the last partition of the old events table, so the time ingestion will be down is limited.

Please note that no events will be lost during this time, their ingestion will only be delayed.

### The migration errored with "EOF: Unexpected end of line when reading bytes" - what should I do?

Your ClickHouse instance may have run out of memory.

To check this, run:

```
kubectl describe pod chi-posthog-posthog-0-0-0 -n posthog
```

If the output of the above showed the pod was once terminated with the reason `OOMKilled`, then you will have confirmed the diagnosis.

To scale ClickHouse vertically (add more memory), follow [this scaling guide](/docs/self-host/deploy/configuration#scaling-clickhouse-vertically).

