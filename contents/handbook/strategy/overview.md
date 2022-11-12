---
title: Strategy overview
sidebar: Handbook
showTitle: true
---

## TL;DR
Our mission is to increase the number of successful products in the world.

## Context

We started by building an open-source product operating system with many of the things you'd need to build a better product - product analytics, session recording, feature flags, experimentation, and a customer data platform to import/export and transform data. Within a year, we had thousands of customers using us and we started generating revenue.

We focused on our paid product in the Summer, 2021. We quickly hit a milestone for the first 5 reference customers. In 2022, we have figured out how to accelerate our top of funnel growth, and we realized we should focus on nailing Self Serve Mid-market ($20-70K ARR deals), whilst deepening the core product.

Today, we're optimizing conversion to paid revenue, and carefully expanding the platform again, into adjacent use cases that will meet the needs for our _existing_ user profiles.

We now add more companies each week than _any_ closed source SaaS rival, and we're the open source standard for all our applications.

## General principles

* For any company, nothing matters more than product market fit. If we get that right, it’ll be much easier for customer success, marketing or sales teams to succeed. As a result, we're 100% inbound. We invest in product, not cold-calling people that don't want to buy from us.

* We are a _late mover_. All the products we build into the platform have product-market fit. This makes it faster to ship.

* A wide strategy is winner takes all. The wider we get, the faster we grow, so the wider we can get. We are here to be ambitious.

* Our company is engineering-led - a wide strategy demands it. We have small teams that operate like their own startups for this reason. We optimize for autonomy (thus, speed), not control.

* Talent compounds. We hire a smaller number of stronger people that flourish with autonomy. See the point above.

* We are open source - we work in the open to build trust and community. We haven't built our defining feature yet - the whole company is a continuous work in progress on the internet that anyone can take part in. This keeps us close to users and builds a unique brand.

## Mission

**_“Increase the number of successful products in the world”_**

## Long-term vision (for 2026)

**Where do we want to get to?**

In 2026 we will _go public with $100M ARR._ To achieve this, we will need:

* 1,000 companies building successful products with us, paying $25K each
* 500 companies building successful products with us, paying $50K each
* 50 companies building successful products with us, paying $1M each

**How do we help others build successful products?**

* Software teams can measure performance, diagnose it, and act upon it, all in PostHog. 
* All the data from all their tools is in PostHog, so there are no blind spots
* PostHog's quality is self fulfilling. PostHog's product, website and docs are so good that we grow through word of mouth growth, so we can invest everything into improving these resources.
* Software teams at startups don't need any tool other than PostHog for the first 5 years of their life, so they don't have issues with data integration or complexity. Going broad means more use cases, value and growth. This lets us reinvest into more tools, driving more growth etc, so we reach more teams.

**From where we are today, what do we need to build to get there?**

* PostHog becomes a data platform, with a wider range of data ingestion. We make warehouses redundant.
  * Today, teams often export everything to a warehouse and query it there. Then they end up with a data engineering mess trying to set up other tools with their warehouse and / or a data platform.
* We need to provide a more flexible UX, including SQL, so users can measure and diagnose product performance better through direct data access.
  * To remove the need for a warehouse, we must give direct access to data.
* Before other tools are built into PostHog, we make it easy to get more value out of them, with PostHog's data. Over time, we will build these all into the platform.
  * We can enrich other products through our browser extension and export apps. Over time, we will remove the need for these 3rd party products.
* We need to make sure our existing products in the platform have any major gaps in functionality closed, and that they integrate well with the rest of the product.
  * This allows us to move people from 3rd party products, for a simpler stack and faster growth and reinvestment.
* We need to make users _love_ the platform rather than _like_ it, through a user experience that makes developers feel at home.
  * This will increase word of mouth growth. We shouldn't just build an open source alternative of competitors' products, which are more focussed on less technical people.

### What should we be working on today?

**The mechanics of success**

We set [quarterly OKRs](/handbook/strategy/objectives) to keep us on track.

### How should we prioritize between competing directions?

While there is value in the items on the right, we value the items on the left more.

**MidMarket vs. Enterprise**

* _Mid-market_: focus on acquiring more high quality Mid-market customers (who may start using for free) over big ticket contracts, so we can get better feedback and learn faster.

**Integrations vs one-stop-shop**

* _One-stop-shop_: build all the things directly into PostHog if possible. This means customers don't have to buy another product or integrate with anything else. We are wide enough now to pull this off.

**Self-hosted vs. Cloud**

* _Cloud_: If customers can use cloud, encourage them to use cloud. Maintain a self-hosted version and migration path, but don't push it. We are the most flexible solution, which enables growth. We offer a generous free cloud tier so we can become ubiquitous without the cost/hassle of self-hosting.

**Reject the [“modern data stack”](https://www.analytics8.com/blog/what-is-the-modern-data-stack-and-why-should-you-be-excited-about-it/) vs. adapt to it**

* _Reject_: We enable our customers to ingest, store and analyze data on their infrastructure, we don't believe tons of integrations, dealing with multiple vendors and sending sensitive data to multiple cloud providers is the right approach. Providing all the apps and a customer data platform in one place, removes the need to setup a warehouse in the first place.

## Direction for 2022

 * 2 word summary: **Nail self-serve**
    * **Customers**
        * **Focus on large-mid-market.** E.g. Large initial contracts ($20k-$70k/year) and smaller deals in organizations that will eventually become large
        * **Non Goal:** Start doing outbound sales
    * **Product**
        * **Goals:**
            * **Quality:** Our core features (insights, recordings, feature-flags / experimentation) work like a Swiss watch
            * **Self Service Subscription:** Customers of every size sign-up, start using and subscribe to PostHog without asking us for help
        * **Non Goals:**
            * Build lots of new low quality / partial features
            * Build everything a single enterprise customer wants just to close a deal

## Target customers for 2022

Our ideal customer is a large-mid-market (~$20k-70k) who meets as many of these criteria as possible:

* _Needs_
  * Cares about user data
  * Need to excel at product led growth
* _Haves_
  * Have budget and savvy engineers are the decision makers
  * Have a central analytics or devops function
  * Have a product aimed at businesses