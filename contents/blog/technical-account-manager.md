---
title: WTF is a technical account manager? (and why startups hire them)
date: 2026-09-25
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

Products have gotten broader and more technical. Seemingly [everyone is an engineer now](/newsletter/engineeringification-of-everything). The products engineers value (and pay for) require more knowledge to implement and use effectively. For example:

- Using Stripe means understanding how to integrate subscriptions or credit payments and billing with the product you offer.

- Hosting on Vercel requires a knowledge of the infrastructure services they offer and rewriting your codebase to fit within them.

- Installing PostHog might mean integrating feature flags into page render logic and writing SQL queries across multiple sources using complex joins.

Engineers are skeptical of how much "non-technical" people can help with all this. TAMs must add technical value or engineers will tune them out.

Along with this, SaaS has moved away from simple subscriptions. There is much more usage or credit-based pricing. AI accelerated this trend. This means there is more work to do to figure out what the correct amount of spend is for a given account, as well as work to do to optimize that spend. There's an expectation TAMs will help with this.

In return for all of this, customers and companies are opting for longer and larger contracts. There are better incentives to be aligned and build a relationship for the long run. TAMs are the primary role responsible for all of this.

## What do technical account managers do?

The main goal of TAMs is to make sure the product is working properly for the customer. This can even mean that they use it less. TAMs at PostHog have [cut a customer's bill by ~20%](/blog/customer-success-at-posthog#900-am-the-part-where-we-try-to-reduce-a-customers-bill) by tuning event and session replay autocapture for example. This is seen as a win for us as it creates trust and often leads to a customer renewing.

Beyond cutting bills, TAMs spend their days interacting with customers (mostly engineers) to help solve their problems such as:

- Planning usage of a product such as how much to provision, best practices around implementation and usage as well as how to integrate with their existing app. 

- Fixing broken implementations like making requests to change data regardless of whether it actually changed or collecting data that's not being used.

- [Optimizing spend](/handbook/growth/sales/expansion-and-retention) like making sure customers are actually using what they pay for and only pay for features that bring them value. TAMs at PostHog often find companies capturing tens of thousands of events they never actually use. 

- Handling bug and feature requests either by routing them to the right teams internally or by [writing fixes themselves](/blog/customer-success-at-posthog). 

- Migrating and integrating with other tools in the customer's existing stack, answering questions about differences and constraints. For example, a team moving from LaunchDarkly to PostHog would need to know PostHog flags live in a single project rather than across environments and that release conditions replace rules.

- Expanding both the products customers are using and the users using them. New product launches at PostHog like [Replay Vision](/replay-vision) often lead to new conversations about how they can be valuable. TAMs often also run [training sessions](/handbook/growth/sales/customer-training) for the customer's teams. 

The best technical account managers do all of this proactively. They have alerts for when accounts are assigned to them or when their assigned accounts have an anomaly worth exploring. This might trigger them to do something like the cost audit mentioned at the beginning of this section. 

## How are TAMs different than other roles?

The closest role to a technical account manager is a [customer success manager](/blog/customer-success-at-posthog). At some companies, they literally are the same role (renamed because engineers prefer someone with "technical" in their title). Alternatively, a TAM can be a more senior specialist above a CSM (Zapier and Wiz do this).

Another similar role is the [forward deployed engineer](/blog/forward-deployed-engineer) (FDE). Generally, FDEs would embed and work within a customer's team to implement a product, but some of their work can overlap with TAMs. For example, at [Vercel](https://vercel.com/careers/technical-account-manager-6121381004), TAMs sit in the forward deployed engineering organization. In this case, TAMs would generate revenue while CSMs would drive retention. They say:

> This is a billable, customer-funded role. Customers purchase Senior TAM engagement as part of their Vercel relationship, and you will carry a portfolio of concurrent accounts.

TAMs at many companies work in partnership with account executives (AE), salespeople who work with potential or renewing customers. TAMs focus on the technical aspects of a deal while AEs focus on the "money" parts (price, contract, term). This can mean AEs work with accounts more before they close and TAMs after, but a big account (with big renewals) might have both an AE and TAM attached.

Support engineers also help customers solve problems, but at a much higher volume than TAMs and they aren't usually attached to accounts.

![Sales roles 2x2](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_09_24_at_15_49_34_2x_8461cd9e32.png)

## What's different about TAMs at PostHog?

As you might guess, PostHog is not most companies. Technical account managers here have many of the same responsibilities in terms of supporting customers, but at PostHog, they also have commercial responsibilities too. 

![PostHog TAM 2x2](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_09_24_at_15_50_08_2x_d71440ec8e.png)

You can think of TAMs at PostHog as salespeople. They: 

- Interact with customers to sell PostHog. They understand our ideal customer profile, what matters to them, and how what we offer can provide value.

- Own and maintain the customer relationship. Literally "manage the account." This means being the primary point of contact for sales conversations, issues that arise, and new features that release.

- Care about expansion. Because the products they sell are usage-based, they need their customers to use it more to grow. They're not just focused on new business or renewals. This is built into [how they get paid](/handbook/growth/sales/how-we-work#how-commission-works---technical-account-managers). 

Where everyone else splits by technical versus commercial, PostHog splits by customer lifecycle, roughly:

- A technical account executive lands
- A technical account manager expands
- And a technical customer success manager retains

All of them are expected to be technical. To encourage this, in their first week at PostHog, new TAMs set up PostHog in an app of theirs. TAMs also regularly ship fixes to the main PostHog app, like Will adding the ability to [render markdown source pasted into notebooks](https://github.com/PostHog/posthog/pull/59142) because his account asked for it.

![Will's PR](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_09_17_at_15_07_10_2x_7944f936b9.png)

## What type of people succeed as TAMs?

Skill-wise, TAMs often have experience in other technical roles. Job postings list solutions engineer, support engineer, DevOps consultant, technical program manager, and customer success engineer as feeder roles. 

TAM job postings also look for quite senior people. Wiz asks for 8–12 years, Zapier 7+, Figma 5–7, Lambda 5+, and Okta 3+. It takes experience working with customers and solving technical problems to succeed as a TAM.
 
Beyond being comfortable interacting with engineering teams without a translator, TAMs need to be builders. They should be able to script, write SQL, build sample apps, and know what dashboards are worth looking at.

As for more character traits, a good way to summarize is that great TAMs are [low ego but also stubborn](/handbook/growth/sales/tam-excellence). They realize they might not know what a customer needs to succeed, but are confident that they can figure it out. They also need to have a willingness to turn around even the most disgruntled and unreasonable customer, because they'll be working with them for the long run no matter what. 

### What type of TAMs does PostHog look for?

Because TAMs are special at PostHog, we also have special requirements for them. Generally, we look for two types of people:

- Account executives who have owned longer term customer relationships and are technical enough to hold their own. They won't be bringing engineers to their demos for example. We look for salespeople who have built their own vibe coded tools and side projects.
- Sales engineers or product specialists who are tired of letting the sales team get all the credit. Some of our TAMs are literally ex-product engineers.

We then empower these people to really make our customers successful, even if that means smaller renewals. We count our anti-revenue wins as wins too. 

If this sounds interesting to you, [we're hiring](/careers).