---
title: This is why you're not shipping
date: 2025-04-03
author:
 - andy-vandervell
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/bellcurve_meme_19c509edff.jpg
featuredImageType: full
tags:
  - Engineering
  - Culture
crosspost:
  - Product engineers
  - Founders
  - Blog
---

Many years ago, I had a boss who lived in meetings.

Our only meaningful interaction was the 30 minutes around lunchtime when they'd sit at their desk and pepper me with questions while circumnavigating a salad:

  * "Where are we on X?"
  * "What do you think about Y?"
  * "Can you prioritize [this thing I plucked out of thin air]!"

I wasn't alone.

Everyone who did my job had the same relationship with their boss. There were entire layers of people at this company who just went from meeting-to-meeting all day.[^1]

This 1% dictated the pace for everyone else, so everything moved slowly.

Here's how to spot the signs and avoid this fate.

## 1. You wait for 1:1 meetings to solve problems

We all encounter problems in our work. Uncertainty, technical blockers, interpersonal conflicts, skill issues: take your pick.

People often use 1:1s with their manager to deal with these, so problems fester until the next opportunity to chat.

This is bad on an individual level, but catastrophic when 200 or so people are all doing the same thing. A compounding, bloated tumor of procrastination.

Just like [giving feedback](https://newsletter.posthog.com/p/why-you-suck-at-giving-feedback), the best time to deal with any problem is the moment you encounter it.

#### What we do

We encourage people to have fewer 1:1s. They should be far enough away that waiting until your next one would feel totally wrong.

Also, rethink how you use them. If it's just to update your manager, something is wrong. This should happen transparently, so everyone has the context.

Instead, use them to brainstorm, plant the seed of an idea before sharing it more widely, and get feedback on where you can do better.

If 1:1s become just about problems you have, they become a chore that no one enjoys.

## 2. You need another team to approve your work

This can happen for all sorts of reasons:

  * QA processes
  * Technical dependencies
  * A control freak founder

The reason is less important than the impact. Every time you go outside your team to move forward, you're adding latency.

And, just like 1:1s, the impact of this latency compounds as a company grows until it becomes impossible to move at speed.

![pepe silva](https://res.cloudinary.com/dmukukwp6/image/upload/pepe_silva_meme_a11b85f5ba.jpg)

### What we do

This is a hard problem to solve from the bottom up: it has to come from the top. At PostHog, we solve for this in a few different ways:

1. **We operate a "no design by default" approach**. It's up to product engineers to decide if and when they require design help, and they're free to ship entire products without design input if they choose. We maintain a design system to assist them, and have [clear guidelines on how to work with design](/handbook/brand/philosophy).

2. **Engineers make product decisions.** Product managers at PostHog don't decide what to build, or sign-off on features before they ship. Instead, they gather deep context on users, competitors, and potential solutions, so [product engineers can make informed decisions](/newsletter/product-management-is-broken).

3. **Trust and feedback over process.** We fundamentally believe [giving people feedback is better than creating a process](/handbook/values#4-trust-and-feedback-over-process). We also do things, like [testing in production](/product-engineers/testing-in-production), that reduce the risk of shipping something that breaks.

This is what works for us, but it goes hand-in-hand with solving another red flag...

## 3. Teams and ownership are hard to change

It's hard to move fast when the wrong team owns a problem.

They become a bottleneck, either by blocking people who want to fix it, or by slowing things down through excessive coordination and approvals.

It's even harder to move fast when ownership problems become insoluble. People learn to avoid things that other teams own, so they go unsolved and get worse.

### What we do

We've talked about [how small teams ship faster](/newsletter/small-teams) before, but there's another important benefit: they're easy to change.

Whenever a team gets too big, or it makes sense to form a new one to achieve a goal, we just do it. Typically, the process looks something like this:

![team changes at posthog](https://res.cloudinary.com/dmukukwp6/image/upload/team_change_91f7a8c7dc.png)

A few months ago, for example, we created one team to own both event ingestion and building [our customer data platform](/docs/cdp) and [realtime destinations](/docs/cdp/destinations). This made sense because the two systems needed to work well together.

Recently, however, we've split them into two separate teams again: Ingestion and CDP. Why? Because the problem has moved from "how do we make this work?" to "we need to build more integrations".

We also maintain a [public feature ownership doc](/handbook/company/fuzzy-ownership) that anyone can propose changes to at any time through a PR. Who owns what isn't dictated solely by leadership.

## 4. Sales outnumbers engineering

It's basically impossible to ship fast in a sales-led company. You become stuck fulfilling their unrealistic promises.

In fact, while shipping fast is an advantage, especially for startups, it isn't appropriate in every type of company.

So, if you want to join a team that ships fast, avoid companies where sales people outnumber product people or engineers, or even those with a near 1:1 ratio.

### What we do

PostHog currently comprises 91 people, the vast majority of whom have "engineer" in their job title. We also:

* Mainly hire technical people into content and marketing roles.

* Hire customer success and sales people with a technical background.

* Hire support engineers who have software development experience.

* [Use GitHub as our content management system](/blog/github-cms).

* Accept that marketing and our website will sometimes lag our product.

## 5. You actively keep people “in the loop”

Having to actively push information to other people is a sure sign that keeping people aligned is more important than doing the thing.

It means you have to:

* Figure out who needs to know
* What they need to know
* When they need to know
* How to inform them

This is busy work that slows you down.

![bellcurve meme](https://res.cloudinary.com/dmukukwp6/image/upload/bellcurve_meme_19c509edff.jpg)

### What we do

As is often the case, we solve this through transparency.

Everything we do is out in the open. Team goals. Product revenue. Growth reviews. Sprint issues. The decisions people make and why. It’s all out there.

This makes us faster because it forces individuals to decide for themselves if they need to stay informed, and lets them pull the context they need from what's free for all to see.

If transparency is the answer, how do you make this happen in a company where it isn't the norm? Here's a good way to start:

1. **Share what you're working in one place.** Make sure everyone can access it. Make it easy to subscribe to updates. Make it effortless.

2. **Tell everyone about it.** Let them decide whether to subscribe to updates. Resist requests for personalized updates.

3. **Update it consistently.** People will trust it more if they know you take it seriously. How often you do so is up to you, but communicate this, so it's clear to everyone. Don't just share progress, share your ideas and the problems you encounter.

Your goal here is to train people in how you want to work, and hopefully convince others to do the same. For inspiration, here are some examples from PostHog:

* Joe Martin, who runs our Brand team, creates a GitHub issue every quarter distilling his personal goals, and his progress – [read his Q2 2025 goals](https://github.com/PostHog/meta/issues/301). 

* Cory’s [PostHog 3000 issue](https://github.com/PostHog/posthog/issues/12923), where he shared his ongoing work on a UI overhaul.

* Team Replay’s [quarterly goals planning issue](https://github.com/PostHog/posthog/issues/30460).

## 6. Average performers never leave

People who are obviously bad at their jobs are rarely the problem. They're easy to spot and easy to remove, the real problems come from:

1. Average performers who deliver 6/10 all the time, but never raise the bar.
2. Roles that aren't needed, but stick around because it's easier not to take action.

They both slow you down by needing more oversight, or by not being ambitious enough. 

Being 10/10 all the time isn't realistic, but moving fast requires a consistently higher level of performance.

### What we do

First, we regularly apply [the keeper test](https://posthog.com/handbook/company/management#the-keeper-test), which has three key points:

1. Team leads should consider "if X was leaving for a similar role at another company, would you try to keep them?"

2. Dig in where the answer is "no" – what would it take for this to be a "yes"? Is this just temporary, or is there a deeper issue to resolve?

3. Share this feedback with team members to ensure they keep improving.

Second, we act decisively when someone isn't meeting expectations. This means explicitly telling them they're falling short, and what good performance looks like.

If change isn't forthcoming within a few weeks, we let them go immediately and [give them a generous severance](/handbook/people/offboarding).

We avoid performance improvement plans because it's demeaning for those affected, and excessively time-consuming for managers.

## 7. Progress feels predictable and comfortable

Shipping fast should feel a little dangerous, chaotic, and scary sometimes. It's an anti-pattern to want complete consensus, or control. Disagreements will happen.

Ultimately, speed is a deliberate choice with clear tradeoffs.

We know, for example, that the first version of something we ship won't be the most polished. We know we'll take a wrong path sometimes.

We accept this because shipping fast gets us information from our users, and the market, more quickly than shipping perfect.

TL;DR: The faster we learn, the faster our product improves. Speed, like talent, compounds.

 _Words by [Andy Vandervell](https://www.linkedin.com/in/andyvandervell/), who wrote this article quite slowly, actually._

 <NewsletterForm />

## 🌶️ Spicy reads not written by AI

* [Use “but” strategically](https://newsletter.weskao.com/p/use-but-strategically) – Wes Kao
* [Adjacency Matrix: How to expand after PMF](https://longform.asmartbear.com/adjacency/) – Jason Cohen

[^1]: It’s important to point out that my boss wasn’t at fault here. This culture had developed for over a decade. It had an irresistible gravity that sucked everyone in, like the black hole in _Interstellar_ but without the epic soundtrack. All a single person could do was paddle hard and hope they could achieve escape velocity. 🚀