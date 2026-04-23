---
title: Why we made chat our default UI
date: 2026-04-17
author:
  - ian-vanagas
featuredImageType: full
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_04_17_at_11_06_36_2x_7007f77b71.png
tags:
  - Inside PostHog
---

"What can I help you with today?"

It's what any business would ask a customer walking into their shop, so why is it so controversial when a piece of software does it?

Companies like Linear, Attio, and us (PostHog) have all made an [AI chat](/ai) the default homepage experience recently and some are not happy about it.

![Complaints](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2026_04_17_at_11_14_10_2x_b8266e901c.png)

We're seeing good results from doing this so far. Only 6% of homepage visitors clicked a dashboard link while 12% chat with AI. On top of this, only 2% of people over 30 days have put the default dashboard back within one hour of visiting.

To go further, we're explaining why we made this change and what we're doing to support it.

## Our existing default doesn't make sense anymore

PostHog started as an "open source product analytics tool" but has grown to be much more. 48.5% of active PostHog users in the last 30 days didn't even use product analytics. They rely on [session replay](/session-replay), [web analytics](/web-analytics), [feature flags](/feature-flags), [error tracking](/error-tracking), or any of our other tools. 

This is great as it shows we're making progress towards our mission of providing every tool engineers need to build successful products. We're sure aiming for it. We had 48 [changelog-worthy](/changelog) updates in March and LLMs are increasing the velocity at which we can ship new features.

But this shift and growth causes three problems:

1. Defaulting to a product analytics dashboard doesn't make sense for ~50% of our users.
2. There's a limited amount of room on the screen to put all of these products and features. 
3. Users have a limited amount of time and attention to learn the usage and best practices of these products too. 

The combination of these creates the complaint that PostHog is "too complicated" and our UI is "too cluttered." Our [Platform UX team](/teams/platform-ux) is working on this, and we also have an exec leading a project on fixing "papercuts," 51 of which have been fixed in the last 2 weeks.

But we're also being helped by the biggest shift in how we build software: agents.

## Welcome to the agent-first present

People come to PostHog to get what they want done so they can go back to building. One way they do that most efficiently is [through agents](/newsletter/building-ai-agents).

More and more people are using PostHog in an agent-first way. 55% of dashboards, 28% of insights, 26% of experiments, and 13% of feature flags created in the last 7 days were done through agents.

![Dashboards created](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_04_17_at_11_12_09_2x_0748d14ed3.png)

Agents are helping people with the complexity of using all software, PostHog included. When they work well, they are a solution to all three of our problems:

1. A chat-based agent provide a much simpler UI. Users can use natural language to get the insights as well as create and modify flags, experiments, surveys, and more.
2. Agents can be set up with the [right tools and skills](/newsletter/agent-first-product-engineering) to figure out what products to use and know the best practices of using them.
3. Because they can use all of our products and features, a chat-based agent is more relevant to more of our users than a product analytics dashboard is.

The key bit is *when they work well*. Many people have had bad experiences with these chat-based agents, which is where resentment comes from. We've done a lot of work and testing and had enough positive feedback to be confident in ours though.

Making chat the default also helps us make improvements faster. More usage means more feedback, and the better tools and skills we build thanks to this feedback then spill over to our other agentic surfaces (like [MCP](/docs/model-context-protocol)).

## Chat has it's own challenges but is a step towards the future

Chat has it's own challenges.

First, it's not faster for everything. Each product's UI still exists, is still the primary way of interacting with it, and is still being improved. Experts will still use the UI and we'll continue to build for them.

Second, it's not clear what a chat can do for you. A UI provides immediate value because it shows you what you can do. Although a chat can give hints, it requires users to know what they want. It's like a restaurant without a menu.

This problem is trickier but we're working on it too. The solution is not to just give more hints, but to autonomously make improvements to your product. You guide this via chat, but there will be less of you "needing to know what you want" and more of PostHog knowing what to do. 

We're excited to show you more of this soon. The chat you see now is just a start.