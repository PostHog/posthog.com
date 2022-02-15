---
title: PostHog chart configuration
sidebarTitle: Chart configuration
sidebar: Docs
showTitle: true
---

This document outlines the most important configuration options available in the chart.

## Dependencies

By default, the chart installs the following dependencies:

- [altinity/clickhouse-operator](https://github.com/Altinity/clickhouse-operator/)
- [bitnami/kafka](https://github.com/bitnami/charts/tree/master/bitnami/kafka)
- [bitnami/postgresql](https://github.com/bitnami/charts/tree/master/bitnami/postgresql)
- [bitnami/redis](https://github.com/bitnami/charts/tree/master/bitnami/redis)
- [bitnami/zookeeper](https://github.com/bitnami/charts/tree/master/bitnami/zookeeper)

There is optional support for the following additional dependencies:

- [kubernetes/ingress-nginx](https://github.com/kubernetes/ingress-nginx/)
- [jetstack/cert-manager](https://github.com/jetstack/cert-manager)
- [prometheus-community/prometheus](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus)
- [prometheus-community/prometheus-kafka-exporter](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-kafka-exporter)
- [prometheus-community/prometheus-postgres-exporter](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-postgres-exporter)
- [prometheus-community/prometheus-redis-exporter](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-redis-exporter)
- [prometheus-community/prometheus-statsd-exporter](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-statsd-exporter)


## Chart configuration

All PostHog Helm chart configuration options can be found in the [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) generated from the [values.yaml](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/values.yaml) file.

Dependent charts can also have values overwritten. See [Chart.yaml](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/Chart.yaml) for more info regarding the source shard and the namespace that can be used for the override.

### Scaling up
The default configuration is geared towards minimizing costs. Here are example extra values overrides to use for scaling up:
<details>
  <summary>
    <b>Custom overrides for {`<`} 1M events/month</b>
  </summary>

```yaml
# Note that this is experimental, please let us know how this worked for you.

# More storage space
clickhouse:
  persistence:
    size: 60Gi

postgresql:
  persistence:
    size: 20Gi

kafka:
  persistence:
    size: 20Gi
  logRetentionBytes: _15_000_000_000

# Extra replicas for more loaded services
web:
  replicacount: 2

worker:
  replicacount: 2

plugins:
  replicacount: 2
```

</details>

<details>
  <summary>
    <b>Custom overrides for > 1M events/month</b>
  </summary>

```yaml
# Note that this is experimental, please let us know how this worked for you.

# More storage space
clickhouse:
  persistence:
    size: 200Gi

postgresql:
  persistence:
    size: 60Gi

redis:
  master:
    size: 30Gi

kafka:
  persistence:
    size: 30Gi
  logRetentionBytes: _22_000_000_000

# Enable horizontal autoscaling for services
pgbouncer:
  hpa:
    enabled: true

web:
  hpa:
    enabled: true

beat:
  hpa:
    enabled: true

worker:
  hpa:
    enabled: true

plugins:
  hpa:
    enabled: true
```

</details>


### Email (SMTP service)
For PostHog to be able to send emails we need a working SMTP service available. You can configure PostHog to use the service by editing the `email` section of your `values.yaml` file. Example:

```yaml
email:
  host: <SMTP service host>
  port: <SMTP service port>
```

If your SMTP services requires authentication (recommended) you can either:

* directly provide the SMTP login in the `values.yaml` by simply setting `email.user` and `email.password`

<details>
  <summary>
    <b>Example</b>
  </summary>

  ```yaml
  email:
    host: <SMTP service host>
    port: <SMTP service port>
    user: <SMTP service user>
    password: <SMTP service password>
  ```

</details>

* provide the password via a Kubernetes secret, by configuring `email.existingSecret` and `email.existingSecretKey` accordingly

<details>
  <summary>
    <b>Example</b>
  </summary>

1. create the secret by running: `kubectl -n posthog create secret generic "smtp-password" --from-literal="password=<YOUR_PASSWORD>"`

2. configure your `values.yaml` to reference the secret:

  ```yaml
  email:
    host: <SMTP service host>
    port: <SMTP service port>
    user: <SMTP service user>
    existingSecret: "smtp-password"
    existingSecretKey: "password"
  ```

</details>


### [ClickHouse](../runbook/clickhouse/)

ClickHouse is the datastore system that does the bulk of heavy lifting with regards to storing and analyzing the analytics data.

By default, ClickHouse is installed as a part of the chart, powered by [clickhouse-operator](https://github.com/Altinity/clickhouse-operator/). We are currently working to add the possibility to use an external ClickHouse service (see [issue #279](https://github.com/PostHog/charts-clickhouse/issues/279) for more info).


#### Custom settings

It's possible to pass custom settings to ClickHouse. This might be needed to e.g. set query time limits or increase max memory usable by clickhouse.

To do so, you can override the `clickhouse.profiles` values as below. The `default` profile is used by PostHog for all queries.

```yaml
clickhouse:
  profiles:
    default/max_execution_time: "180"
    default/max_memory_usage: "40000000000"
```

Read more about ClickHouse settings [here](https://clickhouse.com/docs/en/operations/settings/).

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) for full configuration options._


### [PostgreSQL](../runbook/postgresql/)

> While ClickHouse powers the bulk of the analytics if you deploy PostHog using this chart, Postgres is still needed as a data store for PostHog to work.

PostgreSQL is installed by default as part of the chart. You can customize all its settings by overriding `values.yaml` variables in the `postgresql` namespace.

Note: to avoid issues when upgrading this chart, provide `postgresql.postgresqlPassword` for subsequent upgrades. This is due to an issue in the PostgreSQL upstream chart where password will be overwritten with randomly generated passwords otherwise. See [PostgreSQL#upgrade](https://github.com/helm/charts/tree/master/stable/postgresql#upgrade) for more details.

#### Use an external service
To use an external PostgreSQL service, please set `postgresql.enabled` to `false` and then configure the `externalPostgresql` values.

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) and [PostgreSQL chart](https://github.com/bitnami/charts/tree/master/bitnami/postgresql) for full configuration options._

### [PgBouncer](https://www.pgbouncer.org/)
PgBouncer is a lightweight connection pooler for PostgreSQL and it is installed by default as part of the chart. It is currently required in order for the installation to work (see [here](https://github.com/PostHog/charts-clickhouse/issues/280) for more info).

If you've configured your PostgreSQL instance to require the use of TLS, you'll need to pass an additional env variables to the PgBouncer deployment (see the [official documentation](https://www.pgbouncer.org/config.html) for more info). Example:

```yaml
pgbouncer:
  env:
  - name: SERVER_TLS_SSLMODE
    value: "your_value"
```

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) for full configuration options._

### [Redis](https://redis.io/)

Redis is installed by default as part of the chart. You can customize all its settings by overriding `values.yaml` variables in the `redis` namespace.

#### Use an external service
To use an external Redis service, please set `redis.enabled` to `false` and then configure the `externalRedis` values.

#### Credentials
By default, Redis doesn't use any password for authentication. If you want to configure it to use a password (recommended) see the options below.

<details>
  <summary>
    <b>Internal Redis</b>
  </summary>

  * set `redis.auth.enabled` to `true`
  * to directly provide the password value in the `values.yaml` simply set it in `redis.auth.password`
  * if you want to provide the password via a Kubernetes secret, please configure `redis.auth.existingSecret` and `redis.auth.existingSecretPasswordKey` accordingly:

    **Example**

    1. create the secret by running: `kubectl -n posthog create secret generic "redis-existing-secret" --from-literal="redis-password=<YOUR_PASSWORD>"`

    2. configure your `values.yaml` to reference the secret:
      ```
      redis:
        enabled: true
        auth:
          enabled: true
          existingSecret: "redis-existing-secret"
          existingSecretPasswordKey: "redis-password"
      ```

</details>

<details>
  <summary>
    <b>External Redis</b>
  </summary>

  * to directly provide the password value in the `values.yaml` simply set it in `externalRedis.password`

  * if you want to provide a password via an existing secret, please configure `externalRedis.existingSecret` and `externalRedis.existingSecretPasswordKey` accordingly:

      **Example**

      1. create the secret by running: `kubectl -n posthog create secret generic "redis-existing-secret" --from-literal="redis-password=<YOUR_PASSWORD>"`

      1. configure your `values.yaml` to reference the secret:
        ```
        externalRedis:
          host: "<YOUR_REDIS_HOST>"
          port: <YOUR_REDIS_PORT>
          existingSecret: "redis-existing-secret"
          existingSecretPasswordKey: "redis-password"
        ```

</details>

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) and [redis chart](https://github.com/bitnami/charts/tree/master/bitnami/redis) for full configuration options._


### [Kafka](../runbook/kafka/)

By default, Kafka is installed as part of the chart. Kafka is used as a queue between the PostHog web application and PostHog plugin server to manage data ingestion as well as for ingesting data into ClickHouse.

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) and [kafka chart](https://github.com/bitnami/charts/tree/master/bitnami/kafka) for full configuration options._


### [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)

This chart provides support for the Ingress resource. If you have an available Ingress Controller such as Nginx or Traefik you maybe want to set `ingress.nginx.enabled` to true or `ingress.type` and choose an `ingress.hostname` for the URL. Then, you should be able to access the installation using that address.


### [Prometheus](https://prometheus.io/docs/introduction/overview/)

This chart supports alerting. Set `prometheus.enabled` to true and set `prometheus.alertmanagerFiles` to the right configuration.

Read more at [Prometheus chart](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus) and [Prometheus configuration](https://prometheus.io/docs/alerting/latest/configuration/)

#### Example configuration ([PagerDuty](https://www.pagerduty.com/))

```yaml
prometheus:
  enabled: true

  alertmanagerFiles:
    alertmanager.yml:
      receivers:
        - name: default-receiver
          pagerduty_configs:
            - routing_key: YOUR_ROUTING_KEY
              description: "{{ range .Alerts }}{{ .Annotations.summary }}\n{{ end }}"

      route:
        group_by: [alertname]
        receiver: default-receiver
```

#### Getting access to the Prometheus UI

This might be useful when checking out metrics. Figure out your `prometheus-server` pod name via `kubectl get pods --namespace NS` and run:
`kubectl --namespace NS port-forward posthog-prometheus-server-XXX 9090`.

After this, you should be able to access Prometheus server on `localhost`.


### [Statsd](https://github.com/statsd/statsd) / [`prometheus-statsd-exporter`](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-statsd-exporter)
By default, StatsD is not installed as part of the chart. If you want to enable it, please set `prometheus-statsd-exporter.enabled` to `true`.

#### Use an external service
To use an external StatsD service, please set `prometheus-statsd-exporter.enabled` to `false` and then configure the `externalStatsd` values.

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) and [prometheus-statsd-exporter chart](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-statsd-exporter) for full configuration options._


### [prometheus-kafka-exporter](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-kafka-exporter)
By default, `prometheus-kafka-exporter` is not installed as part of the chart. If you want to enable it, please set `prometheus-kafka-exporter.enabled` to `true`. If you are using an external Kafka, please configure `prometheus-kafka-exporter.kafkaServer` accordingly.

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) and [prometheus-kafka-exporter chart](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-kafka-exporter) for full configuration options._


### [prometheus-postgres-exporter](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-postgres-exporter)
By default, `prometheus-postgres-exporter` is not installed as part of the chart. If you want to enable it, please set `prometheus-postgres-exporter.enabled` to `true`. If you are using an external Kafka, please configure `prometheus-postgres-exporter.config.datasource` accordingly.

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) and [prometheus-postgres-exporter chart](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-postgres-exporter) for full configuration options._


### [prometheus-redis-exporter](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-redis-exporter)
By default, `prometheus-redis-exporter` is not installed as part of the chart. If you want to enable it, please set `prometheus-redis-exporter.enabled` to `true`. If you are using an external Redis, please configure `prometheus-redis-exporter.redisAddress` accordingly.

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) and [prometheus-redis-exporter chart](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-redis-exporter) for full configuration options._
