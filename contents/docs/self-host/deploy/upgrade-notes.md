---
title: Upgrade Notes
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
