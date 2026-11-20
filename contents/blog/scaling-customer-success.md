---
title: Scaling customer success with PostHog
date: 2026-11-19
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - magda-olszewska
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/replacing_our_csp_with_customer_analytics_and_workflows_1_ea953da8a0.png
featuredImageType: full
ogImage: generated
category: Inside PostHog
tags:
    - Inside PostHog
    - Workflows
    - Customer Analytics
seo:
    metaTitle: How we replaced our CSP with Customer Analytics and Workflows
    metaDescription: "How PostHog's scaled customer success team replaced its customer success platform with Customer Analytics and Workflows to support ~700 customers."
---

[Our customer success team](/blog/customer-success-at-posthog) works with every customer above $20k ARR, but this leaves thousands of customers without someone to talk to.

Helping all these customers was the responsibility of the onboarding team, but as we did it more, we realized our efforts were more like customer success *scaled* so that’s what our team name is now.

The work of the <SmallTeam slug="scaled-customer-success" /> relies heavily on automations for customer records, account routing, prioritization, email sequences, follow-ups, alerts, sales handoffs, and more. We relied on an external customer success platform (CSP) to do this before.

Now PostHog is our customer success platform, thanks to [Customer Analytics](/docs/customer-analytics) and [Workflows](/workflows). Here’s why and how.

## Scaling customer success is about signals

When you think of “onboarding”, you probably imagine a kickoff call after a closed deal, an implementation plan, and a series of training sessions. Ours looked different.

PostHog is self-serve, so a customer signs up, starts sending data, and explores products without talking to us. By the time we reach them, they may have already implemented several products and be approaching their first real bill. Very often, they haven’t asked for help. They may not even know our team exists.

Signals from product usage, billing, and customer activity help us identify moments when customers might be struggling, missing out on value, or a churn risk. We then optimize a customer’s setup and billing, explore their data and identify gaps, find better ways to answer business questions, guide them to discover other useful aspects of PostHog, and make sure they will stay with us longer.

Additionally, we're the first customer-facing team at PostHog to operate at scale: four people support around 700 customers through one shared program. We don’t have individual books of business; instead, we rely on a pretty intricate automation system to make sure nobody falls through the cracks and that we don’t step on each others’ toes while still being responsive and available.

Our processes need to keep up with our customer “queue” which never stands still (forecasted spend changes with usage, accounts become eligible or drop out, some get handed over to Sales team, etc.). We need to figure out who needs our attention, understand customer context, and coordinate our work so we can help as many customers as possible, without turning our “help” into an impersonal email campaign or spending half our day managing a CSP.

That's why a successful migration to PostHog was so vital for our team.

## Bringing customer data and operations together

Previously, we managed all processes in an external CSP. Our collection of automations and integrations was ever-growing and somewhat worked, but it required creative workarounds and lengthy troubleshooting. As our needs grew, maintaining these became increasingly complicated.

We wanted the flexibility to make decisions based on billing, product usage, engagement, and previous conversations, without piecing together information from different tools and holding our breath to keep the system from breaking.

When PostHog started building Customer Analytics, we saw an opportunity to simplify things. Instead of sending our own customer data to an external CSP, why not run our processes directly where that data already lived?

