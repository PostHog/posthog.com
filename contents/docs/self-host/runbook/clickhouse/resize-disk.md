---
title: Resize disk
sidebar: Docs
showTitle: true
---

#### How to increase disk size

1. Connect to the Clickhouse container to verify the data directory filesystem size (in this example 20G)
    ```shell
    kubectl -n posthog exec -it chi-posthog-posthog-0-0-0 -- /bin/bash
    clickhouse@chi-posthog-posthog-0-0-0:/$ df -h /var/lib/clickhouse/
    Filesystem                                                                Size  Used Avail Use% Mounted on
    /dev/disk/by-id/scsi-0DO_Volume_pvc-f39035c1-c68c-4572-81f2-273de6eb088c   20G   50M   19G   1% /var/lib/clickhouse

1. In your Helm chart configuration, update the `clickhouseOperator.storage` value in `value.yaml` to the target size (40G in this example)

1. Run a `helm` upgrade

1. Connect to the Kafka container to verify the new filesystem size
    ```shell
    kubectl -n posthog exec -it chi-posthog-posthog-0-0-0 -- /bin/bash
    clickhouse@chi-posthog-posthog-0-0-0:/$ df -h /var/lib/clickhouse/
    Filesystem                                                                Size  Used Avail Use% Mounted on
    /dev/disk/by-id/scsi-0DO_Volume_pvc-f39035c1-c68c-4572-81f2-273de6eb088c   40G  186M   38G   1% /var/lib/clickhouse
    ```

Note that this doesn't work for decreases, if you try the disk won't be resized and the following errors can be seen in the clickhouse operator pod
```
posthog/posthog:ERROR unable to reconcile PVC(posthog/data-volumeclaim-template-chi-posthog-posthog-0-0-0) err: PersistentVolumeClaim "data-volumeclaim-template-chi-posthog-posthog-0-0-0" is in valid: spec.resources.requests.storage: Forbidden: field can not be less than previous value
```
