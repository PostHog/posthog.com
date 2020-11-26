---
title: Scaling PostHog
sidebar: Docs
showTitle: true
---

A standard instance of PostHog using Postgres is pretty efficient at storing large volumes of data. We've seen volumes of **5 million events/day** and hundreds of requests a second on Heroku's cheapest tier with no problems.

Once you have more datta, you might start running into issues while running queries. The issue is that Postgres isn't very good at doing analytical queries on larger datasets. This is where Clickhouse comes in.

## Clickhouse

[Clickhouse](https://clickhouse.tech) is an open-source, Apache 2.0 licensed OLAP database. It is very fast at doing analytical queries on large volumes of data. It also stores this data much more efficiently than Postgres does, and we've seen 70% reductions in the amount of disk space needed.

The downside of Clickhouse is that it's more work to set up and configure correctly than Postgres. This is why we currently only offer Clickhouse as part of our [paid offering](/pricing). Please email us at [sales@posthog.com](mailto:sales@posthog.com) to talk to us about this.

