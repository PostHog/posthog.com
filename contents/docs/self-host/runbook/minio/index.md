---
title: MinIO
sidebar: Docs
showTitle: true
---

MinIO offers high-performance, S3 compatible object storage. We use it to store files like:
- session recordings
- file exports

This is a guide for how to operate MinIO with respect to our stack.


## Metrics

As with any system it is important to keep an eye on metrics to make sure everything is in ship shape. Most of these metrics shouldn't be a surprise.

The metrics you should keep an eye on with MinIO are:
- CPU usage
- Disk usage (IOPS/throughput/usage)


### Collecting metrics

- MinIO exposes a [Prometheus](https://docs.min.io/docs/how-to-monitor-minio-using-prometheus.html) endpoint for scraping metrics by Prometheus.


## Failure modes

MinIO has a few failure modes depending on configuration, utilization, disk performance and more.


### Out of Disk Capacity

Running out of Disk is another common failure case. What you will typically notice is MinIO restarting repeatedly. The easiest way to mitigate this is to simply increase the volume size that MinIO is using for data. This parameter can be found in the `values.yaml` file in our chart. Please adjust the volume size however it makes sense for your infrastructure and your retention settings.


## Useful links
- [Official documentation](https://docs.min.io/)
