---
date: 2023-11-16T00:00:00.000Z
title: How we work asynchronously
author:
  - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/newsletter/feature-images/teacher.png
featuredImageType: full
tags:
  - Culture
crosspost:
  - Founders
  - Blog
---

PostHog is a team of 38 people across 11 different countries. We’re entirely remote, and as we covered in our last issue, designed for speed. What’s fuelling this intercontinental race car? A little thing called asynchronous work.

Besides being difficult to pronounce, being asynchronous means people can work autonomously and on their own schedule, even if other teams members aren’t immediately available.

In the spirit of transparency (the value of which you’ll see soon), we’re taking the cover off our race car and sharing our not-so-secret strategies for working asynchronously.

**This week’s theme is:** How to successfully work asynchronously.

> This post was first published in our Substack newsletter, [Product for Engineers](https://newsletter.posthog.com/). It's all about helping engineers and founders build better products by learning product skills. We send it (roughly) every two weeks. [Subscribe here](https://newsletter.posthog.com/subscribe).

## 1. Transparency as a core value

Transparency is critical successful async work.

This means, wherever possible, our [handbook](/handbook), [strategy](/handbook/why-does-posthog-exist#our-strategy), [roadmap](/roadmap), and [work discussions](https://github.com/PostHog/posthog/issues) are all open for anyone to see. It also means, internally, the executive team shares financials, updates on fundraising, board slides, and people decisions.

![transp](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/newsletter/async-work/transparency.png)

Each of these is often private and/or synchronous in other companies. Of course, some of our information or discussions are confidential, but as much as possible is shared as publicly as possible.

Transparency enables everyone to know what is going on with the company without synchronous communication. This creates autonomy and empowerment.

> **Further reading: [How to run a transparent startup](/founders/how-to-run-a-transparent-company) – James Hawkins**

## 2. Context is king

It’s impossible to do good work without context. What are you building and, more importantly, why?

Our asynchronous culture is built on the short, intense synchronous time we spend together, such as our annual all-company offsite, small team offsites, in-person onboarding, and quarterly planning meetings.

These are opportunities to clarify:

1. **Big roadmap plans**, so we know far in advance what we want to build.
2. **Quarterly goals**, so small teams can share their specific plans.
3. **Ownership**, so everyone knows who is delivering those goals / projects.

We use our weekly Monday all-hands meeting to re-emphasize, update and scrutinize our goals, through a combination of announcements, team updates, and James’ topic of the day. Recent topics include how we build an enduring company, reviewing PostHog’s [values](/handbook/company/values), and how to balance planning vs. collaborating vs. shipping.

With this context, people are empowered to work async. Teams require less synchronous communication to get their work done throughout the week. Instead, they rely a lot on…

## 3. Writing in public

To make good decisions about what they work on, people need access to the relevant context. In an async environment, this means:

1. [Writing it down](/handbook/company/culture#we-write-everything-down).
2. Making it easy to find.

As much as possible, we document things, so people can unblock themselves without asking for help from someone who could be offline or busy. Our priority list for this is:

1. **Pull requests:** Ship code if you can. This includes updating our public handbook and docs.

2. **Issues:** Clarifies task, requirements, and ownership in GitHub. Others can to give feedback and discuss. All-in-one place, searchable, and connected to code.

3. **Slack:** Nearly everything else happens in public channels. Announcements, updates, ideas, questions, and more all happen here.

We avoid private group chats, internal email threads, and docs in other locations. These make information harder to find.

## 4. Reduce work in progress

Another way we stay autonomous is by reducing [work in progress](/handbook/engineering/development-process#2-sizing-a-task-and-reducing-wip). Async coordination is hard enough, imagine juggling 10 different projects while doing it. We prevent this with a few principles:

- PRs should be doable in one day.
- Start your day by responding to others’ review requests.
- Merge whenever.
- Ship behind a feature flag and [test in production](/product-engineers/testing-in-production).

Each of these reduces the amount of context needed to get work shipped. This makes it less likely people need to communicate at all. They can spend their energy working rather than context juggling.

> **Further reading: [Why we test in production (and you should too)](/product-engineers/testing-in-production) – Ian Vanagas**

## 5. Our request for comments process

Planning a big project impacting multiple teams?

Instead of a “stakeholder meeting,” we use a [request for comments, AKA RFC](/handbook/company/communication). This process helps us publicly get feedback and make decisions on big projects. It is a core piece of async communication at PostHog that boils down to a written pull request with:

1. The problem
2. The recommendation
3. The decision

It includes all the context others need to ask questions and give feedback. Once done, the designated person makes (and owns) the decision. You can see examples of them on [GitHub](https://github.com/PostHog/meta/tree/main/requests-for-comments).

![RFC](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/newsletter/async-work/RFC.png)

An RFC eliminates organizing a meeting with the “relevant stakeholders,” preparing and distributing background materials, doing presentations, and having live Q&A. All of this takes unnecessary time for everyone involved and is not async-friendly.

> **Side note:** A hidden benefit of being async is that we spend basically zero time organizing meetings, which sucks up a shocking amount of time in most companies.

## The benefits of async work

What do we get out of all this?

- Nearly everyone is on a [maker schedule](http://www.paulgraham.com/makersschedule.html). We have a lot of time to do our work and that enables us to ship a lot.

- We are remote. We can hire the best people wherever they are. Working with a great team was one of the most common motivations in a recent internal survey.

- Transparency builds trust, gets more user feedback, and is great marketing.

- Written communication like our roadmap, goals, and feedback is clearer and better thought through than synchronous versions.

- Autonomy and time for deep work help make PostHog a great place to work. This was another common motivation from the internal survey.

## Mitigating the downsides of async

Earlier in PostHog’s life, [we made the mistake of being too async](/founders/asynchronous-remote-companies). This created unclear direction and disconnect within teams which in turn caused unnecessary tension and burnout. We learned from this and now do a lot to prevent it.

We still do syncs, just less often than most companies. They include:

- Standups every week or second day (depending on the team)
- One-on-ones and ad-hoc Slack huddles.
- In-person onboarding for new hires with their team.
- Co-working and meeting up budgets.
- [One small team](/blog/rome-hackathon) and one [whole company offsite](/blog/aruba-hackathon) every year.

![posthog aruba](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/aruba/aruba-hackathon-photos.jpeg)
<Caption>Our most recent company offsite in Aruba</Caption>

This helps build connections, energize, and align the team for our async to work the rest of the time.

> **Further reading: [How to plan a killer company offsite in just 8 weeks](/founders/planning-a-company-offsite) – Grace McKenzie**

## Creating your asynchronous work toolkit

Inspired to become more async? Here are some actions you can take:

1. **Be more transparent:** This provides people with the context they need without having to sync.

2. **Have a public roadmap and goals:** Know what’s important and what others are working on.

3. **Use an RFC:** Cut the time you spend in meetings, enable async discussion, and have all the decision context in one place.

4. **Use your website:** Having a source of truth for processes. Making this easily editable by anyone. Get context out of people’s heads and into a place others can read it.

5. **GitHub maximalism:** Connect everything to the shipped code. Read how we use GitHub as our CMS.

## Good reads for product engineers 📖

**[Five Ways to Address Complexity In Your Product](https://caseyaccidental.com/product-complexity) – Casey Winters:** When a simple product becomes too complex, users inevitably flow to another simple product instead. Casey Winters, an advisor and ex-Chief Product Officer at Eventbrite, shares ways to break this cycle.

**[7 types of difficult coworkers and how to deal with them](https://careercutler.substack.com/p/7-types-of-difficult-coworkers-and) – Jordan Cutler:** Raviraj Achar, a tech lead at Meta, shares his tips for how to work with different types of colleagues (e.g. overwhelmed optimists, stealthy critics, and risk taker).

**[How to analyze surveys with ChatGPT](/tutorials/analyze-surveys-with-chatgpt) – Lior Neu-ner:** A guide to using PostHog survey data in ChatGPT to quickly summarize results.

**[Metrics that cannot even be measured in retrospect](https://longform.asmartbear.com/unmeasurable-metrics) – Jason Cohen:** Some things are just really hard to measure. It’s useful to know what they are so you don’t waste time trying to over analyzing.

_Words by Ian Vanagas, who scored 6/8 on [Dictator or Tech Bro](https://dictatorortechbro.com/)_
