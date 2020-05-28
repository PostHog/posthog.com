---
title: Strategy
sidebar: Handbook
showTitle: true
---

> PostHog enables product led growth.

## Where will we compete?

PostHog wish to provide best in class product analytics, by appealing to developer and product teams.

We will target developers, rather than product teams to get implemented. There are a few key aspects to this:

* An open course business model
 * We have a zero friction route to adoption in both small, mid size and big companies.
 * We can go for breadth over depth in the product, similar to GitLab, letting the community fill in the gaps.
 * Being open core means we can aim for mass adoption with our free version, without worrying about competition from hosting companies.
* Tighter integration with developers' environments.
 * Integration with git repo (feature flagging) & integration of data into local environment (terminal/localhost)
 * Working with existing databases and pipelines.
 * 1 click / 1 line install into production.
* Defensive product-team strategy - stay at parity with their features, but don't innovate here.
 * This means execution is much faster.
 * It will prevent most churn due to missing features from major tools that product teams will push for.

## How will we be the best?

* Engineering-led culture. Engineers want to deal with engineers.
* We will make the company remote-first, to encourage the greatest possible degree of community collaboration.

## What are our capabilities, and what else is needed to succeed on this path?

* We currently have a strong product for hobbyists or startups. We have enterprise interest but the adoption is weak.
* We need greater scalability for larger, greater value, enterprise customers to go into production. This will be key for either an adoption or revenue based Series A.
* We need a more innovative, developer-specific side to the product for all user types to move forward. This is what will make us truly best in class, and is also a pre-requisite to earn the right to impress teams in enterprises who demand the latest and greatest.

## What are the systems and metrics that empower our capabilities?

* Adoption: MAUs is something we should focus on. A tiny bit of product work needed to make that happen. Underneath this, we should start to look at the % of deployed:in production - that is our greatest area of drop off.
* MRR for revenue.
* Open company handbook - to enable a true remote and community first culture.

# How to get there

## <strike>Pre-seed</strike>

> We believe in the power of product analytics, but the fact they are just targetted at product teams means there is much more that they can do.

* Build a product analytics tool that is at parity with Mixpanel/Amplitude or Heap.

Product analytics tools already have product-market fit. We believe that developers would also find them useful. Combining this with an open source approach will mean we get a lot of adoption very easily.

## Seed

Situation:

* We will have around $3M in cash.
* If the world goes into a significant recession, a capital intensive business may become a lot harder to fuel as LPs withdraw from VCs.
* We need to get to a series A without raising further money.

PostHog wish to build an exceptional company. We will focus on adoption as our core metric.

* This will lead to a more impressive Series A story - we can have an order of magnitude more usage, with many impressive logos.
* Adoption first, then finding customers from those users will be more efficient than dealing with non-inbound demand. 

What we will build:

* [Roadmap](/handbook/roadmap)

Making money:

The first 6-12 months we will focus solely on developer adoption. After that, we'll slowly and carefully start introducing paid features for our enterprise customers. Those will include

* Setting up a self-serve hosted version
* Building some of the growth/ultimate plan features like experimentation

We will continue to offer a paid hosted version of our service, but we don't expect this to be a huge driver of revenue.

## Hiring

Now that we've raised our seed, we have the money to comfortably hire about 8 remote people and have 3 years of runway, taking us to the end of Q2 2023.

A couple of "rules":
* Tim and James should remain [working managers](https://m.signalvnoise.com/this-is-why-we-have-working-managers-at-basecamp-and-why-microsoft-and-apple-stumbled-when-they/).
  * That means hiring [managers of one](https://signalvnoise.com/posts/1430-hire-managers-of-one), see also our [hiring criteria](https://github.com/PostHog/handbook/issues/5).
* We are too small for tiered management, and will be until after we raise a Series A.
* We don't _have_ to hire all the people we have money for. In fact, we should find ways of achieving our roadmap with the fewest people possible in the given timeframe.

At the moment, our team is heavily weighted towards frontend/backend development. We're currently lacking:
<strike>* Deep experience with DevOps and the various cloud providers
  * We need this because we want to be able to deploy PostHog on as many platforms as possible + support
* Experience scaling systems to 100s of requests/sec
* Experience scaling Postgres to terabytes</strike>
* Great visual/UX designer
* Marketing/growth
  * This should come later as we will be changing the product around too much to 'optimize' it yet.

We could also use more firepower to deliver features faster, though we should be careful with hiring more generalists early on. We could end up needing too much co-ordination. <strike>The priority should be a devops/backend scaling generalist.</strike>

### The plan:
* <strike>2020 Q2: Hire 1 devops-generalist, total of 4 engineers (including Tim, so not full engineer)</strike>
* 2020 Q3: Hire 1 engineer, total 5 engineers
* 2020 Q4: Hire 1 engineer, one designer, total 6 engineers 1 designer
* 2021 Q1: Hire 1 engineer, total 7 engineers 1 designer

*note*: We'll start looking for a contractor designer straight away to do visual identity, logo etc. We might end up hiring that person a bit sooner.


### The roles

*DevOps generalist - now hired!*
*(order of priority*)
<strike>
* Write docs on how to deploy PostHog on each cloud provider (and different variations, like EC2, ECS)
* Support clients' deployment, especially those with high scale
* Get us listed as 'deploy to X' on as many hosting/cloud providers as possible
* Write features/fix bugs using Django/React
* Work out a way of splitting free/paid versions of codebase
* Improve performance of app and event ingestion
* Support our own deployment of PostHog
* CI/CD pipeline setup/maintenance 
* Write automated managed deployments on AWS/GCP etc
</strike>

*Generalist*
* Write features/fix bugs using Django/React
* Engage with community to fix issues/help with setup/support
* Write documentation

*Growth*
* Find ways of driving traffic to website/repo, both free and paid
* Improve funnel metrics from landing all the way to daily usage
* Set up a way for people to go from free to paid on our hosted version
* Will likely report to James

*Designer/UX*
* Create mockups for new features
* Ongoing design for posthog.com 
* Improve design/UX on current features
* Design documentation
* (maybe) create brand guidelines and ensure consistency
* Misc design of emails, blog posts
* Might report to James

*note*: We're _not_ going to hire customer support people. The best possible support we can give, while maximising for learning, is by having engineers do the support. It's much better for an engineer to get a bug report -> put a fix live in an hour, rather than having a customer support person 'escalating' a bug and waiting days for a fix. [See discussion.](https://github.com/PostHog/handbook/pull/39#discussion_r415375372)
