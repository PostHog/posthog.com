---
title: Kafka
sidebar: Docs
showTitle: true
---

Apache Kafka is an open-source distributed event streaming platform used by thousands of companies for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications.

At PostHog we mainly use it to stream events from our ingestion pipeline to ClickHouse.

### Dictionary
* `broker`: a cluster is built by one or more servers. The servers forming the storage layer are called brokers
* `event`: an event records the fact that "something happened" in the world or in your business. It is also called record or message in the documentation. When you read or write data to Kafka, you do this in the form of events. Conceptually, an event has a key, value, timestamp, and optional metadata headers
* `producers`: client applications that publish (write) events to Kafka
* `consumer`: client application subscribed to (read and process) events from Kafka
* `topic`: group of events
* `partition`: topics are partitioned, meaning a topic is spread over a number of "buckets" located on different Kafka brokers
* `replication`: to make your data fault-tolerant and highly-available, every topic can be replicated, so that there are always multiple brokers that have a copy of the data just in case things go wrong

### Useful links
- [Official documentation](https://kafka.apache.org/documentation/)
