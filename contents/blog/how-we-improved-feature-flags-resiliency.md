---
date: 2023-03-28
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

### The Caching Problem

It's not reasonable for us to cache the _results_ of flag evaluation for users because this blows up the size of the cache, doesn't work for new people we are seeing for the first time, and isn't flexible enough to leverage properties changing over time for users.

More on this constraint in the resiliency section.


## Making feature flags fast

Since flags are deterministic, we technically don't need a server to evaluate them. This insight led to creating local evaluation of feature flags, where our SDKs download flag definitions, evaluate them locally, and only fallback to our servers when this is not possible.

As we saw in our problem constraint, local evaluation can fail when we don't know properties the flag depends on. To combat this, the SDK interface allows passing in properties that you already know of. We then use these passed in properties to figure out if flag computation is possible.

This optimisation is great because it cuts out all network I/O and makes evaluation CPU-bound, which reduces latency from 500ms to 10-20ms.

One thing to note though is that this only works on server-side libraries. Flag definitions can have PII, like user email IDs, and require auth to download them, which means we can't expose these on the client-side libraries.

As a result, our client still has not-great latency. To combat this issue, we introduced bootstrapped feature flags: You can pass in a user ID and flags to initialise a client-side PostHog SDK with. This ensures flags are instantly available, and unlocks creating cool features like redirecting on pageload based on feature flags.

However, how do you get the flags to pass in to the client SDK? If you have to call PostHog's servers manually to do this, it defeats the purpose. This is where _synergy_ between local evaluation and bootstrapping comes in: You use your server-side SDK to evaluate flags locally, then pass these along to your frontend to bootstrap flags.

Overall, this has been working pretty well. There's growing pains of replicating every new feature in flags in all server-side SDKs, but other than that the core functionality is solid.


## Making feature flags reliable

As much as I'd love to always be on the happy path, the laws of thermodynamics disagree and things tend to derail. We want feature flags to be reliable, so that when even our database goes down, feature flags can still work fine.

It's also worth noting that there's no such thing as reliable-no-matter-what-happens. An asteroid wiping out datacenters across the world, an AGI taking over, or someone hacking into PostHog to bring it down are all very unlikely, but if they do occur there's not much we can do.

Thankfully, asteroids don't hit us every week. Pgbouncer issues though are indeed a weekly annoyance.

So, when thinking about reliability, we want to prioritise defending against things that happen frequently, or have a high chance of occurring over time. This includes things like redis, postgres, or pgbouncer going down. Then, if we have the resources and nothing better to prioritise, we can focus on defending against asteroids.

Today, we can't yet defend against asteroids, nor the entire infrastructure going down, but for other things, like postgres, we've found ways to defend against this, leveraging our special problem constraints.

### Partial flag evaluation

Since flags are evaluated multiple times in a session, sending a partial response when we can't access the database is much more preferable to retrying and not sending a response at all. Further, if a client is waiting for flag evaluation before loading their content, we do not want to slow this down. We want to return results as soon as possible.

So, we enable partial updates on our client side SDKs. Whenever there's an error computing all flags, we do a partial update: keep the old values for flags we failed to compute, and use the new value for flags we didn't fail to compute.

As we've noted before, the only flags that can fail evaluation are ones that depend on specific properties. Further, if a property change is triggering flag evaluation, the client SDK can send these new properties alongside the request, and we use these properties as overrides for flag evaluation.

TK: rephrase - Specialness: Flags that affect the most people will almost never go down. Flags affecting a small % (property based) can be unavailable more often.


Since the server-side SDKs are stateless, this partial evaluation model doesn't really work. Local evaluation is the best way to maintain reliability, or sending known properties alongside requests to make evaluation of property based flags reliable.


### Flag evaluation when databases are down

Now we can dig deeper into how exactly evaluation works when the database is down. One thing I've overlooked so far is that not only do we need the database to get person properties, but the flag definitions themselves also live in the database. Further, figuring out the right project for which to get feature flags (auth token-matching) also depends on the database.

The database going down means all three functionalities go down. Without flag definitions, we can't know what flags to evaluate. Without the project auth, we don't know which project to get to.

The solution here is caching: We cache flag definitions per project, and also the mapping from auth token to project. This means we don't rely on the database for the critical components to return a response.

Caching person properties in for now unreasonable, as there can be billions of people with thousands of properties each that wouldn't fit in a cache. 

Since we don't need a server to determine which person belongs to which bucket, we just need to compute the hash of the person ID and the flag to determine evaluation for simple flags (Special problem constraint #1). This allows for database-free responses.

However, note that if redis (our cache), and postgres (our database) both go down at the same time, we do end up unable to respond. This should be much rarer though, as these are both independent system deployments.

Is that all we need to do? Not quite. As we found the painful way, just because we can defend against the database going down, doesn't mean our responses will be fast.

### Different ways Postgres can bork

When you can't connect to the database, it's a quick operation: you tried connecting, you failed, you raise an error, and any system depending on you can quickly make a decision.

However, what if the database isn't down, but just painfully slow?

For example, if you're deadlocked in a transaction.

For example, if you have several transactions running at the same time, slowing the overall system down.

For example, when a potentially infinite loop is hammering the database hundreds of time a second.

To us, a database that can't quickly respond is equivalent to a database that is down. To defend against this, we introduced statement timeouts of one second for flag evaluations. This helps us quickly catch if things are slow, and defends against timing out.

### Different ways Pgbouncer can bork

Pgbouncer manages connections to our postgres database, and things can go wrong here too.

The most popular way pgbouncer fails is when there are too many clients waiting for a connection. In this case, you're connected to pgbouncer, but are waiting for a database connection to free up so you can make your query.

The default for this setting is two minutes, which is way too long for us. We time out at 10 seconds, so we want a much smaller timeout here. Currently, this is globally set at three seconds for all our systems.


// ### Why can't we cache flag evaluation results?

// The caching problem: can't cache results.

### Separating out deployment for feature flags

One other way to defend against the database being too slow is to have a dedicated read-replica for flag evaluation. We've setup a separate deployment for feature flags (so it doesn't go down with the app), and are now in the middle of creating a separate read-replica so it doesn't hit statement timeouts because something else is hammering the database.

After this final improvement, we should be in a place where flags are a lot more reliable.

---


The next step is to make sure flags continue to remain reliable with all the exciting features we have in the works. Our main goal is to ensure none of these new features detract from reliability, since when it comes to flag, reliability is a lot more important than that shiny new feature.






