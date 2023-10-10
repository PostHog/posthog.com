---
date: 2021-06-15
title: How we do customer support at our open source devtool company
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - mo-shehu
featuredImage: ../images/blog/customer-support-at-posthog/customer-support-at-posthog.jpg
category: Inside PostHog
tags:
  - Open source
  - Guides
---

## Thinner docs, better products

The highest priority for support at any company is shortening the feedback loop between your customers and your product team. The fastest way to achieve this is by having your product builders interface directly with your customers (like we do at PostHog). This gives you an idea of the types of problems that keep cropping up and lets you decide how much help content you need to create - but most importantly, it tells you how to improve and simplify the product experience to reduce the need for thicker help docs and extensive tutorials.

## A little background

Our very first support staff members were the founders, James and Tim, due to the limited resources and staff we had at the time. Having all hands on deck made a big difference, as you can’t afford to designate customer support to just one person in the early days. 

As of writing, customer support at PostHog happens in [“rotas”](https://posthog.com/handbook/growth/customer-support) - pre-planned, one-week cycles where one dev team member drops all development work and handles incoming user queries. Called a ‘Support Hero,’ this team member monitors all our channels - from GitHub and Slack to social media where applicable - and either solves the issues that surface or ropes in other team members for assistance. That last point is important, as having a support hero doesn’t abdicate everyone else from responding to customers. At PostHog, we firmly believe in “stepping on toes”: if you spot a problem that falls under someone else’s purview, just solve it.

We do not hire support people at PostHog. Instead, support is something that all of our engineers do on a rota basis. Yes, Tim as CTO still does it too.

## Removing friction

We don’t offer any special customer support training for our engineers beyond basic communication tips and tool guides. We serve other engineers - people who believe in honest, open communication sans the stifling friction and formality of typical consumer product companies. It’s also why we don’t use chatbots, internal triaging systems, or anything that would add an extra step between the user and our support heroes. In addition, we don’t tier our support based on the product edition you use. [Complex deployments](https://posthog.com/pricing) may receive a little extra effort, but we otherwise treat every support ticket with the same urgency.

Naturally, it would be harder for a company that started with frictional systems to move to a model like ours. Inertia is a powerful force, and stripping a support team of its crutches - fancy chatbot algorithms, ticket queuing systems, a large team - in favor of a smaller, leaner, and more focused team can be disruptive. If you run a devtool company, we recommend starting with the support hero model right from the start and building on from there.

## Tools and platforms: Papercups, Slack, email, and social

> Since this article was published we've launched a new way to get in touch. We now prefer to [handle bug reports, customer support and feedback via the app](https://app.posthog.com/home#supportModal) - but we've left the post below intact for posterity. 

[Papercups](https://papercups.io) is a lightweight customer support tool that we chose for several reasons:
It’s open-source, which aligns with our business philosophy.
Its core UX is delightful and straightforward to use, making it easy to onboard new support heroes.
It syncs all support tickets to Slack so our team can respond directly from the platform. Customer support teams are exempt from our [meeting-free days](https://posthog.com/blog/meetings) policy.
It tracks stats around the number and types of tickets we receive (about 30 a day), how long it takes us to close each ticket (about an hour on average, accounting for complexity and time zones), and other useful analytics.

Beyond Papercups and our [external Slack channel](https://posthog.com/slack), we also receive support queries via email (sent to hey@posthog.com), GitHub (where our team spends most of their time), and very rarely via [social media](https://twitter.com/PostHog). We’ve found that within the context of businesses like ours, social media queries are usually a sign that normal communication or helpdesk channels have failed - and startups should avoid this as much as possible.

## Are open-source support models expensive?

The beauty of open source is that it’s built on a passionate community of contributors who have an innate interest in seeing the product succeed. This voluntary dedication of time and energy means that problems get solved faster than they would with a dedicated team - and [our repo](https://github.com/posthog) is an excellent example of that. There’ve been plenty of instances where a user posts a question about the product or a challenge they’re facing, and one of our contributors chimes in to assist. When you’ve effectively generated extra support team members through your GitHub repo or Slack channel, you can spend less time responding to common queries and more time improving your product to prevent those queries cropping up again.

Would we do things differently if we were starting over? Barely. We might hone in on Slack as our main comms channel earlier in our journey, but we’re otherwise happy with how customer support at PostHog has evolved.

> PostHog is an open source analytics platform you can host yourself. We help you build better products faster, without user data ever leaving your infrastructure.

<ArrayCTA />
