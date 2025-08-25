---
title: Why buy PostHog
sidebar: Handbook
showTitle: true
---

AKA our Value Proposition, these are some of the things we've found useful to share when chatting to customers about why PostHog is different and better than our competitors.

# In short

Our messaging varies depending on whether our users have a data engineering team and warehouse already.  If they don't:

> PostHog is an all-in-one data warehouse providing the only tools you need to understand and work better with your customers.

If they already have a data engineering team and warehouse already:

> PostHog provides the tools you need to understand and work better with your customers, and integrates seamlessly with your existing data stack.

## Everybody needs a data warehouse, not everybody needs a data team

For teams of all sizes, it's important to have your product, revenue and operational data available in a single place. Our data warehouse is optimized for product engineers - no data team needed. 

- We allow you to bring in data from multiple sources such as your production database, payments provider, CRM and other SaaS tools and query them alongside your user behavioral data.
- You don't need to implement and maintain a complex stack of tools - we handle the complexity for you.
- Integrations with SaaS platforms are super simple to set up - normally all you need is an API credential.

### Example use case: integrating revenue data from Stripe

It's easy to connect Stripe revenue data using just an API key.  You'll be able to then join your Stripe data to person data in PostHog via a common identifier (e.g. email) and answer questions such as:

1. Which features drive the most paying customers, or;
2. Which user behaviors are correlated with customer churn.

Product analytics data in isolation won't help you with these and other questions which are critical to your business.

All this can be self served by product engineers.

## An integrated place to view all of your user data

With disparate tools, it's hard to get an understanding of your users both individually and at an aggregate level.  By integrating a range of products into one platform we provide a greater picture of our customer's users.  Common cross-product use cases are:

 - When looking at a conversion funnel, click a dropped off segment of users to view their session replays.  This helps you understand potential friction/interface issues. 
 - After launching an experiment, click to see the session replays of users experiencing a specific variant, showing you whether your users are experiencing it as intended.
 - Create a survey tied to an experiment (via the feature flag), letting you gather qualitative feedback from users who are experiencing this new feature for the first time.
 - Attach revenue data stored in our data warehouse from Stripe to product analytics to see behaviors which drive revenue acquisition and growth.
 - Use Heatmaps to identify potential dead zones on your website, roll out a [no-code experiment](/docs/experiments/no-code-web-experiments) with your conversion funnel as a goal.

## Consolidated pricing

As we have a low price point and can help replace a number of disparate tools they may be running customers are highly likely to save versus the cost of running multiple tools in parallel:

 - We are competitive for each of our individual products
 - You only need to pay for 1 Teams or Enterprise plan versus 5 or 6
 - We make it easy to buy from us, and once you're done you don't need to run multiple vendor procurement processes for additional tools

## A great buying _and_ product experience for large enterprises

It’s easy to fall-back on the magic we create when using multiple products, but positioning for startups and enterprises can be _very_ different. For some enterprises, anything other than the single product they have come in for would be project-killing, scope creep. Our typical, multi-product talk track doesn’t always work here, so it's worth focusing on the more [philosophical points](/why) such as:

- Everybody codes
- Transparent pricing
- Engineers talk to customers
- We ship any missing features fast

That being said, there are still individual product and feature nuggets that enterprises in particular like:

- HoqQL
- Group analytics
- Debug mode
- Annotations
- Event & property correlation analysis
- Edit SQL directly
- Subscriptions
- Notebooks
- Direct access to underlying data (SQL & API)

# Vibes and personas

You should apply different messaging to companies at different stages (inspired by the [vibe-based sales matrix](https://docs.google.com/spreadsheets/d/12scJrtw2vVok_-BNI6xOYsiNTUDrfkJJO_K0JKkz69w/edit?gid=0#gid=0)), and the role you're speaking with.  The broad messages we can take to customers are:

1. **You need a data warehouse** and PostHog can be it, without needing to implement a complex supporting data stack.  
     - Even if it's not a priority for you right now, it soon will be, and it's better to start early and have it built by people who know what they're doing (us!)
2. **You need a better data warehouse** because running one without a data engineering team is hard.
     - You'll need to run a complete stack of tools such as Airbyte/Fivetran for ETL, the warehouse itself (BigQuery, Snowflake etc.), a BI layer (Looker) and perhaps DBT for modelling too.  
     - All of these have costs both in terms of licensing and time to actually maintain them.
     - Without a data team it's down to your product engineers to maintain these tools which will distract from their day job.
     - By using PostHog, we hide all of this complexity for you.
3. **You can self-serve data** as opposed to rely on a data engineering team to surface insights to you.
     - It's easy to connect sources into PostHog using just an API key for your other SaaS tools.
     - We hide all of the complexity for you.
4. **You can capture everything you need to understand about your users** and send it to your existing warehouse.

## Applied by company type

### Startups

Normally they don't have anything in place, and the pitch is (1) - You need a data warehouse or you will do soon.  In the unlikely event that they have a data team already, it's (4) - we integrate with their warehouse.  YC and other startups will be concerned with what metrics they need to capture and demonstrate for their first/next funding round.  PostHog helps you capture and show those all in one place.

### Scaleups

- If they have a warehouse and data team in place already it's difficult to displace, so we should offer the coexistence story (4).
- If they have deployed a warehouse but don't have a data team, we should pitch (2) - implement a better data warehouse by removing all of the complexity associated with running a traditional data stack.
- Otherwise, we should focus on the role of the person we are speaking with:
  - For **Engineers** and **Leadership** e.g. CTO, it's (1) You need a data warehouse, and (3) can self serve rather than building a data team.
  - For **Product** and **Growth**, it's (3) - You're able to self-serve connecting and querying data from SaaS platforms without engineering help.

### Larger companies

- They will typically be interested in one or two products and have a data team in place already so stick with (4) - we coexist with your existing tools.

They may still want to integrate data from their existing warehouse or other SaaS tools into PostHog to do things like:

- Experiment analysis with data from their warehouse or other tools.
- Enrich person information with properties from their production database.

# Common objections and how to handle them

1. I'm here for product analytics, why are you talking to me about data warehouse?
   - Yes, and very soon you'll want to answer questions like "Which features are driving the most revenue" or "Which sales leads have the highest potential to convert" and for those you'll need additional context inside PostHog.
2. Is PostHog _really_ a data warehouse though?
   - Yes, although we automate a lot of the hard work for you such as ETL and optimizing sync schedules to reduce costs.  
   - We also use ClickHouse which is designed to run analytical queries on large datasets _fast_.
   

