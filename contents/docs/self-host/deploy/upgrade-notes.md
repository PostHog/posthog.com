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

4.0.0 changes defaults for Kafka pvc sice and log retention policy. If your upgrade fails with the following:
```
Error: UPGRADE FAILED: cannot patch "posthog-posthog-kafka" with kind StatefulSet: StatefulSet.apps "posthog-posthog-kafka" is invalid: spec: Forbidden: updates to statefulset spec for fields other than 'replicas', 'template', and 'updateStrategy' are forbidden
```
There are two options:
1. Change your values to match to what the Kafka values were before (`size: 5Gi` and `logRetentionBytes: _4_000_000_000`)
2. Resize the Kafka disk follwing our runbook [kafka-resize-disk](https://posthog.com/docs/self-host/runbook/kafka/resize-disk)

