---
date: 2026-05-27
title: Training our own AI models
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - james-hawkins
featuredImage: https://res.cloudinary.com/dmukukwp6/image/upload/ai_models_blog_8cc6ccc808.png
featuredImageType: full
tags:
 - CEO diaries
 - Research
---

I really think we're on the verge of some of our best work through the next six months.

Over the past year, we've started building more AI-powered features into PostHog, like our [AI installation wizard](/wizard), [PostHog AI](/docs/posthog-ai), and our [MCP](/docs/model-context-protocol). They're all wildly popular, but they're only the start.

[PostHog's next chapter](/blog/posthogs-next-chapter) is about building more proactive, self-driving products. Products that surface answers and solutions for you, act on them, and improve over time. 

This is the vision for [PostHog Code](/code), which is now in beta. To enable this and more products like it, we want to try something new. 

We want to train models on data in PostHog.

## What we want to build

We have two goals here:

1. Make our existing products smarter, more proactive, and useful to you
2. Build entirely new products, like PostHog Code, that help teams build better products, faster

The first area we're interested in is **session replay analysis**. PostHog AI can already detect issues in replays, but it's expensive and doesn't scale well. We want replays to be as powerful at scale as they are for diagnosing the problems of individual users, and we think a model trained on the underlying data that powers replays will help us achieve this. 

Another idea I'm especially excited about is **synthetic user testing** – i.e. using our knowledge of user behavior to identify when users might get confused, or what flows might break, _before you ship_ to production. As coding models improve, many people are seeing test and review workload increase hugely. We want to automate this, so you can focus on your product.

And, if we can get better at **predicting user behavior**, we should be able to suggest changes that will improve conversion, and reduce user frustration, for features you've already shipped as well. If we can automate this work for you, you'll spend less time on manual analysis and burn fewer tokens in the process.

Our ideas here are experimental. It will take iteration to figure out how to train models effectively, and what data is actually useful. But, so far, every time we've added AI in a way that makes the product simpler or more powerful, it's worked well, so we think it's worth trying.

## How this will work

We've spent a lot of time thinking about this from a user perspective, especially the tradeoffs.

The upside is the kinds of improvements described above.

Most tools are focused on providing you with the best code; we want to focus our energy into making your product the best it can be. This is why we describe [PostHog Code](/code) as a product editor.

The downside is that this involves using data in PostHog to train models.

Most companies would bury this change in a deceptively boring T&Cs update, but we value transparency, so here's what you need to know in an internet-friendly numbered list: 

1. Users on our EU cloud instance are opted out by default
2. So too users with agreements that prevent training (e.g. BAA, MSA, or similar)
3. All other users on our US cloud instance are opted in by default
4. We will anonymize all data before it's used for training
5. We will only use data that already exists in your PostHog instance
6. We will do all the model training ourselves, which means...
7. We won't sell or send your data to third-party model providers
8. You can opt out at any time via your [org settings in PostHog](https://app.posthog.com/settings/organization-details) (admin access required)
9. Training won't start until June 29, so there's plenty of time to decide

In terms of comms, we are:

- Emailing all our customers and making it super obvious what the email is about
- Notifying all our users through in-app notifications (in case you don't read emails)
- Communicating our plans very publicly (like in this post)

I want to stress that our goal here is to improve PostHog as a product for our customers, not to expose or sell models trained on your data, or monetize your data.

## Why this is opt out, not opt in

Put simply, because otherwise we will not have enough data to train a model that's actually useful.

If you choose to opt out, the new features that we're building with these models won't be available to you, as they'll depend on this data. 

If you're opted out by default (e.g. because you're on our EU cloud instance), you can choose to opt in manually provided any legal agreements you have with us don't exclude this option.

We're choosing to be upfront about this rather than quietly rolling something out, because we think that's the right way to do it.

If you want to talk about this, I'm james at you can guess it.

We're also [hiring AI researchers](/careers/ai-research-engineer), so get in touch if you want to work on this with us.
