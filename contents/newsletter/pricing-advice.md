---
title: Non-obvious advice about pricing your product
date: 2025-10-27
author:
 - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/haha3_c997bbaf98.png
featuredImageType: full
tags:
  - Product
  - Founders
  - Revenue
crosspost:
  - Founders
  - Blog
---

We’re constantly thinking, debating, and learning about pricing at PostHog:

- Nearly [all of our 14+ apps](/products) have separate pricing, so we’re always figuring it out for new products, or adjusting it for existing ones.

- [Enduringly low prices](/handbook/low-prices) is a core value, which our customers love. In the last 12 months, we’ve cut pricing for [analytics events](/blog/analytics-pricing), [session replay](/blog/session-replay-pricing), [surveys](https://x.com/posthog/status/1960367921164693527), and [data pipelines](/blog/data-pipeline-pricing).

- There are over 100 [requests for comments](/handbook/company/communication#requests-for-comment-rfcs) (108 to be exact) about pricing in our private (sorry) product discussions repo, some with over 100 comments on them.

This is what we’ve learned.

## 1. How you price is who you are

Pricing isn’t just how you make money, it defines your identity, how you market, and how you sell. It’s just as impactful as your product’s functionality or design.

To illustrate, let’s imagine two feature flag tools.

**Feature Flags “R” Us** charges by **seats** and **flags created**:

- Their customers think about every flag and user they add, so they do less of both.
- The flags they do create are more heavily relied on.

This model appeals to companies that ship slowly and make more requests per flag. This means enterprise features, like auditability and access controls, are a priority.

**The Flag Company of New York** charges by **requests**:

- Their customers give access to every developer who create many more flags.
- This lets those developers use them more often (e.g. to [test in production](/product-engineers/testing-in-production))

This model appeals to companies who ship faster and want flexibility. They need to be more thoughtful about where flags go in code so they don’t spend too much, which means cost controls and DevEx features, like [local evaluation](/docs/feature-flags/local-evaluation), matter more.

In short, **how much** you charge often doesn’t matter as much as **how** you charge. While they’re superficially similar products, how these two products charge leads to a totally different experience, and different sales motions, too.

> **Remember this:** How you price your product should flow from your [ideal customer profile](/newsletter/ideal-customer-profile-framework) (ICP). Our ICP is high-growth startups that are led by [product engineers](/blog/what-is-a-product-engineer), which is why we’ve chosen a self-serve model and usage-based pricing. It gives product engineers control and they can use as many flags as they please.

<NewsletterForm />

## 2. Charging anything is better than giving it away

It’s easy to give things away, especially zero marginal cost software, but it’s a trap for early-stage startups. Typically, startups delay figuring out pricing because:

1. They are scared no one will pay them
2. They are afraid of getting pricing wrong and damaging growth
3. They think user growth is more important than revenue

But, unless you’re building Facebook, you’re always better off charging something as soon as possible, even if the unit economics don’t add up yet. Why? Because paying customers give you different, and more valuable, feedback than free users.

They care enough about your solution to give you money, so they’ll care more about it improving. They have skin in the game. This is why acquiring reference **customers** is a core part of [finding product-market fit](/founders/product-market-fit-game#level-5---onboard-your-first-5-reference-paying-customers).

![Charge anything](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/charge_c63bc4ec6c.jpg)

Don’t believe us? Consider the fate of Kite, a failed AI coding startup that had 500k monthly active users when it shut down. As the founder reflected in a [blog post](https://kite.com/):

> We failed to build a business because our product did not monetize, and it took too long to figure that out.
>
> We sequenced building our business in the following order: First we built our team, then the product, then distribution, and then monetization.

The first three steps worked. They built a “world-class engineering team” and grew the product to 500k developers with “almost no marketing spend.”

But monetization let them down. Those developers did not pay to use Kite. All the work on previous steps did not pay off and they had to shut down after seven years.

If they had charged earlier, they would have learned faster and possibly avoided the “innumerable sacrifices” they had to make it keep the business going for so long.

> **Remember this:** Pricing is just like product. The sooner you ship something, the sooner you’ll learn what users want. Speaking of which…

## 3. Frequently changing pricing is totally normal

You’ll almost certainly get your pricing wrong, especially if you are charging early. That’s normal, all companies do it.

PostHog’s early pricing was wildly different from [our pricing now](/pricing). In August 2020, we started as a monthly subscription with a limited free tier.

![August 2020 pricing](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/image_79_7970aa7ac4.png)

Later, in March 2021, we added our first iteration of usage-based pricing for a single product and have kept iterating on this model ever since.

![March 2021](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/image_80_e26b48a19e.png)

Finally, in May 2021, we increased our free tier for events 100x and this combination of usage-based pricing with a generous free tier has been the core of our pricing ever since.

![May 2021 pricing](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/image_81_ebf71cada1.png)

All of your favorite companies who aren’t called PostHog change their pricing regularly, too:

- **Notion** was paid only until [2020 when it added a free tier](https://www.notion.com/releases/2020-05-19) for personal use. It has since [expanded the free tier to remove any paid personal plans](https://www.notion.com/blog/notion-introduces-business-plan-and-expanded-free-plan), just focusing on paid teams plans.

- **Figma** launched an [enterprise plan in 2022](https://www.figma.com/blog/design-needs-everyone-new-plans-for-companies-that-design-together/) with more admin tools, workspaces, and access controls. It also [raised prices](https://www.figma.com/blog/billing-experience-update-2025/) for Figma Design in 2025.

- Intercom reinvigorated and [doubled its growth](https://lennysvault.com/insights/growth-scaling-tactics/fba11d05-3cf2-4591-a811-995a1fcb325c) by launching its AI agent, Fin, with outcome-based pricing.

Ultimately, changing your pricing when needed means you'll better align the value you create with how you charge for it. For example, we recently changed how we charge for [data pipelines](/docs/cdp) from events ingested to [rows exported and triggered events](/blog/data-pipeline-pricing) because it aligns better with that users actually used.

> **Remember this:** Pricing changes require good communication. Give customers:
>
> - Plenty of notice about changes. Figma gave three months.
> - A warning, grace period, and discount if you’re raising prices.
> - The option to keep old pricing unless it is more expensive or you have a good reason not to.

## 4. Settle free tier debates before they happen

How much free stuff should we give away? It’s easy to either debate this endlessly, or fall into one of two extremes:

1. **Give away as much as possible.** Users love free stuff, increasing your free tier is a good way to get more users.

2. **Charge for everything.** This makes more money and money is good.

Ideally, there should be nuance to this. The best way to create this (and settle debates) is to have [clear principles for your free tier](/handbook/engineering/feature-pricing). For us, these are:

- Hobbyists or pre-PMF startups should be able to use PostHog for free. This creates ultra-valuable [word-of-mouth growth](/newsletter/marketing-for-devs). GitHub famously does the same.

- Be more generous than competitors, making it a no-brainer to choose PostHog. This often means a larger free tier with more features. We’re one of the few session replay tools that offers [mobile session replay for free](/docs/session-replay/mobile), for example.

- Every product should be priced separately. This means separate free tiers for each product. [LLM analytics](/llm-analytics) is separate from product analytics, even though they both use “events.”

- Features that increase stickiness should be free with a reasonable limit. A good question to ask here is: “If I were to switch away to a competitor, what would I feel like I am losing?” It’s tough to leave Figma when all your projects and designs are in one place.

> **Remember this:** Principles prevent every discussion about the free tier from becoming a debate, while avoiding the extremes of giving away too much or charging for too little. Pricing principles should guide all your pricing decisions, too.

## 5. Billing will become a bottleneck

If you want to go beyond the simple subscription model most billing systems offer, you will need at least one engineer dedicated to it.

This has been the case at PostHog as long as I’ve been here. Three years ago, billing was the [growth team’s responsibility](/blog/what-is-a-growth-engineer), but eventually transitioned to [a glue team focused on billing](/newsletter/glue-teams-vs-back-office-teams), which now has four people and dedicated support engineer.

Why do we need so many people involved in billing?

- It enables us to charge the way we want. It can be tempting to just accept the simple subscription model most billing systems offer, but this limits your ability to have pricing that aligns with your value creation. Our billing team lets us price products, add-ons, and platform packages how we want.

- The billing system needs the flexibility to handle many situations, such as discounts, contracts, credits, invoicing, and weird payment methods (pay by cheque anyone? Please don’t).

- It needs to be reliable. Charge too much and customers will be super unhappy. Charge too little (or miss failed/late payments) and you are literally leaving money on the table.

- It enables us to make more accurate revenue models and projections, which helps us with everything from hiring to fundraising to product roadmaps.

> **Remember this:** Without someone dedicated to billing, pricing launches are painful, your ability to charge users is limited, more errors and unhappy customers pop up, and any decision involving revenue becomes more difficult.

## 6. Predictable and transparent pricing > simple pricing

Everyone hates being charged more than they expected. This, of course, hurts the customer, but it also hurts you, as it leads to more churn and a worse reputation.

The solution to this, for many companies, is to make their pricing simpler. Fewer tiers, a unified credit system, a single subscription for everything. For B2B companies, this is a mistake as it limits your ability to charge users for the value they receive.

The alternative we recommend is making your pricing more predictable and transparent. Some ways to do this include:

- **Creating a transparent and detailed [pricing page](/pricing).** [Stripe](https://stripe.com/pricing) and [Twilio](https://www.twilio.com/pricing) are great examples of this. People want to know roughly how much they’ll pay before they start. We take this a step further and list our [sales discounts](/handbook/growth/sales/contract-rules) publicly too.

![Pricing page](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_10_21_at_10_32_34_2x_3_8e37c9476b.png)

- **Give users a clear view on how much they’ve spent** so far and how much they are projected to spend. We do this on our billing page, along with [a billable usage dashboard](/templates/posthog-billable-usage) and a [docs page on ways to estimate your spend](/docs/billing/estimating-usage-costs).

- **Add spend limits.** If customers don’t want to pay over a certain amount, respect that, but make it clear what they’ll lose when they hit the cap.

![Spend limits](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Frame_6_2b103471fc.png)

- **Help users tune their spend** to what they’re actually using. Our <SmallTeam slug="customer-success" /> helps a lot with this and we provide docs pages on cutting costs for most of our products like [product analytics](/docs/product-analytics/cutting-costs), [session replay](/docs/session-replay/how-to-control-which-sessions-you-record), and [feature flags](/docs/feature-flags/cutting-costs). Data infrastructure companies like Snowflake, Supabase, and PlanetScale all offer ways to identify costly queries and resources to optimize their spend.

- **Be generous with refunds.** For example, we have [side project insurance](/side-project-insurance) that protects customers from huge bills if their product goes viral.

Some may call this “leaving money on the table” but we see it as doing the right thing. I’m sure others have had success with the dodgiest pricing tactics possible, but the trust we’ve built with customers is core to what makes PostHog successful, so we won’t be changing these.

<NewsletterForm />