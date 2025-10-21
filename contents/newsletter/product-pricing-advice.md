---
title: Non-obvious advice about pricing your product
date: 2025-10-15
author:
 - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/bookworm_fccbcec132.png
featuredImageType: full
tags:
  - Product
  - Founders
crosspost:
  - Founders
  - Blog
---

We care a lot about pricing at PostHog. As proof:

- Nearly [all of our products](/products) have separate pricing, meaning we are always figuring it out for new products or adjusting it for existing ones.

- [Enduringly low prices](/handbook/low-prices) is a core value of PostHog, which our customers love.

- There are over [100 RFCs](/newsletter/how-we-work-async#5-our-request-for-comments-process) (108 to be exact) about pricing in our private (sorry) product discussions repo.

All of this has meant we’ve thought, debated, and learned a lot about pricing. We’re sharing the best bits we’ve learned here. 

## 1. How you price is who you are

Pricing is often relegated to an afterthought when building a product, but it shouldn't be. It's as impactful to the overall product experience as the functionality or design.

To show you how, imagine two [feature flag](/newsletter/feature-flag-mistakes) tools.

The first charges by **seats** and **flags created**. 

Their customers think about every flag and user they add, meaning they do less of both. The flags they do create are more important and are used more heavily. This model appeals to larger companies with more requests per flag, and that means enterprise features like auditability and access controls are more important.

The second charges by **requests**. 

This means more developers can access and create flags. There are more flags created, but where they put those flags becomes more important so they aren’t charged too much for requests. This appeals to smaller companies who ship more flags, so cost controls and DevEx features like local evaluation matter more.

These two examples show **how much** you charge often doesn’t matter as much as **how** you charge. There are many ways this can vary like:

- Usage-based pricing vs. seat-based pricing.
- Pay-as-you-go vs. annual contracts vs. licenses.
- Self-serve vs. custom contracts with sales.

Deciding your pricing model comes down to your [ideal customer](/newsletter/ideal-customer-profile-framework). For us, that is [product engineers](/blog/what-is-a-product-engineer) at high-growth startups. The ability to self-serve and have pricing align with usage is important for them, so that is what we’ve gone with.

## 2. Don't be afraid to charge early

If you’re hoping that your product is a business, you should charge early for it. It’s easy to give things away, especially zero marginal cost software. It’s a lot harder to sell them.

The feedback you get from free users is very different from what you get from customers. If you’re trying to build a successful business, free users can lead you down the wrong path. This is why acquiring reference **customers** is a core part of [finding product market fit](/founders/product-market-fit-game#level-5---onboard-your-first-5-reference-paying-customers).

There are two big reasons why companies don’t charge early:

1. They are scared no one will pay them.
2. They are afraid they are going to get pricing wrong.

![Charging early](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/pasted_image_2025_10_21_T09_09_16_516_Z_216ab957a1.jpeg)

These fears ignore the excitement of getting people to pay, that it is best to know early if someone won’t pay you, and that everyone gets pricing wrong.

For example, our early pricing was wildly different from our pricing now. PostHog was a monthly subscription with a free trial and way fewer events. This evolved to be usage-based with a free tier for a single product, and then the multi-product, usage-based pricing with large free tiers we have now.

![PostHog's pricing evolution](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_10_21_at_10_35_36_2x_ea3196b5bc.png)

## 3. It’s OK to change your pricing

What the above example shows is that your pricing is always going to be a bit wrong. We started as a monthly subscription but eventually changed to usage-based. We had a paid self-hosted product, but made the tough decision to [sunset it](/blog/sunsetting-helm-support-posthog).

To reach your full potential, you will need to change your pricing. Your product evolves, your pricing should too. All of your favorite companies do it:

- **Notion** used to be paid only until [2020 when they added a free tier](https://www.notion.com/releases/2020-05-19) for personal use. They’ve since [expanded the free tier to remove any paid personal plans](https://www.notion.com/blog/notion-introduces-business-plan-and-expanded-free-plan), just focusing on paid teams plans.

- **Figma** launched an [enterprise plan in 2022](https://www.figma.com/blog/design-needs-everyone-new-plans-for-companies-that-design-together/) with more admin tools, workspaces, and access controls. They also [raised prices](https://www.figma.com/blog/billing-experience-update-2025/) for Figma Design in 2025.

- **Intercom** reinvigorated and [doubled its growth](https://lennysvault.com/insights/growth-scaling-tactics/fba11d05-3cf2-4591-a811-995a1fcb325c) by launching its AI agent, Fin, with outcomes-based pricing.

![Fin pricing](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_10_13_at_16_41_562x_fd6884de36.png)

Changing your pricing enables you to better align the value you create with what you charge for it. For example, our [data pipelines product](/customer-data-infrastructure/destinations) used to be charged based on events ingested, but then [moved to rows exported and triggered events](/blog/data-pipeline-pricing) to better align what users actually used.

The important part of doing this is making sure you communicate the change well. Our tips for doing this include:

- Communicate early. Figma announced pricing changes in December 2024 that took effect March 2025.

- Give people a warning and a discount (grace period) if you are going to raise their prices.

- Understand who is going to pay more or less. 98% of our data pipeline customers paid less, but for the 2% who paid more, we made sure to communicate why we did this and help lower the impact of the change.

- We try to grandfather existing customers’ pricing unless it is more expensive or we have a very good reason not to.

## 4. Settle free tier debates before they happen

The eternal questions for SaaS companies: How much free stuff should we give away? It's easy to either debate endlessly about this or fall into one of two extremes:

1. Give away as much as possible. Users love free stuff, increasing your free tier is a good way to get more users.

2. Charge for everything. This makes more money and money is good.

Ideally, there should be nuance to this. The best way to create this (and settle debates) is to have [clear principles for your free tier](/handbook/engineering/feature-pricing). For us, these are:

- Hobbyists or pre-PMF startups should be able to use PostHog for free. This creates ultra-valuable [word-of-mouth growth](/newsletter/marketing-for-devs). GitHub famously does the same.

- Be more generous than competitors, making it a no-brainer to choose PostHog. This often means a larger free tier with more features on that free tier. For example, we're one of the few session replay tools that offers mobile replays for free.

- Every product should be priced separately. This means separate free tiers for each product. For example, LLM analytics is separate from product analytics, even though they both use "events." Multi-product companies like Atlassian and AWS are our models here.

- Features that increase stickiness should be free (with a reasonable limit). A good question to ask here is: "If I were to switch away to a competitor, what would I feel like I am losing?" It's tough to leave Figma when all your projects and designs are in one place.

Principles prevent every discussion about the free tier from becoming a debate, while avoiding the extremes of giving away too much or charging for too little.

## 5. Billing will become a bottleneck

If you want to go beyond the simple subscription model most billing systems offer, you will need at least one engineer dedicated to it. 

This has been the case at PostHog as long as I’ve been here. Three years ago, billing was the [growth team’s responsibility](/blog/what-is-a-growth-engineer), but eventually transitioned to [a glue team focused on billing](/newsletter/glue-teams-vs-back-office-teams), which now has 4 people (as well as a support engineer).

Why do we need so many people involved in billing?

- It enables us to charge the way we want. It can be tempting to just accept the simple subscription model most billing systems offer, but this limits your ability to have pricing that aligns with your value creation. Our billing team lets us price products, add-ons, and platform packages how we want.

- The billing system needs the flexibility to handle many situations such as discounts, contracts, credits, invoicing, and weird payment methods (pay by cheque anyone?). 

- It needs to be reliable. Charge too much and customers will be super unhappy. Charge too little (or miss failed/late payments) and you are literally leaving money on the table.

Without someone dedicated to billing, pricing launches will be painful, your ability to charge users will be limited, and more errors and unhappy customers will pop up.

## 6. Make your pricing more predictable

Everyone hates being charged more than they expected. This, of course, hurts the customer, but it also hurts you, as it leads to more churn and a worse reputation.

The best way to prevent this is to make your pricing more predictable. Some ways to do this include:

- Creating a transparent and detailed [pricing page](/pricing). [Stripe](https://stripe.com/pricing) and [Twilio](https://www.twilio.com/pricing) are great examples of this. People want to know roughly how much they'll pay before they start. We take this a step further and list our [sales discounts](/handbook/growth/sales/contract-rules) publicly too.
    
![Pricing page](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_10_15_at_11_54_142x_e558079a03.png)
    
- Give users a clear view on how much they've spent so far and how much they are projected to spend. We do this on our billing page, along with [a billable usage dashboard](/templates/posthog-billable-usage) and a [docs page on ways to estimate your spend](/docs/billing/estimating-usage-costs).

- Add spend limits. If customers don't want to pay over a certain amount, respect that, but make it clear what they'll lose when they hit the cap.

- Help users tune their spend to what they're actually using. We do this by providing docs pages on cutting costs for most of our products like [product analytics](/docs/product-analytics/cutting-costs), [session replay](/docs/session-replay/cutting-costs), and [feature flags](/docs/feature-flags/cutting-costs). Data infrastructure companies like Snowflake, Supabase, and PlanetScale all offer ways to identify costly queries and resources to optimize their spend.

- As a last resort, be generous with refunds. For example, we have [side project insurance](/side-project-insurance) that protects customers from huge bills if their product goes viral.

Some may call this "leaving money on the table" but we see it as doing the right thing. I’m sure others have had success with the dodgiest pricing tactics possible, but the trust we’ve built with customers is core to what makes PostHog successful, so we won’t be changing these.