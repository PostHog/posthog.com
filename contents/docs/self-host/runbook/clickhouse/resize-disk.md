---
title: Resize disk
sidebar: Docs
showTitle: true
---
import ResizeDiskRequirementsSnippet from '../snippets/resize-disk-requirements'

<ResizeDiskRequirementsSnippet/>

#### How-to

1. Connect to the Clickhouse container to verify the data directory filesystem size (in this example 20G)
    ```shell
    kubectl -n posthog exec -it chi-posthog-posthog-0-0-0 -- /bin/bash
    clickhouse@chi-posthog-posthog-0-0-0:/$ df -h /var/lib/clickhouse/
    Filesystem                                                                Size  Used Avail Use% Mounted on
    /dev/disk/by-id/scsi-0DO_Volume_pvc-f39035c1-c68c-4572-81f2-273de6eb088c   20G   50M   19G   1% /var/lib/clickhouse
    ```

1. In your Helm chart configuration, update the `clickhouse.persistence.size` value in `value.yaml` to the target size (40G in this example)

1. Run a `helm` upgrade

1. Connect to the ClickHouse container to verify the new filesystem size
    ```shell
    kubectl -n posthog exec -it chi-posthog-posthog-0-0-0 -- /bin/bash
    clickhouse@chi-posthog-posthog-0-0-0:/$ df -h /var/lib/clickhouse/
    Filesystem                                                                Size  Used Avail Use% Mounted on
    /dev/disk/by-id/scsi-0DO_Volume_pvc-f39035c1-c68c-4572-81f2-273de6eb088c   40G  186M   38G   1% /var/lib/clickhouse
    ```

#### Troubleshooting
If the resize didn't work check for errors in the ClickHouse operator pod.

This procedure doesn't work to decrease a volume. If you try, the disk won't be resized and the following errors can be seen in the ClickHouse operator pod
```
posthog/posthog:ERROR unable to reconcile PVC(posthog/data-volumeclaim-template-chi-posthog-posthog-0-0-0) err: PersistentVolumeClaim "data-volumeclaim-template-chi-posthog-posthog-0-0-0" is in valid: spec.resources.requests.storage: Forbidden: field can not be less than previous value
```

For increases double check what the storage class is that's used for ClickHouse and make sure it's expandable as mentioned in requirements above.

```shell
kubectl get pvc data-volumeclaim-template-chi-posthog-posthog-0-0-0 -o json | jq '.spec.storageClassName'
```
If a storage class with that name doesn't exist (`kubectl get storageclass`), then it's probably because [major upgrade steps from 9.x.x](https://posthog.com/docs/self-host/deploy/upgrade-notes#upgrading-from-9xx) weren't completed. Set `installCustomStorageClass: true` & run a `helm upgrade` first (without the storage increase request).

