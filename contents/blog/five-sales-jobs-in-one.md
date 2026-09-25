---
title: "Five sales jobs in one"
date: 2026-10-06
author:
  - leonhard-prinz
category: General
tags:
  - Inside PostHog
seo:
  metaTitle: "What sales at PostHog actually looks like: five jobs in one"
  metaDescription: "What a decade of enterprise sales looks like after a year of product-led sales, usage-based pricing, AI for the operational work, and shipping product PRs from the sales team."
---


If you opened the internet or even looked at billboards in major cities in the last year, you may have gotten the impression that AI will take over all (sales) jobs. Truth is, it is not really new.

Every few decades, a new technology comes along, and everyone claims that "sales is dead". It started with the telephone, then the internet, and now AI. While the statement is overblown, the changes to the job are very real.

Coming from a decade of enterprise sales I went through quite the learning curve at PostHog which I wanted to reflect on and share here because I think it also resembles a larger transformation of sales roles that is observable in the market and might help others going through similar changes.

I spent most of my career selling HR and finance software, and the data in that space has been clear in recent years that there is a general push towards "Superjobs", or what Josh Bersin calls the [superworker](https://joshbersin.com/2025/01/the-rise-of-the-superworker-delivering-on-the-promise-of-ai/), powered by new productivity technology.

## Five jobs in one

At PostHog, the sales role is effectively combining five different jobs into one:

- SDR
- Account Executive
- Solution Consultant/Engineer
- Services/Deployment Specialist
- Value Manager

That is only possible due to the systemic way we are engaging customers as well as AI.

## Product-led changes the job

In my last enterprise job, I've built up a whole team in order to figure out how to scale our sales-led approach to more and more customers. It was a massive undertaking, and it is really hard to pull off once you are organizationally set up to grow by contract first, pay first, then implement.

At PostHog, all that is much simpler. Since it's product-led, customers can try out the platform themselves and see the value on their own data and products. That is true for new customers and existing ones wanting to solve a new problem.

This changes a few things significantly:

- Every lead is warm, so you are not cold calling people competing with robots and other spam for their attention.
- You know their usage before you decide to invest your time, so you can focus your time on the companies and people who are "doing" and not just building slide decks of change
- they might already have a business case, since they usually start with their most critical challenges. You have something meaningful to start with for every interaction.

This makes selling much more fun, because you are actively working with people who are warm to you (mostly) and are receptive to discussions for improvements.

In the enterprise world, we were able to sell 5 or 7-year contracts for functionality that would be implemented successively. This caused many situations of "shelf-ware" where a company paid for a feature but never got to implement it, which can cause enormous frustrations in the relationships. It is the way it has "always" been done, and for some, it feels safer to "buy" a product this way and move on with their careers.

PostHog on the other side decided deliberately to implement a usage-based cost system, which [adds complexity upfront](/handbook/how-we-make-money), but for sales creates enormous transparency. You only pay for what you use! So that encourages the sales teams to pursue genuine adoption and fight for projects till the end, which again in turn creates a more relevant, long-term situation for everyone.

This year I cut one customer's spend with us by 60% and still hit my quota. They started using us when they were a small startup and never touched their feature flag architecture since. I drafted three PRs against their open source repo to modernize the flag setup, which resulted in dramatic cost savings for them, and built a relationship that let us venture past feature flags. In my old world that is not something you do. Here it makes long term sense for both sides, they pay for what they actually use, and the relationship is built on that instead of on a contract someone signed years ago. That full autonomy is very unusual in sales.

## AI accelerates the operational work

On the other hand, AI is a massive accelerator for operational sales work. In the past, I've spent days in Salesforce, or building out demo environments, doing feature requests, and more.

Thanks to the Salesforce MCP, I have not logged into the Salesforce UI in over a month. Only to verify the work and for closed-won or closed-lost. My entire opportunity review is now a skill in PostHog Desktop (or Claude) that looks at my notes and then interviews me opp by opp for an update and writes it directly into Salesforce. This has condensed that operational time by 80%.

The same goes for the numbers side of the job. I recently built a quota calculator that takes Stripe billing, Salesforce oops, customer analytics and so on and turns it into a per rep scenario plan of comp now and comp in the future. Took me a day.

Thanks to PostHog Desktop, building out my demo environment is easier than ever before -> generic demo data and even specific customer requests can be built in minutes because I can explain the situation, it builds out the solution and demo data, tests it in PostHog and in the browser, iterates, and then gives me the finished demo. Days of my solution consulting time have been spent on demo prep - now I can come with a super personalized demo in a fraction of the time.

Another large part of the high-end part of sales was strategic messaging. Understanding WHY the customers are doing what they are doing. And then formulating HOW we can help them - all packaged in a meaningful and creative way. This was something reserved to only the biggest customers, and we had entire teams dedicated to only the creative part. Almost like working in a bespoke ad agency. AI has again accelerated this work significantly. Researching accounts with deep research, identifying 3 key drivers, and even creating creative ways how to bring across the messages (digital Pokémon cards, a dinner booking game...) has become easier and faster than ever. The core sales work remains the same! But the execution just accelerated by 70%.

## Shipping it myself

And again, thanks to PostHog Desktop, I can now either submit customer feature requests as GitHub issues directly for the right engineering team - or just build it out myself. In the year I've been here, I went from never having logged into GitHub to shipping a handful of features into the product, a few dozen PRs on our internal tooling, and PRs against a customer's own open source repo - from sales! Those are small changes like having the ["experiments" option visible in the secret key dropdown](https://github.com/PostHog/posthog/pull/94502) or [sorting the Users tab in customer analytics by who logged in last](https://github.com/PostHog/posthog/pull/97224), up to bigger ones like the [front-end UI for our Surveys functionality on Android](https://github.com/PostHog/posthog-android/pull/541) and an [extended audit command in the PostHog wizard](https://github.com/PostHog/wizard/pull/452). So instead of waiting for roadblocks to be solved by engineering teams, I can accelerate that by providing context where it's meaningful to them - or just ship it myself.

## So how does five jobs in one work

So when I say it is five jobs in one, this is how that can work.

- With your SDR glasses on, you are constantly reaching out to new leads, just that since these leads are already customers, you can do so more efficiently and more value-adding. You are literally doing the most fun part of outreach because the success rate for each outbound message is so high.
- As an account executive, you need to understand the accounts you work with, their drivers, create opportunities, and manage the commercial work. The Salesforce MCP accelerates the operational work, leaving more time for the strategic parts. One of my accounts went from a product-led lead to 170k in that time.
- As a solution engineer, I build out more relevant demo scenarios faster than ever - allowing me to build trust by showing in the system instead of just talking about it hypothetically.
- With the services glasses on, I not only advise on the ideal set up but can literally help them through MCP prompts, or fix their implementation with PRs against their code directly. And I can measure the impact of my deployment consulting by the actual usage numbers going up.
- And as a value manager, I am able to pull testimonials together with a strategic messaging, bespoke demo to PROVE the value of that new functionality firsthand. PostHog does not do typical case studies of "they saved 50% of time - we measured it" - but since we are able to track ACTUAL usage and impact, the stories are easier to collect than in the past.

It also took me a bit to figure out a good balance here. I have automated a lot of my sales work with AI, but not the human part. Sitting down with a customer for dinner, or a call where someone tells you what is actually going on in their company, that is still me and I think it should stay that way. The prep, the notes, the Salesforce updates, the demo data, that is where the AI does the work. I think I have figured it out now, ask me again in a year.

So in the Sales Venn Diagram, the PostHog Sales role is in the middle. It is a superjob, or in [Josh Bersin's words](https://joshbersin.com/2025/01/the-rise-of-the-superworker-delivering-on-the-promise-of-ai/) a superworker, "an individual who uses AI to dramatically enhance their productivity, performance, and creativity". But it's not stressful. It is actually less stressful due to the set-up and support than any other sales job I had so far. You are empowered to succeed - and you are working with people who want to ACTUALLY get stuff done - which is rewarding.

If this sounds like your kind of sales job, [we are hiring technical customer success managers in EMEA](/careers/technical-customer-success-manager-emea) and [in the Americas](/careers/technical-customer-success-manager-americas).
