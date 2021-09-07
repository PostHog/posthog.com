---
title: Troubleshooting and FAQ
sidebar: Docs
showTitle: true
---

## Troubleshooting

### helm install failed

##### Not enough resources

You might see one of these errors from `helm install`:
```
Error: failed post-install: timed out waiting for the condition
Error: failed pre-install: timed out waiting for the condition
```
One of the potential causes is that we couldn't find enough resources to schedule all the services PostHog needs to run. To know if resources are a problem we can check pod status and errors while the `helm install` command is still running:
1. check the output for `kubectl get pods -n posthog` and if you see any pending pods for a long time then that could be the problem
2. check if the pending pod has scheduling errors using `kubectl describe pod <podname> -n posthog`. For example, at the end of the events section we could see that we didn't have enough memory to schedule the pod.
```
Events:
  Type     Reason             Age                  From                Message
  ----     ------             ----                 ----                -------
  Normal   NotTriggerScaleUp  3m23s                cluster-autoscaler  pod didn't trigger scale-up:
  Warning  FailedScheduling   45s (x5 over 3m47s)  default-scheduler   0/3 nodes are available: 3 Insufficient memory.
```

**How to fix this**: try installing on a bigger Kubernetes cluster.

### Connection is not secure

First, check that DNS is set up properly:
```console
nslookup <your-hostname> 1.1.1.1
```
Note that when using a browser there are various layers of caching and other logic that could make the resolution work (temporarily) even if its not correctly set up.

### Kafka crash looping (disk full)

You might see an error similar to this one in the kafka pod
```
Error while writing to checkpoint file /bitnami/kafka/data/...
java.io.IOException: No space left on device
```

This tells us that the disk is full. The fastest fix here is to increase the Kafka volume size (this can be done by changing `kafka.persistence.size` in your `values.yaml` and running a [`helm upgrade`](/docs/self-host/configure/upgrading-posthog#upgrade-instructions). Note: you might want to avoid applying other changes if you haven't upgraded recently).

#### Why did we run into this problem and how to avoid it in the future?

There isn't a way for us to say "if there's less than X% of disk space left, then nuke the oldest data". Instead we have two conditions that restrict, when stuff can be deleted:
- size (`logRetentionBytes: _22_000_000_000`) for the minimum size of data on disk before allowed deletion.
- time (`logRetentionHours: 24`) for the minimum age before allowed deletion.

We need to configure these well, but monitoring disk util can help catch this problem before we end up in a crash loop.

See more in these stack overflow questions ([1](https://stackoverflow.com/questions/52970153/kafka-how-to-avoid-running-out-of-disk-storage), [2](https://stackoverflow.com/questions/53039752/kafka-how-to-calculate-the-value-of-log-retention-byte), [3](https://stackoverflow.com/questions/51823569/kafka-retention-policies)).

## FAQ
  
### How can I increase storage size?
  
Change the value (e.g. `clickhouseOperator.storage`) and run a `helm upgrade`, which works seamlessly on AWS, GCP and DigitalOcean.
