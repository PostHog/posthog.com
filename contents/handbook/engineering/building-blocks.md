---
title: Building blocks and primitives
sidebar: Handbook
showTitle: true
---

We often get asked what our strategy is for APIs / building blocks to help us scale the number of products that we build as the company grows. There are two goals:

- We want to ship 30+ products
- We want our small teams to continue being independent

- Product teams should therefore ask themselves if they should improve or build apis, but by default they don't need to
- Infrastructure and pipeline teams should by default consider everything they build a platform feature, where it's worth putting more effort into the API design

There are some great examples of platform features being built by product teams:

* HogQL
* Permissions


## Opening this up to the world

We should ask _for a given product_ if opening up the API to the world makes sense. There are some potential examples:

* session replay API - ingest and query replays
* HogQL API - query PostHog data

We are _not_ by default aiming to have other companies build their software on top of us. This is because, at this stage:

* a handful of very large companies could build, for example, customer facing analytics into their product, with us - however, we'd be viewed as a cost center, so they'd be incentivized to self build 
* we cannot see an opportunity for a mass number of products (say 1,000) to be built on us - we think there might be say 100 - it feels more practical for us to just build all these ourselves as we can ensure higher quality