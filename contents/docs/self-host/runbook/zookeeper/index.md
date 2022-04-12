---
title: Zookeeper
sidebar: Docs
showTitle: true
---

ZooKeeper is a centralized service for maintaining configuration information, naming, 
providing distributed synchronization, and providing group services.

At PostHog we use it to store metadata information for [ClickHouse](./clickhouse) 
and [Kafka](./kafka).

## Failure modes

### Diskspace usage increases rapidly

It has been observed that Zookeepers can suddenly increase it's disk usage, after 
being in a stable state for some time. This can sometimes be resolved by ensuring 
that old Zookeeper snapshots are cleared. If you experience this issue you can 
validate this solution by running [zkCleanup.sh](https://github.com/apache/zookeeper/blob/master/zookeeper-docs/src/main/resources/markdown/zookeeperTools.md#zkCleanup):

```bash
kubectl exec -it -n posthog posthog-posthog-zookeeper -- df -h /bitnami/zookeeper
kubectl exec -it -n posthog posthog-posthog-zookeeper -- /opt/bitnami/zookeeper/bin/zkCleanup.sh -n 3
kubectl exec -it -n posthog posthog-posthog-zookeeper -- df -h /bitnami/zookeeper
```

This will remove all snapshots aside from the last three, printing out the disk 
usage before and after.

In newer versions of our [Helm chart](https://github.com/PostHog/charts-clickhouse) we 
run snapshot cleanups periodically every hour. If you experience Zookeeper space issues 
and are on chart 18.2.0 or below, you can update to a later version to enable this. 
Alternatively you can specify the Helm value `zookeeper.autopurge.purgeInterval=1` which 
will cause the clean up job to run every hour.

If you wish to further debug what is being added to your cluster, you can inspect 
a snapshot diff by running [zhSnapshotComparer.sh](https://github.com/apache/zookeeper/blob/master/zookeeper-docs/src/main/resources/markdown/zookeeperTools.md#zkSnapshotComparer) e.g.:

```bash
kubectl exec -it -n posthog posthog-posthog-zookeeper -- /opt/bitnami/zookeeper/bin/zkSnapshotComparer.sh -l /bitnami/zookeeper/data/version-2/snapshot.fe376 -r /bitnami/zookeeper/data/version-2/snapshot.ff8c0 -b 2 -n 1
```

This will give you a breakdown of the number of nodes in each snapshot, as well as 
the exact node difference between the two. For example:

```bash
Deserialized snapshot in snapshot.fe376 in 0.045252 seconds
Processed data tree in 0.038782 seconds
Deserialized snapshot in snapshot.ff8c0 in 0.018605 seconds
Processed data tree in 0.006101 seconds
Node count: 1312
Total size: 115110
Max depth: 10
Count of nodes at depth 0: 1
Count of nodes at depth 1: 2
Count of nodes at depth 2: 5
Count of nodes at depth 3: 4
Count of nodes at depth 4: 12
Count of nodes at depth 5: 262
Count of nodes at depth 6: 546
Count of nodes at depth 7: 317
Count of nodes at depth 8: 162
Count of nodes at depth 9: 1

Node count: 1312
Total size: 115112
Max depth: 10
Count of nodes at depth 0: 1
Count of nodes at depth 1: 2
Count of nodes at depth 2: 5
Count of nodes at depth 3: 4
Count of nodes at depth 4: 12
Count of nodes at depth 5: 262
Count of nodes at depth 6: 546
Count of nodes at depth 7: 317
Count of nodes at depth 8: 162
Count of nodes at depth 9: 1

Printing analysis for nodes difference larger than 2 bytes or node count difference larger than 1.
Analysis for depth 0
Analysis for depth 1
Analysis for depth 2
Analysis for depth 3
Analysis for depth 4
Analysis for depth 5
Analysis for depth 6
Node /clickhouse/tables/0/posthog.events/blocks/202203_10072597193275699042_5516746108958885708 found only in right tree. Descendant size: 20. Descendant count: 0
...
```

### Useful links
- [Official documentation](https://zookeeper.apache.org/doc/current/)
