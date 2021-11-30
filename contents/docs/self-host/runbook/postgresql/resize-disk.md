---
title: Resize disk
sidebar: Docs
showTitle: true
---

### Requirements
You need to run a Kubernetes cluster with the _Volume Expansion_ feature enabled. This feature is supported on the majority of volume types since Kubernetes version >= 1.11 (see [docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#allow-volume-expansion)).

To verify if your storage class allows volume expansion you can run:

```shell
kubectl get storageclass -o json | jq '.items[].allowVolumeExpansion'
true
```

#### How-to

1. Connect to the Postgresql container to verify the data directory filesystem size (in this example 10GB)
    ```shell
    kubectl -n posthog exec -it posthog-posthog-postgresql-0 -- /bin/bash
    I have no name!@posthog-posthog-postgresql-0:/$ df -h /bitnami/postgresql
    Filesystem                                                                Size  Used Avail Use% Mounted on
    /dev/disk/by-id/scsi-0DO_Volume_pvc-966716a8-cac6-407a-afb4-8cab52b0ad9b  9.8G  145M  9.2G   2% /bitnami/postgresql
    ```

1. Resize the underlying PVC (in this example we are resizing it to to 20G)
    ```shell
    kubectl -n posthog patch pvc data-posthog-posthog-postgresql-0 -p '{ "spec": { "resources": { "requests": { "storage": "20Gi" }}}}'
    persistentvolumeclaim/data-posthog-posthog-postgresql-0 patched
    ```

    Note: while resizing the PVC you might get an error `disk resize is only supported on Unattached disk, current disk state: Attached` (see below for more details).
    <details>

    In this specific case you need to temporary scale down the `StatefulSet` replica value to zero. **This will briefly disrupt the Postgresql service availability and make the PostHog UI inaccessible. On newer versions of PostHog events will be queued and ingestion won't be impacted**

    You can do that by running: `kubectl -n posthog patch statefulset posthog-posthog-postgresql -p '{ "spec": { "replicas": 0 }}'`

    After you successfully resized the PVC, you can restore the initial replica definition with: `kubectl -n posthog patch statefulset posthog-posthog-postgresql -p '{ "spec": { "replicas": 1 }}'`

    </details>

1. Delete the `StatefulSet` definition but leave its `pod`s online (this is to avoid an impact to using Posthog): `kubectl -n posthog delete sts --cascade=orphan posthog-posthog-postgresql`

1. In your Helm chart configuration, update the `postgresql.persistence` value in `value.yaml` to the target size (20G in this example)

1. Run a `helm` upgrade to recycle all the pods and re-deploy the `StatefulSet` definition

1. Connect to the Postgresql container to verify the new filesystem size
    ```shell
    kubectl -n posthog exec -it posthog-posthog-postgresql-0 -- /bin/bash
    I have no name!@posthog-posthog-postgresql-0:/$ df -h /bitnami/postgresql
    Filesystem                                                                Size  Used Avail Use% Mounted on
    /dev/disk/by-id/scsi-0DO_Volume_pvc-966716a8-cac6-407a-afb4-8cab52b0ad9b  20G   153M   19G   1% /bitnami/postgresql
    ```
