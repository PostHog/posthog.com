---
title: WTF is a technical account manager? (and why startups hire them)
date: 2026-09-24
author:
  - ian-vanagas
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/harinezumi_943e9cc56e.png
featuredImageType: full
category: Engineering
tags:
  - Explainers
---

On the surface, a technical account manager (or TAM) is simple to define: They are responsible for helping customers set up, optimize, and maintain the product their company provides.

Think about this simple definition for a little bit and a bunch of other questions come to mind:

- Can't customers do this themselves?
- Why would companies want to do this anyway?
- How is this different from other support or sales roles?

This post aims to answer all these questions to uncover the truth behind the technical account manager and why so many companies like Stripe, Vercel, Figma, and Rippling are hiring them. 

## Why do technical account managers exist?

The technical account manager role makes much more sense when you look at the forces and incentives behind the role's rise in popularity.

Products have gotten more technical. Seemingly [everyone is an engineer now](/newsletter/engineeringification-of-everything). The products engineers find valuable require more knowledge to implement and use effectively. Engineers are a bit skeptical of "non-technical" people at the best of times, so TAMs must add technical value or engineers will tune them out.

More technical products create more elaborate setups. For example, a product might actually be multiple products, and they will almost always be wired into the infrastructure or app itself. TAMs provide the technical expertise to do this right and fix any issues along the way. 

Along with this, SaaS has moved away from simple subscriptions. There is much more usage or credit-based pricing. This means there is more work to do to figure out what the correct amount of spend is for a given account, as well as work to do to optimize that spend. There's an expectation companies will help with this.

The benefit is that, in return for all of this, customers and companies are opting for longer and larger contracts. There are better incentives to be aligned and build a relationship for the long run. TAMs are the primary role responsible for all of this.

## What do technical account managers do? 


TAMs spend their days interacting with customers (mostly engineers) to help solve their problems such as:

- Planning usage of a product such as how much to provision, best practices around implementation and usage as well as how to integrate with their existing app. 

- Fixing broken implementations like making requests to change data regardless of whether it actually changed or collecting data that's not being used.

- [Optimizing spend](/handbook/growth/sales/expansion-and-retention) like making sure customers are actually using what they pay for and only pay for features that bring them value.

- Handling bug and feature requests either by routing them to the right teams internally or by [writing fixes themselves](/blog/customer-success-at-posthog). 

- Migrating and integrating with other tools in the customer's existing stack, answering questions about differences and constraints. 

- Expanding both the products customers are using and the users using them. New product launches at PostHog like [Replay Vision](/replay-vision) often lead to new conversations about how they can be valuable. TAMs often also run [training sessions](/handbook/growth/sales/customer-training) for the customer's teams. 

The best technical account managers do all of this proactively. They have alerts for when accounts are assigned to them or when their assigned accounts have an anomaly worth exploring. This might trigger them to do something like a cost audit. TAMs at PostHog have [cut a customer's bill by ~20%](/blog/customer-success-at-posthog#900-am-the-part-where-we-try-to-reduce-a-customers-bill) by tuning event and session replay autocapture for example. This is seen as a win for us as it creates trust and often leads to a customer renewing.

TAMs also need to be [low ego but also stubborn](/handbook/growth/sales/tam-excellence) about difficult accounts. They need to have a willingness to turn around even the most disgruntled and unreasonable customer, because they'll be working with them for the long run no matter what. This mindset is one that sets truly great TAMs apart. 

## How are TAMs different than other roles?

The closest role to a technical account manager is a [customer success manager](/blog/customer-success-at-posthog). At some companies, they literally are the same role (renamed because engineers prefer someone with "technical" in their title). Alternatively, a TAM can be a more senior specialist above a CSM, like at Zapier and Wiz.

Another similar role is the [forward deployed engineer](/blog/forward-deployed-engineer) (FDE). Generally, FDEs would focus more on working with and embedding with the largest customers, but sometimes they overlap. For example, at [Vercel](https://vercel.com/careers/technical-account-manager-6121381004), TAMs sit in the forward deployed engineering organization. In this case, TAMs would generate revenue while CSMs would drive retention. They say:

> This is a billable, customer-funded role. Customers purchase Senior TAM engagement as part of their Vercel relationship, and you will carry a portfolio of concurrent accounts.

Another similar role is the account executive. These are salespeople working with potential or renewing customers. At most companies, a big account will have both an AE and a TAM attached. The difference is:

- The AE cares about price, contract, and term while the TAM cares about whether the product actually works. 
- An AE works mostly before a deal closes while a TAM mostly works after. 

Companies mostly treat these two roles as complementary and see partnership between them as key. 

![Sales roles 2x2](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_09_24_at_15_49_34_2x_8461cd9e32.png)

## What's different about TAMs at PostHog?

As you might guess, PostHog is not most companies. Technical account managers here are different from almost anywhere else. They have many of the same responsibilities in terms of supporting customers, but at PostHog, they also have commercial responsibilities too. 

![PostHog TAM 2x2](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_09_24_at_15_50_08_2x_d71440ec8e.png)

You can think of TAMs at PostHog as salespeople. They: 

- Interact with customers to sell PostHog. They understand our ideal customer profile, what matters to them, and how what we offer can provide value.

- Own and maintain the customer relationship. Literally "manage the account." This means being the primary point of contact for sales conversations, issues that arise, and new features that release.

- Care about expansion. Because the products they sell are usage-based, they need their customers to use it more to grow. They're not just focused on new business or renewals. This is built-in to [how they get paid](/handbook/growth/sales/how-we-work#how-commission-works---technical-account-managers). 

Where everyone else splits by technical versus commercial, PostHog splits by customer lifecycle:

- An account executive lands
- A technical account manager expands
- And a customer success manager retains

They still need to be technical and experts on the product though. To encourage this, in their first week at PostHog, new TAMs set up PostHog in an app of theirs. TAMs also regularly ship fixes to the main PostHog app, like Will adding the ability to [render markdown source pasted into notebooks](https://github.com/PostHog/posthog/pull/59142) because his account asked for it.

![Will's PR](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_09_17_at_15_07_10_2x_7944f936b9.png)

### What type of people succeed as TAMs at PostHog?

Because TAMs are special at PostHog, TAMs from other companies don't necessarily make the best ones here (although sometimes they do). Instead, we generally look for two types of people:

- Account executives who have owned longer term customer relationships and are technical enough to hold their own. They won't be bringing engineers to their demos for example. We look for salespeople who have built their own vibe coded tools and side projects.
- Sales engineers or product specialists who are tired of letting the sales team get all the credit. Some of our TAMs are literally ex-product engineers.

We then empower these people to really make our customers successful, even if that means smaller renewals. We count our anti-revenue wins as wins too. 

If this sounds interesting to you, [we're hiring](/careers).
