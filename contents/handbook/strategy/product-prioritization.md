---
title: Product Prioritization
sidebar: Handbook
showTitle: true
---

PostHog aims to provide all the tools that our ICP needs in one platform. This is a _lot_ of products.

## How do we prioritize?

Products we build into the platform should:

* be recognizable/positioned as products that our ICP already uses
* use or add to customer or product data
* improve our other products
* be designed to enable us to get in first with that product (even if in practise we often rip and replace an existing product)
* help customers build more successful products (this doesn't _just_ mean writing code, it means commercial stuff too)
* work with our snippet, so customers can switch on new functionality immediately

Whilst it's possible for others to build on our platform, our priorities are:

* build major new products ourselves, and improve our own ability to ship each new product (ie standard ways to launch, bill, market them and so on)
* make our existing products headless/with good APIs, where relevant - this helps us to reuse existing work and to reduce technical debt _and_ they help the community achieve the following:
* enable the community to build hacky internal tools or small bootstrapped products via API

What we want to avoid:

* We should avoid hosting other people's products for them. We tried this with apps/plugins and it was painful from a security perspective. We should instead encourage API building.
* We shouldn't expect VC backed startups to build huge products on our platform for a very long time. This may / may not come much later on when we have the distribution to support this.

We must be able to get in first for any of our tools. We don't want to have to replace a complex stack, we should be first in, and should therefore be the default for choice for any new tool.

## What makes a tool in-scope or out-of-scope?

The earlier stage a company is, the more likely that they don't have specialist organizations by role, such as engineering, marketing, product, data, customer success, sales.

The more engineering-led the organization, the stronger a fit PostHog is for the customer, and the more likely it is that product engineers are driving all of the above areas. For example, a YC backed startup will typically have two technical cofounders, who will handle every role in the company.

Therefore, any of the above are possible for us to build if the scope within them is strictly limited to what our ICP needs. Here is a non-exhaustive and rough list, sorted by stack, of tools that could fit our criteria:

Product stack = product tours, feedback and surveys, analytics, recordings, roadmap, beta management (self-serve feature flags), user interviewing, alerting
Engineering stack = feature flags, error handling, APM
Growth stack = experimentation, session recordings, funnels, lead scoring, revenue (and integration)
Data stack = warehouse, CDP / etl / reverse etl, transformations, monitoring and observability, data governance, ML and DS tooling, headless analytics
BI stack = notebooks, querying, visalizations, forecasting
Marketing stack = heatmaps, scrollmaps, attribution and performance, messaging, community and referral

The stronger the above tools fit our prioritization, the sooner we can build them. Overall, choosing the next product to build is more of an art than a science (some products might be easier to build, easier to maintain, more on trend, less competitive landscape, higher potential to pay etc.) so we need to use our best judgement. We expect to get better at this as we ship and charge for more products over time.

## Being able to build all of this stuff

From what we've seen so far, very approximately, simpler products take a team of 2 engineers around 3 months to get into an MVP, 3 more months to get to PMF (ie charging with happy customers), and 3 more months to get profitable. Complex ones (those involving a higher infrastructure workload or much bigger feature set) we imagine will take longer but may be more profitable with higher order values once built.

Once a product hits MVP, we should hire enough that we can either maintain _or_ innovate depending on if we believe the product is a growth engine for us and the feature's success. We should avoid having lots of MVP but non-product market fit tools in our platform, as this will create a low quality experience.

We simply do not need the same _depth_ of features any of our individual products have. Instead, we can usually provide a better experience by integrating our products together, providing APIs and extensibility or otherwise adapting them to a more technical audience.

Finally, and perhaps most importantly, we should always start by building approximately what the market expects of each tool. This avoids all the early iteration needed (which can be several years) and means we'll get demand nearly immediately - others have validated that these products are useful for us. We can innovate once one of our products hits product market fit - often by integrating it with our other tools or otherwise adapting it more tightly to our ICP.