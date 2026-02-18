---
title: Lifecycle of CSM engagement
sidebar: Handbook
showTitle: true
---

> This page covers more of the operational details of how our team generally works - for a broader overview of roles and responsibilities, visit the [customer success team page](/handbook/cs-and-onboarding/customer-success).

## Introduction

When starting out as a Technical Customer Success Manager (CSM) at PostHog, you are assigned a book of business with ~30 accounts to work with. It is helpful to think of customer engagement in stages to help us identify how we should connect with customers at each stage.

### Stage 1: Getting started with customers

We've written a lengthy guide on how to [get started with customers](/handbook/cs-and-onboarding/getting-started-with-customers), so rather than rehash some of that information here, go read that guide instead.

### Stage 2: Establishing trust

Once you've gone through your entire book of business and have completed stage 1, the next stage in our journey is to develop deep trust with our champions. Trust is built over time, based on our interactions and how we manage and nurture those relationships.

Some key examples that really help with building trusts with your customers:

- **Show, not tell**: Whenever a customer has a support question, or indicates they are trying to accomplish a goal, if possible, help create the solution rather than simply sending them to our docs. It is an opportunity to create an insight or dashboard for the customer, confirm if this is what they wanted, and share with them how you were able to create such an insight or dashboard so they could do it themselves later. Be careful to balance this and not create a dependency situation where customers rely on you to create stuff for them.

- **Be timely on notifications**: We have automated alerts set up to flag unusual behavior on an account. This includes things like event spikes or decreases. Sometimes this is unexpected behavior for the customer. Being quick to draw this to their attention can be helpful for the customer to investigate and showcase your helpfulness. If there are other signals, act on it accordingly. If there's public news, such as the company just raised a new funding round, reach out to your champion on this to congratulate them earnestly. 

- **Go beyond the basics**: In getting started with customers, you focused on getting to know your customers, understanding their business goals, helping with implementation, and optimizing their use. Now is a great time to focus on how you can help them optimize for success. This could be looking at how they're currently engaging with PostHog products, whether there are things they haven't done that might be helpful to implement. For example, have they set up custom tracking funnels for high value metrics, created alerts on customer actions to track, have they tried PostHog AI, or considered implementing other features to augment the data they have (such as error tracking to figure out why conversions drop off). This is a good opportunity to cross sell but also presents an opportunity to help customers understand where they can get more value out of PostHog.

Establishing trust can take time, and your communication style and actions can play a significant role. It may be worth offering recurring calls with your champion to establish more face-to-face contact, as this can help you maintain an ongoing pulse on what's happening.

### Stage 3: Getting deeply embedded with customers

At this stage, we're interested in conducting a deep dive and becoming more deeply embedded with their team to work through some of their goals. This could help establish new workflows or setups to gain deeper insights beyond what they've achieved.

Here are a couple examples that have came up previously:

- **Building a custom recommendation engine**: An ecommerce customer we were working with had implemented PostHog to track key metrics they cared about but wanted to take it a step further and use us as source of truth in customizing visitor experiences to their site. Each returning visitor would see a custom feed just for them based on prior product views, searches, or purchases. This went way beyond the scope of simply tracking events and building dashboards, and there were potential opportunities to work with the customer here on how to custom track events, push data to their backend, and more.

- **Real time alerts**: A couple customers had high value actions they wanted to track and get real time notifications on. One customer wanted to track product views, present related purchases for upsell, and get notified when a customer didn't complete a purchase. Another wanted to track downloads and figure out when visitors attempt to access a file but runs into an error. This presented opportunies to understand high value signals for our customer and how we can help them implement a custom solution using PostHog to accomplish their goals.

The goal at this stage is to help our customers succeed by getting them the key metrics they care about, and often times, requires us to connect with their team to implement custom code changes at a deeper level to accomplish this. 

If your champion is in a key decision making position who can get these changes through, that's great, but if not, this is also a great opportunity to ask your champion for an introduction to the key decision maker so you can work close with them to ensure changes can be prioritized. Another method is to reach out to the team lead, such as the head of engineering or head of product, armed with what their quarterly goals are, and offer your assistance directly. You may establish another strong connection this way.

Companies have conflicting priorities but by demonstrating you understand what their core goal is, and how PostHog could solve the problem, and finding the key decision maker, you have a higher chance of convincing the team to prioritize the changes now rather than wait to add value.

### Founder-Led Engagement Style (YC and Early-Stage)

For YC and early-stage founder-led accounts, the “embedded partner” mindset introduced in Stage 3 often becomes relevant much earlier in the lifecycle. Because these teams often operate at high velocity, the goal is to reduce friction between identifying a problem and deploying a solution.

**Core Principles**

**Diagnostic-First Engagement**

For founder-led teams, traditional “discovery” or “goal setting” calls that larger companies may prefer can introduce unnecessary overhead. If PostHog is already integrated, consider leading with investigation of the customer’s instance. _Example: identifying a friction point in their data and offering a concrete insight early in the relationship._

**Asynchronous-First Communication**

Founder teams often prefer speed and flexibility. Sharing Loom recordings, annotated dashboards, or short written summaries may allow them to consume insights on their own time while maintaining momentum.

**Reduce Technical Friction**

Where possible, it’s great to accelerate time-to-value by proactively building for customers instead of redirecting them to documentation alone. In general, it’s good to be mindful of whether we’re shifting the burden of cognitive load to our customer when it’s actually something we can help with.

**Radical Transparency**

Founder-led teams often value clarity and speed over formal process. When appropriate, offer direct observations. _Example: If you notice unclear metrics or suboptimal setup choices, position feedback as leverage rather than just commentary and/or critique._

**Alignment to Current Focus**

It’s great to have a proactive approach rather than a reactive one. Match output to the team’s immediate priorities. If they are launching a new feature, suggest measurement approaches tied to that launch rather than waiting for them to make a request.

A useful successs criteria when working with early-stage founders may be delivering maximum insight while keeping the administrative overhead minimal. In general, a strong CSM operates as a proactive partner, identifying patterns and proposing solutions early, while keeping the engagement lightweight and action-oriented.
