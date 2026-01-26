---
title: Product management at PostHog
sidebar: Handbook
showTitle: true
---

PostHog has a [product-minded engineering organization](/blog/turning-engineers-into-product-people). Engineers own sprint planning and spec'ing out solutions.

So, what is the role of product managers at PostHog? PMs set context across multiple products for how products are being used, what the competitive landscape is like, what users are feeling about PostHog, and how they're using things.

Among other things, they

1. run [growth reviews](/handbook/product/per-product-growth-reviews) for products that have product-market-fit
2. organize [user interviews](/handbook/product/user-feedback)
3. coach product engineers on ["how to do product"](/handbook/engineering/product-engineering)

For a more in-depth look at the product role at PostHog, see [What product managers do at PostHog](/handbook/product/product-manager-role).

# How PMs work

## Small team membership

Each PM belongs to a small number of our small engineering teams, so that all teams have a strong sense that the PM is there to support them equally. This also ensures that the PM has the time to dive deep into issues that require it. PMs join small team standups and planning whenever it makes sense, but they are not required to attend _all_ team meetings. This is up to the PM to decide when it makes sense to join these, and when their time is better spent elsewhere.

Here is a overview that shows which of our PMs currently works with which team:

<div className="grid @md:grid-cols-2 gap-4">

<fieldset>
<legend><TeamMember name="Anna Szell" photo /></legend>

-   <SmallTeam slug="analytics-platform" />
-   <SmallTeam slug="data-stack" />
-   <SmallTeam slug="product-analytics" />
-   <SmallTeam slug="web-analytics" />

</fieldset>

<fieldset>
<legend><TeamMember name="Annika Schmid" photo /></legend>

-   <SmallTeam slug="feature-flags" />
-   <SmallTeam slug="experiments" />
-   <SmallTeam slug="posthog-ai" />

</fieldset>

<fieldset>
<legend><TeamMember name="Cory Slater" photo /></legend>

-   <SmallTeam slug="error-tracking" />
-   <SmallTeam slug="surveys" />
-   <SmallTeam slug="replay" />

</fieldset>

<fieldset>
<legend><TeamMember name="Abe Basu" photo /></legend>

-   <SmallTeam slug="workflows" />
-   <SmallTeam slug="batch-exports" />*
-   Endpoints
-   Logs

*light support

</fieldset>

<fieldset>
<legend>Teams with no PM currently</legend>

-   <SmallTeam slug="customer-analytics" />
-   <SmallTeam slug="llm-analytics" />

</fieldset>

</div>

## Product goals

Product managers primarily support their teams in reaching their goals. The top two priorities of each PM are to run a growth review at the beginning of every month for each of their products, and to organise regular user interviews. (Our rule of thumb is 1 interview per week per PM).

The [quarterly per-product planning](/handbook/company/goal-setting) typically highlight the biggest blind spots a team or product has (e.g. what metrics or parts of the product do we think have potential, but we don't have enough context yet). Teams are encouraged to include their "biggest unknown" as a research goal for the PM to own as part of their quarterly goals. Findings should be shared asynchronously via a GitHub PR in the <PrivateLink url="https://github.com/PostHog/requests-for-comments-internal">product-internal repo</PrivateLink>, and in the growth reviews or team standups where applicable.

To keep track of their projects across teams, PMs should track their personal quarterly goals transparently somewhere, for example in the [public PostHog Meta repo](https://github.com/PostHog/meta).

As the PM team, we are usually also pursuing a couple of side projects each quarter with the goal of leveling up how we do Product at PostHog.

In Q4 2025, we are focussing primarily on the teams we work with, and have no big side projects.
