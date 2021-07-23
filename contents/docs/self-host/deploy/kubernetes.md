---
title: Deploying with Helm Chart (Kubernetes)
sidebarTitle: Helm Chart (Kubernetes)
sidebar: Docs
showTitle: true
---

## Why Helm Charts

Helm is the package manager for Kubernetes, which allows us to efficiently manage Kubernetes applications. 

Helm Charts are the "packages" in the Helm world. They help us define, install, and upgrade nearly every Kubernetes application!

In this doc, we'll learn how to bootstrap a [PostHog](https://posthog.com/) deployment on a [Kubernetes](http://kubernetes.io) cluster using [Helm](https://helm.sh). We also optionally package [PostgreSQL](https://github.com/kubernetes/charts/tree/master/stable/postgresql) and [Redis](https://github.com/kubernetes/charts/tree/master/stable/redis) - these are required for PostHog. You can read more about this in the [Packages](#packages) section.


## Prerequisites

- [Kubernetes](http://kubernetes.io) 1.4+ with Beta APIs enabled
- [Helm](https://helm.sh) >= v3
- PV provisioner support in the underlying infrastructure (with persistence storage enabled)

## Step By Step Installation

1. Ensure you meet the prerequisites above.

2. Run the following:

> _NOTE: If Helm hangs while installing, try **increasing the memory** of your nodes._
> _As a baseline, we suggest having at least **4gb of memory per node**._

```bash
helm repo add posthog https://posthog.github.io/charts/
helm repo update
helm install posthog posthog/posthog
```

## Configuration

The following table lists the configurable parameters of the PostHog Helm Chart and their default values.

Dependent charts can also have values overwritten. Preface values with PostgreSQL.


 | Parameter & Description                                                                                                                                      | Default                           |
 | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------- |
 | `image.repository`<br/><br/>&nbsp; PostHog image                                                                                                             | `posthog/posthog`                 |
 | `image.tag`<br/><br/>&nbsp; PostHog image tag                                                                                                                | `latest`                          |
 | `image.pullPolicy`<br/><br/>&nbsp; Image pull policy                                                                                                         | `Always`                          |
 | `image.imagePullSecrets`<br/><br/>&nbsp; Specify image pull secrets                                                                                          | `[]`                              |
 | `posthogSecret`<br/><br/>&nbsp; Specify SECRET_KEY. If isn't specified it will be generated automatically.                                                   | `nil`                             |
 | `web.podAnnotations`<br/><br/>&nbsp; Web pod annotations                                                                                                     | `{}`                              |
 | `web.podLabels`<br/><br/>&nbsp; Web pod extra labels                                                                                                         | `{}`                              |
 | `web.replicacount`<br/><br/>&nbsp; Amount of web pods to run                                                                                                 | `1`                               |
 | `web.resources.limits`<br/><br/>&nbsp; Web resource limits                                                                                                   | `{cpu: 500m, memory: 500Mi}`      |
 | `web.resources.requests`<br/><br/>&nbsp; Web resource requests                                                                                               | `{cpu: 300m, memory: 300Mi}`      |
 | `web.env`<br/><br/>&nbsp; Additional web environment variables                                                                                               | `[]`                              |
 | `web.nodeSelector`<br/><br/>&nbsp; Node labels for web pod assignment                                                                                        | `{}`                              |
 | `web.affinity`<br/><br/>&nbsp; Affinity settings for web pod assignment                                                                                      | `{}`                              |
 | `web.schedulerName`<br/><br/>&nbsp; Name of an alternate scheduler for web pod                                                                               | `nil`                             |
 | `web.tolerations`<br/><br/>&nbsp; Toleration labels for web pod assignment                                                                                   | `[]`                              |
 | `web.livenessProbe.failureThreshold`<br/><br/>&nbsp; The liveness probe failure threshold                                                                    | `5`                               |
 | `web.livenessProbe.initialDelaySeconds`<br/><br/>&nbsp; The liveness probe initial delay seconds                                                             | `50`                              |
 | `web.livenessProbe.periodSeconds`<br/><br/>&nbsp; The liveness probe period seconds                                                                          | `10`                              |
 | `web.livenessProbe.successThreshold`<br/><br/>&nbsp; The liveness probe success threshold                                                                    | `1`                               |
 | `web.livenessProbe.timeoutSeconds`<br/><br/>&nbsp; The liveness probe timeout seconds                                                                        | `2`                               |
 | `web.readinessProbe.failureThreshold`<br/><br/>&nbsp; The readiness probe failure threshold                                                                  | `10`                              |
 | `web.readinessProbe.initialDelaySeconds`<br/><br/>&nbsp; The readiness probe initial delay seconds                                                           | `50`                              |
 | `web.readinessProbe.periodSeconds`<br/><br/>&nbsp; The readiness probe period seconds                                                                        | `10`                              |
 | `web.readinessProbe.successThreshold`<br/><br/>&nbsp; The readiness probe success threshold                                                                  | `1`                               |
 | `web.readinessProbe.timeoutSeconds`<br/><br/>&nbsp; The readiness probe timeout seconds                                                                      | `2`                               |
 | `web.priorityClassName`<br/><br/>&nbsp; The priorityClassName on web deployment                                                                              | `nil`                             |
 | `web.hpa.enabled`<br/><br/>&nbsp; Boolean to create a HorizontalPodAutoscaler for web deployment                                                             | `false`                           |
 | `web.hpa.cputhreshold`<br/><br/>&nbsp; CPU threshold percent for the web HorizontalPodAutoscaler                                                             | `60`                              |
 | `web.hpa.minpods`<br/><br/>&nbsp; Min pods for the web HorizontalPodAutoscaler                                                                               | `1`                               |
 | `web.hpa.maxpods`<br/><br/>&nbsp; Max pods for the web HorizontalPodAutoscaler                                                                               | `10`                              |
 | `email.from_email`<br/><br/>&nbsp; Emails are sent are from                                                                                                  | `tim@posthog.com`                 |
 | `email.host`<br/><br/>&nbsp; SMTP host for sending email                                                                                                     | `smtp`                            |
 | `email.port`<br/><br/>&nbsp; SMTP port                                                                                                                       | `578`                             |
 | `email.user`<br/><br/>&nbsp; SMTP user                                                                                                                       | `nil`                             |
 | `email.password`<br/><br/>&nbsp; SMTP password                                                                                                               | `nil`                             |
 | `email.use_tls`<br/><br/>&nbsp; SMTP TLS for security                                                                                                        | `false`                           |
 | `email.use_ssl`<br/><br/>&nbsp; SMTP SSL for security                                                                                                        | `false`                           |
 | `email.existingSecret`<br/><br/>&nbsp; SMTP password from an existing secret                                                                                 | `nil`                             |
 | `email.existingSecretKey`<br/><br/>&nbsp; Key to get from the `email.existingSecret` secret                                                                  | `smtp-password`                   |
 | `service.type`<br/><br/>&nbsp; Kubernetes service type                                                                                                       | `LoadBalancer`                    |
 | `service.name`<br/><br/>&nbsp; Kubernetes service name                                                                                                       | `posthog`                         |
 | `service.externalPort`<br/><br/>&nbsp; Kubernetes external service port                                                                                      | `8000`                            |
 | `service.internalPort`<br/><br/>&nbsp; Kubernetes internal service port                                                                                      | `8000`                            |
 | `service.annotations`<br/><br/>&nbsp; Service annotations                                                                                                    | `{}`                              |
 | `service.nodePort`<br/><br/>&nbsp; Kubernetes service NodePort port                                                                                          | Randomly chosen by Kubernetes     |
 | `service.loadBalancerSourceRanges`<br/><br/>&nbsp; Allow list for the load balancer                                                                          | `nil`                             |
 | `ingress.enabled`<br/><br/>&nbsp; Enable ingress controller resource                                                                                         | `false`                           |
 | `ingress.annotations`<br/><br/>&nbsp; Ingress annotations                                                                                                    | `{}`                              |
 | `ingress.hostname`<br/><br/>&nbsp; URL to address your PostHog installation                                                                                  | `posthog.local`                   |
 | `ingress.path`<br/><br/>&nbsp; path to address your PostHog installation                                                                                     | `/`                               |
 | `ingress.tls`<br/><br/>&nbsp; Ingress TLS configuration                                                                                                      | `[]`                              |
 | `postgresql.enabled`<br/><br/>&nbsp; Deploy postgres server (see below)                                                                                      | `true`                            |
 | `postgresql.postgresqlDatabase`<br/><br/>&nbsp; Postgres database name                                                                                       | `posthog`                         |
 | `postgresql.postgresqlUsername`<br/><br/>&nbsp; Postgres username                                                                                            | `postgres`                        |
 | `postgresql.postgresqlHost`<br/><br/>&nbsp; External postgres host                                                                                           | `nil`                             |
 | `postgresql.postgresqlPassword`<br/><br/>&nbsp; External/Internal postgres password                                                                          | `postgres`                        |
 | `postgresql.postgresqlPort`<br/><br/>&nbsp; External postgres port                                                                                           | `5432`                            |
 | `postgresql.existingSecret`<br/><br/>&nbsp; Name of existing secret to use for the PostgreSQL password                                                       | `nil`                             |
 | `postgresql.existingSecretKey`<br/><br/>&nbsp; Key to get from the `postgresql.existingSecret` secret                                                        | `nil`                             |
 | `redis.enabled`<br/><br/>&nbsp; Deploy redis server (see below)                                                                                              | `true`                            |
 | `redis.host`<br/><br/>&nbsp; External redis host                                                                                                             | `nil`                             |
 | `redis.password`<br/><br/>&nbsp; External redis password                                                                                                     | `nil`                             |
 | `redis.port`<br/><br/>&nbsp; External redis port                                                                                                             | `6379`                            |
 | `redis.existingSecret`<br/><br/>&nbsp; Name of existing secret to use for the Redis password                                                                 | `nil`                             |
 | `redis.existingSecretKey`<br/><br/>&nbsp; Key to get from the `redis.existingSecret` secret                                                                  | `redis-password`                  |
 | `metrics.enabled`<br/><br/>&nbsp; Start an exporter for posthog metrics                                                                                      | `false`                           |
 | `metrics.nodeSelector`<br/><br/>&nbsp; Node labels for metrics pod assignment                                                                                | `{}`                              |
 | `metrics.tolerations`<br/><br/>&nbsp; Toleration labels for metrics pod assignment                                                                           | `[]`                              |
 | `metrics.affinity`<br/><br/>&nbsp; Affinity settings for metrics pod                                                                                         | `{}`                              |
 | `metrics.schedulerName`<br/><br/>&nbsp; Name of an alternate scheduler for metrics pod                                                                       | `nil`                             |
 | `metrics.podLabels`<br/><br/>&nbsp; Labels for metrics pod                                                                                                   | `nil`                             |
 | `metrics.resources`<br/><br/>&nbsp; Metrics resource requests/limit                                                                                          | `{}`                              |
 | `metrics.service.type`<br/><br/>&nbsp; Kubernetes service type for metrics service                                                                           | `ClusterIP`                       |
 | `metrics.service.labels`<br/><br/>&nbsp; Additional labels for metrics service                                                                               | `{}`                              |
 | `metrics.image.repository`<br/><br/>&nbsp; Metrics exporter image repository                                                                                 | `prom/statsd-exporter`            |
 | `metrics.image.tag`<br/><br/>&nbsp; Metrics exporter image tag                                                                                               | `v0.10.5`                         |
 | `metrics.image.PullPolicy`<br/><br/>&nbsp; Metrics exporter image pull policy                                                                                | `IfNotPresent`                    |
 | `metrics.serviceMonitor.enabled`<br/><br/>&nbsp; if `true`, creates a Prometheus Operator ServiceMonitor (also requires `metrics.enabled` to be `true`)      | `false`                           |
 | `metrics.serviceMonitor.namespace`<br/><br/>&nbsp; Optional namespace which Prometheus is running in                                                         | `nil`                             |
 | `metrics.serviceMonitor.interval`<br/><br/>&nbsp; How frequently to scrape metrics (use by default, falling back to Prometheus' default)                     | `nil`                             |
 | `metrics.serviceMonitor.selector`<br/><br/>&nbsp; Default to kube-prometheus install (CoreOS recommended), but should be set according to Prometheus install | `{ prometheus: kube-prometheus }` |
 | `hooks.affinity`<br/><br/>&nbsp; Affinity settings for hooks pods                                                                                            | `{}`                              |
 | `hooks.migrate.resources.limits`<br/><br/>&nbsp; Hook job resource limits                                                                                    | `{memory: 1000Mi}`                |
 | `hooks.migrate.resources.requests`<br/><br/>&nbsp; Hook job resource requests                                                                                | `{memory: 1000Mi}`                |
 | `serviceAccount.name`<br/><br/>&nbsp; name of the ServiceAccount to be used by access-controlled resources                                                   | autogenerated                     |
 | `serviceAccount.create`<br/><br/>&nbsp; Configures if a ServiceAccount with this name should be created                                                      | `true`                            |
 | `serviceAccount.annotations`<br/><br/>&nbsp; Configures annotation for the ServiceAccount                                                                    | `{}`                              |


Dependent charts can also have values overwritten. Preface values with "postgresql."

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install \
  --set persistence.enabled=false,email.host=email \
  my-release .
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```bash
$ helm install -f my-values.yaml my-release .
```

## Updating your PostHog

```bash
$ helm repo update
$ helm upgrade -f <config_yaml> <release-name> posthog/posthog
```

## [Packages](#packages)

### PostgreSQL

By default, PostgreSQL is installed as part of the chart. To use an external PostgreSQL server set `postgresql.enabled` to `false` and then set `postgresql.postgresHost` and `postgresql.postgresqlPassword`. 

The other options (`postgresql.postgresqlDatabase`, `postgresql.postgresqlUsername` and `postgresql.postgresqlPort`) may also need changes from their default values.

To avoid issues when upgrading this chart, provide `postgresql.postgresqlPassword` for subsequent upgrades. This is due to an issue in the PostgreSQL chart where the password will be overwritten with randomly generated passwords otherwise. See [this doc](https://github.com/helm/charts/tree/master/stable/postgresql#upgrade) for more details.

### Redis

By default, Redis is installed as part of the chart. To use an external Redis server/cluster set `redis.enabled` to `false` and then set `redis.host`. If your Redis cluster uses a password, you should define it with `redis.password`, otherwise just omit it. Check the table above for more configuration options.

To avoid issues when upgrading this chart, provide `redis.password` for subsequent upgrades. If you do not, the Redis pods will get recreated on every update, potentially incurring some downtime.

### Ingress

This chart provides support for the Ingress resource. If you have an available Ingress Controller such as Nginx or Traefik you maybe want to set `ingress.enabled` to true and choose an `ingress.hostname` for the URL. You should then be able to access the installation using that address.
