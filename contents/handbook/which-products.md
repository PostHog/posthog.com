---
title: Deciding which products we build
sidebar: Handbook
showTitle: true
---
Providing all the tools in one is a core part of our strategy.

Shipping them in the right order is key to a fast return on investment from every new product.

## How we pick new products

Like any hit-driven business model, it's hard to predict what products will do well. At any time, we want to work on a mix of new products. Some we're very sure will do well, others that are more of a bet with a potentially big outcome.

Products we know will work well if we ship them:
- Products engineers use at all company stages
  - Think error tracking or feature flags. The [persona doesn't change](/handbook/who-we-build-for#our-current-persona) as the company gets bigger.
- Products that already have a $1bn competitor in the market (e.g. a company with around $100M in revenue)
- Products that are very easy to integrate for our existing customers. 
  - For example, users can enable the product in PostHog, without needing to make a code change
- Products that _you_ are excited to build. 
  - People pursuing their interests get more done, go much further, and execute to a better standard.
- Products that our customers are asking for

Products we're less excited about building
- Products where the ICP quickly changes to something other than an engineer, especially teams far removed from engineering
  - For example, a CRM. We'd be more excited about building a customer support tool, as support often is a task that involves engineering.


## Next products on deck

From our [roadmap](/roadmap), here's what we're working on next:

- Embedded analytics - `#project-embedded-analytics`
- Logs - `#project-logs`
- Tasks - currently within `#team-llm-analytics`
- Customer analytics + Revenue analytics `#team-customer-analytics`
- Workflows `#team-workflows`
- 100x the toolbar

## How to pick which feature within an existing product to build

In the early days, you'll be shipping the main few features that your category of product has as standard. In product analytics, this would be something like (1) capturing events, (2) trends, (3) funnels, (4) retention, and (5) person views.

Once this is done, you'll get a stream of feature requests and bug reports from users. You can't go too wrong if you listen to these and, by default, prioritize those that help us get in first, first. For example, with our data warehouse, we picked multi-tenant architecture because we wanted startups to be able to get started for free or very little initial cost - even though a single tenant approach would have given us an MVP faster. Sometimes, if sales are asking, you may choose to prioritize a feature for a big customer earlier, but you should never do this when you wouldn't have shipped it at some stage anyway.

Later on, you can then _innovate_ several ways:

* unpeel your product - you start with the software, then offer API access, then offer better API access, then infrastructure (if you are feeling brave) - *by default, start with this* reminder: charge for API access appropriately, speak to Annika for help figuring this out. Doing this increases our luck surface area (it means your users will find new use cases).
* features more specific to our ICP (make it more engineering-y, more customization, more power)
* integrate it with our other products (either feature them _in_ the product you just built, or feature your product in _theirs_)

