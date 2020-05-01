# Scaling PostHog

PostHog is pretty good at handling large volumes of data, and for most products or websites, you'll never have to worry about scaling. We've seen volumes of **1 million events/day** on Heroku's cheapest standard tier Dyno with no problems.

In that example, the database grew about 200mb a day. That means Heroku's cheapest standard database is able to hold about a years' worth of data.

However, if you do start going beyond these numbers there are things you can do to scale up.

## Splitting the app from the tracking

Due to the way some of the models are set up, we sometimes have to load in large amounts of data into memory to do certain queries. On smaller machines (<=1GB RAM) this can cause not only the query to slow down, but also the insert of new events (and sometimes even dropping them).

If you notice this happening, it can be worth setting up 2 identical PostHog deployments, both pointing at the same database. You can then use 1 of them for your analytics, and one for insertions. We use this setup on our hosted offering.

## Bigger hardware

If you're doing lots of queries over large numbers of events, it might make sense to scale up your machines, specifically RAM. This is probably the cheapest and most effective way of speeding up workload.

Please also let us know specific queries that are slowing you down, as we're always trying to optimize this.

## Integration with data lakes

If volume of data starts to become a problem to a point where you can't scale Postgres any further, we offer integrations with various databases designed to hold huge volumes of data. This is part of our enterprise offering, and we'd love to work with you to set this up.


