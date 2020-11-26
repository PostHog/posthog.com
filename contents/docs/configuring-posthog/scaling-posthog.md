---
title: Scaling PostHog
sidebar: Docs
showTitle: true
---

PostHog is very good at handling large volumes of data, and, for most products or websites, you'll never have to worry about scaling. We've seen volumes of **5 million events/day** and hundreds of requests a second on Heroku's cheapest tier with no problems.

In that example, the database grew by about 500mb a day. That means Heroku's cheapest standard database is able to hold around a years' worth of data.

However, if you do start going beyond these numbers, there are things you can do to scale up.

## Handling Higher Volume with Partitions

We recommend partitioning tables when running queries in PostHog is getting noticeably slow. The partition function applies event/timestamp partitioning to the event table, meaning the table will be partitioned per event and each event table will be partitioned per week.

Partitioning events doesn't change how you use PostHog. It'll only speed things up.

The command allows you to specify which events to explicitly create partitions for. If none are specified, the table will only be partitioned by timestamp per week.

If any single event has over a million events a week, it's worth partitioning on that event. Any events that aren't partitioned get put together in a default bucket for that week. For instance, if you're using `posthog-js` or the snippet, it's worth partitioning on `$pageview` and `$autocapture`, as they tend to be high volume events.

### Creating Partitions 

> **Note:** It's possible to create partitions while the site is running, but you might run into locking or memory issues. It's recommended to take your app temporarily offline (maintenance mode in Heroku) while creating the partitions.

> **Note:** Partitions were introduced in PostHog 1.6.0.

Partitioning only by week (not events): `python manage.py partition`

Partioning by '$pageview' events: `python manage.py partition --element '$pageview'`

Partitioning by multiple events: `python manage.py partition --element '$pageview' --element '$autocapture'`

### Reversing Partitions

Should any problem arise with partitions, we provide a reversal function that will return the partitioned table to its original configuration:

`python manage.py partition --reverse`

## Multiple Web Servers and Workers

One easy way of scaling is to add more workers or web servers (dynos on Heroku). It's worth having a look at load and RAM metrics for your specific instance to see which one is struggling. PostHog can handle many web servers and workers working concurrently.

## Bigger Database Hardware

If you're doing lots of queries over large numbers of events, it might make sense to scale up your database machine, specifically the RAM. This is probably the cheapest and most effective way of speeding up workload.

Please also let us know specific queries that are slowing you down, as we're always trying to optimize this. You can contact us on [Slack](https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ), via email at _hey@posthog.com_, or [open an issue on GitHub](https://github.com/PostHog/posthog/issues).

## Integration with Data Lakes

If the volume of data starts to become a problem to the point where you can't scale Postgres any further, we offer integrations with various databases designed to hold huge volumes of data. This is part of our enterprise offering, and we'd love to work with you to set this up.

_You can contact us at sales@posthog.com if you have any questions._
