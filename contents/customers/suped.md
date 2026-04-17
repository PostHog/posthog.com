---
title: How Suped is consolidating product data and email automation with PostHog Workflows
customer: Suped
featuredImage: >-
   https://res.cloudinary.com/dmukukwp6/image/upload/2026_Suped_bb639c38a5.png
date: 2026-03-03
---


[Suped](https://www.suped.com/) is an email authentication and deliverability platform. The company helps businesses configure DMARC, monitor outbound email security, and resolve deliverability issues before they affect revenue.

Michael Ko, Suped’s Co-Founder and CEO, previously worked in product management while also owning parts of marketing. That combination shaped how he thinks about tooling. He cares less about having more software and more about how systems fit together.

From the beginning, Suped relied on PostHog for [Product Analytics](/product-analytics) and [Session Replay](/session-replay). Understanding user behavior inside the product was critical and those tools helped the team understand the problems users were trying to solve. But, they also wanted to _do_ things with that data. They needed onboarding flows, transactional emails, and alert notification systems that could trigger based on user actions. Initially, those lived in Customer.io.

<OSQuote
  customer="suped"
  author="michael_ko"
  quote={0}
/>

![Suped product screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/suped_product_screenshot_20ca42213a.png)

Over time, it became more and more difficult to maintain these comms in a separate point solution, particularly for transactional emails. The team started looking around for a new solution and when [PostHog Workflows](/workflows) launched they realized they didn't need to maintain a separate platform for sending emails at all. 

## The stack before Workflows

Suped’s early setup will look familiar to most startups:

- Product analytics and session replay in PostHog
- Email campaigns and broadcasts in Customer.io
- Transactional emails handled separately

Customer.io worked well, but structurally, it meant product data lived in one system while messaging logic lived in another.

Even with connectors in place, duplication created overhead. Every new event or user property required coordination. Every campaign depended on data flowing correctly between tools. Over time, the team found themselves maintaining integrations instead of simply building on top of the data they already had.

## Moving email automation into PostHog

When PostHog introduced Workflows, it offered Suped a way to move automation closer to where their data already lived. Instead of syncing product events into a separate system, they could build directly on top of the same data powering their analytics.

Today, Suped uses Workflows for:

- Onboarding email sequences
- Transactional emails, including password resets and invite flows
- Alert emails tied directly to product activity
- More advanced automations previously built in Customer.io

<OSQuote
  customer="suped"
  author="michael_ko"
  quote={1}
/>

Instead of piping product data into an external ESP and rebuilding logic there, Suped defines automation in the same environment where user behavior is analyzed. For a technical founder, that architectural simplicity matters more than surface-level features.

This is an example of one of the workflows they set up with PostHog: 

![Workflow product screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/suped_workflow_85cbc44bf4.png)

## Handling complex transactional emails

Suped’s emails aren’t just simple welcome messages. Many include:

- Heavy use of variables in subject lines and bodies
- Conditional logic blocks
- Dynamically rendered HTML
- Custom images and externally generated content

When you’re working with this level of complexity, testing once and hoping for the best isn’t enough. Variables interact with each other, conditional branches change layouts, and edge cases only show up in specific scenarios. The team needs to be able to see exactly what was sent to a specific user, how it rendered, and whether the logic behaved the way they expected.

This is one of the emails they created with PostHog: 

![suped rich email example](https://res.cloudinary.com/dmukukwp6/image/upload/suped_rich_email_fc71780c01.png)

Bringing automation into the same system as their product data makes that process more straightforward. Events, user properties, and messaging logic all reference the same source of truth, which reduces the guesswork when something needs to be adjusted. Instead of tracing issues across multiple tools, the team can iterate in one place and move on.

_“If we add a new event in the product, we can immediately use it in a workflow. There’s no separate sync, no waiting on another system. It makes experimentation a lot more straightforward.”_ - Michael Ko, Co-founder @ Suped

## Why consolidation matters

Cost played a role in the move away from Customer.io, but it wasn’t the primary driver. The deeper motivation was reducing coordination overhead, which unlocked: 

- Faster iteration on onboarding flows
- Easier experimentation with new automations
- Less engineering time spent maintaining integrations
- A single source of truth for user behavior and messaging

_“If product data and messaging are going to be tightly connected anyway, it makes sense for them to live in the same place.”_ - Michael Ko, Co-founder @ Suped

Running [Workflows](https://app.posthog.com/workflow) inside PostHog removes a layer of maintenance from their stack. That leaves the team with more time to work on their core product instead of managing how their tools talk to each other.




