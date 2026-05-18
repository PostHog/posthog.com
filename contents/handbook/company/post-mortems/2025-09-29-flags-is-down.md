---
title: Feature flags service outage
showByline: true
date: 2025-09-29
author:
    - dylan-martin
tags:
    - Post mortems

---

Internal post-mortem: <https://github.com/PostHog/incidents-analysis/pull/120>

On September 29, 2025, the PostHog Feature Flags service experienced an outage lasting 1 hour and 48 minutes, from 16:58 to 18:46 UTC. During this period, approximately 78% of flag evaluation requests in the US region failed with HTTP 504 errors.

## Summary

A database connection timeout reduction from 1 second to 300 milliseconds coincided with elevated load on our writer database from person ingestion. This combination triggered cascading failures in our connection retry logic, resulting in a service-wide outage. Recovery was significantly delayed by hardcoded configuration values and procedural failures in our incident response.

## Timeline

- **16:58 UTC** – Writer database begins experiencing connection saturation from person ingestion post-deployment workload

<img width="3414" height="828" alt="writer database load spike" src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/496399089_bb9581be_0d29_4eb3_a992_266669a2a11f_8032f3ba72.png" />

- **17:02 UTC** – [Unrelated deployment](https://github.com/PostHog/posthog/pull/38686) reduces database connection timeout from 1s to 300ms

- **17:05 UTC** – Initial pods begin failing database connections and entering crash loops

```
{"timestamp":"2025-09-29T16:54:16.154136Z","level":"ERROR","fields":{"message":"Failed to create database pools","error":"Database error: pool timed out while waiting for an open connection"},"target":"feature_flags::server","threadId":"ThreadId(1)"}
thread 'main' panicked at feature-flags/src/main.rs:119:5:
internal error: entered unreachable code: Server exited unexpectedly
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

- **17:12 UTC** – Retry amplification begins overwhelming the writer database

<img width="1907" height="309" alt="Kubernetes retry thundering herd" src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/496398990_1b980447_46f5_498c_a63e_d99d11f6ba62_6261bb0efc.png" />

- **17:25 UTC** – Incident declared, rollback attempted
- **17:40 UTC** – Rollback fails due to ArgoCD configuration issues
- **18:15 UTC** – Manual configuration changes deployed
- **18:46 UTC** – Service fully restored

Full service degradation timeline

<img width="1909" height="460" alt="outage timeline" src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/496398843_a37eabe7_b91a_462b_967e_262c139f82fe_0e8e7bd3c0.png" />

## Root cause analysis

The outage resulted from three compounding factors:

1. **Configuration change timing**: A connection timeout reduction deployed during a period of database stress created conditions where pods could not establish connections within the new timeout window.

2. **Retry amplification**: Our retry logic lacked circuit breakers and exponential backoff, causing failed connection attempts to multiply rapidly. This transformed a manageable database load issue into complete service unavailability.

3. **Health check configuration**: Kubernetes continued routing traffic to pods in crash loops for up to 45 minutes due to improperly configured liveness and readiness probes.

The incident duration was extended by operational failures: timeout values were hardcoded in the application rather than externalized as configuration, requiring a full deployment cycle to modify. Additionally, our standard ArgoCD rollback procedure failed due to misconfigured permissions.

## Impact

- 78% of feature flag evaluation requests failed in the US region
- All flag types were affected, including read-only flags that did not require writer database access
- Customers experienced HTTP 504 errors regardless of their specific flag configurations

## Remediation

### Immediate actions (completed)

- Database connection timeouts moved to runtime configuration
- Timeout values increased to accommodate peak load scenarios

### Short-term improvements ([Follow along here](https://github.com/PostHog/posthog/issues/39133))

- **Read/write path separation**: Implementing distinct connection pools and failure domains for read-only operations versus write operations. Read-only flag evaluations will continue functioning during writer database issues.

- **Circuit breaker implementation**: Adding circuit breakers with exponential backoff to prevent retry amplification during connection failures.

- **Health check optimization**: Configuring aggressive liveness and readiness probes to remove failing pods from rotation within seconds rather than minutes.

- **Rollback procedure documentation**: Creating detailed runbooks for ArgoCD rollbacks with proper permission configurations and validation steps.

### Long-term improvements (Q4 2025 – Q1 2026)

- Development of specialized tooling for rapid pod termination during incidents
- Comprehensive load testing to validate connection pool behavior under contention
- Quarterly incident response drills to ensure operational readiness

## Lessons learned

This incident highlighted critical gaps in our defensive architecture and operational procedures. The coupling of read and write operations created unnecessary failure domains, while our retry logic lacked basic protective mechanisms against amplification. Most significantly, our incident response was hampered by inflexible configuration management and untested rollback procedures.

The architectural improvements underway will provide proper isolation between different operational modes of the feature flags service. This separation, combined with improved circuit breaking and configuration management, will prevent similar cascading failures in the future.