The entire data layer was built by <TeamMember name="Daniel Danilov" photo /> - a [SQL model](/docs/data-warehouse/views) in [PostHog's data warehouse](/docs/data-warehouse) that calculates account eligibility, a priority score based on billing forecasts, upcoming bills, recent engagement, and other signals. The advantage is that when we need to adjust our prioritization or eligibility conditions, we can change them in one centralized place rather than update multiple integrations one by one.

![SQL model in the PostHog data warehouse calculating account eligibility and priority](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_11_18_at_13_41_26_2x_033accd629.png)

Customer Analytics pulls from this and offers a single shared view, sorted by that priority score. It helps us identify which customers need attention first, while giving us access to their usage, spending, conversations, meetings, and progress through our program.

![Customer Analytics accounts view sorted by priority score](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_11_20_at_09_15_20_2x_6493dfdb3c.png)

Knowing which customers need help is only half the challenge - we also need to act on that information, and that's where Workflows come in handy.

## Turning Workflows into the scaling engine

On the surface, Workflows might seem to be for marketing-related automations, but we quickly proved that they could do much more than send emails and could help us launch our operations at scale.

We needed a system that could act on customer data, coordinate our team's work, automate, and adapt when circumstances changed. Instead of recreating every old CSP automation separately, we consolidated much of our logic into a few core workflows, and supporting ones focused on specific tasks.

A lot of this happened through conversations with AI agents, e.g., [PostHog AI](/docs/posthog-ai), [MCP](/docs/model-context-protocol), and the [Slack app](/docs/posthog-ai/surfaces/slack). Usually we described in plain language what we want to automate, review what the agent builds, test the logic, and enable it once we're happy with how it works.

Here are few specific examples:

### 1. An onboarding journey that adapts to the customer

Every day, an “Enter queue” workflow adds newly eligible accounts to our onboarding program. Customer Analytics triggers an event when an account property changes, allowing subsequent workflows to pick up where they left off.

[Our main email sequence](/docs/workflows/email-drip-campaign) lives in a single workflow, but not every customer follows the same path. For eligible customers forecasting under $600/month, we send an automated first email offering help with setup and billing. For higher-paying customers, we take a more personal approach: we review their account and write tailored advice based on their setup and usage.

![Onboarding email sequence workflow](https://res.cloudinary.com/dmukukwp6/image/upload/scaled_cs_onboarding_email_workflow_4f4039b00f.png)

Both groups then continue through the onboarding sequence, including a "last chance to get our help" message timed around their upcoming bill.

Workflows then handle the rest of the journey: flagging check-ins for the team, adding tasks to Customer Analytics, sending follow-ups where appropriate, and finally, completing the onboarding by setting a person property. Our main email sequence is currently on version 70, which is a great depiction of the number of edge cases we've worked through.

It’s important to note that no workflow sends emails just because they're scheduled. Before every send, it checks the customer's current situation. Has someone recently contacted the customer? Has another team taken ownership? If the situation has changed, the message is skipped.

### 2. Billing optimization and proactive help

Sometimes the best thing we can do for customers is help them spend less, and we enjoy doing so.

Via workflows, we reach out when customers encounter failed payments, offering assistance without requiring someone to monitor every account.

![Failed payment outreach workflow](https://res.cloudinary.com/dmukukwp6/image/upload/scaled_cs_failed_payment_workflow_b0976bc337.png)

We also developed a system of proactive interventions, based on specific spend and usage signals, that lets us identify customers who could benefit from talking with us and keep their PostHog usage sustainable before a potential issue becomes a reason to leave.

![Proactive intervention workflow based on spend and usage signals](https://res.cloudinary.com/dmukukwp6/image/upload/scaled_cs_proactive_intervention_workflow_0bad7b55b7.png)

Combining customer data with [Scouts](/docs/self-driving/scouts) and automation enables us to offer this kind of proactive help to far more people than we could reach out to manually.

### 3. Automating the work behind the scenes

Some of our favorite workflows don't send emails at all - they save time and reduce manual effort.

For example, Workflows creates follow-up tasks after onboarding meetings, add [Gong](/docs/data-pipelines/sources/gong) call summaries to customer notes using [AI tasks](/docs/workflows/ai-tasks), and generate tasks from customer research reports.

![Workflow creating follow-up tasks and adding call summaries to customer notes](https://res.cloudinary.com/dmukukwp6/image/upload/scaled_cs_meeting_followup_tasks_workflow_0b27dfc540.png)

Our “Stage Reactor” keeps track of changes in each account's stage, recording timestamps and managing specialist assignments.

These might not sound like big game changers, but across hundreds of accounts, they add up to a considerable amount of coordination we don’t have to handle anymore. What’s even more important, they keep our processes consistent, regardless of who's working that day, and free up time for the work that actually requires our expertise.

## Shaping Customer Analytics along the way

Our previous CSP was primarily designed for Sales teams and their individual books of business customers. That works well for teams managing dedicated customer relationships, but our work needed something drastically different.

When we started moving to Customer Analytics, we were determined not to end up with another generic CSP that worked well for traditional Sales teams but required workarounds for its limitations. After all, Customer Analytics was being built for multiple customer-facing teams, and we wanted to make sure ours were represented too. We didn’t want others to decide what our day-to-day operations would look like.

Because of this, we became Customer Analytics’ earliest power users, helping shape and grow the product beyond its initial concept.

We needed:

- [Shared, customizable account views](/docs/customer-analytics/saved-views) and widgets rather than individual dashboards.
- Workflow-managed properties that humans could override.
- Tasks that could be created both manually and automatically.
- Reliable conversation history and visibility into who's working on an account, so we wouldn't duplicate the work by mistake.
- And more…

Some of these features didn't exist when we started; others needed adjustments to support our operating model.

For example, we asked for round-robin email sending, which let us distribute automated outreach across our team while maintaining a consistent relationship with each customer. Next, we requested automated workflow emails to appear in the same account conversation history as messages we send by hand. This sounds like a small detail, but when anyone on the team can pick up an account, having a complete picture of previous communication is crucial.

![Workflow email step with round-robin sending across four team members](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_11_19_at_14_05_19_2x_30b0fe326c.png)

What made the whole process particularly enjoyable was working closely with <TeamMember name="Arthur Moreira de Deus" photo />, who’s the sole builder of Customer Analytics (that's an achievement for a product that is designed to serve multiple teams with very different ways of working). He treats us as equal partners in this journey, and never gets tired of our backlog (or so he says).

As early adopters, we bring our requirements, test new features, surface edge cases, give context, and iterate together. Arthur turns our feedback into improvements, often incredibly quickly, while we keep testing the product against the realities of our day-to-day work.

It’s super fun to contribute to the product you use. Our challenges become real-world test cases, helping uncover improvements that can benefit other teams and customers too.

## What we learned

Looking back, the most interesting part of this migration wasn't replacing our CSP. It was realizing just how much of our expertise had become embedded in the processes and automations we'd built over time.

We'd spent months figuring out how to prioritize customers, when to intervene, and how to balance personal attention with scale. Moving to Customer Analytics and Workflows pushed us to revisit that logic, challenge our assumptions, and simplify our processes.

And we're only getting started. We can now experiment with better ways to identify risks, respond to signals, and personalize outreach using the same products our customers use.

Our goal was never to automate the humans out of our process. It was to automate enough of the operational complexity that we could bring human attention to many more customers. For a small team supporting hundreds of customers, that's a pretty big deal.

I’d like to give a shout-out to the entire <SmallTeam slug="scaled-customer-success" /> for ~~surviving~~ making this migration happen, to Arthur for building Customer Analytics and turning our wishlist into features week after week, and to the <SmallTeam slug="workflows" /> for working alongside us to bring our processes to life!
