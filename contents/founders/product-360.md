---
date: 2022-02-18
title: I used to think you don't need product people. I was wrong.
author:
  - james-hawkins
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/product-people.png
featuredImageType: full
tags:
  - Founders
  - Product
  - Being a founder
crosspost:
  - Blog
---

When PostHog was fresh out of YC last year, there were two things we focused on: (i) build and (ii) talk to customers. Hiring a product person felt like it would slow us down. Engineers on our team would speak to our users (also engineers) - surely they'd know what's best to prioritize? We didn't want our engineers to be "shielded" from our customers.

By [PostHog's series B](/blog/15-million-series-b), our team showed me that I was totally wrong. Here's why that was the case, what we did about it, and the results.

>James Hawkins is PostHog's Co-Founder & CEO. Follow him on [Twitter](https://twitter.com/james406).

## Why I used to think this way
My previous experience of product management was something like this:

* Here's a list of features the enterprise sales team wants
* How much pipeline does each of these features influence?
* _Builds as much of the above as possible whilst trying to manage existing customer requests_

This lead to lots of initial enterprise contracts, but negative outcomes in the long term like:

* A product users found frustrating to use
* No word of mouth growth
* High customer churn

These were all traps I wanted to avoid for PostHog and lead me to favor hiring more engineering talent over product people.

## It starts with expectation setting

![product management meme](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/product-people-blog/product-management-meme.png)

Alas.

Whilst we should measure what matters – often it's what is measured, is what ends up mattering.

Revenue is pretty easy to measure and feels important. A B2B SaaS company will therefore default into prioritizing this. That feels intuitive - your company will die without money.

And you should sell more to get more revenue, right?

If product focuses on enabling existing pipeline to close, versus customer retention and growth, you end up in the above failure mode.

## How we approached building a small product team

We've two product managers in a team of 30 people. [Results later](#the-difference-it-has-made) (they're good), here's what we did.

### 1. We hired product managers who can code

Our product people must be able to empathize with our users. We build for developers, so that meant hiring people that could write at least a little code. It felt like a compromise to not look for this.

We looked for scrappy, anti-plan type folk who wouldn't create a detailed year long roadmap but would create loose guidance, with plenty of context, and would help the company iterate its product over time. This fitted the culture we felt was optimal. Product managers who can code are likely to be a bit scrappier - after all, they've probably acquired both these skills by working in smaller organizations where roles are broad.

Above all, though, the most important part of getting the team to click was our engineers telling Tim (my cofounder) and me that we needed to hire a product person. Sidenote: this happened in a [full team feedback session](../handbook/people/feedback#full-team-feedback-sessions). They were absolutely right.

### 2. We got our board to look at leading indicator metrics

We want to focus on optimizing leading indicator metrics, as high up the funnel as possible. That means you have a faster feedback loop for learning. We put those into our board meetings.

PostHog still sends financial and revenue data each time, and has modelling to control the business' burn rate appropriately, but it goes into an appendix. We need to make sure this output connects to the input of our leading indicators. If it starts diverging, look for different leading indicators.

Specifically, this is the list we currently care about:

* Quality sign ups (we look for signups that match our [Ideal Customer Profile](/newsletter/ideal-customer-profile-framework))
* Conversion rate of high quality sign ups to paid
* Deployment conversion rate
* Number of discoveries inside PostHog (this is people creating a data visualization with filtering - the more users do this, the better we retain them)

### 3. We structured the company for autonomy

PostHog uses [small teams](../handbook/company/small-teams), inspired by Twilio, who were inspired by Amazon. [Jeff Lawson's book](https://www.askyourdeveloper.com/) is a good 101 on this topic. TL;DR - we're 30 people, split into teams of no more than 6. The most crucial concept is that a team can ship into production without any dependencies. This optimizes for autonomy, not control.

These teams are supported by product people. That means engineers are not told in detail what to do, or what is ok to merge. We put our product people into specific small teams where there is lots of help needed, but many teams run fine without them doing more than informal support (at our current scale at least).

### 4. We created two (very) basic frameworks

We created a Nail X framework. You tell the company "Nail X" where X is a thing you must nail. I'm not joking. [Unnuanced communication can be powerful](https://twitter.com/danluu/status/1487228574608211969). Product people decide what we need to nail.

"Nail Funnels" was the first thing we did when Marcus (VP Product) joined last year. And we did. We made [Funnels](/product/funnels) in PostHog awesome.

Get X reference customers was another useful framework. This came out of [a board meeting](ceo-diary-3#so-the-board-meeting). We realized that we had product market fit with our free open-source product, but we'd not yet worked on it for our PostHog Scale (paid product). We defined these as "genuinely delighted customers, using the product a lot, paying full price". We listed a few customers out we felt could achieve these three things to become a reference. Then we told the company to drop everything if needed to get it right with this group. Our product team made sure everyone was on track to achieve this.

### 5. We wrote stuff down

This matters to us as it prevents "information silos". I tried hard to find a less corporate way to describe that succinctly, but couldn't.

_Everyone_ must work like this. This is what the exec team at PostHog does:

* We share our exec meetings publicly in the company. Anyone can comment / read.
* We write out strategy changes into a pull request. Anyone can comment / read / suggest changes.
* We share our board meetings publicly in the company. Anyone can comment / read.
* We share realtime updates around fundraising. Not after the fact.
* We have a public [handbook](/handbook) - which is world editable

### 6. Product and engineering are peers

Product are proactive with getting feedback - they find and shape the biggest problems for engineers to solve.

Engineers at PostHog own solving these problems end-to-end - that means [engineers collaborate directly with users](https://neilkakkar.com/How-I-Own-Projects-as-a-Software-Engineer.html) from their initial ideas to implementation.

Anti rule: product doesn't dictate to engineers by producing feature requirements.

## The difference it has made

This has been mind blowing. Here are a few stats for how last year when compared to the year before:

* \>8x increase in traffic
* \>4x increase in users
* \>2x increase in contributors
* 0 to (significant) revenue
* 0 to many reference customers 

Overall, it just felt easier to grow _and_ like we were losing less energy trying to prioritize things. We could still make fast/ad hoc decisions, but with much more information behind them. Progress was both calmer and faster. We became proud of the product.

## Timing

I suspect we were right at two people that product was something that fell to us.

However, we were wrong that once we had product market fit for our open-source product, to continue making detailed decisions about prioritization. At this stage, we didn't know every user ourselves any more, and there was too much data to hold in our heads - that's where more focused product people can do a better job than founders or the engineering team at deciding what to build.

>PostHog is an open-source product analytics tool which enables teams to build better products faster without sharing their user data with third parties.

<ArrayCTA />
