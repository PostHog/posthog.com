---
title: Posthog Clickhouse Chart Configuration
sidebarTitle: Chart Configuration
sidebar: Docs
showTitle: true
---

## Dependencies

By default, the chart installs the following dependencies:

- [Altinity/clickhouse-operator](https://github.com/Altinity/clickhouse-operator/)
- [bitnami/postgresql](https://github.com/bitnami/charts/tree/master/bitnami/postgresql)
- [bitnami/redis](https://github.com/bitnami/charts/tree/master/bitnami/redis)
- [bitnami/kafka](https://github.com/bitnami/charts/tree/master/bitnami/kafka)

There is optional support for the following additional dependencies:

- [kubernetes/ingress-nginx](https://github.com/kubernetes/ingress-nginx/)
- [jetstack/cert-manager](https://github.com/jetstack/cert-manager)
- [prometheus-community/prometheus](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus)
- [prometheus-community/prometheus-statsd-exporter](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-statsd-exporter)

See the [Chart configuration](#chart-configuration) section for how to enable and configure each.

## Chart configuration

Dependent charts can also have values overwritten. Preface values with `postgresql.*`, see options for each chart in [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) or under each charts repos in [Dependencies](#dependencies).

All configuration options can be found in [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) or in [values.yaml](values.yaml) file.

### Setting up email
Outgoing email is used for password reset. For PostHog to be able to send emails we need a login and password. Add these settings to your `values.yaml`:
```yaml
email:
  user: <your STMP login user>
  password:  <your STMP password>
```

### Scaling up
The default configuration is geared towards minimizing costs. Here are example extra values overrides to use for scaling up:
<details>
  <summary>
    <b> Additional values to `values.yaml` for <1M events/month</b>
  </summary>

<br />

```yaml
# Note that this is experimental, please let us know how this worked for you.

# More storage space
clickhouseOperator:
  storage: 60Gi

postgresql:
  persistence:
    size: 20Gi

kafka:
  persistence:
    size: 10Gi
  logRetentionBytes: _8_000_000_000

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
    <b> Additional values to `values.yaml` for >1M events/month</b>
  </summary>

<br />

```yaml
# Note that this is experimental, please let us know how this worked for you.

# More storage space
clickhouseOperator:
  storage: 200Gi

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

### [ClickHouse](https://clickhouse.tech/)

ClickHouse is the database that does the bulk of heavy lifting with regards to storing and analyzing the analytics data.

By default, ClickHouse is installed as a part of the chart, powered by [clickhouse-operator](https://github.com/Altinity/clickhouse-operator/). As such it's important to set the database size to be enough to store the raw data via `clickhouseOperator.size` value.

To use an external `ClickHouse` cluster, set `clickhouseOperator.enabled` to `false` and set `clickhouse.host`, `clickhouse.database`, `clickhouse.user` and `clickhouse.password`.

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) for full configuration options._

### [PostgreSQL](https://www.postgresql.org/)

> While ClickHouse powers the bulk of the analytics if you deploy PostHog using this chart, Postgres is still needed as a data store for PostHog to work.

By default, PostgreSQL is installed as part of the chart. To use an external PostgreSQL server set `postgresql.enabled` to `false` and then set `postgresql.postgresHost` and `postgresql.postgresqlPassword`. The other options (`postgresql.postgresqlDatabase`, `postgresql.postgresqlUsername` and `postgresql.postgresqlPort`) may also want changing from their default values.

To avoid issues when upgrading this chart, provide `postgresql.postgresqlPassword` for subsequent upgrades. This is due to an issue in the PostgreSQL chart where password will be overwritten with randomly generated passwords otherwise. See [PostgreSQL#upgrade](https://github.com/helm/charts/tree/master/stable/postgresql#upgrade) for more detail.

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) and [PostgreSQL chart](https://github.com/bitnami/charts/tree/master/bitnami/postgresql) for full configuration options._

### [Redis](https://redis.io/)

By default, Redis is installed as part of the chart. To use an external Redis server/cluster set `redis.enabled` to `false` and then set `redis.host`. If your Redis cluster uses a password define it with `redis.password`, otherwise just omit it.

To avoid issues when upgrading this chart, provide `redis.password` for subsequent upgrades. Otherwise, the Redis pods will get recreated on every update, potentially incurring some downtime.

_See [ALL_VALUES.md](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) and [redis chart](https://github.com/bitnami/charts/tree/master/bitnami/redis) for full configuration options._

### [Kafka](https://kafka.apache.org/)

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
