---
title: Scaling ClickHouse Vertically
sidebar: Docs
showTitle: true
---

#### How to scale ClickHouse vertically

Currently the easiest way to scale up a ClickHouse environment hosted by our helm chart config is to set the affinity for which node ClickHouse is deployed to and scale that node up in terms fo the resources it has available to it. This is very easy to do in practice. Let's get down to the nuts and bolts of how to get this done!
- Create a node instance or group with more CPU and memory in your K8s cluster with a [label](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) of `clickhouse:true` set on it (this will be used to target that node for ClickHouse deployment). There are a few ways to create a node group and most are implementation specific to your kubernetes platform. A few references for how to create an manage node groups can be found for [GKE](https://cloud.google.com/kubernetes-engine/docs/concepts/node-pools), [EKS](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html), and [DigitalOcean](https://docs.digitalocean.com/products/kubernetes/#worker-nodes-and-node-pools).
  - Essentially if you know the node that you want ClickHouse to be installed on you can run `kubectl label nodes <desired-clickhouse-node-name> clickhouse=true`
  - To restrict other pods from not using that node we can add a taint via `kubectl taint nodes <desired-clickhouse-node-name> dedicated=clickhouse:NoSchedule`
- Update your `values.yaml`:
```
clickhouse:
  nodeSelector:
    clickhouse: "true"
  tolerations:
    - key: "dedicated"
      value: "clickhouse"
      operator: "Equal"
      effect: "NoSchedule"
```
- You might need to trigger the reallocation for the clickhouse pod, e.g. run `kubectl delete pod chi-posthog-posthog-0-0-0`

You can find more information about optional settings like that [here](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/values.yaml) and also more about [`nodeSelectors`](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector) and [`taints` and `tolerations`](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/).
