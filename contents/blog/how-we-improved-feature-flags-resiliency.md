---
date: 2021-08-20
title: How we improved feature flag resiliency
rootPage: /blog
sidebar: Blog
showTitle: true
---

Feature flags as a service is an interesting space to be working in. If your service stops working, not only does it affect your customers, but also your
customer's customers, since they rely on you to make sure their app works fine.

In contrast to say, the PostHog interface not loading, where the problem is constrained to your customers. It's not great, for sure, but it's better than event ingestion and feature flags going down.

Further, flags can be very sensitive to latency: If it takes 5 seconds for your flags to evaluate, that is you holding up your customers application for 5 seconds. No, you can't wait to load them asynchronously as you need this result to determine what to show. Your business logic depends on this value.

So, over the past quarter, one of our key goals has been to make feature flags fast and resilient: Even if the PostHog interface goes down, none of the SDKs that query flags should go down, nor the pure API interface. Further, for the strict latency flags, we need a way to resolve them in 50ms.

This post is about how we did it, and what we learned along the way.

Before we jump into how we improved things, it's worth listing out constraints that we can use to create solutions that otherwise wouldn't be possible.


## Special Problem Constraints

### PostHog Flags are deterministic

Given a user identity, and a PostHog feature flag, the flag result is deterministic and sticky. So for example, if I roll out a flag to 30% of people, the person who's inside this window remains inside this window even if the rollout percentage goes up to 40, 80, or 100%.

We guarantee this by computing a hash of the user id and the flag key.

So, we never need a server to determine whether a flag belongs to a given rollout % or not. However, if a flag depends on person properties, we need to go to a database, check against known properties, and then determine if the flag matches or not.

### Flags are evaluated multiple times in a session

Flags are evaluated multiple times on a page. For example, whenever properties change our flag might change, and same for when the user identity changes. We can leverage this behaviour in our solution.


## Making feature flags fast

Since flags are deterministic, we technically don't need a server to evaluate them. This insight led to creating local evaluation of feature flags, where our SDKs download flag definitions, evaluate them locally, and only fallback to our servers when this is not possible.

As we saw in our problem constraint, local evaluation can fail when we don't know properties the flag depends on. To combat this, the SDK interface allows passing in properties that you already know of. We then use these passed in properties to figure out if flag computation is possible.

This optimisation is great because it cuts out all network I/O and makes evaluation CPU-bound, which reduces latency from 500ms to 10-20ms.

One thing to note though is that this only works on server-side libraries. Flag definitions can have PII, like user email IDs, and require auth to download them, which means we can't expose these on the client-side libraries.

As a result, our client still has not-great latency. To combat this issue, we introduced bootstrapped feature flags: You can pass in a user ID and flags to initialise a client-side PostHog SDK with. This ensures flags are instantly available, and unlocks creating cool features like redirecting on pageload based on feature flags.

However, how do you get the flags to pass in to the client SDK? If you have to call PostHog's servers manually to do this, it defeats the purpose. This is where _synergy_ between local evaluation and bootstrapping comes in: You use your server-side SDK to evaluate flags locally, then pass these along to your frontend to bootstrap flags.

Overall, this has been working pretty well. There's growing pains of replicating every new feature in flags in all server-side SDKs, but other than that the core functionality is solid.


## Making feature flags reliable



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

Specialness: Flags that affect the most people will almost never go down. Flags affecting a small % (property based) can be unavailable more often.

## Different ways pgbouncer can fail

## Different ways postgres can fail





