---
title: Scaling PostHog
sidebar: Docs
showTitle: true
---

PostHog is pretty good at handling large volumes of data, and for most products or websites, you'll never have to worry about scaling. We've seen volumes of **1 million events/day** on Heroku's cheapest standard tier Dyno with no problems.

In that example, the database grew about 200mb a day. That means Heroku's cheapest standard database is able to hold about a years' worth of data.

However, if you do start going beyond these numbers there are things you can do to scale up.

## Multiple web servers and workers

One easy way of scaling is to add more web servers (or dynos on Heroku) or workers. It's worth having a look at load and RAM metrics for your specific instance to see which one is struggling. PostHog can handle many web servers and workers working in tandem.

## Bigger database hardware

If you're doing lots of queries over large numbers of events, it might make sense to scale up your database machine, specifically RAM. This is probably the cheapest and most effective way of speeding up workload.

Please also let us know specific queries that are slowing you down, as we're always trying to optimize this.

## Integration with data lakes

If volume of data starts to become a problem to a point where you can't scale Postgres any further, we offer integrations with various databases designed to hold huge volumes of data. This is part of our enterprise offering, and we'd love to work with you to set this up.

