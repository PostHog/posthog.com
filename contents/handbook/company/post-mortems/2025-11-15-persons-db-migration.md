---
title: Persons database migration
showByline: true
date: 2025-11-15
author:
    - joe-martin
tags:
    - Post mortems
---

Between November 11 and November 15, 2025 we hit a Postgres limit that required us to migrate our Persons database for US Cloud. This led to ingestion delays which had a knock-on effect for products relying on person data, including feature flags and experiments.

This post-mortem document examines the root cause of the issue, steps taken, and our future plans derived from the lessons learned.

## Incident summary

From November 11, 4:02 PM UTC to November 14, 3:02 PM UTC the performance of PostHog's ingestion processing pipeline became severely degraded, resulting in processing delays of events of up to 2 days for all customers in the US region.

The root cause of the performance degradation was that our Postgres database responsible for storing our Person information reached a previously unseen limits in Postgres related to the JSONb field we use to store person properties. This led to a state where writes to the database kept waiting for OIDs in the TOAST table to become available, which could take multiple seconds per update, slowing down the ingestion pipeline to the point where there were no standard scaling options available. See Root Cause Analysis below for more technical details.

The root cause was not identified until November 12th 10:17pm UTC, a day and a half after the issue arose. We enlisted help from engineers on the AWS RDS team and external consultants to identify the cause. Diagnosis proved difficult even with specialist support, but we eventually found out we were left with only one option: migrate to a new partitioned table.

By November 14, 2025, 15:02 UTC, ingestion was healthy again and we shifted focus to the accumulated backlog. During this recovery phase, we hit a secondary issue with AWS MSK (Kafka): local disk usage reached 85% because tiered storage keeps the most recent 4 hours of data on disk before offloading to S3. The backlog catchup created an unusually dense last-4-hours window, driving up local disk usage. We temporarily paused ingestion, reduced the topic's local retention window, confirmed disk headroom, and then resumed ingestion.

After that, catchup progressed smoothly. We moved our backfill into Dagster to gain better visibility and stability for long-running backfill jobs, knowing remediation would take at least the weekend. By the morning of November 15, all events since the start of the incident had been processed, all systems were fully operational, and we began a background backfill of older Person data purely for housekeeping. No data was lost.

By November 15, 6:20 AM UTC we had worked through the backlog of events and fully recovered.

## Incident impact

### Scope

- This issue only impacted US Cloud
- Time window of degraded ingestion performance: Approximately November 11, 16:02 UTC – November 14, 15:02 UTC
- Time to fully process backlog and complete recovery: Until November 15, 06:20 UTC

Customers experienced ingestion delays ranging from 10 minutes to up to 2 days. During this period recent events sent to PostHog did not appear, leading to the following potential per-product impact:

- **Analytics:** Charts and queries which included recent time ranges would be inaccurate due to data from the incident period not being present. Customers were still able to analyze historical data.
- **Feature flags and Experiments:** The flag evaluation service continued to operate, however flags that relied on person properties would have had delays in those properties being used to evaluate feature flags.
- **Error tracking and Session replay:** Ingestion of errors and replays remained healthy. Filtering and segmentation based on Person updates was affected similarly to Analytics.
- **CDP & Workflows:** Destinations and Workflows reliant on Persons were affected similarly to Feature Flags. Downstream actions were delayed and should have been automatically corrected as the backlog was processed.

### Data integrity
No data was lost.

Once the backlog was cleared, all reporting tools indicate accurate values were processed for the delayed period.

## Timeline

