---
title: Product team overview
sidebar: Handbook
showTitle: true
---

PostHog has a [product-minded engineering organization](/blog/turning-engineers-into-product-people). Engineers own sprint planning and spec'ing out solutions. Read more on the role of the Product Team in this [blog post](/blog/product-at-posthog).

So, what is the role of product managers at PostHog? PMs set context across multiple products for how products are being used, what the competitive landscape is like, what users are feeling about PostHog, and how they're using things.

Among other things, they

1. run [growth reviews](/handbook/product/per-product-growth-reviews) for products that have product-market-fit
2. organize [user interviews](/handbook/product/user-feedback)
3. coach product engineers on ["how to do product"](/handbook/engineering/product-engineering)

## Small team membership

Each PM belongs to a small number of our small engineering teams, so that all teams have a strong sense that the PM is there to support them equally. This also ensures that the PM has the time to dive deep into issues that require it. PMs join small team standups and planning whenever it makes sense, but they are not required to attend _all_ team meetings. This is up to the PM to decide when it makes sense to join these, and when their time is better spent elsewhere.

Here is a overview that shows which of our PMs currently works with which team:

<TeamMember name="Anna Szell" photo />

- [Data Warehouse](/teams/data-warehouse)
- [Product Analytics](/teams/product-analytics)
- [Web Analytics](web-analytics)

<TeamMember name="Annika Schmid" photo />

- [Session Replay](/teams/session-replay)
- [Feature Flags](/teams/feature-flags)
- [Experiments](/teams/experiments)

<TeamMember name="Cory Slater" photo />

- [Error Tracking](/teams/error-tracking)
- [Surveys](/teams/surveys)

<TeamMember name="Abe Basu" photo />

- [Messaging](/teams/messaging)
- [CDP](/teams/cdp)
  
**Teams with no PM currently**

- [CRM](/teams/crm)
- [LLM Analytics](/teams/llm-analytics)
- [Max AI](/teams/max-ai)
- [Revenue Analytics](/teams/revenue-analytics)

## Product goals

Product managers primarily support their teams in reaching their goals. The top two priorities of each PM are to run a growth review at the beginning of every month for each of their products, and to organise regular user interviews. (Our rule of thumb is 1 interview per week per PM).

The [quarterly per-product planning](/handbook/company/goal-setting) typically highlight the biggest blind spots a team or product has (e.g. what metrics or parts of the product do we think have potential, but we don't have enough context yet). Teams are encouraged to include their "biggest unknown" as a research goal for the PM to own as part of their quarterly goals. Findings should be shared asynchronously via a GitHub PR in [#product-internal](https://github.com/PostHog/product-internal), and in the growth reviews or team standups where applicable.

As the PM team, we are also pursuing a couple of side projects each quarter with the goal of leveling up how we do Product at PostHog.

In Q3 2025, those are:

**Goal 1: Investigate if we can automate growth reviews, some parts at least** -> <TeamMember name="Anna Szell" photo /> & <TeamMember name="Cory Slater" photo />
* Something along the lines of having a materialized view per metric
* Ideally we can use product analytics insights in materialized views, so that we don't have to create usage insights manually in SQL. This is something the data warehouse team would have to prioritize building

**Goal 2: Better surface feature requests from sales** -> <TeamMember name="Anna Szell" photo />
* We really like the manual, prioritized list of feature requests <TeamMember name="Simon Fischer" photo /> Simon creates at the end of each quarter. We tried to use Buildbetter x Vitally to automate some of this, but are missing important context. Can the automation be improved, so there is less manual effort?


