---
title: Logs data loss
showByline: true
date: 2026-02-20
author:
    - abe-basu
tags:
    - Post mortems
---

On February 19th, PostHog's Logs product experienced a major incident, which caused the loss of data collected more than 3 days ago in our US region. This data loss only impacted the Logs product, all other PostHog data is intact.

## Summary

As with most queryable data in PostHog, we store data for Logs in a ClickHouse cluster. When we started building Logs, we decided to use a new, dedicated cluster, rather than building it on top of our main ClickHouse cluster, which is shared across most other PostHog products. This had a few advantages, allowing us to:
-  iterate faster without cross-team or organisational risk
- use later database versions without time consuming backwards compatibility testing
- optimise the cluster for Logs specific access patterns
-  isolate our other product from the impact of bugs or load from logs, a very high-data-volume system

This new cluster uses S3 disks in ClickHouse, with data parts being automatically uploaded to S3 after 24 hours – this is what enables us to handle the significant data volume required for Logs (in PostHog, we alone produce about 500MB/s of logs from across our systems, or about 1PB/month uncompressed).

A bug in ClickHouse caused it to unexpectedly attempt to delete almost all of the data parts in S3. The Logs database is replicated, with two replicas, however very early on in the project we had enabled "Zero Copy Replication" in the Logs cluster nodes. This is an experimental feature that ClickHouse **does not recommend** in production, for exactly this reason: a bug that should have caused a single replica to be deleted instead deleted the data everywhere.

## Timeline

All times in UTC.

- **Feb 19: 10:54**: A routine mutation was run to materialize an index
- **Feb 19: 11:02**: The mutation finished, this triggered a bug in ClickHouse's zero-copy replication which caused one of the replicas to erroneously believe all of the data parts in the database were no longer referenced
- **Feb 19: 11:02-19:40**: During this time the replicas were busy diligently deleting all of the data stored in S3 for the entire database. As data is only moved to S3 after 24 hours, and the vast majority of our queries are for recent data, no automated alarms were triggered as the volume of query errors was relatively low
- **Feb 19: 19:40**: One of the nodes in the cluster crashes and restarts, it fails to start up due to the large volume of missing data it can't find. Engineers investigate and after some checks discover that the vast majority of S3-backed data is missing
- **Feb 19: 21:45**: It is determined that the data is most likely unrecoverable – disaster recovery procedures start
- **Feb 19: 22:15**: Decision is made to cut over to a new table and restore data from Kafka, where we have 3 days of retention
- **Feb 19: 23:00**: We have switched over to the new table (without zero-copy replication) and caught up on recent messages.
- **Feb 20: 10:05**: Data backfill from Kafka history begins
- **Feb 20: 12:21**: Data backfill completes

## Root cause analysis

### Zero Copy replication bug

The decision to use zero-copy replication was taken extremely early in the Logs product development when it was an experimental internal-only tool.

Once Logs was released to external users this decision should have been revisited, but wasn't. Due to experiencing no issues at all during several months of internal usage, settings that had been set at the beginning were largely unvisited and unchanged.

Zero-copy replication has been largely unmaintained for the last 4 years, and still contains critical bugs, including the one we hit here. Because Zero Copy replication uses a shared storage medium (S3) for multiple replicas, when the logic on one node failed and issued delete commands for the underlying S3 objects, those files were removed for the entire cluster immediately. There was no redundancy layer between the database application logic and the storage layer.

### Lack of detection

We lacked specific monitoring for the integrity of "cold" data stored in S3. Our alerts are optimized for ingestion lag, query latency, and error rates on active queries. Since users rarely query logs older than 24 hours, and the deletion process happened silently in the background without throwing application-level errors, the system remained "green" on our dashboards until the node restart forced a consistency check.

## Lessons learned

### What went well

*   **Service Isolation:** Despite the severity of this incident, all other products and features were completely unaffected. Our decision to isolate the logs product massively reduced the blast radius of this incident.
*   **Kafka Retention Strategy:** Configuring Kafka with 3 days of retention saved us from total data loss for recent activity.

### What went poorly

*   **Configuration Lifecycle Management:** Experimental configurations (Zero Copy Replication) intended for MVP/Alpha stages were allowed to persist into production
*   **Silent Failure:** The system deleted petabytes of data over an 8-hour window without a single alarm firing. We were blind to the deletion of historical data because we only monitor the health of *incoming* data and *hot* data.
*   **Backup Strategy:** Relying solely on the database replication for data durability (when using shared storage) created a single point of failure. We did not have S3 Versioning enabled on the bucket, which would have allowed us to "undelete" the files removed by the application.

### Key takeaways

1.  **Immediate Configuration Audit:** Disable Zero Copy Replication on all clusters immediately. Conduct a full audit of the Logs ClickHouse configuration and ensure no experimental features are used in production.
2.  **Implement S3 Object Protection:** Enable S3 Versioning on the underlying storage buckets. This ensures that even if the database application issues a destructive command due to a bug, the underlying data objects can be recovered.
3. Before a product is made Generally Available, we spot check configurations and our data integrity strategies to find and correct for potential single points of failure