A full timeline of updates is available on [the PostHog status page](https://status.posthog.com/incidents/3yqn2wwkj5rq).

## Root cause analysis

### Primary issue: Postgres TOAST OID exhaustion

PostgreSQL stores large column values (>2KB compressed) in a separate, [out-of-line table, called the TOAST table](https://www.postgresql.org/docs/current/storage-toast.html#STORAGE-TOAST-ONDISK). Posthog's Persons table has a `properties` column that frequently exceeds this 2KB threshold, resulting in there being many TOASTed values associated with the Persons table.

Each value that is moved "out of line" is assigned a unique OID (Object identifier) from a finite 32-bit space (~4 billion values), that the main table uses to track it in the table's associated TOAST table.

From [postgresql wiki](https://wiki.postgresql.org/wiki/TOAST):

> The OIDs used for this purpose are generated from a global counter that wraps around every 4 billion values, so that from time to time an already-used value will be generated again. Postgres detects that, and tries again with the next OID.

When the space of used OIDs approaches the limit, there will be longer and longer sequential runs of used OIDs. This results in the database engine having to do an incredible amount of reads (checking every used OID it is given by the counter to see if it's free or not) to make a single INSERT or UPDATE for a TOAST'ed row.

It is important to note that before the table hits the hard limit of 4 billion OIDs, write performance for TOAST'ed rows will be severely degraded, because the space of available OIDs is so sparse. If there is just a single free OID left, the database engine would, on average, have to read through billions of used OIDs and check to see if they are free, before it finds the free OID to complete the write. This OID exhaustion increased the amount of disk reads we were doing per write query from 10kb to 15MB, increasing latency for those queries by 100x and grinding the ingestion of events to a halt.

### Secondary issue: AWS MSK disk pressure during catch-up

During backlog processing, we hit a separate but related operational issue:

- Our AWS MSK cluster uses tiered storage, keeping the most recent 4 hours of data on local disk before offloading to S3.
- As we processed the backlog, the amount of data in the "last 4 hours" window became unusually large.
- This pushed local disk utilization up to ~85%, triggering alerts.

To mitigate this we paused ingestion, reduced the local retention configuration for the relevant topic, and resumed ingestion once disk usage returned to a safe level.

### Appendix: OID exhaustion diagrams

#### Stage 1: Healthy database state

OID Space ( each block = used OID, each dash = free OID) [----------------------------------------------------] 0-1M OIDs [-----XX-----------------------XX---------------------] 1M-2M OIDs [---------XX--------------------------XX--------------] 2M-3M OIDs [----------------------------------------------------] 3M-4M OIDs ↑ Next OID Counter (finds free OID immediately)

#### Stage 2: OID exhaustion

OID Space (each block = used OID, each dash = free OID) [XXXXXXXXXXXXXXX--XXXXXXXXX--XXXXXXXXXXXXXX--XXXXXXX] 0-1M OIDs [XXXXXXXXXXXXXXXXXXXXXXXX----XXXXXXXXXXXXXXXXXXXXXX--XX] 1M-2M OIDs [XXXXXXXXXX--XXXXXXXXXXXXXXXXXXXXXXXXXXX--XXXXXXXXXXXXX] 2M-3M OIDs [XXXXXXXXXXXXXXXXXXXX----XXXXXXXXXXXXXXXXXXXXXXXXXXX--X] 3M-4M OIDs ↑ Next OID Counter (must skip over many used OIDs, each skip requiring disk reads)

## Why was this hard to detect?

PostgreSQL's OID exhaustion behavior is rare and not commonly encountered even at large scale. Additionally, standard dashboards (CPU, memory, IOPS, lock contention) did not immediately point at OID exhaustion.

Diagnosis of the issue was also frustrated by a lack of dedicated observability on:

- TOAST table size / OID usage
- Disk read amplification per write on specific tables

Eventual diagnosis was only possible due to the dedicated effort of our engineers working in tandem with external experts and AWS engineers to connect:

- Massive read amplification
- Specific pattern of TOAST usage
- A nearly exhausted global OID space

## Remediation

### Immediate actions (completed)

1. **Root cause discovery and isolation**
We Identified TOAST OID exhaustion as the root cause by engaging internal teams, external consultants, and AWS engineers to analyze:

- Query plans
- Disk read amplification
- TOAST and OID behavior for the persons table

2. **Migration to a new partitioned Persons table**

- Created a new partitioned table architecture for Persons with a fresh TOAST table and OID space.
- Implemented database triggers to keep old and new tables in sync for live writes.
- Ran a backfill script to copy existing Person data from the old table to the new table.
- Modified ingestion and application logic so that:
- All new writes go to the new table.
- Reads go to the new table first, with fallback to the old table during the migration window.

3. **Careful deployment of application changes**
Given the risk of introducing new issues during an incident, we chose a manually controlled deploy to production for the web app rather than a fully automated rollout. Multiple engineers worked in shifts throughout the weekend and made changes across:

- Feature flags API
- Error tracking ingestion
- Django web application

4. **Scaling ingestion to clear backlog**
Once ingestion performance was restored on the new Persons table, we scaled ingestion workers to process the accumulated backlog while monitoring:

- Lag per partition
- Throughput
- Resource utilization

5. **MSK disk pressure mitigation**

- Paused ingestion temporarily when MSK local disk hit ~85% usage.
- Reduced local retention for the affected Kafka topic so less data needed to be stored on disk before offloading to S3.
- Resumed ingestion after confirming sufficient headroom.

6. **Dagster-based backfill**
We moved the backfill process into Dagster to provide:

- Better monitoring and visibility
- More robust handling of long-running backfill jobs
- Used Dagster to complete the remaining backfill and housekeeping tasks over the weekend.

7. **Final cleanup and confirmation**
Communicated final resolution and announced a small upcoming maintenance window to consolidate on the new tables. We verified that:

- All event backlogs had been processed.
- Services were reading correctly from the new Persons table (with safe fallback while the old table still existed).

### Planned actions (planned or in-progress)

1. **Deeper Postgres engine monitoring**
    We plan to add metrics and alerts around:

- Heavy disk read amplification per write
- TOAST table statistics
- Other engine limits that may become relevant at large scale

2. **Improved runbooks for engine-level limits**
We plan to document symptoms and diagnostics for similar Postgres engine-level issues. This will include clear decision trees for when to migrate vs repair-in-place.

3. **Improved and new runbooks for customer comms**
We have begun creating new customer communication runbooks which clarify how and when to communicate with customers about the issue and provide a clear escalation path and redundancies.

4. **Exploring other data stores**
We've been exploring using other data stores for the persons database and will continue to evaluate those.

## Lessons learned

### What went well?

- **Data integrity remained intact**
We preserved all incoming events and persons data. While delayed, data was not lost.

- **Coordinated multi-team response**
Engineers across ingestion, infrastructure, and application teams, plus external consultants and AWS engineers, collaborated effectively to diagnose a rare engine-level problem.

- **Safe migration under load**
We successfully migrated to a new Persons table using triggers and backfill while the system remained live, minimizing additional downtime.

- **Transparent customer communication**
We provided regular engineer-led status updates and committed to a public post-mortem.

### What could have gone better?

- **Diagnosis took too long**
It took roughly a day and a half to conclusively identify OID exhaustion as the root cause. We had no dedicated monitoring for TOAST growth, OID usage, or disk read amplification per write.

- **Single critical dependency on Persons**
Many core features (analytics, flags, replay filters, CDP) rely heavily on timely updates to the persons table. When that became unhealthy, a wide surface area of the product was affected.

- **Backfill visibility and tooling**
Our initial backfill approach lacked the visibility and robustness needed for a prolonged, large-scale migration. We had to move this logic into Dagster during the incident.

- **MSK disk pressure during catch-up**
While secondary to the main cause, disk pressure on MSK during catch-up highlighted that our tiered storage configuration and alerting were not tuned for large backlog scenarios.

- **Lack of communication redundancies**
All of the team members who are normally responsible for customer communications were unavailable for the duration of this incident and we had to scramble to identify fallbacks.

### Moving forward

This incident surfaced a rare but serious interaction between our data model and a low-level PostgreSQL engine limit. It also highlighted how central the Persons data model is to the rest of PostHog: when the persons table slowed down, a wide range of features---from analytics and feature flags to replay filtering and CDP---were indirectly impacted.

We've taken immediate steps to recover by migrating to a new partitioned Persons table, stabilizing ingestion, and clearing the backlog of events. We are now focused on:

- Completing reconsolidation on the new tables
- Hardening observability and alerting around TOAST/OID behavior and disk read amplification
- Improving our backfill tooling and Kafka tiered storage safeguards
- Proactively designing and operating Person-like tables in a way that avoids similar limits in the future

We're committed to continuing to invest in the resilience of our ingestion and Persons infrastructure so that incidents like this become less likely, easier to detect early, and faster to remediate when they do occur.
