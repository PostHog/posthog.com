---
title: Deploying with helm directly
sidebarTitle: Other
sidebar: Docs
showTitle: true
---

For all other platforms, we suggest setting up Kubernetes first and using the helm chart directly to deploy a PostHog instance with Nginx ingress controller.

## Prerequisites
- [Kubernetes](http://kubernetes.io) 1.4+ with Beta APIs enabled
- [Helm](https://helm.sh) >= v3


## Installing the chart

Here's the minimal required `values.yaml` that we'll be using later. You can find an overview of the parameters that can be configured during installation under [configuration](/docs/self-host/deploy/configuration).
```yaml
cloud: <your-deployment-platform>
ingress:
  hostname: <your-hostname>
  nginx:
    enabled: true
certManager:
  enabled: true
```

To install the chart with the release name `posthog` in `posthog` namespace, run the following:

```console
helm repo add posthog https://posthog.github.io/charts-clickhouse/
helm repo update
helm install -f values.yaml --timeout 20m --create-namespace --namespace posthog posthog posthog/posthog
```

### Lookup external IP

```console
kubectl get svc --namespace posthog posthog-ingress-nginx-controller
```

### Setting up DNS

Create a record from your desired hostname to the external IP.

### I cannot connect to my PostHog instance after creation

As a troubleshooting tool, you can allow HTTP access by setting these values in your `values.yaml`, but we recommend always accessing PostHog via https.
```yaml
ingress:
  nginx:
    redirectToTLS: false
  letsencrypt: false
web:
  secureCookies: false
```

After upgrading you can run the following to get the IP to access PostHog:
```console
export INGRESS_IP=$(kubectl get --namespace posthog ingress posthog -o jsonpath="{.status.loadBalancer.ingress[0].ip}")
echo "Visit http://$INGRESS_IP to use PostHog\!"
```

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

The command above removes all the Kubernetes components associated with the chart and deletes the release. Sometimes everything doesn't get properly removed. If that happens try deleting the namespace:
```console
kubectl delete namespace posthog
```
