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

Is talking to users exclusively a job for user researchers, salespeople, founders, or product managers? For modern software engineers, the answer should be **no**.

In his book [*Modern Software Engineering*](https://www.davefarley.net/?p=352), Dave Farley writes that mastering software engineering requires becoming an expert in learning. Talking to users is one of the most useful tools for doing this, especially as the number of [engineers responsible for product decisions](https://newsletter.posthog.com/p/beyond-the-10x-engineer) increases.

To help you build this skill, we've put together everything you must know about why and how to talk to users.

## Why should engineers talk to users?

Engineers' biggest pushback against talking to users is that they believe it is a waste of time. This belief is a symptom of the wrong priorities.

A common measure of success is productivity, but measuring this is tricky. Attempts to measure it are usually focused on product metrics like lead time or deployment frequency. Farley writes that this is the wrong priority:

> In software, "production" is not our problem! Our product is a sequence of bytes, and we can recreate any sequence of bytes essentially for zero cost.
>
> This means that **we NEVER have a production problem**! Our problem is always one of learning, discovery and design. Engineering for software then, needs to focus very firmly on that part of the challenge and ignore, or at least automate, our production process.

Focusing on production leads to building features users don't value. Studies show this is more common than you might think. For example, [Microsoft](https://ai.stanford.edu/~ronnyk/ExPThinkWeek2009Public.pdf) found that **only one-third** of ideas tested improved metrics they were designed for.

By talking to users and acting on their feedback, you close the gap between what you are building and what users want. This helps lower the amount of work that isn't creating value for users.

![Don't build the wrong features](https://res.cloudinary.com/dmukukwp6/image/upload/v1713470851/posthog.com/contents/images/newsletter/talk-to-users/features.jpg)

Once engineers are onboard with prioritizing user value over software production, their next hurdle is the practical details of talking to users, from who to talk with to what to talk about.

## Finding users to talk with

Just because we convinced you that talking to users isn't a waste of time does not mean we want to waste your time doing so. We realize engineers are busy, but that isn't an excuse to not talk to users. As Farley writes:

> Modern teams fight with schedule pressure, quality, and maintainability of their designs. They often struggle to identify the ideas that really land with users, and they fail to allow themselves the time to learn about the problem domain, the technology, and the opportunities to get something great into production.

The lucky part for you as an engineer is that, first, you don't need a lot of users. This isn't an experiment, you don't need a statistically significant sample. A few user interviews can be all you need to clarify the next increment of progress.

Second, you don't need to fight to find users to speak with. Your current users work perfectly. To find them:

- Look at analytics to find power users of related features.
- Ask your sales or customer success teams for potentially interested customers.
- Check support for who is asking or requesting features.
- Your users could also be inside your company. For example, our infrastructure team talks to our product teams to understand their upcoming requirements.

To decrease the time it takes to find users, use a tool like PostHog's [user interview survey](https://posthog.com/tutorials/feedback-interviews-site-apps) or provide an incentive, like a merch code or gift card. 

![Feedback for merch code](https://res.cloudinary.com/dmukukwp6/image/upload/v1713470870/posthog.com/contents/images/newsletter/talk-to-users/merch.png)

## What NOT to talk about

Ironically enough, a lot of the value created by talking to users comes from **NOT TALKING**. Beyond putting listening as a priority, there are some specific areas you should avoid. They include:

1. **Yourself or your product.** If they are users, they probably know what your product is and what it does.

2. **Your solution.** Resist the urge to explain your features and your thinking. You shouldn't use the time to convince them why your solution is the right one.

3. **Their solutions.** Users likely recommendations and feature requests. These often don't solve their underlying problems, so reframe these to dig deeper into the underlying causes.

4. **Macroanalysis**. Focus on an individual's specific use case rather than a company or industry one. Outside research can fill this if necessary.  

## What to talk about?

From our experience talking to users, we find there are two main areas to talk with them about. The first is **problem exploration**. This helps guide future product decisions, like [what to build next](https://newsletter.posthog.com/p/how-we-decide-what-to-build). Focus on concrete situations by asking questions like:

- How are you solving your problem currently?
- How much would you pay for a solution to your problem?
- What is your workflow for solving this problem? Can you talk me through it?

The second is **solution validation**. This works best when they are already using your feature or you have a demo to show them. Focus on impressions and problem areas by asking questions like:

- Have you tried using X? If not, why?
- How are you using X now? What are your touchpoints and workflows with X?
- What is confusing?

Spend most of the time listening. Dive deeper into interesting lines of thought (which you couldn't do you weren't doing the interview). Take notes and [share them with your team](https://posthog.com/product-engineers/interview-snapshot-guide) so they can benefit too (we use an AI transcription tool and keep a master interview document).

## Iterating beyond user interviews

In *Modern Software Engineering*, Farley outlines 5 behaviors engineers need to become experts in learning: iteration, feedback, incrementalism, experimentation, and empiricism. This means the process of learning doesn't stop after a few user interviews. Weave the information you get from users to iterate, experiment, progress incrementally, and get feedback again.

For example, we often work closely with customers to build features and get feedback via Slack. After user interviews, we build solutions, ask customers about them, and iterate. These customers become references for us, their usage represents broader usage. This helps us spend more time developing features that deliver real value.

![Feedback via Slack](https://res.cloudinary.com/dmukukwp6/image/upload/v1713470870/posthog.com/contents/images/newsletter/talk-to-users/feedback.png)

A useful metaphor for engineers is that user interviews are like automated tests. Not doing them can save you time in the short run, but leads to lots of pain in the long run. Neither is "production code," but both provide you the confidence to move forward with development. They enable you to iterate faster by providing rapid feedback on if what you've built is working. 

Farley again explains the importance of this:

> If we work in small steps, get real reaction to the progress or otherwise, and constantly validate and review our ideas, we can see soonest, with lowest investment, when things start to work differently to our hopes and plans. If we work iteratively in small steps, the cost of any single step going wrong is inevitably lower; therefore, the level of this risk is reduced.

Like your product, your knowledge should be continually improving. Talking to users is one of the best ways to do this. Even if it isn't thought of a tool for software engineers, it should be one for *modern* software engineers.

## Good reads for product engineers 📖

**[An engineer's guide to behavioral analytics](https://posthog.com/product-engineers/behavioral-analytics) - Ian Vanagas**

Another source of insights to grow your knowledge is how users are actually using your app. Behavioral analytics help you discover this. 

**[How to talk to users](https://youtu.be/z1iF1c8w5Lg) - Gustaf Alströmer**

YC Group Partner gives his (rival) full guide on what users to talk with, how to run an interview, and how to interrupt their feedback. 

