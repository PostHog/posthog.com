---
title: Deploying to Digital Ocean
sidebarTitle: Digital Ocean
sidebar: Docs
showTitle: true
---

## Why Digital Ocean

[Digital Ocean](https://digitalocean.com) is one of the most well-established Cloud Providers. Compared to AWS, where the amount of options and configuration can be overwhelming, Digital Ocean is generally simpler to use and faster to get running. 
<br />

The first thing you'll need is a get a Digital Ocean account. You can click on the badge below to get $100 in credit over 60 days (i.e. run PostHog for free for 2 months).
<br />

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg)](https://www.digitalocean.com/?refcode=6a26a2c395b0&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)


## 1-click install

### Marketplace UI
There is a [1-click option to deploy PostHog](https://marketplace.digitalocean.com/apps/posthog-1) on DigitalOcean Marketplace UI. The minimal suggested cluster capacity is 2 smallest production nodes.

Follow the getting started guide to setup kubeconfig, which we will need later to secure PostHog. Note that if you skipped it earlier use the _"Remind me how to do this"_ link on the Kubernetes cluster tab.

### CLI
Alternatively use `doctl` which also sets up kubeconfig for you.

```console
doctl kubernetes cluster create posthog-cluster --count=2 --size="s-2vcpu-4gb" --region=sfo3 --1-clicks=posthog
```

### Accessing PostHog

After deploying PostHog to your Kubernetes cluster you can get the IP to connect to one of two ways:
1. Navigate to the IP address of the load balancer created by Kubernetes using your web browser. You can grab this by using the DigitalOcean web console ([networking tab](https://cloud.digitalocean.com/networking/load_balancers)).
2. If you have `kubectl` configured for the cluster that PostHog is deployed to then run these commands to get your installation location:
```console
export INGRESS_IP=$(kubectl get --namespace posthog ingress posthog -o jsonpath="{.status.loadBalancer.ingress[0].ip}")
echo "Visit http://$INGRESS_IP to use PostHog\!"
```

Congrats, you have a working PostHog instance =)

But there's one more important step before using it in production: making sure the data is not at risk, see the next section.

### Securing your 1-click install

It's not possible to provide parameters to DigitalOcean yet, so we need a post-install steps to enable TLS.
 
#### 1. Lookup external IP

```console
kubectl get svc --namespace posthog posthog-ingress-nginx-controller
```
#### 2. Set up DNS

Create an `A` record from your desired hostname to the external IP.

#### 3. Update PostHog
Create `values.yaml`
```yaml
cloud: "do"
ingress:
  hostname: <your-hostname>
  nginx:
    enabled: true
certManager:
  enabled: true
```

Run the upgrade (note that if you used the UI for install, you'll need to follow the getting started guide to setup kubeconfig, if you skipped it earlier use the "Remind me how to do this" link on the Kubernetes cluster tab)
```
helm repo add posthog https://posthog.github.io/charts-clickhouse/
helm repo update
helm upgrade -f values.yaml --timeout 20m --namespace posthog posthog posthog/posthog
```

## Manual install

Alternatively, to install the chart manually using [Helm >= v3](https://helm.sh/) follow these steps:

### 1. Set up K8s cluster
  
First, we need to set up a Kubernetes Cluster. See [Kubernetes quickstart](https://docs.digitalocean.com/products/kubernetes/quickstart/). Note that the minimum total resource requirements to run PostHog are 4vcpu and 4G of memory. 

Here's the minimal required `values.yaml` that we'll be using later. You can find an overview of the parameters that can be configured during installation under [configuration](/docs/self-host/deploy/configuration).
```yaml
cloud: "do"
ingress:
  hostname: <your-hostname>
  nginx:
    enabled: true
certManager:
  enabled: true
```

### 2. Install the chart

To install the chart with the release name `posthog` in `posthog` namespace, run the following:

```console
helm repo add posthog https://posthog.github.io/charts-clickhouse/
helm repo update
helm install -f values.yaml --timeout 20m --create-namespace --namespace posthog posthog posthog/posthog
```

### 3. Lookup external IP

```console
kubectl get svc --namespace posthog posthog-ingress-nginx-controller
```
### 4. Set up DNS

Create an `A` record from your desired hostname to the external IP.

## Troubleshooting

### I cannot connect to my PostHog instance
As a troubleshooting tool, you can allow HTTP access by setting these values in your `values.yaml` (and run `helm upgrade`), but we recommend always accessing PostHog via https.
```yaml
ingress:
  nginx:
    redirectToTLS: false
  letsencrypt: false
web:
  secureCookies: false
```

After upgrading you can run the following to get the IP to access PostHog.
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
