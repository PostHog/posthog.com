---
title: Kafka Engine
sidebar: Docs
showTitle: true
---

ClickHouse provides a table engine called [Kafka Engine](https://clickhouse.tech/docs/en/engines/table-engines/integrations/kafka/) to consume Kafka messages, convert the messages into table rows, and persist the table rows into the destination table. Although a Kafka engine can be configured with multiple topics, a Kafka engine can only have one table schema defined.

PostHog uses the `Kafka` engine type for several tables:

```shell
clickhouse-client --query "SELECT name FROM system.tables WHERE database = 'posthog' AND engine = 'Kafka'"
kafka_events
kafka_events_dead_letter_queue
kafka_person
kafka_person_distinct_id
kafka_plugin_log_entries
kafka_session_recording_events
```

Note: `SELECT` is not particularly useful for reading messages (except for debugging), because each message can be read only once. **You will lose data if you manually read from this table, as you’ll artificially increment the internal offset ClickHouse uses to read from this table.**
