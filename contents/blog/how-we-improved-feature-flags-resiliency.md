---
date: 2021-08-20
title: How we improved feature flag resiliency
rootPage: /blog
sidebar: Blog
showTitle: true
---

Feature flags as a service is an interesting space to be working in. If your service stops working, not only does it affect your customers, but also your
customer's customers, since they rely on you to make sure their app works fine.

In contrast to say, the PostHog interface not loading, where the problem is constrained to your customers. It's not great, for sure, but it's better than event
ingestion and feature flags going down.

Further, flags can be very sensitive to latency: If it takes 5 seconds for your flags to evaluate, that is you holding up your customers application for 5 seconds.
No, you can't wait to load them asynchronously as you need this result to determine what to show. Your business logic depends on this value.

So, over the past quarter, one of our key goals has been to make feature flags fast and resilient: Even if the PostHog interface goes down, none of the SDKs that query
flags should go down, nor the pure API interface. Further, for the strict latency flags, we need a way to resolve them in 50ms.

This post is about how we did it, and what we learned along the way.


## Special Problem Constraints

Flags can be called multiple times on a page (whenever properties change, identity changes, etc. etc.), so we can leverage this behaviour to create our solution


Things that can go down: Pgbouncer, postgres

Things that can sporadically go down: Same^

Entire infra dies, we still die. Nginx fails? Ded.

The caching problem: can't cache results.

Needs to be very very fast!

## Supporting local evaluation

For when you want flags in 20ms.

## Supporting bootstrapping

## Separating out deployment for feature flags

Spreads out load

## Leveraging special problem constraints

Half results are better than no results.

Handle partial updates with the API.

Specialness: Flags that affect the most people will almost never go down. Flags affecting a small % (property based) can be unavilable more often.

## Different ways pgbouncer can fail

## Different ways postgres can fail





