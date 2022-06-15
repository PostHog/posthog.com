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
- [bitnami/minio](https://github.com/bitnami/charts/tree/master/bitnami/minio)
- [bitnami/postgresql](https://github.com/bitnami/charts/tree/master/bitnami/postgresql)
- [bitnami/redis](https://github.com/bitnami/charts/tree/master/bitnami/redis)
- [bitnami/zookeeper](https://github.com/bitnami/charts/tree/master/bitnami/zookeeper)

There is optional support for the following additional dependencies:

- [grafana/grafana](https://github.com/grafana/helm-charts/tree/main/charts/grafana)
- [grafana/loki](https://github.com/grafana/helm-charts/tree/main/charts/loki)
- [grafana/promtail](https://github.com/grafana/helm-charts/tree/main/charts/promtail)
- [jetstack/cert-manager](https://github.com/jetstack/cert-manager)
- [kubernetes/ingress-nginx](https://github.com/kubernetes/ingress-nginx/)
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
# Note: those overrides are experimental, please let us know how this worked for you!

# Use larger storage for stateful services
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

# Add additional replicas for the stateless services
events:
  replicacount: 2

pgbouncer:
  replicacount: 2

plugins:
  replicacount: 2

web:
  replicacount: 2

worker:
  replicacount: 2

```

</details>

<details>
  <summary>
    <b>Custom overrides for > 1M events/month</b>
  </summary>

```yaml
# Note: those overrides are experimental, please let us know how this worked for you!

# Use larger storage for stateful services
clickhouse:
  persistence:
    size: 200Gi

postgresql:
  persistence:
    size: 60Gi

kafka:
  persistence:
    size: 30Gi
  logRetentionBytes: _22_000_000_000

# Enable horizontal pod autoscaling for stateless services
events:
  hpa:
    enabled: true

pgbouncer:
  hpa:
    enabled: true

plugins:
  hpa:
    enabled: true

web:
  hpa:
    enabled: true

worker:
  hpa:
    enabled: true

```

</details>

#### Using dedicated nodes for services

For the stateful services (ClickHouse, Kafka, Redis, PostgreSQL, Zookeeper), we suggest you to run them on nodes with dedicated CPU resources and fast drives (SSD/NVMe).

In order to do so, after having labeled your Kubernetes nodes, you can assign pods to them using the following overrides:

- ClickHouse: `clickhouse.nodeSelector`
- Kafka: `kafka.nodeSelector`
- Redis: `redis.master.nodeSelector`
- PostgreSQL: `postgresql.master.nodeSelector`
- Zookeeper: `zookeeper.nodeSelector`

Example:

```yaml
clickhouse.nodeSelector:
  diskType: ssd
  nodeType: fast
```

For more fine grained options, `affinity` and `tolerations` overrides are also available for the majority of the stateful components. See the official Kubernetes [documentation](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/) for more info.


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

By default, ClickHouse is installed as a part of the chart, powered by [clickhouse-operator](https://github.com/Altinity/clickhouse-operator/). You can also use a ClickHouse managed service like [Altinity](https://altinity.com/) (see [here](/docs/self-host/configure/using-altinity-cloud) for more info).

#### Securing ClickHouse
By default, the PostHog Helm Chart will provision a ClickHouse cluster using a default username and password. Please provide a unique login by overriding the `clickhouse.user` and `clickhouse.password` values.

By default, the PostHog Helm Chart uses a `ClusterIP` to expose the service
internally to the rest of the PostHog application. This should prevent any
external access.

If however you decide you want to access the ClickHouse cluster external to the
Kubernetes cluster and need to expose it e.g. to the internet, keep in mind the
following:

 1. the Helm Chart does not configure TLS for ClickHouse, thus we would
    recommend that you ensure that you configure TLS e.g. within a load balancer
    in front of the cluster.

 1. if exposing via a `LoadBalancer` or `NodePort` service type via
    `clickhouse.serviceType`, these will both expose a port on your Kubernetes
    nodes. We recommend you ensure that your Kubernetes worker nodes are within
    a private network or in a public network with firewall rules in place.

 1. if exposing via a `LoadBalancer` service type, restrict the ingress network
    access to the load balancer

 1. to restrict access to the ClickHouse cluster, ClickHouse offers settings for
    restricting the IPs/hosts that can access the cluster. See the
    [`user_name/networks`](https://clickhouse.com/docs/en/operations/settings/settings-users/#user-namenetworks)
    setting for details. We expose this setting via the Helm Chart as
    `clickhouse.allowed_network_ips`

#### Use an external service
To use an external ClickHouse service, please set `clickhouse.enabled` to `false` and then configure the `externalClickhouse` values.

Find out how to deploy PostHog using Altinity Cloud [in our deployment configuration docs](/docs/self-host/configure/using-altinity-cloud).

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


### [MinIO](../runbook/minio/)

By default, `MinIO` is not installed as part of the chart. If you want to enable it, please set `minio.enabled` to `true`.

MinIO provide a scalable, S3 compatible object storage system. You can customize all its settings by overriding `values.yaml` variables in the `minio` namespace.

Note: please override the default user authentication by either passing `auth.rootUser` and `auth.rootPassword` or `auth.existingSecret`.

#### Use an external service
To use an external S3 like/compatible object storage, please set `minio.enabled` to `false` and then configure the `externalObjectStorage` values.

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) and the [MinIO chart](https://github.com/bitnami/charts/tree/master/bitnami/minio) for full configuration options._


### [PostgreSQL](../runbook/postgresql/)

> While ClickHouse powers the bulk of the analytics if you deploy PostHog using this chart, Postgres is still needed as a data store for PostHog to work.

PostgreSQL is installed by default as part of the chart. You can customize all its settings by overriding `values.yaml` variables in the `postgresql` namespace.

Note: to avoid issues when upgrading this chart, provide `postgresql.postgresqlPassword` for subsequent upgrades. This is due to an issue in the PostgreSQL upstream chart where password will be overwritten with randomly generated passwords otherwise. See [PostgreSQL#upgrade](https://github.com/helm/charts/tree/master/stable/postgresql#upgrade) for more details.

#### Use an external service
To use an external PostgreSQL service, please set `postgresql.enabled` to `false` and then configure the `externalPostgresql` values.

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) and the [PostgreSQL chart](https://github.com/bitnami/charts/tree/master/bitnami/postgresql) for full configuration options._

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

<details>
  <summary>
    <b>Example</b>
  </summary>

```yaml
redis:
  enabled: false

externalRedis:
  host: "posthog.cache.us-east-1.amazonaws.com"
  port: 6379
```

</details>

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

      ```yaml
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

        ```yaml
        redis:
          enable: false

        externalRedis:
          host: "<YOUR_REDIS_HOST>"
          port: <YOUR_REDIS_PORT>
          existingSecret: "redis-existing-secret"
          existingSecretPasswordKey: "redis-password"
        ```

</details>

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) and the [Redis chart](https://github.com/bitnami/charts/tree/master/bitnami/redis) for full configuration options._


### [Kafka](../runbook/kafka/)

Kakfa is installed by default as part of the chart. You can customize all its settings by overriding `values.yaml` variables in the `kafka` namespace.

#### Use an external service
To use an external Kafka service, please set `kafka.enabled` to `false` and then configure the `externalKafka` values.

<details>
  <summary>
    <b>Example</b>
  </summary>

```yaml
kafka:
  enabled: false

externalKafka:
  brokers:
    - "broker-1.posthog.kafka.us-east-1.amazonaws.com:9094"
    - "broker-2.posthog.kafka.us-east-1.amazonaws.com:9094"
    - "broker-3.posthog.kafka.us-east-1.amazonaws.com:9094"
```

</details>

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) and the [Kafka chart](https://github.com/bitnami/charts/tree/master/bitnami/kafka) for full configuration options._


### [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)

This chart provides support for the Ingress resource. If you have an available Ingress Controller such as Nginx or Traefik you maybe want to set `ingress.nginx.enabled` to true or `ingress.type` and choose an `ingress.hostname` for the URL. Then, you should be able to access the installation using that address.


### [Grafana](https://github.com/grafana/grafana)
By default, `grafana` is not installed as part of the chart. If you want to enable it, please set `grafana.enabled` to `true`.

The default settings provide a vanilla installation with an auto generated login. The username is `admin` and the auto-generated password can be fetched by running:

```shell
kubectl -n posthog get secret posthog-grafana -o jsonpath="{.data.admin-password}" | base64 --decode
```

To configure the stack (like expose the service via an ingress resource, manage users, ...) please look at the inputs provided by the upstream chart.

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) and the [grafana chart](https://github.com/grafana/helm-charts/tree/main/charts/grafana) for full configuration options._


### [Loki](https://github.com/grafana/loki)
By default, `loki` is not installed as part of the chart. If you want to enable it, please set `loki.enabled` to `true`.

To configure the stack (like expose the service via an ingress resource, ...) please look at the inputs provided by the upstream chart.

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) and the [loki chart](https://github.com/grafana/helm-charts/tree/main/charts/loki) for full configuration options._


### [Promtail](https://github.com/grafana/loki/tree/main/docs/sources/clients/promtail)
By default, `promtail` is not installed as part of the chart. If you want to enable it, please set `promtail.enabled` to `true`.

To configure the stack (like expose the service via an ingress resource, ...) please look at the inputs provided by the upstream chart.

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) and the [promtail chart](https://github.com/grafana/helm-charts/tree/main/charts/promtail) for full configuration options._


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
