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

Although we can't speak for the other companies, we can talk about our thinking. 

## We're shipping fast

PostHog is getting more powerful. We're adding more products and more features. We had 48 [changelog-worthy](/changelog) updates in March. LLMs are increasing the velocity at which we can do this. 

This is great because it's helping us provide every tool engineers need to build successful products. We can offer more of the products and features they need, have more of their data in one place (great for AI-powered analysis), and offer each of those products cheaper than competitors.

But this growth causes two problems:

1. There's a limited amount of room on the screen to put all of these products and features. 
2. Users have a limited amount of time and attention to learn the usage and best practices of these products too. 

The combination of these creates the complaint that PostHog is "too complicated" and our UI is "too cluttered."

On top of this, the more we ship and the better products get, the further away PostHog gets from "just" being a product analytics tool as it once was. 48.5% of active PostHog users in the last 30 days didn't use product analytics. They rely on [session replay](/session-replay), [web analytics](/web-analytics), [feature flags](/feature-flags), [error tracking](/error-tracking), or any of our other tools. 

Simply, we're outgrowing the default of having a product analytics dashboard as the homepage.

## Welcome to the agent-first present

People come to PostHog to get what they want done so they can go back to building. One way they do that most efficiently is [through agents](/newsletter/building-ai-agents). 

More and more people are using PostHog in an agent-first way. 55% of dashboards, 28% of insights, 26% of experiments, and 13% of feature flags created in the last 7 days were done through agents.

![Dashboards created](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_04_17_at_11_12_09_2x_0748d14ed3.png)

For many people, chat has become the default way they are developing software. This has two consequences:

1. Going back to click around a UI feels like the past. They want to use natural language to get the insights as well as create and modify flags, experiments, surveys, and more.
2. We need to focus more of our efforts on improving the [agent-first](/newsletter/agent-first-product-engineering) experience. 

Having the chat as the homepage supports both of these. It's a new way of interacting with software, but one people seemingly want. Focusing more on it, and having more users use it, makes it better, and that improves our other agentic surfaces (like [MCP](/docs/model-context-protocol)).

It also helps us solve the two problems caused by our growth. An agent can figure out what products to use and know the best practices of using them. Users get their simpler UI as a chat is a lot simpler than the existing PostHog UI.

## What making chat default is not

There is a lot of theories of why a company would do this that need debunking. Making the chat the default is not:

- **A loss of vision.** For us, we see this as a core part of our AI-first vision. Chat is the best format for interacting with agents right now and more people want to interact with PostHog through agents. 

- **A complete replacement.** The underlying UI is there and is still the primary way of interacting with every product. A lot of PostHog is visual in a way that text cannot represent. You can always change it back. 

- **Faster for everything.** We fully realize that in lots of circumstances, having a UI is better. We fully expect product experts to still use the UI. Chat is faster when you're not fully familiar with the UI.

- **Going to have 100% approval.** PostHog as a whole isn't perfect. We'll continue to iterate and improve. 

- **Completely unique.** Other companies have done this before us. We're not claiming this is a genius new UI paradigm we've invented, just one that works for a lot of people.

- **Just "chat with your data."** Although the primary way people use chat is querying their data and doing analysis, you can use many of our products and features through PostHog AI. We're aiming for all of them.

## Chat is a step towards the future

We're seeing good results from doing this so far. Only 6% of homepage visitors clicked a dashboard link while 12% chat with AI. On top of this, only 2% of people over 30 days have put the default dashboard back within one hour of visiting. 

More importantly, we're not done.

Not just in the "feature completeness" sense, but in a broader mission sense. We're working towards product autonomy, enabling PostHog to improve your product automatically. 

This will work towards solving one of the final complaints: that a chat requires users to know what they want. Product autonomy aims to turn product data into improvements. Being able to guide this through chat is a critical part in helping it succeed.

The chat you see now is just a start.
