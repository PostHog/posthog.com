---
title: Resize disk
sidebar: Docs
showTitle: true
---

import Sunset from "../../../self-host/\_snippets/sunset-disclaimer.mdx"

<Sunset />

import ResizeDiskRequirementsSnippet from '../../snippets/resize-disk-requirements'

<ResizeDiskRequirementsSnippet/>

#### How-to

1. List your pods

    ```shell
    kubectl get pods -n posthog
    NAME                          READY   STATUS    RESTARTS   AGE
    posthog-posthog-kafka-0       1/1     Running   0          5m15s
    ```

1. Connect to the Kafka container to verify the data directory filesystem size (in this example 15GB)

    ```shell
    kubectl -n posthog exec -it posthog-posthog-kafka-0 -- /bin/bash
    posthog-posthog-kafka-0:/$ df -h /bitnami/kafka
    Filesystem                                                                Size  Used Avail Use% Mounted on
    /dev/disk/by-id/scsi-0DO_Volume_pvc-97776a5e-9cdc-4fac-8dad-199f1728b857   15G   40M   14G   1% /bitnami/kafka
    ```

1. Resize the underlying PVC (in this example we are resizing it to 20G)

    ```shell
    kubectl -n posthog patch pvc data-posthog-posthog-kafka-0 -p '{ "spec": { "resources": { "requests": { "storage": "20Gi" }}}}'
    persistentvolumeclaim/data-posthog-posthog-kafka-0 patched
    ```

    Note: while resizing the PVC you might get an error `disk resize is only supported on Unattached disk, current disk state: Attached` (see below for more details).
    <details>

    In this specific case you need to temporary scale down the `StatefulSet` replica value to zero. **This will briefly disrupt the Kafka service availability and all the events after this point will be dropped as event ingestion will stop working**

    You can do that by running: `kubectl -n posthog patch statefulset posthog-posthog-kafka -p '{ "spec": { "replicas": 0 }}'`

    After you successfully resized the PVC, you can restore the initial replica definition with: `kubectl -n posthog patch statefulset posthog-posthog-kafka -p '{ "spec": { "replicas": 1 }}'`

    </details>

1. Delete the `StatefulSet` definition but leave its `pod`s online (this is to avoid an impact on the ingestion pipeline availability): `kubectl -n posthog delete sts --cascade=orphan posthog-posthog-kafka`

1. In your Helm chart configuration, update the `kafka.persistence` value in `value.yaml` to the target size (20G in this example). You might want to update the retention policy too, more info [here](/docs/self-host/deploy/troubleshooting#why-did-we-run-into-this-problem-and-how-to-avoid-it-in-the-future)

1. Run a `helm` upgrade to recycle all the pods and re-deploy the `StatefulSet` definition

1. Connect to the Kafka container to verify the new filesystem size
    ```shell
    kubectl -n posthog exec -it posthog-posthog-kafka-0 -- /bin/bash
    posthog-posthog-kafka-0:/$ df -h /bitnami/kafka
    Filesystem                                                                Size  Used Avail Use% Mounted on
    /dev/disk/by-id/scsi-0DO_Volume_pvc-97776a5e-9cdc-4fac-8dad-199f1728b857   20G   40M   19G   1% /bitnami/kafka
    ```
