---
title: Strategy
sidebar: Handbook
showTitle: true
---

<br>

> PostHog follows the philosophy of product-led growth.
<br>

## Where will we compete?

PostHog helps teams build better software.

We believe the best software teams have everyone understanding user behavior, not just product managers.

We can build something 10x better than our competition by appealing to multiple teams rather than just focusing on PMs. However, we need a small foothold first.

There are tens of millions more engineers in the world than product managers, often making product decisions every day. This is where we're starting. After all, they're the ones building the software, and we've seen that these are the types of users we retain best.

## How will we get there

We need to:

* Build a large open source community around a great open source product
* Build an enterprise source-available product that adds extra features needed by enterprises only
* Make it possible for an individual user to convert from our open source to our enterprise version easily


Why do these three things matter?

* Open source is the most appealing strategy for our target audience. It builds the most trust with individual developers, and it enables a broader and more innovative product approach, as we get more feedback, ideas and even code from users.
* Our enterprise source-available product can be adopted bottom-up in enterprises. We are the *only* self-serve product analytics and experimentation platform that can be self-hosted. This is crucial for those with large volumes or information security requirements.
* Enabling a simple upgrade path will force us to build a user-first product. Those are the kinds of products that stick. Ask Slack, Figma, or Google.

## What are the major steps we've taken so far

We have:

* An engineering team with a good working environment and who can ship quickly
* Significant capital with supportive investors
* Experience in enterprise sales and management
* A solid start to our open source community
* A product that does several things that are unique and valuable
* A good understanding of the open source users who we retain
* A good understanding of the enterprises that need our software
* A great reputation thanks to having had success at YC

## What do we need to do next

### Community building

* The open source product has core functionality we will build
  * This will always be a bottleneck. See [roadmap](https://github.com/orgs/PostHog/projects/1).
  * **Question:** When do we grow our engineering capacity, and why?
* The open source product activation flow will be optimized
  * Bottlenck: We need Clickhouse done to identify a top level retention metric we focus on first
  * Bottleneck: We haven't yet written out a process in our Docs for how we manage tests
* The website, README, and Docs will be:
  * Comprehensive, thoughtful, and beautiful, to signal it's worth investing time and effort with using the open source product, and to reduce user frustration
  * Focused on (i) technical open source users and (ii) enterprise software teams
  * Bottleneck: Both of the above require a UX developer to start, we're hiring currently
* We need to speed up our community growth
  * Bottleneck: we have no one dedicated just to new user acquisition into the community. 
  * **Question**: Should we hire someone focused on this and give them a budget?

### Enterprise product

* We need greater scalability
  * Bottleneck: Clickhouse needs to be fully tested
* Monitoring the deployment so large customers don't experience downtime
  * Bottleneck: We need to scope how this would work, and to validate those ideas with customer feedback. Maybe it's just a process to start with.
* We need to support enterprise customers ongoingly
  * **Question:** Are we learning enough about enterprise customer product needs? Should we hire a CS person who can help us do this and support very early deployments? Should we bring them in so they're ready before the first implementation?

### Conversion from community to enterprise

* We need to build an upgrade flow to do this
  * Bottleneck: Clickhouse needs to be fully tested
* **Question:** We currently have identified that we need: (i) the Clickhouse integration to be done, so we can calculate retention easily (ii) a process for experimentation carried out in practice (iii) a clear view of our funnel as it leads to the behaviors that correlate with retention created. Anything else? Should we increase our growth team size so we can do this faster whilst working on the activation / referral flows at the same time?
