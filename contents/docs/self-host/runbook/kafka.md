---
title: Kafka
sidebar: Docs
showTitle: true
---

Apache Kafka is an open-source distributed event streaming platform used by thousands of companies for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications.

At PostHog we mainly use it to stream events from our ingestion pipeline to ClickHouse.

### Dictionary
* `broker`: a cluster is built by one or more servers. The servers forming the storage layer are called brokers
* `event`: an event records the fact that "something happened" in the world or in your business. It is also called record or message in the documentation. When you read or write data to Kafka, you do this in the form of events. Conceptually, an event has a key, value, timestamp, and optional metadata headers
* `producers`: client applications that publish (write) events to Kafka
* `consumer`: client application subscribed to (read and process) events from Kafka
* `topic`: group of events
* `partition`: topics are partitioned, meaning a topic is spread over a number of "buckets" located on different Kafka brokers
* `replication`: to make your data fault-tolerant and highly-available, every topic can be replicated, so that there are always multiple brokers that have a copy of the data just in case things go wrong

### Standard operations

#### Resize data disk

##### Requirements
You need to run a Kubernetes cluster with the _Volume Expansion_ feature enabled. This feature is supported on the majority of volume types since Kubernetes version >= 1.11 (see [docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#allow-volume-expansion)).

You can check if your default `StorageClass` has the field `allowVolumeExpansion` set to `true` by running `kubectl describe storageclass`:
```
➜ kubectl describe storageclass
Name:            do-block-storage
IsDefaultClass:  Yes
Annotations:     kubectl.kubernetes.io/last-applied-configuration={"allowVolumeExpansion":true,"apiVersion":"storage.k8s.io/v1","kind":"StorageClass","metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"true"},"labels":{"doks.digitalocean.com/managed":"true"},"name":"do-block-storage"},"provisioner":"dobs.csi.digitalocean.com","reclaimPolicy":"Delete"}
,storageclass.kubernetes.io/is-default-class=true
Provisioner:           dobs.csi.digitalocean.com
Parameters:            <none>
AllowVolumeExpansion:  True
MountOptions:          <none>
ReclaimPolicy:         Delete
VolumeBindingMode:     Immediate
Events:                <none>
```

##### How-to

1. List your pods
    ```
    ➜ kubectl get pods -n posthog
    NAME                          READY   STATUS    RESTARTS   AGE
    posthog-posthog-kafka-0       1/1     Running   0          5m15s
    ```

1. Connect to the Kafka container to verify the data directory filesystem size (in this example 15GB)
    ```
    ➜ kubectl exec -it posthog-posthog-kafka-0 -- /bin/bash
    posthog-posthog-kafka-0:/$ df -h /bitnami/kafka
    Filesystem                                                                Size  Used Avail Use% Mounted on
    /dev/disk/by-id/scsi-0DO_Volume_pvc-97776a5e-9cdc-4fac-8dad-199f1728b857   15G   40M   14G   1% /bitnami/kafka
    ```

1. Resize the underlying PVC (in this example we are resizing it to to 20G)
    ```
    ➜ kubectl patch pvc data-posthog-posthog-kafka-0 -p '{ "spec": { "resources": { "requests": { "storage": "20Gi" }}}}'
    persistentvolumeclaim/data-posthog-posthog-kafka-0 patched
    ```

    Note: while resizing the PVC you might get an error `disk resize is only supported on Unattached disk, current disk state: Attached` (see below for more details).
    <details>

    In this specific case you need to temporary scale down the `StatefulSet` replica value to zero. **This will briefly disrupt the Kafka service availability and all the events after this point will be dropped as event ingestion will stop working**

    You can do that by running: `kubectl patch statefulset posthog-posthog-kafka -p '{ "spec": { "replicas": 0 }}'`

    After you successfully resized the PVC, you can restore the initial replica definition with: `kubectl patch statefulset posthog-posthog-kafka -p '{ "spec": { "replicas": 1 }}'`

    </details>

1. Delete the `StatefulSet` definition but leave its `pod`s online (this is to avoid an impact on the ingestion pipeline availability): `kubectl delete sts --cascade=orphan posthog-posthog-kafka`

1. In your Helm chart configuration, update the `kafka.persistence` value in `value.yaml` to the target size (20G in this example)

1. Run `helm update` to recycle all the pods and re-deploy the `StatefulSet` definition

1. Connect to the Kafka container to verify the new filesystem size
    ```
    ➜ kubectl exec -it posthog-posthog-kafka-0 -- /bin/bash
    posthog-posthog-kafka-0:/$ df -h /bitnami/kafka
    Filesystem                                                                Size  Used Avail Use% Mounted on
    /dev/disk/by-id/scsi-0DO_Volume_pvc-97776a5e-9cdc-4fac-8dad-199f1728b857   20G   40M   19G   1% /bitnami/kafka
    ```

### Useful links
- [Official documentation](https://kafka.apache.org/documentation/)
