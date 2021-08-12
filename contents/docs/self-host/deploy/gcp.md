---
title: Deploying to Google Cloud Platform
sidebarTitle: Google Cloud Platform
sidebar: Docs
showTitle: true
tags:
  - gcp
---

First, we need to set up a Kubernetes Cluster. See [Google Cloud Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine/).

Here's the minimal required `values.yaml` that we'll be using later. You can find an overview of the parameters that can be configured during installation under [configuration](/docs/self-host/deploy/configuration).
```yaml
cloud: "gcp"
ingress:
  hostname: <your-hostname>
  nginx:
    enabled: false
certManager:
  enabled: false
```

### Installing the chart

To install the chart with the release name `posthog` in `posthog` namespace, run the following:

```console
helm repo add posthog https://posthog.github.io/charts-clickhouse/
helm repo update
helm install -f values.yaml --timeout 20m --create-namespace --namespace posthog posthog posthog/posthog
```

### Set up a static IP

1. Open the Google Cloud Console
1. Go to VPC Networks > [External IP addresses](https://console.cloud.google.com/networking/addresses/list)
1. Add new *global* static IP with the name `posthog`

### Setting up DNS

Create a record from your desired hostname to the external IP.

### I cannot connect to my PostHog instance after creation

If DNS has been updated properly, check whether the SSL certificate was created successfully.

This can be done via the following command:

```console
gcloud beta --project yourproject compute ssl-certificates list
```

If running the command shows the SSL cert as `PROVISIONING`, that means that the certificate is still being created. [Read more on how to troubleshoot Google SSL certificates here](https://cloud.google.com/load-balancing/docs/ssl-certificates/troubleshooting).

As a troubleshooting tool, you can allow HTTP access by setting `ingress.gcp.forceHttps` and `web.secureCookies` both to false, but we recommend always accessing PostHog via https.

## Upgrading the chart

To upgrade the chart using [Helm >= v3](https://helm.sh/) with the release name `posthog` in `posthog` namespace, run the following:

```console
helm repo update
helm upgrade -f values.yaml --timeout 20m --namespace posthog posthog posthog/posthog
```

> See [the Helm docs](https://helm.sh/docs/helm/helm_upgrade/) for documentation on the `helm upgrade` command.

When upgrading major versions, see [Upgrade notes](/docs/self-host/deploy/upgrade-notes).


## Uninstalling the Chart

To uninstall the chart using [Helm >= v3](https://helm.sh/) with the release name `posthog` in `posthog` namespace, run the following:
```console
$ helm uninstall posthog --namespace posthog
```

> See [the Helm docs](https://helm.sh/docs/helm/helm_uninstall/) for documentation on the `helm uninstall` command.

The command above removes all the Kubernetes components associated with the chart and deletes the release. Sometimes everything doesn't get properly removed. If that happens try deleting the namespace
```console
kubectl delete namespace posthog
```
