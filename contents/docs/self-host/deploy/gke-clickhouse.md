---
title: Deploying to Google Kubernetes Engine with ClickHouse
sidebar: Docs
showTitle: true
---

## Why ClickHouse on Google?

This deployment mechanism is targeted towards larger installations (above 2M events/month) which would run into performance and scalability issues using our normal postgres-based deployments.

As opposed to the open source version, this deployment uses ClickHouse instead of PostgreSQL as the underlying database. ClickHouse is [a highly scalable database that was designed for performant analytical queries](https://clickhouse.tech/).

> Warning: This deployment mechanism is still experimental, not yet publicly accessible and you will currently need a license to use ClickHouse. To get a license, please message [sales@posthog.com](mailto:sales@posthog.com)

## How it works

We'll give you access to a **[Helm Chart](https://helm.sh)** which can be set up on a kubernetes cluster.

This helm chart sets up posthog on your cluster, with the following components:
1. ClickHouse operator
1. PostgreSQL, Redis and pgbouncer
1. Zookeeper and Kafka
1. PostHog web pods
1. PostHog plugin server
1. PostHog worker


## Prerequisites

- [Kubernetes](http://kubernetes.io) 1.4+ with Beta APIs enabled
- [Helm](https://helm.sh) >= v3
- IAM user with permissions to create and manage kubernetes clusters (e.g. `Kubernetes Engine Admin` role), add static IPs


## Step By Step Installation

1. Ensure you meet the prerequisites above.
1. (Optional) Create a [new kubernetes cluster](https://console.cloud.google.com/kubernetes/list)
    We suggest using a standard cluster with at least 3 nodes. If you need help choosing the appropriate instance type, reach out!
1. Create a [new static IP](https://console.cloud.google.com/networking/addresses/list) if you wish to access posthog from
    outside the k8s cluster.
1. Create a new DNS A record for the static IP just created
1. Fill out `values.yaml` file [see below](#example-values.yaml)
1. Connect to your k8s cluster, add the repo and install:

```bash
helm plugin install https://github.com/hypnoglow/helm-s3.git
helm repo add posthog-vpc s3://posthog-vpc-helm/charts
helm repo update
helm install --timeout 20m posthog posthog-vpc/posthog -n posthog -f values.yaml
```

### Example values.yaml file

For more details on values, check out the repo README.md

```yaml
cloud: gcp

image:
  repository: posthog/posthog
  tag: latest-release
  sha:
  pullPolicy: Always

ingress:
  type: clb
  hostname: subdomain.yourdomain.net
  path: /*
  gcp:
    ip_name: ip-from-step-3
  letsencrypt: false
  nginx:
    enabled: false

clickhouseOperator:
  enabled: true
  namespace: posthog
  storage: 500Gi

clickhouse:
  enabled: true
  database: posthog
  user: admin
  password: # Fill this!
  replication: false
  secure: false
  verify: false
  async: false

redis:
  enabled: true
  nameOverride: posthog-redis
  usePassword: false
  password: ""
  master:
    persistence:
      enabled: true

postgresql:
  enabled: true
  nameOverride: posthog-postgresql
  postgresqlDatabase: posthog
  postgresqlUsername: postgres
  postgresqlPassword: postgres
  persistence:
    enabled: true
    size: 20Gi
```

## Common issues / questions

### Cannot connect to my posthog instance after creation

If DNS has been updated properly, check whether the SSL cert was created successfully.

This can be done via

```bash
gcloud beta --project posthog-301601 compute ssl-certificates list
```

If this is showing the ssl cert as PROVISIONING, that means that the SSL cert is still being created. [Read more on how to troubleshoot google SSL certificates here](https://cloud.google.com/load-balancing/docs/ssl-certificates/troubleshooting)

As a troubleshooting tool, you can allow http access by setting `ingress.gcp.forceHttps` and `web.secureCookies` both to false, but we recommend always accessing PostHog via https.

### How can I connect to my clickhouse instance

- Get the IP via `kubectl get svc`
- Username: `admin` or `clickhouse.user`
- Password: `clickhouse.password`
