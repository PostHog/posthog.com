---
date: 2026-05-20
title: Why we want to train AI models
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - james-hawkins
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-ceo-diary-blog.png
featuredImageType: full
category: CEO diaries
---

Over the last year, we've started building more AI-powered features into PostHog, like our [AI installation wizard](/wizard), [PostHog AI](/docs/posthog-ai), and our [MCP](/docs/model-context-protocol). They're all wildly popular, but they're only the start.

We're now working towards building more proactive, self-driving products. Products that surface answers and solutions for you, act on them, and improve over time. This is the vision for [PostHog Code](/code), which is now in beta.

To enable this and more products like it, we want to try something new.

We want to train models on data in PostHog, so we can build better versions of existing products and entirely new types of products that will help teams build better products, faster.

We think there are a bunch of meaningful use cases here that will help users, while also helping PostHog continue to thrive.

## What we want to build

The first area we're interested in is session replay analysis. PostHog AI can already detect issues in replays, but it's expensive and doesn't scale well. We think a model trained on the underlying data used to power replays could make this cheaper, faster, and more accurate.

We also want to explore whether we can get better at predicting user behavior, such as what changes might improve conversion rates, based on a model's knowledge of past user behavior, without needing manual analysis, or an excessive amount of tokens thrown at agents.

The third area I'm excited about is synthetic user testing – i.e. using that same data to understand where users might get confused, or what flows might break, before you ship. As coding models improve many people are seeing test and review workload increase hugely. We want to automate this, so you can focus on your product.

Our ideas here are experimental. It will take iteration to figure out how to train models effectively, and what data is actually useful. But, so far, every time we've added AI in a way that makes the product simpler or more powerful, it's worked well, so we think it's worth trying.

## How this will work

We've spent a lot of time thinking about this from a user perspective, especially the tradeoffs.

The upside is the kinds of improvements described above.

Most tools are focused on providing you with the best code; we want to focus our energy into making your product the best it can be. This is why we describe PostHog Code as a product editor.

The downside is that this involves using data in PostHog to train models.

Most companies would bury this change in a deceptively boring T&Cs update, but we value transparency, so here's what you need to know: 

- We are opting out users on our EU cloud instance by default
- We are also opting out users with a BAA, DPA, or MSA agreement
- We are opting in all other users on our US cloud instance
- We will anonymize all data before it's used for training
- We will only use data that already exists in your PostHog instance
- We will do the training ourselves
- We won't sell your data to third-parties model providers
- You can opt out at any time via TODO LINK HERE (admin required)
- Users who we have opted out by default can choose to opt in the same way

In terms of comms, we are:

- Emailing all our customers and making it super obvious what the email is about
- Notifying all our users through in-app notifications (in case you don't read emails)
- Communicating our plans very publicly (like in this post)

I also want to stress that our goal here is to improve PostHog as a product for our customers, not to expose or sell models trained on your data.

We're not interested in monetizing your data, we want to use that data to make PostHog a better, more proactive tool for you.

## Why this is opt out, not opt in

Put simply, because otherwise we will not have enough data to train a model that's actually useful.

If you choose to opt out, the new features that we're building with these models won't be available to you, as they'll depend on this data.

We're choosing to be upfront about this rather than quietly rolling something out, because we think that's the right way to do it.

If you want to talk about this, I'm james at you can guess it.

We're also [hiring AI researchers](/careers), so get in touch if you want to work on this with us.
