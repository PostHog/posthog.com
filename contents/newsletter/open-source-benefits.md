---
title: The hidden benefits of being an open source startup
date: 2025-05-05
author:
  - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/newsletter/the-companies-that-shaped-posthog/big-buidler.png
featuredImageType: full
tags:
  - Product engineers
  - Engineering
crosspost:
  - Product engineers
  - Blog
---

It’s safe to say if PostHog wasn’t open source, you wouldn’t be reading this right now. PostHog might not even exist. Being open source is *that* core to our success, and has been since day one.

This isn’t to say what “being open source” means hasn’t changed as we’ve grown from a single product to a 14+ product platform. Open source has gone from a product differentiator to a core part of our company culture.

Throughout this evolution, we’ve learned a lot about what it means to be open source as well as the benefits it provides. We’re detailing those here.

> **For transparency, here are our open source credentials:**
>
> 1. You can find PostHog’s code (and work) publicly available on [GitHub](https://github.com/PostHog/posthog). A majority of it is MIT licensed but some parts are under a separate enterprise license.
> 2. PostHog can be tricky to self-host due to our breadth of products, but many people have managed to do so. We’re also working on [making this better](/teams/developer-experience#goals). 
>
> It is totally fair for you to have a different definition of open source (some would call this “open core”), but this is where we’re coming from.

## 1. It distinguishes you from the crowd

Rarely is a software product entirely original. Everything is a remix. This creates a lot of competition, but being open source instantly distinguishes you from your closed source competitors.

Many new products ride this differentiation to successful launches. If you look up “open source alternative” on [Hacker News](https://hn.algolia.com/?dateRange=all&page=0&prefix=true&query=open%20source%20alternative&sort=byPopularity&type=story), you see how successful it is as a launch strategy.

![Hacker News](https://res.cloudinary.com/dmukukwp6/image/upload/image_3_be4d01a7e3.png)

We know this because PostHog did the same. Launching as “open-source product analytics” was instrumental in helping us get [our first 1000 users](/founders/first-1000-users). A couple of days after posting on Hacker News, we reached 300 deployments, and, with a little paid Twitter promotion, our repo started trending on GitHub. This swell of interest was all thanks to being open source.

![PostHog launch](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_04_29_at_15_49_50_fbf689f1d5.png)

Beyond launch, being open source continues to distinguish your product from competitors. There are plenty of buyers who have been burned by closed source options and have seen the benefits open source products provide including:

- Easier to try out
- Transparency
- Freedom from lock-in
- Cost reduction

Again, we continue to see this. Even though we are a mature platform with many reasons to choose us, we still get signups where being open source is the most important one.

## 2. It helps you hire

We’ve written before about [how important hiring is](/newsletter/43-lessons-about-hiring-for-startups). Any advantage you can get here is huge. As non-obvious as it might seem, we’ve found being open source is one of them.

This was true from the very beginning of PostHog. We can thank being open source for one of our earliest employees: King of ClickHouse, flip-flops, moustaches: James Greenhill aka Jams.

![Jams vs James](https://res.cloudinary.com/dmukukwp6/image/upload/image_4_fc726d4c99.png)

In the early days, co-founder James would check who starred the GitHub repo. One day, he spied a data engineer at Uber (Jams) who had left a star and this piqued his interest.

On a call, Jams explained Uber had built a bunch of internal tools like PostHog for data control reasons. He found the project interesting, wanted to work on it, did a superday, and he has manned our data infrastructure ever since.

Since then, being open source has been instrumental to our hiring process:

- Engineers know what they are getting into before they start. They can see the codebase, how often we ship, what the PR process looks like, and more.
- This also means they know their code will see the light of day. Users will use it and there won't be tumbleweeds in their GitHub profiles. For future jobs, they have real features, code, and pull requests they can point to as examples.
- They can contribute before they start. Opening a pull request with their solution is often part of the [superday process](/handbook/people/hiring-process#4-posthog-superday) and some keeners even do this before we ask them to (which makes an even better impression).

This isn’t just the case for us, many companies hire people who contribute to their open source project and have for a long time. This is beneficial to both parties:

1. Companies can look for (and find) people who are more familiar with their codebase and domain.

2. Candidates get a preview into what working at the company is actually like. Companies can’t lie when their work is in the open. This lowers the risk of their expectations not matching the reality of the job.

## 3. It creates trust

PostHog (and many other open source startups) are built for developers. A defining feature of developers is their strong BS detector. Luckily, being open source is a key way to defuse this BS detector. As they say: “code don’t lie.”

Open source builds trust in multiple ways:

- Instead of saying “trust me bro, we’re working on it”, we can link to issues, or better yet, pull requests that show what we are actually doing. Users can then give us direct feedback about these and we ship a solution that actually solves their problem faster.

- Similar to this, our [decision-making process](/newsletter/choosing-technologies) is also in public. We can talk through and share why we went with certain product or technology choices. Being secretive about this is not the source of our advantage.

- If developers need to know the details of our implementation, they can [look for themselves](https://github.com/posthog/posthog). They can audit our code for bugs or potential issues. This enables developers to self-serve answers to their issues.

- As buyers, you can see our [pricing](/pricing) and [entire sales process](/handbook/growth/sales/overview). There’s nothing hiding behind a “request a demo” button, whitepaper, or “quick call.” You can even see what sorts of [discounts](/handbook/growth/sales/contracts#discounts) we offer without needing to [haggle like a used car salesman](/founders/negotiate-software-better).

- As employees, everything from [compensation](/handbook/people/compensation) to [benefits](/handbook/people/benefits) to [ways of working](/newsletter/how-we-work-async) are detailed transparently in our [handbook](/handbook). This helps new joiners know what they are getting into and everyone gets treated with respect and fairness once in.

The trust you create by doing all this should be taken seriously. Being open source creates an implicit agreement between a company and community. The company is expected to be transparent and consistent. The community provides their support and contributions in return.

It is when this agreement is broken that people get angry (often more so than if the company was closed source in the first place). We recognize this and do our best to prevent it by:

1. Remaining alive and sustainable as a company.
2. Setting clear expectations of how open source works at PostHog.
3. Keeping our licensing the same as we’ve grown (and having no plans to change it).

## 4. It generates more feedback and contribution

A failure mode of many startups is a lack of people who care. Open source startups often face the opposite challenge: an overwhelming amount of support in the form of feedback and contribution.

The solution to this is channeling these contributions. For example, we realize PostHog is more difficult to contribute code for than other open source projects, so we need to encourage people to contribute in other ways by:

1. Making our feature requests and [roadmap](/roadmap) open. We ask people to 👍 and comment on features they would like to see next. This also helps identify potential user interviewees and beta testers. 

2. We open source our website too, making it easy for people to contribute small fixes like typos. Roughly 10% of pull requests on our [`posthog.com`](https://github.com/PostHog/posthog.com) repo are from contributors outside PostHog. I’ve even seen people write entirely new docs pages. 

3. Having cool [merch](/merch) and being generous with giving it out to contributors. Anyone on our team has the power to give out a merch code. “Merch them” is a common response to seeing a great contribution.

![Merch them](https://res.cloudinary.com/dmukukwp6/image/upload/image_5_15cf22540d.png)

By providing ways to contribute outside of code, we are able to maintain the community ethos of open source without asking people to make the heavy investment to get up to speed on development (we pay people to do this instead). The contributions we do get are hugely helpful. They help us ship a product that is both more polished and better tailored to our users’ actual use cases.

## What are the downsides of being an open source startup?

Not to paint too rosy a picture, but it’s not all good in open source land.

There are some perceived downsides that don’t matter much in reality. For example, some worry that others will judge your work if it's in the open. This rarely happens in reality. 99% of people will never see your work and your coworkers will almost always be tougher critics than the community is. 

Instead, there are some non-obvious downsides to being open source we have found. These include:

### 1. It can be tough to monetize

Early in PostHog’s life, we didn’t bother to monetize, Tim and James just focused on getting as many people as possible to use it. It was also not obvious *how best* to monetize. Enterprise plans? Paid self-hosted plans? Cloud? This is a common dilemma for open source startups.

We tried a combination of these, but have entirely settled on cloud hosting. This enables us to build a sustainable business while continuing to offer a free product. For other companies, this might not be so obvious. Balancing paid vs free features is especially difficult. 

What made this decision easier was the breadth of PostHog. While users love having more products, it did make hosting PostHog more complicated. We make up for this by offering a generous free tier for all products on Cloud, which satisfies the needs of most users.

### 2. Support is not free

A classic downfall of open source products is their creators being burnt out by support. Because they offer the code for free, people expect support to be free as well. They become flooded with support requests without the resources to respond to them. 

We felt this too with our former paid Kubernetes deployments:

1. They were becoming too complex and difficult to debug from afar.
2. Supporting them was taking a significant amount of our engineering resources.
3. Overall, it was not a good experience for us or our users.

Eventually, we made the tough decision to shut it down and redirect our engineering resources to making our Cloud version work for our former Kubernetes users (like SOC 2 compliance). We made sure to [communicate all the details](/blog/sunsetting-helm-support-posthog) of this decision and provide multiple migration options (including our Docker Compose deployment).

### 3. You might be competing with yourself

Depending on how you structure your open source project, you might have two products competing for your attention: a free, open-source one and a hosted option. 

It can be hard to balance this well. Basically, no matter what you do, you’ll face allegations that you are making the open source version worse intentionally (whether that is true or not). 

To be honest, five years in, and we are still figuring this one out. As we’ve grown, PostHog has gotten more complex to host, even for us (our [infra team](/teams/infrastructure) is 5 people). We’ve managed to create a popular product that 96% of customers use for free, but the experience of self-hosting has not kept up. Again, we’re [working on it](/teams/developer-experience#goals)!

What hasn’t changed is open source being a [core value](/handbook/values) of our company. We have a broader definition of open source than most. We think it’s not just the code you write and the product you deliver, but the culture overall. This means we are open source in many ways, from our handbook to our roadmap to this newsletter. 

We've found it is a lot easier to be consistently open source when your code isn’t the only thing you open source.