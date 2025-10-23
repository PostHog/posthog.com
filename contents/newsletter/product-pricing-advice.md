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

Pricing isn't just how you make money, it defines the type of company and brand you'll build. It's as impactful to the overall product experience as the functionality or design.

Imagine two [feature flag](/newsletter/feature-flag-mistakes) tools. The first charges by **seats** and **flags created**. 

Their customers think about every flag and user they add, meaning they do less of both, but the flags they do create are more important and are used more heavily. This model appeals to larger companies that ship slowly and make more requests per flag, and that means enterprise features like auditability and access controls are more important.

The second charges by **requests**. 

This means more developers can access and create flags. There are more flags created, but where they put those flags becomes more important, so they aren’t charged too much for requests. This appeals to smaller companies who ship more flags, so cost controls and DevEx features like local evaluation matter more.

These examples show **how much** you charge often doesn’t matter as much as **how** you charge. Moreover, how you charge will influence how you sell and market your product, too.

A usage-based model lends itself to faster, self-serve, product-led sales motions; seat-based pricing biases you toward slower, enterprise-style sales motion.

Ultimately, how you price your product should come from your [ideal customer profile](/newsletter/ideal-customer-profile-framework) (ICP). Our ICP is high-growth startups that are led by [product engineers](/blog/what-is-a-product-engineer). The ability self-serve and have pricing align with usage is important for them, so that is what we’ve gone with.

## 2. Charging something is better giving it away for free

It’s easy to give things away, especially zero marginal cost software, but it's a trap for any early-stage startup that wanting build a real business. You're always better off charging something as soon as possible, even if the unit economics don't add up yet.

Why does this matter? Because paying customers give you different, and typically more valuable, feedback than free users. They care enough about the problem you're solving to give you money, so they care more about it improving. They have skin in the game. 

This is why acquiring reference **customers** is a core part of [finding product-market fit](/founders/product-market-fit-game#level-5---onboard-your-first-5-reference-paying-customers).

There are three big reasons why companies don’t charge early:

1. **They are scared no one will pay them.** Delaying won't help you here.

2. **They are afraid they are going to get pricing wrong.** You probably will. That's the point of trying and learning.

3. **They think user growth is more important than revenue growth.** True if you're building Facebook, but rarely true for SaaS.

![Charging early](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/pasted_image_2025_10_21_T09_09_16_516_Z_216ab957a1.jpeg)

Not charging early can literally sink a startup. For example, the founder of [Kite](https://kite.com/), a failed AI coding startup, wrote:

> We failed to build a business because our product did not monetize, and it took too long to figure that out.
>
> We sequenced building our business in the following order: First we built our team, then the product, then distribution, and then monetization.

The first three steps all worked. They built a "world-class engineering team" and grew the product to 500k developers with almost no marketing spend. 

It was monetization that let them down. Those developers did not pay to use it. All the work they put into the previous steps did not pay off and they had to shut down after 7 years.

If they charged early, they would have at least been able to figure this out sooner.

## 3. Frequently changing pricing is totally normal

You'll almost certainly get your pricing wrong, especially if you are charging early. That's normal, we all do it.

For example, our early pricing was wildly different from our pricing now. In August 2020, we started as a monthly subscription.

![August 2020 pricing](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_10_03_at_14_24_21_2x_f828b75ded.png)

In October 2020, we then added more tiers along with more events and features on each one.

![October 2020 pricing](https://res.cloudinary.com/dmukukwp6/image/upload/w_1000,c_limit,q_auto,f_auto/Clean_Shot_2025_10_03_at_14_25_01_2x_bf96fbd6fc.png)

Finally, in March 2021, we added our first iteration of usage-based pricing for a single product and have kept iterating on this model ever since.

![March 2021 pricing](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_10_03_at_14_25_59_2xcroped_55c086d020.png)

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

## 6. Predictable and transparent pricing > simple pricing

Everyone hates being charged more than they expected. This, of course, hurts the customer, but it also hurts you, as it leads to more churn and a worse reputation.

The solution to this, for many companies, is to make their pricing simpler. Fewer tiers, a unified credit system, a single subscription for everything. This is a mistake as it limits your ability to charge users for the value they receive.

The alternative we recommend is making your pricing more predictable and transparent. Some ways to do this include:

- Creating a transparent and detailed [pricing page](/pricing). [Stripe](https://stripe.com/pricing) and [Twilio](https://www.twilio.com/pricing) are great examples of this. People want to know roughly how much they'll pay before they start. We take this a step further and list our [sales discounts](/handbook/growth/sales/contract-rules) publicly too.
    
![Pricing page](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_10_15_at_11_54_142x_e558079a03.png)
    
- Give users a clear view on how much they've spent so far and how much they are projected to spend. We do this on our billing page, along with [a billable usage dashboard](/templates/posthog-billable-usage) and a [docs page on ways to estimate your spend](/docs/billing/estimating-usage-costs).

- Add spend limits. If customers don't want to pay over a certain amount, respect that, but make it clear what they'll lose when they hit the cap.

![Spend limits](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_10_23_at_10_34_08_2x_c33e9fe6bd.png)

- Help users tune their spend to what they're actually using. Our [customer success team](/teams/customer-success) helps a lot with this and we provide docs pages on cutting costs for most of our products like [product analytics](/docs/product-analytics/cutting-costs), [session replay](/docs/session-replay/cutting-costs), and [feature flags](/docs/feature-flags/cutting-costs). Data infrastructure companies like Snowflake, Supabase, and PlanetScale all offer ways to identify costly queries and resources to optimize their spend.

- As a last resort, be generous with refunds. For example, we have [side project insurance](/side-project-insurance) that protects customers from huge bills if their product goes viral.

Some may call this "leaving money on the table" but we see it as doing the right thing. I’m sure others have had success with the dodgiest pricing tactics possible, but the trust we’ve built with customers is core to what makes PostHog successful, so we won’t be changing these.