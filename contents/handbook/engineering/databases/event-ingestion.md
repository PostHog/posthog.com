---
title: Event ingestion explained
sidebar: Handbook
showTitle: true
---

In it's simplest form, PostHog is an analytics data store where events come in and get analyzed.

This document gives an overview of how data ingestion works.

## Ingestion data flow

```mermaid
graph TD
    CLIENT[Client Library]
    DECIDE["/decide API"]
    CAPTURE[Capture API]
    PLUGINS[Plugin server]
    PERSONS["PostgreSQL (persons table)"]
    Kafka2[Kafka]

    CLIENT -..-> DECIDE

    CLIENT -..-> CAPTURE
    CAPTURE --> Kafka

    Kafka <-..- PLUGINS

    PLUGINS <--> PERSONS
    PLUGINS --> Kafka2

    Kafka2 <-..- ClickHouse
```

The following sections break each part down in more detail.

### Client libraries

Client libraries are responsible for capturing user interactions and sending the events to us.

Note that various client libraries also can call `/decide` endpoint for:
- `posthog-js`: on load for compression, session recording, feature flags and other autocapture-related settings
- other libraries: for checking feature flags

### Capture API

Capture API is responsible for capturing data.

It is responsible for:
- Validating API keys.
- Anonymizing IPs according to project settings.
- Decompressing and normalizing the shape of event data for the rest of the system.
- Sending processed to `events_plugin_ingestion` Kafka topic.
- If communication with Postgres fails, logging events to kafka `dead_letter_queue` table.

The design goal of this service is to be as simple and resilient as possible to avoid dropping events.

### App server

On a high level during ingestion, app server:
- Reads events from `events_plugin_ingestion` kafka topic
- Runs user-created apps on the events, potentially modifying the shape of the events.
- Handles `person` (and groups) creation and updates, using `posthog_person` postgresql table as the source of truth.
- Sends events, persons, groups to specialized kafka tables for clickhouse to read.
- Does that in a highly parallelized way to handle high ingestion volume.

### Kafka

Kafka is used as a resilient message bus between different services.

You can find relevant kafka topics [in the PostHog codebase](https://github.com/PostHog/posthog/blob/master/posthog/kafka_client/topics.py).


## ClickHouse

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

    kafka_events -.clickhouse_events_proto topic.- Kafka
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

    kafka_events -.clickhouse_events_proto topic.- Kafka
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
- Gets pushed rows from `events_mv` table.
- For every row, it calculates a hash based on the `distinct_id` column.
- Based on the hash, sends the row to the right shard on the `posthog` cluster into the `posthog.sharded_events` table.
- Does not contain materialized columns as they would hinder INSERT queries.

#### `sharded_events` table

`sharded_events` table is a [Replicated](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/replication/)[ReplacingMergeTree](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/replacingmergetree/).

This table:
- Stores the event data.
- Is sharded and replicated.
- Is queried indirectly via the `events` table.

#### `events` table

Similar to `writable_events`, `events` table is of [Distributed table engine](https://clickhouse.com/docs/en/engines/table-engines/special/distributed/).

This table is being queried from app and for every query, figures out what shard(s) to query and aggregates the results from shards.

### Persons ingestion

Persons ingestion works similarly to events, except there's two tables involved: `person` and `person_distinct_id`.

Note that querying both tables _requires_ handling duplicated rows. Check out [PersonQuery code](https://github.com/PostHog/posthog/blob/master/ee/clickhouse/queries/person_query.py) for an example of how it's done.

In sharded setups, `person` and `person_distinct_id` tables are not sharded and instead replicated onto each node to avoid JOINs over the network.
