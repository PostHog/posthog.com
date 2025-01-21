---
title: Monolith vs Microservices
sidebar: Handbook
showTitle: true
---

## Monolith vs Microservices

Ah, the age old argument. We have a simple rule of thumb:

> Our customers should talk to our Django monolith. Our customers' customers should talk to independently scalable services with their own data stores.

That means, everything that happens when you log into PostHog, all CRUD operations, should happen in our Django monolith. We have in the order of magnitude of 10s of thousends of DAUs. That's a level of scale that Django can very easily handle with a few web pods and a single postgres database.

Our customers have hundreds of millions of users, and we have a lot of independent products that could and should scale independently of each other (and more importantly, not take each other down). Some examples of this are [capture-rs](https://github.com/PostHog/posthog/tree/master/rust/capture) or [feature flags calling](https://github.com/PostHog/posthog/tree/master/rust/feature-flags).

