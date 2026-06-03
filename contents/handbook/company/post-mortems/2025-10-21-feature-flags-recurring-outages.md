---
title: Feature flags recurring outages
showByline: true
date: 2025-10-21
author:
    - dylan-martin
tags:
    - Post mortems
---

Between October 21 and October 30, 2025, the PostHog Feature Flags service experienced four separate incidents, exposing systemic architectural weaknesses that required comprehensive remediation. This post-mortem documents all four incidents and our path to stability.

## Summary

Over a 10-day period in October 2025, the feature flags service experienced four separate incidents totaling over 14 hours of cumulative major impact (errors or severe latency). While each incident had different surface-level symptoms, three of the four incidents shared the same root cause: improper CPU resource sizing. Our nodes were too small relative to pod resource requests, causing Kubernetes to pack too many pods per node and saturate CPU capacity. This CPU saturation led to connection pool exhaustion, excessive parallelism (too many concurrent operations), and ultimately cascading failures. The fourth incident was a rate limiting misconfiguration unrelated to resource sizing.

**Incidents:**

- **October 21** (103 minutes): Redis overload from excessive parallelism and connection pool exhaustion
- **October 24** (72 minutes): Rate limiting misconfiguration causing 429 errors for ~97% of requests
- **October 28** (123 minutes): Connection pool exhaustion and excessive parallelism (same root cause as October 21)
- **October 29-30** (7 hours 9 minutes): CPU-bound latency from node CPU pressure exceeding 90%

## Incident timeline

### October 21, 2025 – Redis overload

**Duration:** 21:45 to 23:28 UTC (103 minutes)
**Impact:** ~38% of evaluation requests returning errors in US datacenter

