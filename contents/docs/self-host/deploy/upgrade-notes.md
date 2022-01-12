---
title: Upgrade notes
sidebar: Docs
showTitle: true
---

### Upgrading from 1.x.x

2.0.0 updated Redis chart in an incompatible way. If your upgrade fails with the following:

```
Upgrade "posthog" failed: cannot patch "posthog-posthog-redis-master" with kind StatefulSet: StatefulSet.apps "posthog-posthog-redis-master" is invalid: spec: Forbidden: updates to statefulset spec for fields other than 'replicas', 'template', and 'updateStrategy' are forbidden
```

Run `kubectl delete --namespace NAMESPACE sts posthog-posthog-redis-master` and `helm upgrade` again.

### Upgrading from 2.x.x

3.0.0 changes the way ZK is run in the chart. ZK has been spun out and is now a cluster being used for Kafka and ClickHouse. An unfortunate side effect of that is that Kafka StatefulSet must be deleted. The reason for this is because Kafka records the cluster ID in ZooKeeper and when you swap it out it complains that the cluster ID has changed and refuses to start. Note that when you delete the Kafka StatefulSet and pod you might lose some events that were in Kafka, but not yet in ClickHouse.

The error you will see from Kafka pod while upgrading:
```
  [2021-07-23 14:24:27,143] ERROR Fatal error during KafkaServer startup. Prepare to shutdown (kafka.server.KafkaServer)
kafka.common.InconsistentClusterIdException: The Cluster ID TYP8xsIWRFWkzSYmO_YWEA doesn't match stored clusterId Some(CizxEcefTou4Ehu65rmpuA) in meta.properties. The broker is trying to join the wrong cluster. Configured zookeeper.connect may be wrong.
  ```
How to fix?
- Delete Kafka and Zookeeper StatefulSet `kubectl -n posthog delete sts posthog-posthog-kafka posthog-zookeeper`
- Delete kafka persistent volume claim `kubectl -n posthog delete pvc data-posthog-posthog-kafka-0`
- Wait for Kafka and Zookeeper pods to spin down (deleting sts in step 1 will also trigger the pods deletion)
- Upgrade helm chart `helm upgrade -f values.yaml --timeout 20m --namespace posthog posthog posthog/posthog`

### Upgrading from 3.x.x

