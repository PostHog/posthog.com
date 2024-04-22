---
title: An engineer's guide to talking to users
date: 2024-04-18
author:
  - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/newsletter/beyond-10x-engineer/super-hog.png
featuredImageType: full
tags:
  - Engineering
  - Product engineers
crosspost:
  - Product engineers
  - Blog
---

Talk to users? Isn't that a job for founders, product managers, user researchers, and salespeople? Why do would an engineer ever want or need to do it?

In his book [*Modern Software Engineering*](https://www.davefarley.net/?p=352), Dave Farley writes that mastering software engineering requires becoming an expert in learning. When learning is prioritized, talking to users becomes a critical part of an engineer's toolkit.

To explain further why this is the case, and to help you get started, we wrote this guide based on what we've learned talking to users as engineers ourselves at PostHog.

## Why should engineers talk to users?

Engineers' biggest pushback against talking to users is that it is a waste of time. This belief is a symptom of the wrong priorities.

Many engineers place shipping code above all else. Anything that gets in the way of this is, apparently, a waste of time. This is reflected in common metrics for measuring engineering success like lead time or deployment frequency. 

This creates a disregard for shipping the right code: features users value. Studies show this is more common than you might think. For example, [Microsoft](https://ai.stanford.edu/~ronnyk/ExPThinkWeek2009Public.pdf) found that only one-third of ideas tested improved metrics they were designed for.

A fix for this is spending more time learning what users want and nothing beats doing this yourself. This also helps you close the gap between what users value and what you are building.

![Don't build the wrong features](https://res.cloudinary.com/dmukukwp6/image/upload/v1713470851/posthog.com/contents/images/newsletter/talk-to-users/features.jpg)

## Finding users to talk to

Just because we convinced you that talking to users isn't a waste of time doesn't mean we want to waste your time doing so. We realize engineers are busy, but that isn't an excuse to not talk to users. As Farley writes:

> Modern teams fight with schedule pressure, quality, and maintainability of their designs. They often struggle to identify the ideas that really land with users, and they fail to allow themselves the time to learn about the problem domain, the technology, and the opportunities to get something great into production.

Lucky for you, you don't need a lot of users. You don't need to find a statistically significant sample. A few user interviews can be all you need to clarify the next increment of progress.

Second, you don't need to go send cold emails to find users to speak with. Once you have [product-market fit](https://posthog.com/founders/product-market-fit-game), your current users work perfectly. From our experience, these are the best ways to find them:

- Look at analytics to find power users of related features.
- Ask your sales or customer success teams for potentially interested customers.
- Check support for who is asking or requesting features.
- Your users could also be inside your company. For example, our infrastructure team talks to our product teams to understand their upcoming requirements.

To speed up the time it takes to find users, use a tool like PostHog's [user interview survey](https://posthog.com/tutorials/feedback-interviews-site-apps) or provide an incentive, like a merch code or gift card. 

![Feedback for merch code](https://res.cloudinary.com/dmukukwp6/image/upload/v1713470870/posthog.com/contents/images/newsletter/talk-to-users/merch.png)

## What you shouldn't talk about

The best information you'll get from talking to users comes from not talking. Beyond prioritizing listening, there are some specific areas you should avoid. They include:

1. **Yourself or your product.** If they are users, they probably know what your product is and what it does.

2. **Your solution.** Resist the urge to explain your features and your thinking. You shouldn't use the time to convince them why your solution is the right one.

3. **Their solutions.** Users likely recommendations and feature requests. These often don't solve their underlying problems, so reframe these to dig deeper into the underlying causes.

4. **Macroanalysis**. Focus on an individual's specific use case rather than a company or industry one. Outside research can fill this if necessary.  

## What you should talk about

Our experience talking to users has revealed two main discussion areas. The first is **problem exploration**. This guides future product decisions, like [what to build next](https://newsletter.posthog.com/p/how-we-decide-what-to-build). Focus on concrete situations by asking questions like:

- How are you solving your problem right now?
- How much would you pay for a solution to your problem?
- What is your workflow for solving this problem? Can you talk me through it?

The second is **solution validation**. This works best when someone is already using your feature or you have a demo to show them. Focus on impressions and problem areas by asking questions like:

- Have you tried using X? If not, why not?
- How are you using X now? What are your touchpoints and workflows with X?
- What is confusing?

Dive deeper into interesting workflows and lines of thought. Get their preference on options. Ask about constraints. Finally, take notes and [share them with your team](https://posthog.com/product-engineers/interview-snapshot-guide) so they can benefit too (we use an AI transcription tool and keep a master interview document).

## Iterating beyond user interviews

In *Modern Software Engineering*, Farley outlines 5 behaviors engineers need to become experts in learning: iteration, feedback, incrementalism, experimentation, and empiricism. This shows that the process of learning doesn't stop after a few user interviews. Weave the information you get from users to iterate, experiment, progress incrementally, and get feedback again.

At PostHog, we often work closely with customers to build features and get feedback via Slack. After user interviews, we build solutions, ask customers about them, and iterate. These customers become references for us and their usage represents broader usage. This helps us spend more time developing features that deliver real value.

![Feedback via Slack](https://res.cloudinary.com/dmukukwp6/image/upload/v1713470870/posthog.com/contents/images/newsletter/talk-to-users/feedback.png)

User interviews are like automated tests. Not doing them saves you time, but also leads to pain over the long term. Both enable you to iterate faster by providing rapid feedback on if what you've built is working, even if they aren't code you ship.

Like your product, your knowledge should be improving all the time. Talking to users is one of the best ways to do this. Even if it isn't thought of a tool for software engineers, it should be one for modern software engineers.

## Good reads for product engineers

**[An engineer's guide to behavioral analytics](https://posthog.com/product-engineers/behavioral-analytics) - Ian Vanagas**

Another source of insights to grow your knowledge is how users are actually using your app. Behavioral analytics help you discover this. 

**[How to talk to users](https://youtu.be/z1iF1c8w5Lg) - Gustaf Alströmer**

YC Group Partner gives his (rival) full guide on what users to talk with, how to run an interview, and how to interrupt their feedback. 

**[Stripe's payments APIs: The first 10 years](https://stripe.com/blog/payment-api-design) - Michelle Bu**

A success story in iteration and feedback. It takes a lot of work to handle an increasing number of payment methods while keeping an API simple.