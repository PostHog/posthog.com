---
title: ClickHouse
sidebar: Docs
showTitle: true
---

ClickHouse® is an open-source, high performance columnar OLAP database management system for real-time analytics using SQL.

We use it to store information like:
- event
- person
- person distinct id / session

and to power all our analytics queries.

This is a guide for how to operate ClickHouse with respect to our stack.

## Metrics

As with any database it is important to keep an eye on metrics to make sure everything is in ship shape. Most of these metrics shouldn't be a surprise.

The metrics you should keep an eye on with ClickHouse are:
- Latency of Events from ingestion -> visibility in ClickHouse <- This is an indication of ClickHouse falling behind.
- Disk IOPS
- Disk throughput (read and write)
- CPU IO Wait time
- CPU boundedness (high CPU utilization)
- MergeTree Parts Count (by table)
- Replication lag (by table and if enabled)

### Collecting metrics

There are a few handy ways of collecting and accessing metrics about ClickHouse.

- Straight from ClickHouse via [system tables](https://clickhouse.com/docs/en/operations/system-tables/)
- ClickHouse exposes a [Prometheus](https://clickhouse.com/docs/en/operations/server-configuration-parameters/settings/#server_configuration_parameters-prometheus) endpoint for scraping metrics by Prometheus.
- You can [configure](https://clickhouse.com/docs/en/operations/server-configuration-parameters/settings/#server_configuration_parameters-graphite) ClickHouse to export metrics to your Graphite server
- A few other direct and indirect methods documented in the [official docs](https://clickhouse.com/docs/en/operations/monitoring/)

If you use DataDog you can even use their examples to collect and report on metrics found [here](https://www.datadoghq.com/blog/monitor-clickhouse/).

Sematext has a great post on important metrics for ClickHouse and how to collect them on their [blog](https://sematext.com/blog/clickhouse-monitoring-key-metrics/). It's a great read and quite detailed.

Collecting, reporting, and monitoring metrics is similar for all installations, but unique to every organization depending on the tools you are using elsewhere within your organization. We will be firming up on our own opinions in the future, but for now it may make the most sense to integrate these metrics into systems that you are using for monitoring other production workloads.

### Zookeeper

We have shipped zookeeper with our stack in preparation of sharding, but we don't broadly support sharding or replication on all installations yet. We will update this section soon.

What is Zookeeper used for with regard to ClickHouse?
- Replication between nodes for `ReplicatingMergeTree` family of tables

Zookeeper is currently the source of truth for what instance has what parts and what parts exist. For replicating ClickHouse is a master-master system and the instances do their best with Zookeeper's help finding out what data is available and where to go to get it within the cluster.


## ClickHouse Operating Tips

ClickHouse has a great list of [tips](https://clickhouse.com/docs/en/operations/tips) for operating a ClickHouse setup and [troubleshooting](https://clickhouse.com/docs/en/operations/troubleshooting) issues.


### Operating Tips Summary

- Use `performance` CPU Scaling Governor
- Use a ton of RAM for your instance. ClickHouse loves to use the page cache to speed up queries and prevent hitting disk. If you can fit your entire dataset in memory, get a node that has that much in RAM. You will get the best performance.
- Do not disable overcommit. The value `cat /proc/sys/vm/overcommit_memory` should be 0 or 1.
- If you can, use SSD over spinning disk. If you use Spinning disk use 7200RPM disks.
- Software RAID on linux is preferred. Specifically use RAID 10 in `far` layout
- Calculate the exact number from the number of devices and the block size, using the formula: `2 * num_devices * chunk_size_in_bytes / 4096`.
- Use `ext4`
- If you are using IPv6, increase the size of the route cache.


## Failure modes

Clickhouse has a few failure modes depending on configuration, utilization, disk performance, and whether replication and sharding is used (which brings Zookeeper into the picture)


### Disk Throughput

The primary failure mode most should be aware of is around ClickHouse instance resources. ClickHouse is very resources intensive on disk, especially during heavy writes such as backfills or large migrations. What generally will happen is ClickHouse will saturate throughput to disks as the [MergeTree](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/mergetree/) backed tables are constantly being merged and resorted. (A correctly sorted table's parts is critical to ClickHouse's ability to query quickly).

 When this happens you will notice a few things:
 - That queries will take longer and longer to execute. 
 - The count of Parts per table will increase slowly and then quite quickly.
 - As the Parts increase the queries will become even slower.
 - CPU IO Wait will saturate the CPU.
 - The latency between an event getting ingestion and it being visible in PostHog will grow.

An easy fix for this is to dramatically increase memory for the instance so that page cache can be hit more frequently reducing ClickHouse's dependency on Disk for queries and to increase the throughput and iops available for ClickHouse's data volume if you can.

### CPU Saturation

Another Failure mode is CPU saturation. Generally this will either be a result of IO Wait (see above disk saturation) or simply because of under provisioned resources on the CPU side for the query volume the instance is handling. We are constantly working to improve our query performance to reduce load on ClickHouse so the two easiest ways to mitigate this failure mode is to upgrade PostHog and to simply increase the number of CPUs that are available to ClickHouse. If you are operating on Kubernetes you will need to increase the size of the nodes in the node group that is running the ClickHouse pod(s) and make sure that the affinity of the ClickHouse Operator keeps the pod(s) pinned to that node group.

### Out of Disk Capacity

Running out of Disk is another common failure case for ClickHouse. What you will typically notice is ClickHouse restarting repeatedly. The easiest way to mitigate this is to simply increase the volume size that ClickHouse is using for data. This parameter can be found in the `values.yaml` file in our chart if you are using our helm chart for your deployment. Otherwise adjust the volume size however it makes sense for your infrastructure.

## Migrations

On this note though, it is important that your instance never exceeds 50% capacity of disk utilization. This is because we routinely include large data migrations in our updates to PostHog as we include new features and iterate how we store data on disk within ClickHouse. Frequently we adapt new features within ClickHouse that require a migration of this type. If you do not plan on upgrading PostHog (not suggested) you can use more than 50% of disk capacity on ClickHouse, but you will not be able to benefit from our future improvement.


## Maintenance Tasks

There are no maintenance tasks that you should be planning for with ClickHouse outside of the Migrations mentioned above. Luckily those are all managed without PostHog and require very little input from you, the operator. Other than that, there are no Vacuums or Vacuum fulls that you need to run as if you were operating a Postgres instance. If there is any maintenance that needs to be done it will come as an 'Async Migration' or as a command that we will reach out to you to run. You should still do basic operations like backing up your instance and testing those backups in a restore (see backup and restore sections in this runbook).

## Scaling up
Check out the [configuration](/docs/self-host/deploy/configuration#scaling-up) section of our self-deploy docs!

## Dictionary
* **sharding**: is a method for splitting data up across multiple ClickHouse instances 'horizontally' 
* **shard**: holds a subset of the dataset that is stored on a single ClickHouse instance
* **replica**: is a node that is responsible for a part of a shard. If you have 3 replicas of a shard that 'shard' of data is replicated across 3 ClickHouse instance 'replicas'
* **distributed table**: is a wrapper around a multiple 'shards' of data hosted on multiple ClickHouse instances. It is a virtual table the represents the data of multiple instances. 

## Useful links
- [Official documentation](https://clickhouse.tech/docs/en/)