A deployment intended to reduce timeout errors (PR [#39821](https://github.com/PostHog/posthog/pull/39821)) incorrectly addressed symptoms rather than root causes. While rolled back within 2 minutes, it triggered excessive parallelism and connection pool exhaustion, which manifested as massive data transfer from Postgres to Redis and a surge in concurrent connections that overwhelmed our cache layer. Redis memory exhaustion followed, leading to prolonged service degradation.

**What "excessive parallelism" means:** Under CPU pressure, degraded requests triggered Envoy retries between the load balancer and service. Each retry spawned new concurrent requests, and each request performed multiple concurrent Redis reads. A single degraded request could fan out to dozens of concurrent Redis operations. Combined with cache misses (on cache miss, we synchronously loaded full flag and team state from Postgres and wrote it into Redis), this created bursty write storms that overwhelmed Redis.

**Connection pool mechanics:** Each pod maintains its own Postgres connection pool. Creating a pool involves TLS handshakes, authentication, and initial connection establishment—operations that are computationally expensive, especially when pods are CPU-bound. Under CPU pressure exceeding 90%, new pods struggled to initialize these pools within the 20-second startup timeout, leading to crash loops and reduced healthy pod capacity.

**Critical issue:** The Redis overload from the flags service also impacted the main PostHog application, demonstrating dangerous coupling through shared infrastructure. The flags service can operate without Redis but falls back to heavier database queries, making responses slower.

**Root causes:**

- **Primary root cause: CPU resource undersizing** – Nodes were too small relative to pod resource requests, causing Kubernetes to pack too many pods per node. This led to CPU saturation exceeding 90%, which caused excessive parallelism and connection pool exhaustion
- Symptom-focused fix that didn't address underlying CPU sizing issues
- Unbounded cache population logic with no rate limiting (on cache miss, synchronous full state load from Postgres to Redis)
- Envoy retries → more concurrent /flags requests → more pool acquisitions + Redis reads → overload
- Shared Redis instance between flags service and main application (critical infrastructure coupling)
- **Missing CPU alerting**: No alerts existed for CPU pressure, preventing early detection
- Lack of monitoring for Postgres-to-Redis transfer patterns

**Timeline:**

- **21:45 UTC** – Deploy timeout handling change
- **21:47 UTC** – Automated monitoring detects increased error rates
- **21:49 UTC** – Immediate rollback initiated and completed
- **21:50 UTC** – Error rates remain elevated despite rollback
- **22:30 UTC** – Redis metrics show memory exhaustion on ElastiCache
- **22:35 UTC** – Postgres connection spike observed, overwhelming connection pool
- **22:45 UTC** – Discovery: Massive data transfer from Postgres to Redis in progress
- **22:50 UTC** – Root cause identified: Excessive parallelism triggering cache population overload
- **22:50 UTC** – Status page updated with incident details
- **23:00 UTC** – Begin throttling connections and Redis writes
- **23:28 UTC** – Service fully recovered

### October 24, 2025 – Rate limiting misconfiguration

**Duration:** 18:00 to 19:12 UTC (72 minutes)
**Impact:** ~97% of evaluation requests returning 429 (rate limit) errors worldwide

Deployed IP-based rate limiting (PR [#40074](https://github.com/PostHog/posthog/pull/40074)) as a protective measure following Tuesday's incident. The tower-governor library (our Rust rate limiting middleware) saw all traffic as coming from a single IP (our load balancer) rather than actual client IPs, immediately triggering rate limits for all legitimate traffic.

**Root causes:**

- Rate limiting implementation didn't account for load balancer architecture
- Library's secure defaults (not trusting X-Forwarded-For headers) were inappropriate for our trusted infrastructure. We terminate TLS at the load balancer and route to the service over a private network, so trusting X-Forwarded-For from our own load balancer would have been safe; the default of ignoring it was wrong for our setup
- No alerting configured for 429 errors, requiring customer reports for detection (62-minute detection delay)
- We validated rate limiting only in direct-to-service tests, not behind our production load balancers

**Timeline:**

- **18:00 UTC** – Deploy IP-based rate limiting to /flags endpoint
- **18:01 UTC** – Rate limiter begins returning 429 errors for most requests
- **18:02 UTC** – All traffic appears as single IP to rate limiter
- **18:10 UTC** – Initial customer reports of widespread failures
- **18:30 UTC** – More customer reports escalate urgency
- **18:45 UTC** – Engineering begins investigation into customer reports
- **19:00 UTC** – Team identifies 429 errors in logs
- **19:02 UTC** – Root cause identified: rate limiter sees load balancer IP only
- **19:05 UTC** – Decision to disable rate limiting immediately
- **19:12 UTC** – Rate limiting disabled, service fully recovered
- **Note:** Status page was not updated during this incident due to the rapid resolution timeline post-detection (detection to resolution in ~12 minutes)

### October 28, 2025 – Connection pool exhaustion and excessive parallelism

**Duration:** 19:28 to 21:31 UTC (123 minutes)
**Impact:** ~34% of evaluation requests failing in US datacenter

A routine deployment with no changes directly related to the flags service triggered a rollout of feature flag pods in the US region. New pods couldn't connect to Postgres within the 20-second startup timeout, entering crash loops due to excessive parallelism and connection pool exhaustion—the same root cause as October 21. Under CPU pressure, pods couldn't initialize Postgres connection pools (TLS handshakes, authentication, connection establishment) within the timeout. Simultaneously, a massive spike in Redis writes caused key evictions, effectively making the cache unavailable. While the flags service can operate without Redis (falling back to heavier database queries), with both cache unavailable and database under pressure, a significant portion of US traffic failed.

**Critical issue:** The Redis overload from the flags service also impacted the main PostHog application, highlighting dangerous infrastructure coupling. Unrelated deployments shouldn't trigger feature flags rollouts.

**Root causes:**

- **Primary root cause: CPU resource undersizing** – Same root cause as October 21: nodes too small relative to pod requests, causing too many pods per node and CPU saturation
- Unrelated deployment triggered feature flags pod rollout
- New pods failing to connect to Postgres within 20s timeout under CPU pressure (connection pool initialization too slow)
- Pods entering crash loops, reducing available capacity
- Redis write storm during deployment causing key evictions (cache miss → synchronous full state load from Postgres to Redis)
- Shared Redis instance between flags service and main application (critical infrastructure coupling)
- Startup timeout too aggressive for production conditions under CPU pressure
- **Missing CPU alerting**: No alerts existed for CPU pressure, preventing early detection

**Timeline:**

- **19:12 UTC** – Routine deployment triggers feature flags pod rollout in US (no /flags code changes)
- **19:15 UTC** – New US pods begin failing to connect to Postgres within 20s timeout
- **19:18 UTC** – Pods enter crash loops, reducing available capacity in US
- **19:20 UTC** – Massive spike in Redis writes begins in US region
- **19:23 UTC** – On-call receives high error count alert, initiates incident
- **19:23 UTC** – Status page updated with incident details
- **19:25 UTC** – Redis key evictions spike, cache becomes effectively unavailable
- **19:26 UTC** – Main PostHog app begins experiencing issues due to shared Redis overload
- **19:28 UTC** – Service degradation begins, ~34% of US requests failing
- **19:35 UTC** – Team identifies dual failure: pod crashes + Redis overload
- **19:45 UTC** – Decision to halt rollout and scale US pods to zero
- **20:00 UTC** – US pods scaled to zero, waiting for Redis to stabilize
- **20:30 UTC** – Redis begins recovering from write storm
- **20:53 UTC** – Partial recovery as stable US pods brought back online
- **21:15 UTC** – Gradual pod scaling continues in US
- **21:31 UTC** – Full service restored, US region fully operational

**Note:** We initially attempted the same remediation approach from October 21 before implementing other solutions to decrease parallelism.

### October 29-30, 2025 – CPU-bound latency

**Duration:** 22:30 UTC on October 29 to 05:39 UTC on October 30 (7 hours 9 minutes)
**Impact:** Slow queries and degraded performance due to node CPU pressure

Query performance was impacted for over 7 hours. While queries were slow to both Redis and Postgres, metrics for both dependencies confirmed they were healthy. The slow queries were due to CPU pressure on the nodes, which exceeded 90%. This impacted connections and slowed response times for the service to several times the usual.

**Root causes:**

- CPU pressure on nodes exceeding 90% (nodes too small relative to pod requests, causing too many pods per node)
- Pod resource requests not properly sized, causing unhealthy distribution of pods per node
- **Critical gap: CPU alerting was completely missing** – No alerts existed for CPU pressure, which allowed the issue to persist undetected for over 7 hours
- Insufficient observability around CPU-bound failure modes

**Timeline:**

- **22:30 UTC (Oct 29)** – Incident reported, increased error rates and latency detected
- **22:30 UTC (Oct 29)** – Status page updated with incident details
- **00:03 UTC (Oct 30)** – Rolled back hardware changes, errors mostly subsided but latencies persist
- **05:39 UTC** – Incident resolved, query timings returned to normal

**Resolution:** After identifying connectivity issues due to resource exhaustion on feature flags nodes, we applied changes that resolved this resource exhaustion. Increasing pod resource requests for the flag service resulted in a healthier distribution of pods per node, which caused per-node CPU usage to go down and the service to return to a healthy state.

## Root cause analysis

While each incident had specific triggers, three of the four incidents shared the same fundamental root cause:

1. **CPU resource undersizing (primary root cause)**: Our nodes were too small relative to pod resource requests, causing Kubernetes to pack too many pods per node and saturate CPU capacity (exceeding 90%). This CPU saturation was the root cause of October 21, 28, and 29-30 incidents:

   - **October 21 & 28**: CPU saturation caused excessive parallelism (Envoy retries → concurrent requests → concurrent Redis reads) and connection pool exhaustion (pods couldn't initialize Postgres pools under CPU pressure), which manifested as Redis overload and database connection failures
   - **October 29-30**: CPU saturation directly caused slow queries and degraded performance, even though Redis and Postgres metrics showed healthy dependencies
   - Proper CPU right-sizing (fewer pods per node, better-resourced pods) resolved the underlying issues in all three incidents

2. **Connection pool management complexity**: Each pod maintains its own Postgres connection pool. Creating a pool involves TLS handshakes, authentication, and connection establishment—operations that are computationally expensive, especially when pods are CPU-bound. This complexity, combined with CPU saturation, exacerbated connection pool exhaustion issues.

3. **Shared Redis is a critical single point of failure**: Redis overload from the flags service impacted the main PostHog application, demonstrating dangerous coupling through shared infrastructure. Isolation is critical despite implementation complexity.

4. **Critical monitoring gap: CPU alerting was missing**: CPU alerting was completely absent throughout these incidents, preventing early detection of CPU saturation that was the root cause of three outages. This was a fundamental gap in our monitoring strategy that allowed CPU pressure to escalate unnoticed.

5. **Unbounded retries**: Unbounded retries in Envoy (between load balancer and endpoint) amplified failures (now fixed with retry limits)

6. **Rate limiting misconfiguration (October 24 only)**: The October 24 incident was unrelated to CPU sizing—it was caused by rate limiting configuration that didn't account for load balancer architecture

## Impact

- **Total major impact:** Over 14 hours across four incidents (errors or severe latency)
- **Error rates:** Ranging from 34% to 97% of requests during incidents
- **Service degradation:** All flag types affected, including read-only evaluations
- **Cross-service impact:** Redis overload from flags service affected main PostHog application
- **Customer impact:** HTTP 429, 504 errors and degraded performance regardless of flag configurations
- **Recurring issues:** Connection pool exhaustion and excessive parallelism occurred twice (October 21 and 28), indicating insufficient initial remediation

## Remediation

### Immediate actions (completed)

- **Configuration externalization**: Database connection timeouts and other critical settings moved to runtime configuration
- **Timeout adjustments**: Values increased to accommodate peak load scenarios
- **Rate limiting fixes**: Fixed rate-limiting configuration that caused October 24 incident (configured tower-governor to trust X-Forwarded-For from our load balancer)
- **Retry limits**: Implemented retry limits in Envoy (between load balancer and endpoint) to prevent unbounded retry amplification
- **CPU and infrastructure right-sizing (critical fix)**: Increased pod resource requests and adjusted Kubernetes fleet size to reduce pods per node. This was the primary remediation for three of the four incidents (October 21, 28, and 29-30), addressing the root cause of excessive parallelism, connection pool exhaustion, and CPU-bound latency. Running smaller fleets with better-resourced pods rather than larger fleets with CPU-bound pods.
- **CPU alerting**: Added per-node and per-pod CPU alerts with thresholds at 80% sustained for 5 minutes, paging on-call
- **Observability improvements**: Added monitoring for previously invisible failure modes

### Short-term improvements ([Tracked in GitHub Issue #40885](https://github.com/PostHog/posthog/issues/40885))

**In progress (next 2 weeks):**

- **Strike team formation**: Engineers from flags, ingestion, and infrastructure teams conducting comprehensive review of application and infrastructure to identify remaining bottlenecks
- **Redis isolation**: Investigating decoupling flags Redis instance from application Redis instance to prevent cross-service impact

**To complete before re-enabling ArgoCD sync:**

- Evaluate current state of synced flags deployment and ensure durability against future outages
- Update flags service charts config to match values currently in ArgoCD
- Define deployment strategy for short-term (considering deployment vs rollout to avoid 503s)
- Define and implement Redis strategy
- Establish feature flags team as hard code-owners for flags-related code

### Medium-term improvements

**Incident response and monitoring:**

- Build high-level dashboard of important flag metrics with runbook links
- Implement rollout/annotation controls to disable staged rollouts and enable "force-merge" for rolling changes
- Update feature flag runbooks with dashboard links and deeper investigation paths
- Add missing alerts against existing service/infrastructure level metrics
- Update readiness checks to validate dependencies that degraded under load (e.g., ping database instead of mirroring liveness checks)

**Architectural improvements:**

- **Rate limiting for cache operations**: Prevent Redis overwhelm from cache population
- **Connection pool monitoring**: Automatic throttling when pools approach exhaustion
- **Connection limiting**: Prevent unbounded concurrent connections

### Long-term improvements

- **Load testing framework**: Production-scale testing to catch load-dependent issues before deployment
- **Progressive rollout infrastructure**: Gradual deployments to limit blast radius
- **Deployment strategy evolution**: Re-evaluate rollout vs deployment approaches with programmatic controls
- **Comprehensive monitoring**: Document Postgres-to-Redis data flow patterns and create runbooks for data transfer storm scenarios

## Lessons learned

### What went well

- **Rapid detection** – Monitoring caught issues within 2 minutes in most cases
- **Quick initial response** – Rollbacks executed immediately when possible
- **Systematic investigation** – Teams methodically identified overload patterns
- **Cross-team collaboration** – Flags, infrastructure, and ingestion teams worked together effectively

### What didn't go well

- **Symptom-focused fixes** – Multiple PRs addressed symptoms rather than root causes
- **Unbounded operations** – No limits on retries, cache population, or connection creation
- **Rollback insufficiency** – Data transfers and resource exhaustion persisted after code reverted
- **Complex failure modes** – Interactions between database, cache, and application layers not well understood
- **Shared infrastructure** – Flags service overloads impacted main application
- **Customer comms** – While we generally did a good job of making public-facing status pages during each one of these incidents, one notable gap was that we never made an externally-facing status page update for the rate-limiting incident on October 24th.
- **Diagnosis delays** – Took significant time to connect symptoms to root causes
- **Configuration rigidity** – Hardcoded values prevented rapid remediation
- **Missing CPU alerting** – CPU alerting was completely absent, allowing CPU pressure to escalate undetected for hours

### Key takeaways

1. **CPU right-sizing is fundamental** – The biggest takeaway: nodes were too small relative to pod resource requests, causing Kubernetes to pack too many pods per node and saturate CPU capacity. This CPU saturation led to excessive parallelism (Envoy retries → concurrent requests → concurrent Redis reads), connection pool exhaustion (pods couldn't initialize Postgres pools under CPU pressure), and slow queries. Right-sizing (fewer pods per node, better-resourced pods) addressed the underlying issues that caused October 21, 28, and 29-30 incidents. This must be a primary consideration for any service deployment.

2. **Connection pool management architecture matters** – Each pod maintains its own Postgres connection pool. Creating a pool involves TLS handshakes, authentication, and connection establishment—operations that are computationally expensive, especially when pods are CPU-bound. This complexity, combined with CPU saturation, exacerbated connection pool exhaustion. Better approach: reduce concurrency and run smaller fleets with better-resourced pods rather than larger fleets with CPU-bound pods.

3. **Shared Redis is a critical single point of failure** – When flags service overloads Redis, it takes down the main app too. This was evident in October 21 and 28 incidents where Redis overload from flags service impacted the main PostHog application. Isolation is critical despite implementation complexity.

4. **CPU alerting was completely missing** – CPU alerting was absent throughout these incidents, preventing early detection of CPU saturation that was the root cause of three outages. This was a fundamental gap in our monitoring strategy. CPU metrics must be monitored and alertable from day one.

5. **Monitor data flow patterns** – Postgres-to-Redis transfer spikes should trigger alerts. Watch for unusual data movement.

6. **Test under load** – Overload patterns only appeared under production traffic. Load testing is non-negotiable.

7. **Progressive rollouts save lives** – Gradual deployments limit blast radius and enable rapid detection. We're implementing rollout/annotation controls to disable staged rollouts and enable "force-merge" for rolling changes.

8. **Configuration must be flexible** – Critical settings must be adjustable without full deployment cycles.

9. **Unbounded retries amplify failures** – Retries without bounds in Envoy (between load balancer and endpoint) can cascade failures. We've implemented retry limits to prevent this.

## Moving forward

These four incidents highlighted critical gaps in our defensive architecture and operational procedures. The compounding failures demonstrated that our service needed fundamental improvements, not just quick fixes. The primary root cause—CPU resource undersizing (nodes too small relative to pod requests, causing too many pods per node)—manifested differently across three incidents (October 21, 28, and 29-30), requiring us to recognize that excessive parallelism, connection pool exhaustion, and slow queries were all symptoms of the same underlying issue. The recurrence of these symptoms between October 21 and 28 showed that we needed to address the root cause (CPU sizing) rather than the symptoms. We initially attempted the same remediation approach from October 21 before implementing CPU right-sizing, which resolved the underlying issues.

We've implemented immediate remediations and are executing a comprehensive review of the entire service architecture. Our strike team is systematically identifying and addressing remaining bottlenecks. Once we complete the short-term improvements tracked in [GitHub Issue #40885](https://github.com/PostHog/posthog/issues/40885), we'll have confidence that the service is durable against future outages.

The architectural improvements underway—including Redis isolation, connection pool management, and comprehensive monitoring—will prevent similar cascading failures in the future. We're committed to ensuring the feature flags service meets the reliability standards our customers expect.
