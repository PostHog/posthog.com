---
title: Deciding which products we build
sidebar: Handbook
showTitle: true
---
Providing all the tools in one is a core part of our strategy.

Shipping them in the right order is key to a fast return on investment from every new product.

## How to pick which feature within an existing product to build

In the early days, you'll be shipping the main few features that your category of product has as standard. In product analytics, this would be something like (1) capturing events, (2) trends, (3) funnels, (4) retention, and (5) person views.

Once this is done, you'll get a stream of feature requests and bug reports from users. You can't go too wrong if you listen to these and, by default, prioritize those that help us get in first, first. For example, with our data warehouse, we picked multi-tenant architecture because we wanted startups to be able to get started for free or very little initial cost - even though a single tenant approach would have given us an MVP faster. Sometimes, if sales are asking, you may choose to prioritize a feature for a big customer earlier, but you should never do this when you wouldn't have shipped it at some stage anyway.

Later on, you can then _innovate_ several ways:

* unpeel your product - you start with the software, then offer API access, then offer better API access, then infrastructure (if you are feeling brave) - *by default, start with this* reminder: charge for API access appropriately, speak to Annika for help figuring this out. Doing this increases our luck surface area (it means your users will find new use cases).
* features more specific to our ICP (make it more engineering-y, more customization, more power)
* integrate it with our other products (either feature them _in_ the product you just built, or feature your product in _theirs_)

## Next products on deck

From our [roadmap](/roadmap), here's what we're working on next:

- Embedded analytics - `#project-embedded-analytics`
- Logs - `#project-logs`
- Tasks - currently within `#team-llm-analytics`
- Customer analytics `#team-customer-analytics`
- 100x the toolbar
- Revenue analytics `#team-revenue-analytics`
- Workflows `#team-messaging-cdp`

## How we pick new products

Products we build into the platform must:

* Be a product that our ICP could use, and there already is a $1bn competitor in the market (e.g. a company with around $100M in revenue). This guarantees that what you build will be useful.
* Be something that you are very excited to build. People pursuing their interests get more done, go much further, and execute to a better standard.

Ideally, but not necessarily, products we build should:

* [Equip developers to ship successful products](/handbook/why-does-posthog-exist#our-mission)
  * Specifically, any product that either helps them ship faster, or gives them more context to ship products without help from others.
* Help us to get in first - some tools are adopted earlier in the customer lifecycle than others. Starting with these avoids customers moving to competitors' products, then us having to migrate them over.
* Increase the amount of data inside of PostHog. In some cases, that means building the product when we can get a large % of our users to switch over (like error tracking, logs), in other cases it just means integrating when switching costs or infrastructure requirements are high (like a production database, an auth product)
* Increase our luck surface area - some products have more upside than others, for example, API access may yield surprising results compared to a super narrowly scoped new product like a cookie banner product.
* Be very easy to integrate and turn on for existing customers. For example, users can enable the product without a code change.
* Have crappy competitors - successful companies but horrible products and/or sales experience.

