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
One of the potential causes is that we couldn't find enough resources to schedule all the services Posthog needs to run. To know if resources are a problem we can check pod status and errors while the `helm install` command is still running.
1. check the output for `kubectl get pods -n posthog` if you see any pending pods for a long time then that could be the problem
2. check if the pending pod has scheduling errors `kubectl describe pod <podname> -n posthog`. For example at the end in events section we could see that we didn't have enough memory to schedule the pod.
```
Events:
  Type     Reason             Age                  From                Message
  ----     ------             ----                 ----                -------
  Normal   NotTriggerScaleUp  3m23s                cluster-autoscaler  pod didn't trigger scale-up:
  Warning  FailedScheduling   45s (x5 over 3m47s)  default-scheduler   0/3 nodes are available: 3 Insufficient memory.
```

**How to fix this**: try installing on a bigger Kubernetes cluster.

### Connection is not secure

First check that DNS is set up properly
```console
nslookup <your-hostname> 1.1.1.1
```
Note that when using a browser there are various layers of caching and other logic that could make the resolution work (temporarily) even if its not correctly set up.
  
## FAQ
  
### How can I increase storage size?
  
Change the value (e.g. `clickhouseOperator.storage`) and run a `helm upgrade`, which works seamlessly on AWS, GCP and DigitalOcean.
