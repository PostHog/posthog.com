---
title: Strategy overview
sidebar: Handbook
showTitle: true
---

## TL;DR

Our mission is to increase the number of successful products in the world.

We will do this by building the best developer tool for **engineers** to build better products.

## Context

We started by building an open-source product operating system with many of the things you'd need to build a better product - product analytics, session recording, feature flags, experimentation, and a customer data platform to import/export and transform data. Within a year, we had thousands of customers using us and we started generating revenue.

We focused on our paid product in the Summer, 2021. We quickly hit a milestone for the first 5 reference customers. In 2022, we have figured out how to accelerate our top-of-funnel growth, and we realized we should focus on nailing Self Serve Mid-market ($20-70K ARR deals), whilst deepening the core product.

Today, we're optimizing conversion to paid revenue, and carefully expanding the platform again, into adjacent use cases that will meet the needs of our _existing_ user profiles.

We now add more companies each week than _any_ closed-source SaaS rival, and we're the open-source standard for all our applications.

## General principles

* For any company, nothing matters more than product-market fit. If we get that right, it’ll be much easier for customer success, marketing, and sales teams to succeed. As a result, we're 100% inbound. We invest in product, not cold-calling people that don't want to buy from us.

* We are a _late mover_. All the products we build into the platform have product-market fit. This makes it faster to ship.

* A wide strategy is winner-takes-all. The wider we get, the faster we grow, so the wider we can get. We are here to be ambitious.

* Our company is engineering-led - a wide strategy demands it. We have small teams that operate like their own startups for this reason. We optimize for autonomy (thus, speed), not control.

* Talent compounds. We hire a smaller number of stronger people that flourish with autonomy. See the point above.

* We are open source - we work in the open to build trust and community. We haven't built our defining feature yet - the whole company is a continuous work in progress on the internet that anyone can take part in. This keeps us close to users and builds a unique brand.

## Mission

**_“Increase the number of successful products in the world”_**

## Long-term vision (for 2026)

**Where do we want to get to?**

In 2026: _The leading product teams use PostHog to build the best products._

_Product team = The people building the product. Normally engineers, PMs and designers._

We are the first product tool that technical founders integrate into their product. We scale with them from their first user; to their first dollar; to 1000 person engineering orgs; IPO; and beyond. The best product people don't want to join a company that's not using PostHog.

We become the customer's data platform for customer and product data. We enable other users throughout the org to use customer and product data initially by building tools for the data engineers. Overall, we replace the data warehouse and CDP.

We go public with $100M ARR from the following:

1) 1,000 companies building successful products with us, paying $25K each
2) 500 companies building successful products with us, paying $50K each
3) 50 companies building successful products with us, paying $1M each

We did this by first focusing on high-growth self-serve startups to nail (1) and (2). This gave us the strong brand, product, and financial position to win (3).

**How do we help others build successful products?**

* Product teams identify the biggest problems and opportunities, then act upon them - all in PostHog.
* All of their product and customer data is in PostHog, so there are no blind spots.
* Product teams at startups don't need any other product/data tools than PostHog for the first 5 years of their life, so they don't have issues with data integration or complexity. Going broad means more use cases, value, and growth. This lets us reinvest into more tools, driving more growth etc, so we reach more teams.
* Our team is the biggest power-user of PostHog. By dogfooding our product we deeply empathize with our users to build the best product.
* PostHog acts as a product coach guiding you through different workflows to build the best products. As you become an expert you can remove the guardrails for maximum flexibility.
* PostHog's quality is self-fulfilling. PostHog's product, website, and docs are so good that we grow through word-of-mouth growth, so we can invest everything into improving these resources.

**From where we are today, what do we need to build to get there?**

1. Become the tool that product teams can't live without
   * **Seniority**:
     * Currently, **individual contributors** in the product team like us. Particularly the engineers.
     * We want all the individual contributors to **love** PostHog and help them succeed in building better products.
     * We then move to features that help them succeed as a team meaning tools for managers and enabling collaboration.
   * **Company size**:
     * Currently, solo founders and small teams like PostHog.
     * We should clearly be known as the first tool that any CTO or product team installs for a new product. This is particularly true for startups backed by the leading VCs/accelerators.
     * We truly scale with the company up to 10,000 person orgs.
     * Our immediate focus is to make sure PostHog is loved by the leading growth-stage companies with 20-500 employees.
   * **Type of user**:
     * Currently, power-users that can code (often engineers and technical PMs) like PostHog and some users that don't code find PostHog unintuitive.
     * We want to make a product that the power-users that can code truly love.
     * We start with providing maximum flexibility for the power-users. This means a more flexible UX including SQL, so users can measure and diagnose product performance better through direct data access.
     * We then build opinionated workflows to guide users through the best practices.
     * But PostHog should still be intuitive for those who don't code.
   * **Functionality and community**
     * We need to make sure our existing products in the platform have any major gaps in functionality closed, and that they integrate well with the rest of the product.
       * This allows us to move people from 3rd party products, for a simpler stack and faster growth and reinvestment.
     * We need a 2-way community. This will accelerate brand/word of mouth. Today, we are quite 1-way (we provide lots of support), with a few users starting to really help with feedback.
