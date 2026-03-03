---
title: WTF is a forward deployed engineer? (and why everyone is hiring them)
date: 2026-02-11
author:
  - jina-yoon
seoTitle: WTF is a forward deployed engineer (FDE)?
seoDescription: What they do, why they’re hot right now, and when you should hire one.
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

This role has been called “[the hottest job in startups](/newsletter/how-to-get-job-startup)” according to [a16z](https://x.com/a16z/status/1930774473445142934), with [800% growth](https://www.ft.com/content/91002071-7874-4cb7-9245-08ca0571c408) in 2025, and it's still a [hot topic](https://x.com/tbpn/status/2019520634771108041?t=200) with solid [trajectory](https://www.levels.fyi/t/forward-deployed-engineer) today. Companies that are hiring (or have hired) for this position include [OpenAI](https://openai.com/careers/forward-deployed-engineer-(fde)-sf-san-francisco/), [Anthropic](https://job-boards.greenhouse.io/anthropic/jobs/5079562008), [Databricks](https://www.databricks.com/company/careers/professional-services-operations/forward-deployed-engineer-fde-8251119002), [Ramp](https://builders.ramp.com/post/forward-deployed-engineering), and even [yours truly](https://posthog.com/community/profiles/32997). But why?

## WTF is a forward deployed engineer?

A [forward deployed engineer](https://www.youtube.com/watch?v=Zyw-YA0k3xo) (FDE) is an engineer who gets embedded in a customer's team to fill the gap between what your product does and what the customer needs. This can mean physically working from the customer's office for weeks, directly joining their Slack workspace, or accessing their actual infrastructure for onboarding and implementation.

The role originates from [Palantir](https://blog.palantir.com/a-day-in-the-life-of-a-palantir-forward-deployed-software-engineer-45ef2de257b1), who learned that even simple demos for intelligence software customers could require weeks of NDAs and security clearances. They found success with a model where engineers are “forward deployed” to customer sites where they work side-by-side with customers for product discovery and development with the right approvals and processes in place.

Being embedded on customer teams lets FDEs get familiar with customers' existing tech stack, pain points, and implementation challenges. Those learnings then get used by core product teams, who generalize them for other customers. It's a win-win: customers get highly customized solutions while FDEs gain valuable hands-on experience.

For example, [when OpenAI was working on their voice models](https://newsletter.pragmaticengineer.com/i/170794709/3-the-fde-role-at-openai), they sent FDEs to a customer working on call center automation. They built [evals](https://youtu.be/cBD7_R-Cizg?si=mgLw_sSyw9ln3zsD&t=540) to verify its performance and took that data back to the core research team to improve it further. Eventually, the customer became the first to deploy it in production, and these improvements became generally available in OpenAI's [Realtime API](https://platform.openai.com/docs/guides/realtime).

## What do forward deployed engineers actually do?

The life of a FDE is pretty similar to other software engineers, except that they are "onsite" to develop for the customer's needs. This means they do a ton of meetings and customer-facing work and are often required to travel 20-50% of the time (unless they only do virtual visits).

At [Palantir](https://blog.palantir.com/a-day-in-the-life-of-a-palantir-forward-deployed-software-engineer-45ef2de257b1), an FDE's day to day looks like something like:

1. Meeting with customers to understand the problem
2. Designing, writing, and testing software according to those needs
3. Configuring existing products (like AI models, or stability improvements) to unlock functionality for a customer 
4. Communicating with product teams “back home” about customer feedback

That said, every company is different. As the role evolves, [variations](https://bloomberry.com/blog/i-analyzed-1000-forward-deployed-engineer-jobs-what-i-learned/) of FDE jobs now range from product development to sales to RevOps. The original concept of the FDE is still all about actual implementation and engineering, but at some places, FDEs are much closer to technical consultants or sales engineers.

## Why does it feel like everyone is hiring forward deployed engineers right now?

The obvious answer is [AI](https://poly.ai/blog/forward-deployed-ai-engineers-enterprise-deployment/). [Anjor Kanekar](https://anjor.xyz/), an FDE at Palantir for more than seven years, put it [this way](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers):

> AI companies have a problem that the FDE is really well suited to solve. There is a gap between foundational model capabilities and the application of those in enterprise use cases where they can add value. The FDE model is a way of doing the R&D work of figuring out the 'app layer' in a really effective way. AI companies have the models, but they need to figure out what exactly needs to be built using the models to make inroads into large enterprises / public sector.

There are more factors beyond requiring tons of customization, though:

**1. AI privacy risks are real.** Companies don't want to hand over customer information, financial records, or proprietary data to vendors without establishing trust (especially for AI purposes). FDEs get permissions and longer-term access needed to work with that data directly because the contracts are for the product, not just the service.

**2. AI contract sizes are huge.** AI deals are huge. Like six, seven, eight-figures huge. When AI companies charge that much $$$, they can afford to send engineers onsite for months to make sure the product actually works the way it's supposed to. In the past, consultants used to do this kind of work, but AI companies can take the financial hit in order to secure better contracts and gain hands-on knowledge.

**3. Decisionmakers are skeptical about AI.** Most people – especially executives at traditional companies — don't fully believe in AI's usefulness yet and need to see it to believe it. Sales calls and demos aren't enough when there's so much at stake. FDEs bridge that gap by doing the work with the customer until they see real results with actual data.

## How are they different from software engineers?

FDEs still do software engineering, but they spend way more time [talking to customers](/newsletter/talk-to-users) and scoping projects [than other software engineers](https://blog.palantir.com/dev-versus-delta-demystifying-engineering-roles-at-palantir-ad44c2a6e87) to decide _what_ to build, and how. Their top priority is to deeply understand a customer's problems so that they can develop something that addresses it.

Software engineers, on the other hand, focus on building features that are generalizable and maintainable. They're less involved in direct customer conversations and more focused on solutions that work at scale.

[Bob McGrew](https://www.youtube.com/watch?v=Zyw-YA0k3xo), an early executive at Palantir, describes FDEs as the ones who build the rough gravel road for where the product needs to go. Software engineers from the core product team then work on turning that gravel road into a paved superhighway so that the next ten customers can also use it.

![FDE and SWE flowchart](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/fde_swe_diagram_55df712e39.png)

The key difference is that FDEs work on product discovery and development with _one_ customer at a time, and generalizability is a second priority. Software engineers typically build with many users in mind from the start, and thinking about scale is baked into their process.

|  | Forward Deployed Engineer | Software Engineer |
|--------|--------------------------|-------------------|
| **Primary focus** | Customer-specific solutions | Scalable, generalizable features |
| **Time with customers** | 60-80% of time | 10-20% of time |
| **Travel requirements** | 20-50% travel typical | Minimal to none |
| **Build approach** | Rapid, scrappy prototypes | Production-ready, maintainable code |
| **Success metric** | Customer satisfaction & contract renewal | Feature adoption & system stability |

> **Wait, what about product engineers?** [Product engineers](/blog/what-is-a-product-engineer) and FDEs are similar in that they both build quickly while talking to users to ship scrappy solutions that solve problems. The difference is in their setting and goals - product engineers aim to solve a problem that many people have so that they can create a reusable solution along the way, while FDEs are focused on one customer at a time.

## What kinds of people become forward deployed engineers?

Companies look to [hire](https://builders.ramp.com/post/forward-deployed-engineering#:~:text=to%20learn%20from.-,How%20we%20hire%20FDEs,-In%20order%20to) forward deployed engineers with...

- **Solid engineering experience.** Bring 5+ years of engineering or technical deployment experience that includes customer-facing work ([OpenAI](https://openai.com/careers/forward-deployed-engineer-singapore-singapore/)).

- **Customer empathy.** Are humble, collaborative, and eager to help others with empathy ([OpenAI](https://openai.com/careers/forward-deployed-engineer-gov-washington-dc/)).

- **Excellent [communication skills](/newsletter/communication-mistakes).** Executive presence and ability to represent the company in customer-facing situations ([Lambda](https://jobs.ashbyhq.com/lambda/edf27274-786e-488c-9e8a-0ded1aad1974)).

- **A collaborative attitude.** Strong communication skills to conduct discovery with customers and to convey technical concepts to diverse stakeholders while maintaining a low ego and collaborative approach ([Anthropic](https://job-boards.greenhouse.io/anthropic/jobs/5079562008)).

- **[Product sense](/newsletter/50-product-learnings).** Contribute accelerators, frameworks, and best practices that scale impact across accounts and influence the product roadmap ([Databricks](https://www.databricks.com/company/careers/professional-services-operations/forward-deployed-engineer-fde-8251119002)).

- **Domain expertise.** Experience with customer-facing ownership in biotech, pharma, clinical research, or scientific software; PhD, MS, or equivalent applied experience in a life sciences relevant field encouraged ([OpenAI](https://jobs.ashbyhq.com/openai/d2ab1c9b-5c0c-4b43-a7c3-c9301854c023)).

- **Passion for the process.** You love mixing engineering, consulting, and delivery, owning every step of the journey ([HackerRank](https://www.hackerrank.com/careers/job?id=7348505#Forward%20Deployed%20Engineer)).

[Shyam Sankar](https://www.linkedin.com/in/shyamsankar), President and CTO of Palantir, has been [quoted](https://www.youtube.com/watch?v=Zyw-YA0k3xo) that people who are “heretics” or “rebels” in their domain make for perfect FDEs because they have the unique depth, context, and energy that can unlock 3x-10x growth for a business.

(If you haven't noticed yet, all of these are traits that also make for [great product engineers](/blog/product-engineer-vs-software-engineer) and founders. It's no wonder why so many former Palantir employees go on to [start their own companies](https://www.businessinsider.com/palantirs-forward-deployed-engineer-role-churns-out-startup-founders-2025-6).)

## When should we hire a forward deployed engineer?

If the usual product-market fit playbook is already working for you, the answer is that [you shouldn't](https://www.youtube.com/watch?v=Zyw-YA0k3xo). The [FDE strategy](https://www.futureventures.ca/insights/understanding-the-forward-deployed-engineering-model) starts by solving one problem and earning the right to solve bigger ones, and that can take years for even a single customer. The goal is to land contracts that grow more valuable over time, but it has huge initial costs.

FDEs _do_ make sense for companies when:

**1. The product requires a lot of hands-on implementation AND you can eat the cost**

If your product needs deep integration with existing infrastructure and has huge margins, FDEs can justify their cost. This is why [so](https://scale.com/careers/4597399005) [many](https://www.ycombinator.com/companies/furtherai/jobs/2uFhWmi-forward-deployed-engineer) [AI](https://coreweave.com/careers/job?gh_jid=4651388006&board=weights_and_biases) [startups](https://job-boards.greenhouse.io/overlandai/jobs/5079000008) are hiring them now.

**2. The industry has strict regulations**

Industries like healthcare, finance, [government](https://www.ycombinator.com/companies/omniai/jobs/fuTMf2w-forward-deployed-engineer-onsite-s), and defense have lots of compliance requirements that make it hard to ship and iterate at scale. FDEs make sense here because they can specialize in those standards, approvals, and processes (like they did at Palantir).

**3. You're targeting new verticals or segments**

When your company is exploring entirely new customer profiles and ICPs, you don't know what you don't know. FDEs can embed with early customers to understand the space and do all the product discovery for breaking into that market. 

This is what happened with Ramp, a team that originally started out building for [small businesses](https://ramp.com/blog/expense-tracker-for-business) but added FDEs as they ran into technical challenges trying to meet the [needs of enterprise](https://builders.ramp.com/post/forward-deployed-engineering).

## Why did we just hire a forward deployed engineer at PostHog?

We pride ourselves on having tools that work out of the box, but there's a difference between "any developer can use PostHog in 10 minutes" and "this Fortune 500 company can migrate their entire analytics stack without spending months on it."

We hired our first FDE to help with these large-scale migrations, but we're doing it PostHog-style. Our FDE is fully remote, async, and focused on building automation. It's a weird experiment for those used to the typical FDE setup, but it makes sense for us. Many of the benefits (deep customer knowledge, faster iterations, etc.) can still work if we use the tons of usage data we already have instead of doing product discovery from scratch.

As AI capabilities improve, people have higher expectations for what enterprise software can accomplish. We think the FDE role will grow and evolve to meet that demand. And at the end of the day, we're still approaching this as a product engineering problem by staying close to customers – it's just that instead of talking to users, we're going to go _work_ with them.
