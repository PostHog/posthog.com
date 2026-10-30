---
title: Why we're moving our warehouse off DuckDB
date: 2026-10-29
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/moving_off_duckdb_4c95538aac.png
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - benjamin-knofe-vider
category: General
tags:
    - Data warehouse
    - Infrastructure
    - Engineering
seo:
    metaTitle: Why we're moving our warehouse off DuckDB
    metaDescription: "We moved our data warehouse off DuckDB and DuckLake onto our own flavor of Trino and a new open table format, HogLake. Here's what broke at scale and why."
---

Five months ago, [we rebuilt our warehouse on DuckDB](/blog/why-we-rebuilt-our-data-warehouse) instead of ClickHouse. We did it because a shared ClickHouse cluster couldn't handle hours-long modeling queries, and it lacked a cost-based query optimizer. DuckDB gave every customer their own instance, and tools like dbt could connect over Postgres. We're still fans.

But we underestimated how big and complex our customers' workloads would get. We didn't want them to have just a good experience, we wanted the best experience you can get when you pay someone else to run your warehouse. It should work at any scale, at a fair price.

So we spent the last three months re-architecting it, this time without DuckDB. 

## DuckDB is brilliant on one machine

We love DuckDB. It's probably the best single-node tool for analyzing heaps of data, and that node can be your laptop. It's robust and reliable. It almost always finishes your query, and if it runs out of memory, it spills to disk.

The same features that are great locally gave us problems in the cloud. Customers ran more complex queries than we expected, so we had to add huge instances. Adding disks was an option, but queries would have been too slow and expensive to be viable.

We hit other bottlenecks too, like fetching lots of data from S3 without async fetching. DuckDB only added that recently.

## DuckLake is built for compatibility, not scale

To use DuckDB as a fully-fledged data warehouse, we installed the [DuckLake](https://ducklake.select/2025/05/27/ducklake-01/) extension by default. It is a new lakehouse format from the same creators and follows the same principles as DuckDB: keep things simple and run on almost any setup. That works well up to a point, but at PostHog's scale, we needed something designed for distributed scale from the start.

DuckLake's catalog schema has to stay portable across many SQL databases, which limits engine-specific optimizations. At our scale, a single-table write could take more than three minutes. Every commit re-read the statistics for the entire catalog.

We tuned DuckLake with table indexes and similar tweaks. But to keep offering DuckLake, we had to stay 100% compatible with its existing schema.

Another problem is that over 99% of the catalog's statistics rows belonged to tables that no longer existed. Cleaning them up made writes 30 to 50 times faster, but the rows kept growing back.

We also spent a lot of time on the number of connections DuckLake opens to metadata databases. That hurts on shared Postgres instances, where every connection has a real cost.

## 1 trillion rows was a challenge

DuckLake at PostHog didn't start small and ramp up. We fully committed and put all of PostHog in a DuckLake to dogfood as the first customer.

When we moved off it, it held about 2 PB: roughly 1 trillion rows and 15.3 million snapshots. It broke in lots of ways that were hard to fix within DuckLake's scope.

We'd rather have contributed to the existing community and helped it grow. But we couldn't land changes as fast as we needed, so we ended up carrying patches in a fork.

## You shouldn't have to guess how much RAM your query needs

To run a single-node engine safely in the cloud, we have to size the worker before the query arrives. The ergonomics here are wonky. We couldn't find a good way to tell customers what resources their queries would need. Predicting CPU and memory for a specific query was even harder.

Users shouldn't have to worry about this. They should be able to run whatever they need to get their work done. Our job is to handle the rest and make it as predictable as possible.

## Speaking Postgres is harder than it sounds

Offering direct Postgres connections over port 5432 sounds like a great idea. In practice, it was much harder to scale than HTTP.

Missing reconnects and managing TTLs and idle connections at scale is hard, and long-running connections are expensive. There's also very little tooling for load balancing pgwire compared with HTTP. Compare the ergonomics of an AWS NLB with an ALB and you'll see what we mean. HTTP headers also make routing in Kubernetes much more flexible.

There's also an endless list of Postgres clients, and each expects its own niche Postgres behavior. Customers kept asking us to fix their client or library. We spent a lot of time shipping many of those fixes, but coverage never got good enough. We'd rather spend our time building an excellent warehouse than chasing the long tail of Postgres compatibility.

## We're rebuilding on Trino with HogLake

We've learned not to hype the tech behind a warehouse so much. What counts is the experience it gives you.

Still, we're happy to share what we're cooking next. We rebuilt everything around our own flavor of [Trino](https://trino.io/) and created our own open table format, HogLake. And yes, we're testing it at PostHog's petabyte scale first. We made it solid before handing it to design partners.

If your current warehouse is slow or expensive, [let's talk](mailto:benjamin.k@posthog.com), especially if you have a lot of data to query. We're always looking for design partners.