4.0.0 introduces a [breaking change](https://github.com/PostHog/charts-clickhouse/pull/156) related to how `cert-manager` CRDs resources are deployed.

1. we renamed the `certManager.enabled` variable to `cert-manager.enabled`
2. we introduced a new variable called `cert-manager.installCRDs`. `cert-manager` requires a number of CRD resources to work.

    * to automatically install and manage them as part of your Helm release, simply leave the new `cert-manager.installCRDs` variable set to `true`
    * to manually install and manage them, simply set the new `cert-manager.installCRDs` variable to `false`

### Upgrading from 4.x.x

5.0.0 changes defaults for Kafka PVC size and log retention policy. If your upgrade fails with the following:
```
Error: UPGRADE FAILED: cannot patch "posthog-posthog-kafka" with kind StatefulSet: StatefulSet.apps "posthog-posthog-kafka" is invalid: spec: Forbidden: updates to statefulset spec for fields other than 'replicas', 'template', and 'updateStrategy' are forbidden
```
There are two options:
1. Change your values to match to what the Kafka values were before (`size: 5Gi` and `logRetentionBytes: _4_000_000_000`)
2. Resize the PVC (Persistent Volume Claim) used by Kafka following our runbook [kafka-resize-disk](https://posthog.com/docs/self-host/runbook/kafka/resize-disk)

### Upgrading from 5.x.x

6.0.0 upgrades the [`altinity/clickhouse-operator`](https://github.com/Altinity/clickhouse-operator) version to `0.16.1`. This brings some updates to the custom resource definition (CRD). In order to keep everything in sync, please run the following steps before updating your Helm release:

1. Download and extract the Helm chart release source code
    ```
    mkdir -p posthog-crd-upgrade
    wget -qO- https://github.com/PostHog/charts-clickhouse/archive/refs/tags/posthog-6.0.0.tar.gz | tar xvz - --strip 1 -C posthog-crd-upgrade
    ```

1. Update the `altinity/clickhouse-operator` CRDs by running:
    ```
    kubectl apply \
        -f posthog-crd-upgrade/charts/posthog/crds/clickhouseinstallations.clickhouse.altinity.com.yaml \
        -f posthog-crd-upgrade/charts/posthog/crds/clickhouseinstallationtemplates.clickhouse.altinity.com.yaml \
        -f posthog-crd-upgrade/charts/posthog/crds/clickhouseoperatorconfigurations.clickhouse.altinity.com.yaml
    ```

    Note: you'll likely see a warning like:
    ```
    Warning: resource customresourcedefinitions/clickhouseinstallations.clickhouse.altinity.com is missing the kubectl.kubernetes.io/last-applied-configuration annotation which is required by kubectl apply. kubectl apply should only be used on resources created declaratively by either kubectl create --save-config or kubectl apply. The missing annotation will be patched automatically.
    customresourcedefinition.apiextensions.k8s.io/clickhouseinstallations.clickhouse.altinity.com configured

    Warning: resource customresourcedefinitions/clickhouseinstallationtemplates.clickhouse.altinity.com is missing the kubectl.kubernetes.io/last-applied-configuration annotation which is required by kubectl apply. kubectl apply should only be used on resources created declaratively by either kubectl create --save-config or kubectl apply. The missing annotation will be patched automatically.
    customresourcedefinition.apiextensions.k8s.io/clickhouseinstallationtemplates.clickhouse.altinity.com configured

    Warning: resource customresourcedefinitions/clickhouseoperatorconfigurations.clickhouse.altinity.com is missing the kubectl.kubernetes.io/last-applied-configuration annotation which is required by kubectl apply. kubectl apply should only be used on resources created declaratively by either kubectl create --save-config or kubectl apply. The missing annotation will be patched automatically.
    customresourcedefinition.apiextensions.k8s.io/clickhouseoperatorconfigurations.clickhouse.altinity.com configured
    ```
    but this is safe to be ignored.

1. You can now move on with the Helm update as usual:
    ```
    helm repo update posthog
    helm upgrade --install -f ...
    ```
    Note: the ClickHouse pod will not be restarted but the `clickhouse-operator` will, no downtime is expected as part of this release.

### Upgrading from 6.x.x

7.0.0 upgrades the Helm dependency chart [`jetstack/cert-manager`](https://github.com/jetstack/cert-manager) from version `1.2.0` to `1.6.1`. This brings some updates to the custom resource definition (CRD).

If you **are not** overriding `cert-manager.installCRDs` by setting it to `false` **there’s nothing you need to do**. You can go on updating your Helm release as usual and enjoy your day!

If otherwise you are manually managing the `cert-manager`‘s CRDs, please remember to update the definitions in order to keep everything in sync.

### Upgrading from 7.x.x

8.0.0 deprecates the `beat` deployment ([#184](https://github.com/PostHog/charts-clickhouse/pull/184)) as its functionalities are now executed by the `workers` deployment.

As result, we have deprecated the following Helm values:

- `beat.replicacount`
- `beat.resources`
- `beat.nodeSelector`
- `beat.tolerations`
- `beat.affinity`

If you didn’t make any customization to those, there’s nothing you need to do. Otherwise, please rename your customized values to be in the `workers.` scope.

### Upgrading from 8.x.x

9.0.0 changes the supported Kubernetes version to >=1.20 <= 1.23:

- drops support for Kubernetes 1.19 as it has reached end of life on 2021-10-28
- adds support for Kubernetes 1.23 released on 2021-12-07
