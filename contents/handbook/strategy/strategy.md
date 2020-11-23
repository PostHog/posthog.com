---
title: Strategy
sidebar: Handbook
showTitle: true
---

<br>

> PostHog aims to increase the number of successful products in the world.
<br>

## Where will we compete?

PostHog helps teams build better software.

We believe the best software teams have everyone understanding user behavior, not just product managers (PMs).

We can build something 10x better than our competition by appealing to multiple teams rather than just focusing on PMs.

There are tens of millions more engineers in the world than product managers, often making product decisions every day. This is where we're starting. After all, they're the ones building the software, and we've seen that these are the types of users we retain best.

## How will we get there

Today, there are many siloes in the market for products that help understand and act on user behavior. There are separate tools for "graph" type analytics, session recording, feature flags, and so on. PostHog provides these in one platform - the sum is greater than the parts.

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
  * Bottleneck: we have released plugins to speed up our breadth of use cases and therefore the size of our funnel and word of mouth growth. We need to get this out of pre-beta stage.
  * Bottleneck: we have no one dedicated just to new user acquisition into the community. 
  * **Question**: Should we hire someone focused on this and give them a budget?

### Enterprise product

* We continuously need this in production with the next order of magnitude usage user.
* We need to build monitoring and a standard way of managing the instance for our customers.
  * Bottleneck: We need to scope how this would work, and to validate those ideas with customer feedback. Maybe it's just a process to start with.
* We need a stronger opinion on best practise for how to integrate with the rest of the typical enterprise stack.
* We need to support enterprise customers ongoingly
  * **Question:** Are we learning enough about enterprise customer product needs? Should we hire a CS person who can help us do this and support very early deployments? Should we bring them in so they're ready before the first implementation?

### Conversion from community to enterprise

* We need to build an upgrade flow to do this
  * Bottleneck: complete a retention deep dive so we optimize the flow towards an outcome that optimizes for retention.
* **Question:** We currently have identified that we need: (i) a process for experimentation carried out in practice (ii) a clear view of our funnel as it leads to the behaviors that correlate with retention created. Do we hire a growth engineer to speed up here?