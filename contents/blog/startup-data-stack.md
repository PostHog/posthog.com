---
title: "How the startup data stack evolves, what we’ve found"
date: 2023-03-07
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

The goal of data is to help startups build a better product. To help them with this, startups use all sorts of tools, known as the startup data stack. 

To help you understand the startup data stack, and be better able to leverage it, this post will go over:
- What the startup data stack looks like from MVP to Series A
- Examples of tools used and the problems they solve
- PostHog's vision of the future for the startup data stack

This comes from working with hundreds of startups at all stages, conducting user interviews, researching the data stack landscape, and being part of the data stack ourselves.

## The MVP data stack

The goal of the MVP data stack is to get a signal that what you are building is working. Teams don’t want to spend time setting up complicated products this early, because their data needs aren’t large. They want something quick and proven to give them data like:

- Site visitors
- Leads, signups
- Product usage
- Revenue

To do this, they need:

- Website and product analytics
- Customer relationship manager (CRM)
- Revenue, payments, subscription tracking

![MVP](../images/blog/startup-data-stack/mvp.png)

To choose these products, they usually go with the "popular" choice, as they are [boring technologies](https://mcfunley.com/choose-boring-technology) that work for other people. The goal of the data stack at the MVP stage is to get basic data to find out if [what you are building is working](/blog/early-stage-analytics). Complicated solutions aren’t needed for this.

## The Seed stage data stack

Once the MVP has initial traction and you enter the Seed stage, the data needs increase and the tools become more complicated. This is because it is less obvious how to spend your time and resources. For example, some questions asked at this stage include:

- What features should we prioritize developing?
- How do we best serve our [ideal customer](/blog/creating-ideal-customer-profile)?
- How do we optimize our [conversion funnel](/tutorials/funnels)?
- What channels should we [be advertising on](/blog/dev-marketing-for-startups)?

To answer these questions, teams pull data from a growing number of sources like product analytics, CRM, help desk, and ad platform. They also utilize more of the features of these sources, such as customer engagement and session recordings, generating more data.

Bringing all this data together and managing it often requires a [customer data platform](/docs/integrate/cdp) (CDP). CDPs collect the data from different sources and send it for use in destinations. For example, it might collect product data from PostHog, advertising data from Google, and revenue data from Stripe, and send it back to those same tools, a warehouse, or a business intelligence tool like Hex.

![Seed](../images/blog/startup-data-stack/seed.png)

The goal of the stack at this stage is to give insights into how the product and specific features are doing. Teams want the ability to answer questions about the product and get basic KPI reporting. This enables them to make decisions about what to work on and measure progress towards goals.

Moving from individual sources to a CDP makes gathering data faster, but starts to create a web of integrations and mainteinance. It is a challenge to know if data is accurate, luckily at this stage, it doesn't need to be. The Seed stage strikes the balance of giving engineers enough data to know what to prioritize with having plenty of time to build it.

## The Series A data stack

Series A is where data begins to get serious, and by serious, I mean the startup makes someone responsible for owning the data stack. This person is often a head of data, data engineer, or backend engineer focused on data. They see their goal as empowering engineers with data to evaluate the success of what they build. To do this, they implement the "modern data stack" which contains four tools:

1. A data warehouse to store all the data and act as a single source of truth. Options include Snowflake, BigQuery, and RedShift.
2. An ETL pipeline to extract data from different sources, transform it, and load it into the warehouse. Options include Fivetran, Integrate.io, and Airbyte.
3. A data transformation tool to model data, clean it up, and make it usable. dbt is basically the only option.
4. A business intelligence or visualization tool to get insights from the data you’ve collected. Options include Metabase, Looker, and Hex.
![Series A](../images/blog/startup-data-stack/series-a.png)

Startups need this stack because managing and accessing individual sources of data becomes unsustainable. Tools like analytics and the CDP don't give complete insight into performance. Teams need a single source of truth, and the modern data stack gives them that. This creates trust in the data and greater accuracy.

The downside of this stage is that a gap opens between engineers and the data that is valuable to them. They are unable to "self-serve" and must learn the modern data stack tools or rely on the data team for insights. There are many reasons for this:

- The complexity of data and tools requires specialization.
- Data security, safety, and privacy requirements.
- Lack of knowledge of data available or how to use it.

For example, engineers might need to write optimized SQL queries to understand customer feature usage. This requires an understanding of SQL, data availability, data structured, as well as access. There all create friction on what engineers want to do: build better products. 

## PostHog’s vision for the future of the startup data stack

Being a part of this evolution, we have thoughts on where PostHog fits into this. [Our mission](/handbook/strategy/overview) is to increase the number of successful products in the world, and we do this by helping engineers be better at product. This means helping them gather and analyze data at the earliest stage of their product, and integrating more of the parts of the startup data stack as they scale up.

To make this happen, we are improving the ability to use PostHog as a [customer data platform (CDP)](https://github.com/PostHog/posthog/issues/13126). We have built the key functionality, such as the ability to:

- Receive data from your app(s) and site(s) with our [SDKs](/docs/integrate?tab=sdks)
- Receive data from sources like [Stripe](/apps/stripe-connector), [Hubspot](/apps/hubspot-connector), [Intercom](/apps/intercom)
- Export to destinations such as [Snowflake](/apps/snowflake-export), [BigQuery](/apps/bigquery-export), or [RedShift](/apps/redshift-export)

Improving reliability, integrations, and UX is critical for success here. Being a CDP enables startups to have their data and tools in one place with PostHog. More data also improves the depth of insights engineers can get from PostHog without having to use other tools such as BI or visualization.

![PostHog CDP](../images/blog/startup-data-stack/posthog-cdp.png)

We are also figuring out what PostHog looks like as [a data warehouse](https://github.com/PostHog/posthog/issues/14406). Data accuracy and reporting flexibility matter at scale. Being a warehouse enables PostHog to provide this to startups, and integrate it with tools they are already using PostHog for. With PostHog as a warehouse, startups don’t need to migrate or set up many of the modern data stack tools.

PostHog wants to make it quick to evaluate whether products are working or not. The ability for engineers to find and analyze the metrics they want, along with tools like experiments and session recordings, is key to this. The modern data stack creates complexity and silos that make figuring out what to work on and what’s working difficult.

Integrating more of the parts of the startup data stack into PostHog enables engineers to continue to access the data, insights, and tools they need to build a great product. This current data stack evolution becomes large, complicated, and siloed quickly. Building an ideal data stack for engineers is what PostHog aims to do, and by doing so, we'll achieve our goal of more successful products in the world.

## Further reading

- [Our simpler goal: Help engineers to be better at product](/blog/helping-engineers-to-product)
- [The 80/20 of early-stage startup analytics](/blog/early-stage-analytics)
- [What is a product engineer (and why they're awesome)](/blog/what-is-a-product-engineer)
