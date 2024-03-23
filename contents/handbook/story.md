---
title: How we got here
sidebar: Handbook
showTitle: true
---

## Things that influenced us

### Books

* No Rules Rules (Erin Meyer / Reed Hastings)
* Principles (Ray Dalio)

### Other companies

* Atlassian – multi product, inbound, dev centric company, totally dominant in their categories, scaled way beyond $1bn
* AWS – multi product, pricing model, UX (!)
* Pager Duty – pricing model, product led growth
* Hubspot – built a $25bn company despite competing with Salesforce
* GitLab – while we run _very_ differently and have a different business model, we were inspired by their transparency
* Sentry – branding and bottom-up approach
* Algolia – developers doing marketing
* GitHub – enterprise go-to-market is 200 developers forcing their company to buy us

## Handbook

Like many things at PostHog, this handbook has scrappy origins.

[Tim](../community/profiles/108) and [James](../community/profiles/71) were planning on launching on [HackerNews](https://news.ycombinator.com/), and wanted to look as mature as possible. We felt that few people would want to use a flaky new startup's product seriously. So we asked ourselves: how do we signal that we're mature? 

We looked around at some big, boring companies and realized they all had huge footer sections on their websites with lots of links! How do we produce a lot of content to add to our footer when the product, at that time, was so simple? The answer: we should write up how we want to work.

Once we started writing the handbook, we realized it would transform our company. Every team member, and even strangers on the internet, could suggest changes. If you're doing something in public, you're going to think it through better. Ultimately, it made us treat the company as our product.

It's a classic example of getting information by doing, rather than by planning too carefully.

## Timeline

### Jan 2020: The start

PostHog was founded by James and Tim on January 23, 2020.

We started working together on a startup in August 2019. Our first idea was to help engineers manage technical debt. It didn't work out, but we realized the power of treating growth as an engineering problem. We also knew that many engineers struggle to understand the impact they have on the people who use what they build.

There are plenty of product analytics tools out there, but all the alternatives are SaaS-based. While they're powerful, they can be frustrating for developers. From our perspective, these tools can be problematic because:

* We don't want to send all our user data to third parties
* We want full underlying data access
* They don't give you choice and control over pricing

### Feb 2020: Launch

We got into Y Combinator's W20 batch, and, just a couple of weeks after starting, realized that we needed to build PostHog.

We launched on [Hacker News](https://news.ycombinator.com/item?id=22376732) with our MVP, just four weeks after we started writing code. PostHog was our sixth idea – we had been pivoting almost once a month for half a year. Boy were we relieved!

The response was overwhelmingly positive. We had over 300 deployments in a couple of days. Two weeks later, we'd gone past 1,500 stars on [GitHub](https://github.com/PostHog/posthog).

Since then, we've realized we weren't just onto a cool side project, we were onto what could be a huge company. It turned out there were a lot of developers who liked us who wanted a better choice, built for them.

### Apr 2020: $3m seed round

After we finished Y Combinator, [we raised a $3.025m seed round](../../blog/raising-3m-for-os). This was from Y Combinator's Continuity Fund, 1984 Ventures.

As we started raising, we started hiring. We brought on board [Marius, Eric and James G](/blog/posthog-first-five).

### May 2020: First 1,000 users

We kept shipping, people kept coming!

### Oct 2020: Billions of events supported

This was a major update – PostHog started providing [ClickHouse support](../blog/the-posthog-array-1-15-0#clickhouse-). Whilst we launched based on PostgreSQL, as it was the easiest option to ship quickly, this enabled us to scale to billions of events.

### Nov 2020: Building a platform

We realized that our users, whether startups, scale ups or enterprises, have simple needs across a broad range of use cases in understanding user behavior.

PostHog now supported [product analytics](/product/trends), [feature flags](/product/feature-flags), and [session recording](/product/session-recording).

### Dec 2020: $9m Series A

We kept growing organically and took the opportunity to raise a $9M Series A, topping our funding up to [$12M](../blog/posthog-announces-9-million-dollar-series-A) led by [GV](https://www.gv.com/) (formerly Google Ventures).

Our focus remained firmly product, engineering and design oriented, so we increased our team in those areas.

We now had employees in ten countries, and it still felt like day one.

Everyone takes a mandatory two weeks off over Christmas to relax.

### Jun 2021: $15m Series B

We raised a $15m Series B [a little ahead of schedule](../blog/why-we-raised-a-15m-series-b-ahead-of-schedule), led by existing investor Y Combinator. 

We're now focused on achieving strong [product-market fit](/blog/product-market-fit-game) with our target segment in 2021. 

Our team had grown to 25 people in 10 countries. 

### Sep 2021: Product-market fit achieved for PostHog Scale

We achieved product-market fit for our open-source product and PostHog Scale.

Our revenue quickly rose as a result. Now we needed to optimize it.

We were 30 people in 12 countries.

### Jan 2022: Sales comes from our team, not our founders

We hired two Customer Success experts dealing with all inbound requests. We hired two more engineers, since most questions customers have are technical.

### Dec 2022: 6x revenue growth

We had a fantastic year. While the tech market crashed, we grew 6x and reached millions in revenue, with a sub-two-month CAC payback period. We set $10m ARR as our next goal, with a gross margin of 70% – both of which should mean we've got all the metrics needed for the next fundraise.

We optimized revenue growth by implementing a product-led CRM for our customer success team, adding to our marketing team size, and creating a two-person growth engineering team. These teams all make a big difference!

We deepened all of our product areas significantly – we frequently win deals as a standalone session recording, feature flagging or experimentation tool. Session recording usage started to match product analytics usage.

Our infrastructure is far more stable and scalable – much more of it runs as code. We can now offer EU- or US-based hosting for our customers' data.

We're now 38 people in lots of countries. We're not adding lots of headcount over the next 12 months, though. We're staying lean and letting revenue continue to rise rapidly. 

### Feb 2023: Focus on mass adoption

We're doing well at monetizing high-growth startups due to our optimization work, averaging over 15% MoM for the last six months. 

We've decided to double down on mass adoption of the platform in high potential startups instead of focusing on enterprise. Simply, this will better help us increase the number of successful products in the world. As a result, we've removed support for paid self-hosted deployment and are doubling down on our open source and cloud projects. We have released a free tier of PostHog.

In the product, we're working on making the experience slicker, and we have plans for a standalone quality CDP in Q2.

### March 2023: Decided to ship a warehouse

For a long time, we were happy competing with lots of $1-2 billion companies, each providing point solutions. We felt our market was just the sum of all of theirs.

But we kept seeing companies streaming their PostHog data to a warehouse - such as [BigQuery](https://cloud.google.com/bigquery). We even lost our then-largest customer for this reason - where their source of truth became their warehouse instead of PostHog.

So we decided we would ship our own warehouse, enabling us to remain the source of truth for customer and product data. This would let us offer a better integrated service to our customers, and meant we could work on a bigger challenge.

### Aug 2023: Growth continues

We've doubled revenue so far this year without any increase in headcount. We've hit 15.7% MoM for the last 12 months. Our CAC payback is now just five days. Our numbers are exceptional. We even discounted several of our products. We've added ten extra roles and will be profitable in around a year.

We have user surveys and the data warehouse in private beta.

Our infrastructure has become pleasingly stable. The biggest challenge is scaling our data pipeline, and making sure we give as much responsibility as we can to each small team owning each product for their own pipelines, where rational to do so.