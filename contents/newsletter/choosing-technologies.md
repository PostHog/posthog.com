---
title: What we've learned about choosing technologies
date: 2024-11-07
author:
 - ian-vanagas
featuredImage: >-
featuredImageType: full
tags:
  - Engineering
crosspost:
  - Product engineers
  - Founders
  - Blog
---

I'll get this out of the way immediately: there's no perfect way to choose technologies. Some adopt everything possible, others build everything themselves. Like many, we are somewhere in the middle. Over the past year, we've:

- Expanded our usage of Temporal to power warehouse syncs.

- Moved destinations and transformations away from Node virtual machines to our home-built HogVM in our own language Hog.

- Migrated more of our highest volume services from Python to Rust.

- Evaluated Warpstream and Pulsar as alternatives to Kafka.

- Adopted C++ over Python to speed up SQL parsing. 

We've done all this while shipping multiple new products like web analytics, mobile session replay, and surveys as well as adding features to existing ones. Each of these comes with its own set of technologies to maintain and improve.

Technology is a tool to help us move fast and build something people want. This relies on choosing the **right** technologies as it sets the guidelines of what we can and cannot do.

Although we can't tell you what the right technologies are or the perfect way to pick them, we **can** share the lessons we've learned at PostHog and hope it helps.

## Start with a hair-on-fire problem

Adopting new technologies is hard and expensive, so "nice to have" is not enough. We look for hair-on-fire problems, which typically means one of three things:

1. **Costs.** For example, our Infrastructure team does a quarterly review of AWS costs, evaluates where spend is going, and identifies areas to improve it. When costs rise above standard benchmarks, it is time to look into solutions. 

2. **Infrastructure.** For example, reaching scaling limits for our current infrastructure. When adding "more boxes" won't fix the issue, it's time to look for another solution. 

3. **Customers.** For example, customers demand a new feature other companies have like reliable and resumable data exports.

