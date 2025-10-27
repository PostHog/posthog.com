---
title: Who we build for
sidebar: Handbook
showTitle: true
---

We define who we build for as ICP (ie, the company) and the Persona (ie the actual person using the product).

## Our current ICP

AKA our [ideal customer profile](/newsletter/ideal-customer-profile-framework).

We build for the people building products at **high-growth startups**. 

Marketing and customer success should primarily focus on this ICP, but should also develop **high-*potential* customers** – customers that are likely to later become high-growth customers (e.g. PostHog itself during YC). We should be in maintenance mode for **hobbyists**, such as engineers building side projects. We want to be the first tool that technical founders add to their product.

| &nbsp; | High-growth startup |
| --- | --- |
| **Description** | Startups that have product-market fit and are quickly scaling up with new customers, hiring, and adding more revenue. |
| **Criteria** | - 15-500 employees<br />- $100k+/month in revenue _or_ very large number of consumer users<br />- Raised from leading investors<br />- Not yet IPO'ed |
| **Why they matter?** | - Able to efficiently monetize them<br />- Very quick sales cycle<br />- Act as key opinion leaders for earlier-stage startups/slower moving companies<br />- Strong opinions on what they need - helping us build a better product |
| **Examples** | PostHog anytime from their Series B to IPO, Supabase, 11Labs |


## Our current Persona

Persona is the job title or role of the person actually using a product in PostHog. Each team will focus more or less on different members of the product team. This is detailed on their team pages.

As companies get bigger, the type of person that uses a product changes. As an example:

- We initially built product analytics for engineers at startups.
- As those companies get a little bit bigger, they'll hire Product Managers who will mostly use product analytics. PMs have more complicated requirements for what a product analytics tool needs to do.
- Even bigger companies often have specialized "analytics engineers." These people are the most demanding.

Each product should start with a single persona, usually an early person (preferably engineer) at a startup. Teams should make sure to build a really good product with PMF for that single persona. As the product and user-base matures, new personas will emerge as users. You only serve that new persona if you've found PMF and satisfied requirements for the initial persona.

How do you know if you have PMF and satisfied requirements? Look at churn. If the initial persona is churning from your product, you still have work to do to retain that persona before moving onto others. If instead the product has been handed off to another persona in the org, and _they_ are churning, that's an indication that you may need to start supporting the needs of this next persona.

We've not always been successful at building products for personas other than engineers. We're now at a stage where we need to be in order to continue growing. 


### New products

Engineers, whether they call themselves developers, product engineers or founders, have always been the most excited users of PostHog, and the keenest to use new products. **That means we want to build new products an engineer would use**, products like error tracking, logs and LLM analytics.

There are also products that those builders will often be the first to set up and use, but currently hand over to specialists. Think of a data warehouse (handed over to data engineers), experimentation platform (handed over to PMs, growth engineers or analytics engineers) or messaging platform (marketing). We should build these products so that the builder can delay the point at which they need to hire a specialist to use that product. For example, by making it super easy to set up email campaigns (part written by AI) you don't need to hire a dedicated marketing person for a while.

We don't want to build products where the initial persona is someone other than an engineer. Think a CRM, customer support product or marketing tools.