2. We become the core data platform for all their customer and product needs. We replace the data warehouse and the customer data platform (CDP).
   * Customer and product data is used across the company to make data-driven decisions and directly power the product.
   * Currently, customer and product data is siloed across different applications. Teams often export everything to a warehouse and query it or send it to other products from there. Then they end up with a data engineering mess trying to set up other tools with their warehouse and / or a data platform.
   * Currently, PostHog offers an opinionated schema for storing some of their customer and product data. Users can interact with it through insights. Users don't have direct access. We have some of the key exports but are missing imports.
   * PostHog should become an opinionated data warehouse and CDP for all their product and customer data. By being opinionated with the schema and having a large number of imports, we can consolidate all the relevant customer and product data.
   * Users can use our core applications to make data-driven decisions quickly and deeply. They should have full direct access as needed so they don't need another data warehouse.
   * We should build the all key imports and exports that are needed. Customers should be able to contribute any remaining connectors which we maintain to a high standard.
   * Long-term PostHog should interoperate with many different database backends meaning we can ride the wave of technological progress rather than being disrupted by it.
   * PostHog's data should be used to power the product — in the critical path to production.
3. Ultra-streamlined and product-led sales motion
    * Currently, we are excellent in demos, and we have figured out the basics of customer success and sales.
    * Our data and processes should be considerably more automated to enable high-quality interactions at scale.
4. Apps
   * PostHog should be highly-extensible
     * API: We should expose the same public API as we use internally. It should be well-documented and the docs should be world-class.
     * Apps can be broadly classified into: (1) internal apps (you build it, you use it) - mainly for internal tools. (2) community shared apps (someone else builds, you use it). (3) indie tools (someone else builds it, you pay them some money to use it. (4) VC companies (it's someone else's proper company built on Posthog, you pay them significant amounts of money to use it)
     * We should focus on internal and community apps. When we have a sufficient number of active companies (likely post $100M ARR) we might want to pursue indie tools and even VC-backed companies.
   * We should build directly for the product team (engineers, PMs, designers). For functions outside the product team including sales and marketing we should default to integrating deeply with the best-in-class products and, separately, encouraging apps being built on top of us.
  
### What should we be working on today?

**The mechanics of success**

We set [quarterly OKRs](/handbook/strategy/objectives) to keep us on track.

### How should we prioritize between competing directions?

While there is value in the items on the right, we value the items on the left more.

**High-growth startups vs. Enterprise**

* _High-growth startups_: focus on acquiring more high-growth customers (who may start using for free) over big-ticket contracts from slower-moving organizations that require long procurement processes. So we can continue to win through our product-led growth motion, get better feedback and learn faster.

**Opinionated vs. Flexible**

* Start with _Flexible_ then build in optional _Opinionated_: focus on building for power-users that want maximum flexibility and control. However, for users of all types to be successful after we should build in workflows that guide the users to success in PostHog - acting as their product coach.

**Product, Website and Docs vs. GTM spending**

* _Product, Website and Docs_: focus on investing as much as we can into the experience we offer people who hear about us. This drives word of mouth growth, which is compounding, scales forever and gets us into a monopoly position - since it saves energy and money that we can reinvest into the product, website and docs.

**Integrations vs one-stop-shop**

* _One-stop-shop_: if it's useful for the product team (engineers, designers, PMs) we build it directly into PostHog if reasonable. This means customers don't have to buy another product or integrate with anything else, so we acquire all of their SaaS spending and can scale the product faster. However, if it's outside these target customers we should default to integrating with the best-in-class.

**Self-hosted vs. Cloud**

* _Cloud_: If customers can use cloud, encourage them heavily to use cloud because it's then a better user experience (easier and cheaper). Maintain a self-hosted version and migration path, but don't push it. We are the most flexible solution, which enables growth. We offer a generous free cloud tier so we can become ubiquitous without the cost/hassle of self-hosting.

**Reject the [“modern data stack”](https://www.analytics8.com/blog/what-is-the-modern-data-stack-and-why-should-you-be-excited-about-it/) vs. adapt to it**

* _Reject_: We enable our customers to ingest, store and analyze data on their infrastructure, we don't believe tons of integrations, dealing with multiple vendors and sending sensitive data to multiple cloud providers is the right approach. Providing all the apps and data platform in one place, removes the need to setup a warehouse in the first place.

## Direction for 2023

3-word summary: **Nail product engineering**

* **Customers**
  * **Focus on product engineers at high-growth startups.** E.g. Large initial contracts ($20k-$70k/year) and smaller startups that will eventually become large
  * **Non Goal:** Start doing outbound sales
* **Product**
  * **Goals:**
    * Improve the core UX to work better for product engineers:
      * PostHog 3000 UX = a design and UX uplift including dark mode
        * Why? Re-classify PostHog from a PM tool to a developer tool to better resonate with our audience. Reduce the friction in using multiple tools
      * More powerful querying
        * Why? Enable answering the long tail of questions that engineers have about their data
      * Make it easy to evaluate the success of features
        * Why? Currently, it's manual and repetitive to do best practice rollout and evaluation of features. Or it's not possible e.g. we don't have session recordings on mobile
    * Launch the CDP as a full product
      * Why?
        * Putting PostHog at the center of the stack gives our customers all the data to answer questions their product questions
        * Makes PostHog incredibly sticky even if they move to a data warehouse
        * Our customers are already asking for it
      * How?
        * Make imports and exports bulletproof, 1st class webhook destinations, build or integrate with key sources and destinations
  * **Non Goals:**
    * Build features just for marketing/sales/CS teams
    * Build lots of new low-quality / partial features
    * Build everything a single enterprise customer wants just to close a deal

## Target customers for 2023

We build for the **product-engineers** (full-stack engineers skewed towards the frontend) building the **most loved products** at **high-growth startups**. But it should be usable by everyone in the product team (engineers, PMs, designers).

Example: PostHog anytime from their Series B to IPO

For more information read about our [ideal customer persona](/handbook/strategy/ideal-customer-persona).
