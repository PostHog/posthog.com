---
title: What we've learned about choosing technologies
date: 2024-10-29
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

From generating text to storing data to creating [ASCII drawings of cows](https://github.com/sindresorhus/cows), if you've got a problem, there is a technology out there to solve it for you.

Technologies are the backbone of a product. They set the guidelines of what they can and cannot do. Choosing the right technologies makes a massive difference in whether you succeed or fail. 

Unfortunately, there is no perfect way to pick a technology. Some adopt everything possible, others build anything they need themselves. Like many, we are somewhere in the middle. We aim to move fast and use technology to build something people want.

Apparently, we're doing an ok job of this. Over the past year, we've shipped multiple new products like web analytics and mobile session replay on top of improving our existing products like pipelines and feature flags. Each comes with its own set of technologies. 

This is what we've learned about choosing them all.

## Start with a hair-on-fire problem burning problem

Because of the many costs of adopting a technology, you need a good reason to do so; nice to have is not good enough. For us, this usually is one of three things:

1. **Costs.** For example, our Infrastructure team projecting our AWS costs to rise well above standard benchmarks triggered us to look into solutions for our highest cost services. 
2. **Infrastructure.** For example, reaching scaling limits for our current infrastructure. When adding "more boxes" won't fix the issue, its time to look for another solution.. 
3. **Customers.** For example, customers demand a new feature other companies have like data exports.

> **Related:** [How we decide what to build](https://newsletter.posthog.com/p/how-we-decide-what-to-build)

## Find a fire-extinguishing solution to that problem

The goal of technology is to solve that hair-on-fire problem. We find potential technologies that do this in one of two ways: 

1. **What are other people using to solve the problem?** Technologies are by definition tools or services other people have used to solve problems. For example, part of the reason [we chose ClickHouse](/blog/how-we-turned-clickhouse-into-our-eventmansion) was that Cloudflare used it.

2. **How have YOU solved this problem in the past?** There are a lot of details that are only revealed by implementing and using a technology. This means a lot of pitfalls you can avoid if you've already fallen in them once.

Realistically, the evaluation process happens at the same time as figuring out the options. This is because some options can be written off immediately as they don't fit our requirements. For example, when we were looking for [scalable replacements for Postgres](/blog/how-we-turned-clickhouse-into-our-eventmansion) in our early days, we knew we needed it to be open source and self-hostable. This immediately cut down our list. 

## Evaluate solutions autonomously

The big advantage of PostHog is that we bias for action. [Small teams](https://newsletter.posthog.com/p/the-magic-of-small-engineering-teams) have the autonomy to go choose and test technologies. We don't have an elaborate planning and procurement process.

Instead of filling out paper work, our team evaluates technologies as close to the real world as possible. This means means [testing in production (safely)](/product-engineers/testing-in-production), mimicking the real world, and building a proof of concept. 

An example of this is how [Michael used real slow queries](https://www.youtube.com/watch?v=LrmK0vAG1ek) to test SQL parsing speed for C++ versus existing Python. The clear impact of the changes meant he could be confident adopting C++ as an option.

![Speedy C++](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_10_28_at_15_56_51_2x_68f0cca985.png)

Testing technologies is often a non-trivial part of teams' development process. It is common to see tests or proofs of concept as a quarterly team goal. For example, Q3 goals included testing Warpstream for our Pipeline team and ByConity for our ClickHouse team.

## Make a decision asynchronously

Although individuals are empowered to test and evaluate new technologies, for decisions affecting multiple teams, the final decision is made through a request for comments (RFC). These help us get buy-in, gather feedback on a decision, and stay transparent. The process of writing them all forces our team to clearly articulate their thoughts in a structured way.

An RFC outlines the "why" behind a technology decision and helps facilitate input. The specific parts of an vary, but broadly include the following parts:

- What is the problem you are trying to solve?
- What are the options you considered?
- Based on your evaluation, which one do you recommend?

This isn't just a box to tick, it is a core part of helping us choose the right technologies. For example, our RFC for adopting [Temporal at PostHog](https://github.com/PostHog/meta/pull/99) had 2,594 words, roughly 1/4 of the company as reviewers, 46 comments, and quite a bit of disagreement before finally being adopted. It's now happily in use for [batch exports](/blog/temporal-exports) and [warehouse syncs](/docs/data-warehouse/setup).

Whatever happens, the final decision usually rests on the team implementing and maintaining the technology. Even if an agreement isn't reached, if they feel confident it is the right solution, they have leeway to go ahead with adoption.

> **Related:** [How we work asynchronously](https://newsletter.posthog.com/p/how-we-work-asynchronously)

## When do we say NO to technologies?

If someone goes through all of this work, the expected answer for adopting a technology is yes. What has happened in cases where it ended up as a no?

- **Different perspectives on the evaluation criteria.** For example, the benefit of adopting a new technology for another team is not as valuable as expected, ruining the overall benefit.

- **Additional criteria are added and judged as more important.** For example, features needed for another team to adopt the technology are missing.

- **The evaluation goes against our expectations significantly.** For example, a test ends up being much more significant than expected.

An example of this last one is our decision not to adopt Amazon's Elastic File System (EFS). This was evaluated as a solution to our session replay service rebalancing problems. It needed to re-process historic data when rebalancing, which slowed throughput dramatically, and caused many sleepless nights for the team.

In our test of EFS with real data, rebalances had little-to-no affect on throughput, smaller warmup costs, and other benefits. It seemed to be the solution to our problems, until the cost graphs caught up. We initially estimated $300/month, but this was based on an average throughput, not total. The actual cost was actually **$600/day**. The team quickly concluded that this was an important problem, but the cost was too much. They needed to figure out another solution.

![Expensive EFS](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_10_29_at_09_35_49_930fe4af2d.png)

## Continuously evaluating

Finally choosing a technology does not mean you are done. Technologies have ongoing costs in terms of maintenance, support, recruitment, speed, and more. Why shouldn't your evaluation be ongoing also?

We regularly evaluate even the most cherished of our technologies to ensure they are the right choice. For example, ClickHouse is core to what we do at PostHog. We have long been big advocates of ClickHouse, but that doesn't stop us from considering and testing other tools, such as ByConity and Apache Iceberg.

Because technologies have such a big impact in the long run, we often spend significant amounts of time doing planning related to our most important features such as pipeline, data storage, and product roadmap. These plans include:

- Problems or opportunities
- Required and nice to have features
- Potential solutions
- Goals for the planning phase
- Next steps

Doing this ensures we have the right technologies we need to effectively solve the problems and deliver the best possible product to users over the long term.

## More good reads

- [Why Hog](/docs/hog#why-hog)
- [How PostHog built an app server (from MVP to billions of events)](/blog/how-we-built-an-app-server)
- [How to Choose the Right Technology](https://www.vinaysahni.com/how-to-choose-the-right-technology)
- [The power of defaults](https://julian.digital/2021/12/20/the-power-of-defaults/)
- [How to be Strategic](https://www.danhock.co/p/how-to-be-strategic)
- [Build vs. buy: patterns and antipatterns](https://www.mux.com/blog/build-or-buy-patterns)

<NewsletterForm />