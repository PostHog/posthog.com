---
title: WTF is a forward deployed engineer, and why is everyone hiring them?
date: 2026-02-06
author:
  - jina-yoon
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
  - Product engineers
crosspost:
  - Product engineers
---

If you've been living anywhere except under a rock lately, you've probably heard the term **forward deployed engineer** 50 times by now and thought: WTF does that even mean?

This role has been called “the hottest job in startups” according to [a16z](https://x.com/a16z/status/1930774473445142934), with [800% growth](https://www.ft.com/content/91002071-7874-4cb7-9245-08ca0571c408) in 2025. Companies that are hiring or have hired for this position include [OpenAI](https://openai.com/careers/forward-deployed-engineer-(fde)-sf-san-francisco/), [Anthropic](https://job-boards.greenhouse.io/anthropic/jobs/5079562008), [Databricks](https://www.databricks.com/company/careers/professional-services-operations/forward-deployed-engineer-fde-8251119002), [Ramp](https://builders.ramp.com/post/forward-deployed-engineering), and even [yours truly](https://posthog.com/community/profiles/32997). But why?

## WTF is a forward deployed engineer?

A [forward deployed engineer](https://www.youtube.com/watch?v=Zyw-YA0k3xo) (FDE) is an engineer who sits at the customer site and fills the gap between what your product already does, and what that customer needs. They're like product engineers, but they focus on discovery, development, and delivery “from the inside” of the customer’s world rather than "side-by-side" with prospective and current users.

The role originally formed at [Palantir](https://blog.palantir.com/a-day-in-the-life-of-a-palantir-forward-deployed-software-engineer-45ef2de257b1). As an intelligence software company, Palantir found that their target customers’ needs weren’t always super accessible and available for developers to build for; after all, things in that space are… top secret. Palantir found success with a model where engineers are “forward deployed” at the customer’s locations where they could directly and confidentially talk to users. 

Being onsite with customers lets FDEs get familiar with customer’s existing tech stack and pain points, which enables deep product discovery. It's a win-win: as FDEs solve problems, the customer gets highly customized solutions. The FDEs gain valuable domain-specific knowledge that then informs further product development. 

For example, when OpenAI was working on their voice models, they sent FDEs to a customer to work on call center automation. The customer was skeptical at first; the model wasn't good enough for them to use it in prod. So the FDEs created evals, took that data back to OpenAI's research team, and worked on improving the model's performance with the customer. Eventually, the customer became the first to deploy it, and these improvements were made widely available in their [Realtime API](https://platform.openai.com/docs/guides/realtime).

## What do forward deployed engineers actually do?

The life of an FDE is pretty similar to other software engineers, except that they are onsite (physically or virtually) to develop for the customer's needs. This means they do a ton of meetings and customer-facing work, and are often required to travel.

At [Palantir](https://blog.palantir.com/a-day-in-the-life-of-a-palantir-forward-deployed-software-engineer-45ef2de257b1), an FDE's day to day looks like something like:

1. Meeting with customers to understand the problem
2. Designing, writing, and testing software according to those needs
3. Configuring existing products (like AI models, or stability improvements) to unlock functionality for a customer 
4. Communicating with product teams “back home” about customer feedback

That said, every company is different. As the role evolves and becomes more popular, there are [variations](https://bloomberry.com/blog/i-analyzed-1000-forward-deployed-engineer-jobs-what-i-learned/) of FDE jobs ranging from building to sales to RevOps. We're focused on the builder role, but at some places, FDEs are closer to technical consultants or sales engineers.

## How are they different from product engineers?

The role of an FDE is to work onsite with customers to do product discovery and implementation in a way that is specific to that customer. FDEs spend more time talking to customers and scoping projects [than other software engineers](https://blog.palantir.com/dev-versus-delta-demystifying-engineering-roles-at-palantir-ad44c2a6e87).

FDEs are usually found at companies that have products that are more like a “platform” or suite of tools that need hands-on work to implement. That's why they're more common at startups with highly technical products, like developer tools and AI. The product discovery and development cycle starts with specialized use cases, and then gets generalized later.

(Image: Diagram of converge > converge > diverge)

Product engineers, on the other hand, don’t focus on a single customer at a time. They do talk to users, but their goal is to solve a problem that many people have by building a reusable product. They start out with lots of MVPs until they find product-market fit, zoom in on that, then zoom back out to scale up to sell to lots of people.

(Image: Diagram of diverge > contract > diverge)

[Bob McGrew](https://www.youtube.com/watch?v=Zyw-YA0k3xo), an early executive at Palantir, describes that at companies that hire both, FDEs are in charge of building a rough gravel road for where the product needs to go. The product team then figures out how to generalize that gravel road for the next ten customers and turn it into a paved superhighway.


## Why does it feel like everyone is hiring forward deployed engineers right now?

The obvious answer is AI. 

Since AI is a completely new type of product, there are too many problems that have never been solved before. Talking to users helps engineers identify problems to build for. But that's what product engineers already do – why are people taking a different approach now?

It's because AI requires lots of custom-fitting to work properly. [Anjor Kanekar](https://anjor.xyz/), an FDE at Palantir for more than seven years, puts it [this way](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers):

"AI companies have a problem that the FDE is really well suited to solve. There is a gap between foundational model capabilities and the application of those in enterprise use cases where they can add value. The FDE model is a way of doing the R&D work of figuring out the 'app layer' in a really effective way. AI companies have the models, but they need to figure out what exactly needs to be built using the models to make inroads into large enterprises / public sector."


## What kinds of people become forward deployed engineers?

Companies look to [hire](https://builders.ramp.com/post/forward-deployed-engineering#:~:text=to%20learn%20from.-,How%20we%20hire%20FDEs,-In%20order%20to) forward deployed engineer is someone with...

- **Solid engineering experience.** Bring 5+ years of engineering or technical deployment experience that includes customer-facing work ([OpenAI](https://openai.com/careers/forward-deployed-engineer-singapore-singapore/)).

- **Customer empathy.** Are humble, collaborative, and eager to help others with empathy ([OpenAI](https://openai.com/careers/forward-deployed-engineer-gov-washington-dc/)).

- **Excellent communication skills.** Executive presence and ability to represent the company in customer-facing situations ([Lambda](https://jobs.ashbyhq.com/lambda/edf27274-786e-488c-9e8a-0ded1aad1974)).

- **A collaborative attitude.** Strong communication skills to conduct discovery with customers and to convey technical concepts to diverse stakeholders while maintaining a low ego and collaborative approach ([Anthropic](https://job-boards.greenhouse.io/anthropic/jobs/5079562008)).

- **Product sense.** Contribute accelerators, frameworks, and best practices that scale impact across accounts and influence the product roadmap ([Databricks](https://www.databricks.com/company/careers/professional-services-operations/forward-deployed-engineer-fde-8251119002)).

- **Domain expertise.** Experience with customer-facing ownership in biotech, pharma, clinical research, or scientific software; PhD, MS, or equivalent applied experience in a life sciences relevant field encouraged ([OpenAI](https://jobs.ashbyhq.com/openai/d2ab1c9b-5c0c-4b43-a7c3-c9301854c023)).

- **Passion for the process.** You love mixing engineering, consulting, and delivery, owning every step of the journey ([HackerRank](https://www.hackerrank.com/careers/job?id=7348505#Forward%20Deployed%20Engineer)).

[Shyam Sankar](https://www.linkedin.com/in/shyamsankar), President and CTO of Palantir, has been [quoted](https://www.youtube.com/watch?v=Zyw-YA0k3xo) saying that people who are “heretics” or “rebels” in their domain make for perfect FDEs because they have the unique depth, context, and energy that can unlock 10x growth in a business.

If you haven't noticed yet, all of these are traits that also make for great product engineers and founders. It's no wonder why so many former Palantir employees go on to [start their own companies](https://www.businessinsider.com/palantirs-forward-deployed-engineer-role-churns-out-startup-founders-2025-6). 

## When should I hire our first forward deployed engineer?

If the product-market fit playbook is already working for you, the answer is that [you shouldn’t](https://www.youtube.com/watch?v=Zyw-YA0k3xo). 

(Image: dont try this at home kids meme)

In the [FDE model](https://www.futureventures.ca/insights/understanding-the-forward-deployed-engineering-model), you lose lots of money early on. You start by solving one of their CEO’s top five problems, then you earn the right to solve bigger problems for them. But until that happens, you are spending lots of money and headcount to keep engineers onsite. This can take multiple years for a single customer.

The goal is not necessarily to land as many contracts as possible, but to grow deep and valuable contracts from each customer.

That’s why FDE teams make sense for companies where the product requires a lot of hands-on work for implementation. The only other clear category is for companies in regulated verticals like defense, intelligence, and government.

If those don’t sound like you, then you probably don’t need FDEs (yet). The need for FDEs organically becomes clear when your company decides to tackle new verticals, AI challenges, or massivee scale. This is what happened to [Ramp](https://builders.ramp.com/post/forward-deployed-engineering) in 2023. The FDE team formed naturally as the scaling needs of enterprise became obvious.

# Why did we hire a forward deployed engineer at PostHog?

We pride ourselves on having tools that are already awesome out of the box, so you might wonder why we created an FDE role if it's supposedly all about hands-on customization for big, hairy enterprise problems. 

(TODO: Pending context and feedback from talent team)
