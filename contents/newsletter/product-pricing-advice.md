---
title: Non-obvious advice about pricing your product
date: 2025-10-15
author:
 - ian-vanagas
tags:
 - feature flags
---

We care a lot about pricing at PostHog. As proof:

- Nearly [all of our products](/products) have separate pricing, meaning we are always figuring it out for new products or adjusting it for existing ones.

- [Enduringly low prices](/handbook/low-prices) is a core value of PostHog, which our customers love.

- There are over [100 RFCs](/newsletter/how-we-work-async#5-our-request-for-comments-process) (108 to be exact) about pricing in our private (sorry) product discussions repo.

All of this has meant we’ve thought, debated, and learned a lot about pricing. We’re sharing the best bits we’ve learned here. 

## 1. Charge early

If you’re hoping that your product is a business, you should charge early for it. It’s easy to give things away, especially zero marginal cost software. It’s a lot harder to sell them.

The feedback you get from customers is very different from what you get from free users. If you’re trying to build a successful business, free users can lead you down the wrong path. This is why acquiring reference **customers** is a core part of [finding product market fit](/founders/product-market-fit-game#level-5---onboard-your-first-5-reference-paying-customers), for example.

There are two big reasons why companies don’t charge early:

1. They are scared no one will pay them.
2. They are afraid they are going to get pricing wrong.

These fears ignore the excitement of getting people to pay them, the fact that it is best to know early if someone won’t pay you, and that everyone gets their pricing wrong. 

For example, our early pricing was wildly different from our pricing now. It was a monthly subscription with a free trial and way fewer events.

![Early pricing](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_10_03_at_14_24_212x_097c5fc3f5.png)

## 2. It’s OK to change your pricing

What the above example shows is that your pricing is always going to be a bit wrong. We started as a monthly subscription but eventually changed to usage-based. We had paid self-hosted product but made the tough decision to [sunset it](/blog/sunsetting-helm-support-posthog).

To reach your full potential, you will need to change your pricing. Your product evolves, so should your pricing. All of your favorite companies do it:

- **Notion** used to be paid only until [2020 when they added a free tier](https://www.notion.com/releases/2020-05-19) for personal use. They’ve since [expanded the free tier to remove any paid personal plans](https://www.notion.com/blog/notion-introduces-business-plan-and-expanded-free-plan), just focusing on paid teams plans.

- **Figma** launched an [enterprise plan in 2022](https://www.figma.com/blog/design-needs-everyone-new-plans-for-companies-that-design-together/) with more admin tools, workspaces, and access controls. They also [raised prices](https://www.figma.com/blog/billing-experience-update-2025/) for Figma Design in 2025.

- **Intercom** reinvigorated and [doubled its growth](https://lennysvault.com/insights/growth-scaling-tactics/fba11d05-3cf2-4591-a811-995a1fcb325c) by launching its AI agent, Fin, with outcomes-based pricing.

![Fin pricing](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_10_13_at_16_41_562x_fd6884de36.png)

Changing your pricing enables you to better align the value you create with what you charge for it. For example, our [data pipelines product](/customer-data-infrastructure/destinations) used to be charged based on events ingested, but then [moved to rows exported and triggered events](/blog/data-pipeline-pricing) to better align what users actually used.

The important part of doing this is making sure you communicate the change well. Our tips for doing this include:

- Communicating early. Figma announced pricing changes in December 2024 that took effect March 2025.

- Give people a warning and a discount (grace period) if you are going to raise their prices.

- Understand who is going to pay more or less. 98% of our data pipeline customers paid less, but for the 2% who paid more, we made sure to communicate why we did this and help lower the impact of the change.

- We try to grandfather existing customers’ pricing unless it is more expensive or we have a very good reason not to.

## 3. How you price is who you are

Imagine two [feature flag](/newsletter/feature-flag-mistakes) tools, they charge by:

1. Seats and flags created.
2. Requests. 

Charging by seats and flags created will likely appeal to large enterprises who ship relatively few features. Enterprise features like auditability and access controls will likely be the focus.

Charging by requests means more developers can access and create flags, but might be more sensitive about where they put those flags in their app so they aren’t charged too much for requests.

These show the impact pricing can have on the overall product experience. **How much** you charge often doesn’t matter as much as **how** you charge and there are many ways this can vary like:

- Usage-based pricing vs. seat-based pricing.
- Pay-as-you-go vs. annual contracts.
- Self-serve vs. custom contracts with sales.

How you decide this likely comes down to your [ideal customer](/newsletter/ideal-customer-profile-framework). For us, that is [product engineers](/blog/what-is-a-product-engineer) at high-growth startups. The ability to self-serve and have usage-based pricing is important for them, so that is what we’ve gone with.

## 4. Know the three Cs of pricing

When it comes to setting your prices there are three Cs you should care about:

### Costs

For you to set prices properly, you need transparency into your costs. 

- How much does the infrastructure behind your product cost to run?
- What are the most expensive bits of your stack?
- How do these costs scale?

Our [infrastructure team](/teams/infrastructure) has done a lot of work on helping us understand this with tools like AWS cost allocation tags. 

Having an accurate picture of our costs enables us to price with enough margin to be sustainable as a business and discover areas for savings (which often get [passed along to users](/blog/session-replay-pricing)).

### Competitors

Users will size you up with competitors, so you better know how they are pricing.

“But I don’t have competitors…” you might say. There is almost always an alternative out there. How are your users accomplishing what your product accomplishes now? More importantly, how much does that cost?

Knowing how much competitors charge enables you to create a pricing model and compare your proposed pricing with them. Although you can’t always have the lowest price for all customers, this enables you to have competitive (ideally, cheaper) pricing for your ideal customers.

![Pricing model](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_10_15_at_11_48_112x_4a659ff7c3.png)

### Company

When I was first interviewing at PostHog, [James](/community/profiles/27732) very proudly told me it was default alive. This means that PostHog would become profitable before it ran out of money. 

Knowing this is a result of financial modelling [our ops team](/teams/people) does. We have hiring plans, revenue projections, team budgets and financial statements that help us figure out if we’re making enough and growing fast enough to be a world-class business. If not, pricing is one of the levers that can change this.

## 5. Be careful with your free tier

Your free tier is important for multiple different reasons:

- Your free tier is going to be how users experience your product for the first time.

- Increasing it is easy. Decreasing it is painful. Either way, changing your free tier will impact your revenue. Increasing [our survey’s](/surveys) free tier from 250 responses to 1500 lost us 55% of its short-term revenue.

- The features that **aren’t** on your free tier will be the ones customers need to upgrade to get.

If you aren’t careful with your free tier, you can either lose a lot of money or hamstring your growth. Our approach to getting this right involved [developing principles for our free tier](/handbook/engineering/feature-pricing) that include:

- Hobbyists or pre-PMF startups should be able to use PostHog for free.
- Be more generous than competitors, making it a no brainer to choose PostHog.
- Features that increase our stickiness should be free (with a reasonable limit).
- Features that need to be experienced in order to demonstrate value should be available on the free plan but with a reasonable limit.
- Features that have the potential to [grow our word-of-mouth](/newsletter/marketing-for-devs) should be free. For example, we shouldn't (and don't) charge for extra users in an org because the more people we get inside PostHog, the better.

These principles help us ensure that our free tier fits our business and make future decisions about our free tier easier.

## 6. Billing is a likely bottleneck

Billing, AKA the process of charging customers, is a lot of work. We have an [entire Glue team](/newsletter/glue-teams-vs-back-office-teams) as well as a support engineer dedicated to it. 

Why do we need so many people involved in billing?

- It enables us to charge the way we want. We don’t need to have simple, seat based pricing. We can have all of our products priced separately with add-ons and platform packages instead.

- The billing system needs the flexibility to handle many situations such as discounts, contracts, credits, invoicing, and weird payment methods (pay by cheque anyone?)

- It needs to be reliable. Charge too much and customers will be super unhappy. Charge too little (or missing failed/late payments) and you are literally leaving money on the table.

Billing has had at least one engineer dedicated to it as long as I’ve been at PostHog. Earlier, it was the [growth team’s responsibility](/blog/what-is-a-growth-engineer), but eventually transitioned to [a team entirely focused on billing](/teams/billing), which now has 4 people. This has helped ensure billing doesn’t become a bottleneck.

## 7. Help people trust your pricing

Being burned by pricing is one of the areas that can hurt the most. It costs customers real money when things are messed up here. 

Being burned doesn’t just mean overcharging or mischarging, it also means being unpredictable or uncontrollable. Our billing team has found that more unpredictability means more churn. 

We’ve developed both principles and tools to help people trust our pricing more. They include:

- A transparent and detailed [pricing page](/pricing). You’ll know roughly how much you’ll pay for PostHog before you start. We list our [sales discounts](/handbook/growth/sales/contract-rules) publicly too.
    
![Pricing page](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_10_15_at_11_54_142x_e558079a03.png)
    
- Projected spend, [a billable usage dashboard](/templates/posthog-billable-usage), and a [docs page on ways to estimate your spend](/docs/billing/estimating-usage-costs).

- Spend limits for all of our products. If you don’t want to pay us anything, we’ll be sure to respect that.

- Docs pages on cutting costs for most of our products like [product analytics](/docs/product-analytics/cutting-costs), [session replay](/docs/session-replay/cutting-costs), and [feature flags](/docs/feature-flags/cutting-costs).

- Generally being generous with refunds. For example, we have [side project insurance](/side-project-insurance) that protects customers from huge bills if their product goes viral.

These may seem like leaving money on the table, but we see them as doing the right thing. I’m sure others have had success with the dodgiest pricing tactics possible, but the trust we’ve built with customers is core to what makes PostHog successful, so we won’t be changing these.