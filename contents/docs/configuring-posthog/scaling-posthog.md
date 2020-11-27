---
title: Scaling PostHog
sidebar: Docs
showTitle: true
---

A standard instance of PostHog using PostgreSQL is pretty efficient for storing large volumes of data. We've seen volumes of **5 million events/day** and hundreds of requests a second on Heroku's cheapest tier with no problems.

However, once you have more data, you might start having issues while running queries. The issue is that Postgres isn't very good at doing analytical queries on larger datasets. This is where ClickHouse comes in.

## ClickHouse

[ClickHouse](https://clickhouse.tech) is an open-source, Apache 2.0 licensed OLAP database. It is very fast at doing analytical queries on large volumes of data. It also stores this data much more efficiently than Postgres does, and we've seen a 70% reduction in the amount of disk space needed to store the same data.

The downside of ClickHouse is that it takes more work to set up and configure correctly when compared to Postgres. This is why we currently only offer ClickHouse as part of our [paid offering](/pricing). 

If you have large event volumes and would like to use a more scalable and efficient version of PostHog, please email us at _sales@posthog.com_ to discuss details.

