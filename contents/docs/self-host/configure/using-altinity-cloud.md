---
title: Deploying ClickHouse using Altinity.Cloud
sidebar: Docs
showTitle: true
---

This document outlines how to deploy PostHog using Altinity Cloud ClickHouse clusters.

## Prerequisites

- Altinity.Cloud ClickHouse cluster:
    - Minimum ClickHouse version: 21.8.13
    - Single shard and no data replication
    - No dashes (`-`) in cluster name
- PostHog helm chart version >= 16.1.1
- PostHog version >= 1.33.0

## Deployment instructions

PostHog uses Kafka to send data from the app to ClickHouse. For that reason, Kafka needs to be accessible to ClickHouse during deployment.

### Deploying using external Kafka

```yaml
env:
  - name: CLICKHOUSE_DISABLE_EXTERNAL_SCHEMAS
    value: "1"

kafka:
  enabled: false

externalKafka:
  brokers:
    - "broker-1.posthog.kafka.us-east-1.amazonaws.com:9094"
    - "broker-2.posthog.kafka.us-east-1.amazonaws.com:9094"
    - "broker-3.posthog.kafka.us-east-1.amazonaws.com:9094"

clickhouse:
  enabled: false

externalClickhouse:
  host: "somecluster.demo.altinity.cloud"
  user: "admin"
  password: "password"
  cluster: "clustername"
  secure: true
```

Read more about how to configure external Kafka in the chart [in our deployment documentation](https://posthog.com/docs/self-host/deploy/configuration#kafka).

### Using internal Kafka

To deploy using a version of Kafka managed by the PostHog Helm chart, follow these three steps:

1. [Deploy your Helm chart](/docs/self-host) initially with the following values.yaml:

```yaml
kafka:
  enabled: true
  externalAccess:
    enabled: true
    service:
      type: LoadBalancer
      ports:
        external: 9094
    autoDiscovery:
      enabled: true
  serviceAccount:
    create: true
  rbac:
    create: true


clickhouse:
  enabled: false

redis:
  enabled: false

postgresql:
  enabled: false

pgbouncer:
  enabled: false

plugins:
  enabled: false

worker:
  enabled: false

web:
  enabled: false

events:
  enabled: false

migrate:
  enabled: false
```

2. Get the external Kafka IP via `kubectl get svc -n posthog | grep kafka-0-external`

3. [Deploy posthog using helm](/docs/self-host) with new values.yaml (fill in placeholder values)

```yaml
env:
  - name: KAFKA_URL_FOR_CLICKHOUSE
    value: "kafka://KAFKA_IP:9094"
  - name: CLICKHOUSE_DISABLE_EXTERNAL_SCHEMAS
    value: "1"

clickhouse:
  enabled: false

externalClickhouse:
  host: "somecluster.demo.altinity.cloud"
  user: "admin"
  password: "password"
  cluster: "clustername"
  secure: true

kafka:
  enabled: true
  externalAccess:
    enabled: true
    service:
      type: LoadBalancer
      ports:
        external: 9094
    autoDiscovery:
      enabled: true
  serviceAccount:
    create: true
  rbac:
    create: true
```
