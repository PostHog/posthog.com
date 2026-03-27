---
title: Public post-mortems
sidebar: Handbook
showTitle: true
---

> For PostHog employees, see [the post-mortem guidance](/handbook/engineering/operations/post-mortems) for how and when to write a post-mortem.

This page contains public post-mortems for significant incidents at PostHog. We publish these because we believe transparency builds trust, and because we think the wider engineering community benefits from shared lessons.

For security-specific incidents, see our [security advisories](/handbook/company/security-advisories). For real-time status updates, check [our status page](https://status.posthog.com/).

## Our approach to post-mortems

We write post-mortems to understand what happened, not to assign blame. Every incident is an opportunity to improve our systems and processes. Our post-mortems typically cover:

- A clear timeline of what happened
- Root cause analysis
- Impact assessment
- What went well and what went poorly
- Concrete remediation steps

Not every post-mortem is made public. Minor incidents that partially affect services are documented internally. We publish a public post-mortem when an incident results in permanent impact on user data (such as data loss), directly disrupts customers' own services (such as SDK bugs breaking customer sites) or result in extended unavailability of PostHog services for customers (e.g. if dashboards would not load for multiple hours).

For internal guidance on how we handle incidents, see [handling an incident](/handbook/engineering/operations/incidents).

## Public post-mortems

- [Logs data loss](/handbook/company/post-mortems/2026-02-20-posthog-us-logs-data-loss) – February 20, 2026
- [Feature flags cache degradation](/handbook/company/post-mortems/2026-02-06-feature-flags-cache-degradation) – February 6, 2026
- [Replay SDK fetch wrapper incident](/handbook/company/post-mortems/2026-01-17-replay-sdk-fetch-wrapper-incident) – January 17, 2026
- [Shai-Hulud supply chain attack](/handbook/company/post-mortems/2025-11-26-shai-hulud-attack) – November 26, 2025
- [Persons database migration](/handbook/company/post-mortems/2025-11-15-persons-db-migration) – November 15, 2025
- [Feature flags recurring outages](/handbook/company/post-mortems/2025-10-21-feature-flags-recurring-outages) – October 21, 2025
- [Surveys SDK bug](/handbook/company/post-mortems/2025-10-03-surveys-sdk-bug) – October 3, 2025
- [Feature flags service outage](/handbook/company/post-mortems/2025-09-29-flags-is-down) – September 29, 2025


