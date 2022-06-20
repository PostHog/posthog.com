---
title: Deploymet Sizing FAQ
sidebar: Docs
showTitle: true
---

We are often asked what kind of configuration is needed to run PostHog at 10M / 50M / 100M / 1B /... events per month. In practice, this is a difficult question to answer because of the large amount of variables affecting performance. Here is some context on how to think about this in the form of "frequently asked questions" which might help. If you need additional clarification, feel free to ask questions in the relevant documentation pages directly.


## Can I use PostHog in production without kubernetes

Our [hobby deployment](/docs/self-host/deploy/hobby) does not use kubernetes, but is not set up to handle production volumes. It is not currently possible to deploy a production-ready PostHog instance without kubernetes.

## Kubernetes: cluster replication / node count

We do not yet provide replicated/sharded datasets for self hosted installations, so it's not recommended to have more than 1 node per stateful service (1 Redis node, 1 Kafka node, 1 ClickHouse node, ...). In the future, we will provide the possibility to share and balance loads across multiple components in the same tier (example: N nodes handle Kafka traffic) but currently that’s not an option.

Generally, one node per stateful services is needed. At max, you should account for 1 node per stateful services + N nodes for the stateless services (i.e., PostHog itself; N will be between 2 and 20). All stateful services are currently down when the related Kubernetes pod goes down. We then restore the service when Kubernetes reschedules and restarts the pod (the dataset is safe as we persist it on a dedicated disk that gets re-attached when the pod gets rescheduled).

## How much storage is needed per event?

This depends on how PostHog is used and the entropy of the data stored in ClickHouse. A basic estimate would be a few KBs per event. With the native ClickHouse compression, we can get to ~ 1 / 10 of that (conservative estimate 5KB -> 500 bytes).

## How do services scale with event volume?

The only two datasets scale semi-linearly in storage with the number of events are PostgreSQL and ClickHouse. We use Redis and Kafka as "transient storage".

- Redis: CPU / memory intensive workload, disk usage is close to null
- Kafka: CPU / network / disk intensive workload
- Clickhouse: CPU / memory / network / disk intensive workload
- PostgreSQL: CPU / memory / disk intensive workload (should be less than clickhouse, though) 

## What kind of data in/out to expect from your instance

99% of the traffic should be ingress and part of the events ingestion. The other 1% should be internal (querying PostHog). If you sync data elsewhere using [Apps](/docs/apps) this may shift, as you might be pushing out of your instance to another service.

## Scaling

For a starting point, see [Scaling Up](/docs/self-host/deploy/configuration#scaling-up). It is difficult to give robust estimates here, given that your ingress peak volume, query types, and other configurations will all affect the responsiveness of UI/backend. Ultimately, as you scale up event volume, the DevOps engineer responsible will need to monitor CPU/memory/disk usage for all services, figure out if one of the services is crashing, and increase resources as needed in order to stabilize. If you have questions around this, direct the person from your team responsible for managing PostHog to our documentation, or to our [Slack Channel](/slack) if they're having trouble getting the service running.

Additionally, see: [infrastructure costs at higher event volumes](/docs/self-host/deploy/hosting-costs#infrastructure-costs-at-higher-event-volumes).



