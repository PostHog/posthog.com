---
title: Clickhouse
---

ClickHouse is our main analytics backend.

Instead of data being inserted directly into ClickHouse, it itself data from Kafka. This makes our ingestion pipeline more resilient towards outages.

The following sections go more into depth in how this works exactly.

### Non-sharded ClickHouse events ingestion

```mermaid
flowchart LR
    classDef table fill:#f6e486,stroke:#ffc45d;
    kafka_events["kafka_events table<br/>(Kafka table engine)"]:::table
    eventsmv["events_mv table<br/>(Materialized view)"]:::table
    events["events table<br/>(ReplacingMergeTree table engine)"]:::table

    kafka_events -.clickhouse_events_json topic.- Kafka
    eventsmv --reads from--> kafka_events
    eventsmv --pushes data to--> events
```

#### `kafka_events` table

`kafka_events` table is of [Kafka table engine](https://clickhouse.com/docs/en/engines/table-engines/integrations/kafka/)

In essence it behaves as a kafka consumer group - reading from this table reads from the underlying kafka topic and advances the current offset.

#### `events_mv` Materialized View

`events_mv` table is a [Materialized View](https://clickhouse.com/docs/en/sql-reference/statements/create/view/#materialized).

In this case it acts as a data pipe which periodically pulls from `kafka_events` and pushes the results into the (events) table.

#### `events` table

`events` table is of [ReplacingMergeTree table engine](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/replacingmergetree/). Insights and other features query this table for analytics results.

Note that while `ReplacingMergeTree` is used, it's not an effective deduplication method and we should avoid writing duplicate data into the table.

### Sharded events ingestion

Currently PostHog cloud has more than a single ClickHouse instance. To support this, sharding and a different schema for ClickHouse is used.

```mermaid
flowchart LR
    classDef table fill:#f6e486,stroke:#ffc45d;
    kafka_events["kafka_events table<br/>(Kafka table engine)"]:::table
    eventsmv["events_mv table<br/>(Materialized view)"]:::table
    writable_events["writable_events table</br/>(Distributed table engine)"]:::table
    events["events table</br/>(Distributed table engine)"]:::table
    sharded_events["sharded_events table<br/>(ReplicatedReplacingMergeTree table engine)"]:::table

    kafka_events -.clickhouse_events_json topic.- Kafka
    eventsmv --reads from--> kafka_events
    eventsmv --pushes data to--> writable_events
    writable_events -.pushes data to.-> sharded_events

    events -.reads from.-> sharded_events
```

#### `writable_events` table

`writable_events` table is of [Distributed table engine](https://clickhouse.com/docs/en/engines/table-engines/special/distributed/).

The schema looks something like as follows:

```sql
CREATE TABLE posthog.writable_events (
    `uuid` UUID,
    `event` String,
    `properties` String,
    `timestamp` DateTime64(6, 'UTC'),
    `team_id` Int64,
    `distinct_id` String,
    `elements_hash` String,
    `created_at` DateTime64(6, 'UTC'),
    `_timestamp` DateTime,
    `_offset` UInt64,
    `elements_chain` String
) ENGINE = Distributed('posthog', 'posthog', 'sharded_events', sipHash64(distinct_id))
```

This table:

-   Gets pushed rows from `events_mv` table.
-   For every row, it calculates a hash based on the `distinct_id` column.
-   Based on the hash, sends the row to the right shard on the `posthog` cluster into the `posthog.sharded_events` table.
-   Does not contain materialized columns as they would hinder INSERT queries.

#### `sharded_events` table

`sharded_events` table is a [Replicated](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/replication/)[ReplacingMergeTree](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/replacingmergetree/).

This table:

-   Stores the event data.
-   Is sharded and replicated.
-   Is queried indirectly via the `events` table.

#### `events` table

Similar to `writable_events`, `events` table is of [Distributed table engine](https://clickhouse.com/docs/en/engines/table-engines/special/distributed/).

This table is being queried from app and for every query, figures out what shard(s) to query and aggregates the results from shards.

### Persons ingestion

Persons ingestion works similarly to events, except there's two tables involved: `person` and `person_distinct_id`.

Note that querying both tables _requires_ handling duplicated rows. Check out [PersonQuery code](https://github.com/PostHog/posthog/blob/master/ee/clickhouse/queries/person_query.py) for an example of how it's done.

In sharded setups, `person` and `person_distinct_id` tables are not sharded and instead replicated onto each node to avoid JOINs over the network.
