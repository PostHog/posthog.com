---
date: 2023-02-17
title: 'Our simpler goal: Help engineers to be better at product'
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: CEO diaries
author:
  - james-hawkins
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/posthog-ceo-diary-blog.png
featuredImageType: full
---

One of the things I've learned at PostHog is the simpler a strategy, the more likely it's right.

We simplified [our strategy](../handbook/strategy/overview) recently. This post explains the context.

## The change

Our mission has always been to increase the number of successful products in the world.

The change is that we've realized that the simple way PostHog can achieve this is to help engineers be better at product.

Today, engineers building the products you use are too often treated as a resource. They don't get a say in what gets built, they just pick up ticket after ticket. Yet, there's a reason they're engineers in the first place. They're intelligent, hard-working, and have deep skills.

Our competitors near universally focus on helping non-technical product managers, who write tickets for their developers.

We think this is backwards. Look at the way most teams work on tickets today:

* Endless alignment
* Endless requirements gathering
* Endless handoffs (design/product/engineering/sales/marketing/support)

If we reduce the need for PMs and help engineers go further by themselves, we reduce time lost on the above, unproductive activities, and give great engineers the thing they crave most: autonomy.

## What's the strategy then?

### Provide every tool needed for evaluating feature success

The best use of an engineer's time is to ship features that have an impact on customers. Currently, this requires a large number of tools and product managers to pull all the insights together. By integrating all these tools we can make this easy – no integration needed, no extra vendors, no extra javascript, and workflows to guide engineers through feature development, from initial idea, to release, measurement, gathering qualitative data, and back to the start.

### Get in first

It’s the technical co-founder and early engineers building the MVP and integrating the first product tools, not PMs. By focusing on engineers we can get in first, and later become the default choice for each additional tool they add. 

Additionally, we can ladder our tools – session recording is used much earlier in the life cycle of the product than others, like the customer data platforms (CDP), helping us get in earlier than competing products. As a result, we aren't heavily focused on enterprise – we even [sunsetted K8s support](sunsetting-helm-support-posthog) as part of this change.

### Be the pipeline for product and customer data

Traditionally, as companies scale their data warehouse becomes the source of truth and non-warehouse native tools (like product analytics) become less relevant. By being their core pipeline from connecting their data to their warehouses we can remain sticky for the life of our customers. And by providing this infra, we ensure the data we have remains comprehensive. We will continue pushing back the need for companies to even set up a warehouse in the first place.

## What's to come this year?

Right now on [our roadmap](/roadmap), we're working on a slicker core experience –  we've got many team members working on reliability, scalability, and data load times. We're adding power features for more technical users, like [HogQL and SQL access](https://github.com/PostHog/meta/issues/81) inside the product. We're also plugging gaps in our product, such as [iOS session recording](https://github.com/PostHog/posthog/issues/12344), [json feature flags](https://github.com/PostHog/posthog/pull/13623), [feature flag resilience](https://github.com/PostHog/posthog/issues/13601) and improved SDK coverage for feature flags. Finally, we're pushing for [PostHog 3000](https://github.com/PostHog/posthog/issues/12923) – a big UI change that will ultimately connect all our tools together better.

Next quarter, we'll be working on our CDP – we want to make that a first class citizen product – like our analytics or session recording. Today, we have 50+ "apps", largely community-driven, that mainly integrate PostHog with other data sources, but we want to add more integrations, deepen their functionality, improve their reliability, and make them more intuitive to use.

It's not all product: 

- In our growth team, we made a lot of progress last year on conversion to revenue, which grew 6x, but we're now looking at ways to give away as much as we can, for free, to _get in first_. 

- In our customer success team, we're getting more targeted in our approach so we focus on high-growth companies.

- In marketing, we aim to produce the best content on the internet for each piece that we write. We're moving paid ad spend to hire another writer, we're producing more tutorials than ever before, and we're focusing more of our writing more tightly on how to help engineers learn skills outside of coding.

## I'm excited

Ali, on our board, told us "when you get bigger, you can see around corners". That turns out to be true. 

Now we've tried a bunch of stuff and achieved product-market fit – we have 23,000+ companies who have installed PostHog, approaching 70,000 developers in the community and $MM revenue – we can clearly see what we need to do. And, seeing the results we've had so far, increases our confidence we can make it all happen.

Wish us luck, and feedback (I'm james @ you can guess it . com) is more than welcome!
