---
title: "How the startup data stack evolves, what we’ve found"
date: 2023-03-14
author: ["ian-vanagas"]
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: ../images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Startups
tags:
 - Guides
 - Explainers
---

Every startup needs data to build a better product. This isn't up for debate. But, as we've found from working with hundreds of startups at all stages, the "startup data stack" can quickly devolve into a mess of tools that just slow you down.

In this article, I'll explain why the startup data stack begins like this...

![MVP](../images/blog/startup-data-stack/mvp.png)

devolves into this...

![Series A](../images/blog/startup-data-stack/series-a.png)

... and what we're building at PostHog to make the whole mess a little less painful for growing startups. 

TL;DR: The so-called "modern data stack" sucks. We want to fix that.

## The MVP data stack
At the start, data needs and collection is straightforward. A typical pre-product-market fit startup doesn't need many tools. We call this the MVP data stack.

The goal of the MVP data stack is to get a signal that what you are building is working. Teams need quick and easy tools that give them data for:

- Site visitors
- Leads, signups
- Product usage
- Revenue

To do this, they need:

- Website and/or product analytics
- A customer relationship manager (CRM)
- Revenue, payments, subscription tracking

![MVP](../images/blog/startup-data-stack/mvp.png)

At this stage, startups usually go with the "popular" tools because they're [boring technologies](https://mcfunley.com/choose-boring-technology) that work for other people. 

The goal of the data stack at the MVP stage is to get basic data to find out if [what you are building is working](/blog/early-stage-analytics). Complicated solutions aren’t needed for this.

## The Seed stage data stack

Your data needs quickly spiral once you reach the Seed stage – as does the complexity and number of tools you need. Why? Because it's less obvious how to spend your time and resources. Typical questions at this stage include:

- What features should we prioritize developing?
- How do we best serve our [ideal customer](/blog/creating-ideal-customer-profile)?
- How do we optimize our [conversion funnel](/tutorials/funnels)?
- What channels should we [be advertising on](/blog/dev-marketing-for-startups)?

You'll need to pull data from a growing number of sources to answer these questions – product analytics, CRM, help desk, ad platform, etc. You'll also utilize more of the features of these sources than before, such as customer engagement and session recordings, generating even more data.

This is where [customer data platforms](/docs/integrate/cdp) (CDP) like Segment come in. CDPs make it easier to bring data together by collecting it from different sources and sending it to various destinations. For example, a CDP might collect product data from PostHog, advertising data from Google, and revenue data from Stripe, and send it back to those same tools, a warehouse, or a business intelligence tool like Hex.

![Seed](../images/blog/startup-data-stack/seed.png)

The goal of the stack at this stage is to give insights into how the product and specific features are doing. Teams want to answer questions about the product and get basic KPI reporting. This enables them to make decisions about what to work on and measure progress towards goals.

Moving from individual sources to a CDP makes gathering data faster, but it's also where the rot, begins as complexity and maintenance needs increase. Data accuracy problems proliferate at this stage, though for now this isn't a critical issue – engineers just need enough data to know what to prioritize.

## The Series A data stack

Series A is where data begins to get serious, and by serious, I mean the startup makes someone responsible for owning the data stack. This person is often a head of data, data engineer, or backend engineer focused on data. They see their goal as empowering engineers with data to evaluate the success of what they build. To do this, they implement the so-called "modern data stack" which contains four tools:

1. A data warehouse to store all the data and act as a single source of truth. Options include Snowflake, BigQuery, and RedShift.

2. An ETL pipeline to extract data from different sources, transform it, and load it into the warehouse. Options include Fivetran, Integrate.io, and Airbyte.

3. A data transformation tool to model data, clean it up, and make it usable. dbt is basically the only option.

4. A business intelligence or visualization tool to get insights from the data you’ve collected. Options include Metabase, Looker, and Hex.
![Series A](../images/blog/startup-data-stack/series-a.png)

Startups need this stack because managing and accessing individual sources of data becomes unsustainable. Tools like analytics and the CDP don't give complete insight into performance. Teams need a reliable, single source of truth they trust, and they hope the modern data stack will give them that.

But this also where things start to go seriously wrong. All this complexity creates a gap between engineers and the data that is valuable to them. They are unable to "self-serve" and must learn the modern data stack tools, or rely on the data team for insights. There are many reasons for this:

- The complexity of data and tools requires specialization.
- Data security, safety, and privacy requirements.
- Lack of knowledge of data available or how to use it.

For example, engineers might need to write optimized SQL queries to understand customer feature usage. This requires an understanding of SQL, data availability, data structured, as well as access. All this does is slow down their work, blocking them shipping new features and improvements efficiently.

## How we want to fix the "modern data stack"

If you haven't figured it out already, we're not fans of this situation. To us, the "modern data stack" just creates costly barriers to building successful products. We want streamline how startups gather and analyze data at the earliest stages, consolidating more of the stack as they scale and delaying the need hire expensive heads of data and the like.

To make this happen, we are improving PostHog as a [customer data platform (CDP)](https://github.com/PostHog/posthog/issues/13126). We have built the key functionality, such as the ability to:

- Receive data from your app(s) and site(s) with our [SDKs](/docs/integrate?tab=sdks)
- Receive data from sources like [Stripe](/apps/stripe-connector), [Hubspot](/apps/hubspot-connector), [Intercom](/apps/intercom)
- Export to destinations such as [Snowflake](/apps/snowflake-export), [BigQuery](/apps/bigquery-export), or [RedShift](/apps/redshift-export)

Improving reliability, integrations, and UX is critical for success here. Being a CDP enables startups to have their data and tools in one place with PostHog. More data also improves the depth of insights engineers can get from PostHog without having to use other tools such as BI or visualization.

![PostHog CDP](../images/blog/startup-data-stack/posthog-cdp.png)

We are also figuring out what PostHog looks like as [a data warehouse](https://github.com/PostHog/posthog/issues/14406) utilizing [ClickHouse](/docs/how-posthog-works/clickhouse). Data accuracy and reporting flexibility matter at scale. Being a warehouse enables PostHog to provide this to startups, and integrate it with tools they are already using PostHog for. With PostHog as a warehouse, startups don’t need to migrate or set up many of the modern data stack tools.

We want to make it easy to evaluate whether products are working or not. The ability for engineers to find and analyze the metrics they want, along with tools like experiments and session recordings, is key to this. The modern data stack creates complexity and silos that make figuring out what to work on and what’s working difficult.

Integrating more of the parts of the startup data stack into PostHog enables engineers to continue to access the data, insights, and tools they need to build a great product. This current data stack evolution becomes large, complicated, and siloed quickly. Building an ideal data stack for engineers is what PostHog aims to do, and by doing so, we'll achieve our goal of more successful products in the world.

## Further reading

- [Our simpler goal: Help engineers to be better at product](/blog/helping-engineers-to-product)
- [The 80/20 of early-stage startup analytics](/blog/early-stage-analytics)
- [What is a product engineer (and why they're awesome)](/blog/what-is-a-product-engineer)