> **Related:** [How we decide what to build](https://newsletter.posthog.com/p/how-we-decide-what-to-build)

## Find a fire-extinguishing solution to that problem

The goal of technology is to solve that hair-on-fire problem. We find potential technologies that do this in one of two ways: 

1. **What are other people using to solve the problem?** Technologies are by definition tools or services other people have used to solve problems. For example, part of the reason [we chose ClickHouse](/blog/how-we-turned-clickhouse-into-our-eventmansion) was that Cloudflare used it.

2. **How have YOU solved this problem in the past?** Pitfalls are often avoidable if you already fell in them once. This means we often rely on our teams' experience with a technology to guide our evaluation.

Realistically, the evaluation process happens at the same time as figuring out the options. This is because some options can be written off immediately as they don't fit our requirements. For example, when we were looking for [scalable replacements for Postgres](/blog/how-we-turned-clickhouse-into-our-eventmansion) in our early days, we knew we needed it to be open source and self-hostable. This immediately cut down our list. 

## Evaluate solutions autonomously

The big advantage of PostHog is that we bias for action. [Small teams](https://newsletter.posthog.com/p/the-magic-of-small-engineering-teams) have the autonomy to choose and test technologies. We don't have an elaborate planning and procurement process.

Instead of filling out paperwork, our team evaluates technologies as close to the real world as possible. This means [testing in production (safely)](/product-engineers/testing-in-production), mimicking the real world, and building a proof of concept. 

For example, when Michael was looking for a [fix to our slow SQL parsing](https://www.youtube.com/watch?v=LrmK0vAG1ek), he evaluated technologies that could help, built a proof of concept in C++, and tested it with real slow queries. When we saw a clear improvement, roughly a 17x improvement on average (from 120ms to 7ms), he could be confident adopting C++ as an option.

![Speedy C++](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_10_28_at_15_56_51_2x_68f0cca985.png)

Another example is how we evaluated Warpstream. Because it was triggered by the high cost of Kafka, cost was top of mind for the infrastructure team. The best way to get an accurate projection of cost was to mirror traffic from our capture service. This provided the added benefit of being able to test its deployment process, provisioning, performance, and scalability.

Testing technologies is often a non-trivial part of teams' development process. It is common to see tests or proofs of concept as a quarterly team goal. For example, building out a Warpstream proof of concept was a Q3 goal for the pipeline team.

## Our most common evaluation criteria

Although every problem has its own set of evaluation criteria, there are some recurring themes:

- **Performance:** We ingest and query massive amounts of data and this will only grow. We need technology that can keep up and scale to 100x where we are today. 

- **Cost:** A principle of our pricing is [being the cheapest option](/handbook/how-we-make-money#be-the-cheapest-for-each-individual-product). This means costs are always on our mind and we always need to be searching for ways to reduce them.

- **Reliability:** Companies rely on us to handle business-critical data. We need to maintain a high uptime and availability. Technologies we choose need to prove they are reliable and handle failures gracefully.

- **Support:** Is this a shiny new thing or a battle-tested one? Is it open source with an active community? We know problems will arise, so we need to know we can get help when we need it. For all of our most important technologies, we have experts we can talk to if we need help.

- **Flexibility:** Because we plan to ship many products beyond what we have today, we need technologies that are interoperable and can be easily adapted to new use cases.

You'll notice that some of these are business factors and others are technical. Where some software engineers would purely focus on the technical factors, our team of [product engineers](/blog/what-is-a-product-engineer) know they need to consider both.

## Make a decision asynchronously

Although individuals are empowered to test and evaluate new technologies, for decisions affecting multiple teams, the final decision is made through a **request for comments** (RFC). These help us get buy-in, gather feedback on a decision, and stay transparent. The process of writing them all forces our team to clearly articulate their thoughts in a structured way.

An RFC outlines the "why" behind a technology decision and helps facilitate input. The specific parts of an vary, but broadly include the following parts:

- What is the problem you are trying to solve?
- What are the options you considered?
- Based on your evaluation, which one do you recommend?

This isn't just a box to tick, it is a core part of helping us choose the right technologies. For example, our RFC for adopting [Temporal at PostHog](https://github.com/PostHog/meta/pull/99) had 2,594 words, roughly 1/4 of the company as reviewers, 46 comments, and quite a bit of disagreement before finally being adopted. It's now happily in use for [batch exports](/blog/temporal-exports) and [warehouse syncs](/docs/data-warehouse/setup).

Whatever happens, the final decision usually rests on the team implementing and maintaining the technology. Even if an agreement isn't reached, if they feel confident it is the right solution, they have leeway to go ahead with adoption.

> **Related:** [How we work asynchronously](https://newsletter.posthog.com/p/how-we-work-asynchronously)

## When do we say NO to technologies?

If someone goes through all of this work, the expected answer for adopting a technology is yes. What has happened in when that wasn't the case?

- **Different perspectives on the evaluation criteria.** For example, the benefit of adopting a new technology for another team is not as valuable as expected, ruining the overall benefit.

- **Additional more important criteria surface.** For example, features needed for another team to adopt the technology are missing.

- **The evaluation goes against our expectations significantly.** For example, a test ends up being much more significant than expected.

### Why we didn't adopt EFS

An example of this last one is our decision **not** to adopt Amazon's Elastic File System (EFS).

The problem we had was that rebalances in our session replay service required pods to re-process historic data. This slowed throughput dramatically, which triggered more rebalancing, and created a negative cycle that caused multiple incidents.

By providing a persistent file system all pods could access, EFS eliminated the need to re-process data during rebalances. New pods could pick up where the last one left off reading from the shared disk.

In our test with real data, rebalances had little effect on throughput and smaller warm-up costs. It seemed to be the solution, until the cost graphs caught up. We initially estimated $300/month, but this was based on an average throughput, not total. The actual cost was actually **$600/day**. The team quickly concluded that this was an important problem, but the cost was too much. They needed to figure out another solution.

![Expensive EFS](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_10_29_at_09_35_49_930fe4af2d.png)

Later, when testing Warpstream, we found a simpler solution: changing how we commit offsets to Kafka. Rather than pushing commit messages (which could trigger rebalances if timed wrong), we declaratively told Kafka which offsets to commit. This made rebalances a non-issue; when a pod needs to restart, other partitions continue processing normally instead of getting caught in a restart loop.

## Continuously evaluate for the long-term

Finally choosing a technology does not mean you are done. Technologies have ongoing costs in terms of maintenance, support, recruitment, speed, and more. Why shouldn't your evaluation be ongoing also?

Because technologies have such a big impact in the long run, we often spend significant amounts of time doing planning related to our most important features such as pipeline, data storage, and product roadmap. These plans include:

- Problems or opportunities
- Required and nice to have features
- Potential solutions
- Goals for the planning phase
- Next steps

We even evaluate our most cherished technologies to ensure they are the right long-term choice. For example, we have long been big advocates of ClickHouse, but that doesn't stop us from considering and testing other technologies, such as ByConity and Apache Iceberg. 

We do this because we want to build a technology stack that supports our long-term strategy:

- **Provide every tool needed to build successful products.** For example, this requires separation of compute and storage (this is tightly coupled in ClickHouse), flexibility in query optimization, and interoperability with future technologies.

- **Be the source of truth for customer and product data.** We want to build towards handling exabytes of data stored and petabytes of data queried per day. This means managing different schemas, improving offline storage, support for formats like Iceberg and Parquet, and more.

Figuring out what we need in the future helps us build towards it now. We can set ourselves up to successfully adopt new technologies when the time comes and deliver the best possible product to users over the long term.

## More good reads

- [Why Hog](/docs/hog#why-hog)
- [How PostHog built an app server (from MVP to billions of events)](/blog/how-we-built-an-app-server)
- [How to Choose the Right Technology](https://www.vinaysahni.com/how-to-choose-the-right-technology)
- [The power of defaults](https://julian.digital/2021/12/20/the-power-of-defaults/)
- [How to be Strategic](https://www.danhock.co/p/how-to-be-strategic)
- [Build vs. buy: patterns and antipatterns](https://www.mux.com/blog/build-or-buy-patterns)

<NewsletterForm />