---
title: Feature flags cache degradation
showByline: true
date: 2026-02-06
author:
    - phil-haack
tags:
    - Post mortems
---

Between February 2-6, 2026, PostHog's feature flags cache workers experienced escalating memory pressure, resulting in degraded cache update reliability. The issue was stabilized on February 6 at 22:34 UTC.

## Summary

When a feature flag is updated, PostHog kicks off two Celery tasks: one to update the cache used by the `/flags` evaluation endpoint, and another to update flag definitions fetched by SDKs using local evaluation. Both tasks run on the same pool of Celery workers.

These workers experienced escalating out-of-memory (OOM) kills over a 4-day period, causing both caches to fall behind. Teams that updated flag rollout conditions or targeting rules would see those changes reflected in the PostHog UI but not propagated to the `/flags` endpoint or SDKs using local evaluation until the cache backlog cleared.

The root cause was an internal test automation system that had accumulated excessive test data over several months, creating cache update tasks that exceeded worker memory limits.

## Timeline

All times in UTC.

- **Feb 2-5** – Intermittent OOM kills observed on feature-flags Celery workers; initially appeared low-severity
- **Feb 6 20:31** – Incident declared as OOMs escalate and 116k task backlog discovered
- **Feb 6 21:34** – Root cause identified
- **Feb 6 22:34** – **Stabilized**: OOMs reduced to 0-2 per 5 minutes, backlog clearing
- **Feb 7** – Internal test automation updated to use isolated environment
- **Feb 8** – Stale test data cleaned up

## Root cause analysis

### Accumulated test data

An internal test automation system had been running against production for several months. Due to a bug in test cleanup logic, failed test runs left behind test data that accumulated over time. This created an internal account with far more data than any typical customer workload.

### No batching in cache updates

The cache update task loads all data into memory at once — flag definitions, cohorts, serialized representations, and the final JSON payload. For typical workloads this is fine, but the accumulated test data created tasks that exceeded the 8GB worker memory limit on a single execution. Each task for this account required holding all the data in memory simultaneously, causing immediate OOM kills regardless of worker age or prior memory state.

## Impact

- **Stale flag evaluations**: Both the `/flags` endpoint and SDKs using local evaluation could serve stale flag definitions when cache updates were delayed
- **No data loss**: Flag definitions remained intact in the database; only cache freshness was affected
- **No downtime**: Both the `/flags` endpoint and local evaluation continued responding to requests, but could return outdated results
- **Duration**: Degraded reliability over ~4 days. Majority stabilized on Feb 6 with increased memory limits; intermittent issues continued until stale test data was cleaned up on Feb 8

## Detection

The incident was detected through monitoring showing OOM kills escalating on the feature-flags Celery workers. The 116k task backlog was discovered during investigation.

OOMs were observable in the days prior, but the root cause wasn't investigated deeply at first because the numbers were low and seemed intermittent. Initial mitigation attempts focused on isolating the task to a dedicated queue and optimizing memory usage, but these didn't address the underlying issue.

It wasn't until a colleague noticed a team with an abnormal amount of data that the root cause was identified.

## Recovery

1. Increased memory limits for workers
2. Enabled worker recycling (`max_tasks_per_child=100`) to give workers more headroom
3. Reduced worker load by pausing non-critical tasks
4. Purged backlogged tasks from the queue
5. Cleaned up stale test data (the actual fix)

## Remediation

### Completed

- Cleaned up stale test data from internal account
- Enabled worker recycling to provide more memory headroom
- Added dashboard panels for worker health monitoring and queue backlog visibility
- Fixed test cleanup bug to register resources before assertions
- Updated internal test automation to use an isolated environment

### In progress

| Follow-up | Priority |
|-----------|----------|
| Better alerts, metrics, and visualizations for celery queue backlogs | High |
| Add metrics for anomalous workloads | Medium |
| Task deduplication for cache updates | Medium |
| Improve memory usage of cache update task | High |
| Merge flag caches into a single cache build | Medium |

## Lessons learned

### What went well

- Once we started investigating, we updated the status page and made regular updates
- Once the root cause was identified, stabilization was achieved within ~90 minutes
- The immediate fix (`max_tasks_per_child`) combined with increased memory limits was simple and effective
- No customer data was lost; the issue only affected cache freshness
- The long-term fix (cleaning up stale test data) brought us back to normal operations

### What went poorly

- The gradual escalation over several days wasn't investigated deeply until the backlog became severe
- OOM metrics can be misleading—pods in crash loops don't generate OOMs during backoff periods, creating a false sense of improvement
- Internal test automation running against production accumulated data invisibly over months

### Key takeaways

1. **Unbounded data loading is risky**: Operations that load all data into memory work fine for typical workloads but can fail catastrophically for outliers. Consider batching or streaming for tasks that scale with customer data.
2. **Correlate OOMs with pod health**: A drop in OOM kills might mean workers are healthy, or it might mean they're stuck in crash loops and not processing anything. Always check pod status alongside OOM metrics.
3. **Isolate test environments**: Even with cleanup logic, test automation against production will eventually accumulate artifacts. Use isolated environments for integration testing.
4. **Monitor queue backlogs**: We had visibility into OOMs but not the growing task backlog. Better queue monitoring would have surfaced the issue sooner.
